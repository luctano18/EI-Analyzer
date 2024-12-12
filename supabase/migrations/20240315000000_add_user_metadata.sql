-- Add metadata columns to profiles table
alter table profiles add column if not exists metadata jsonb default '{}'::jsonb;
alter table profiles add column if not exists preferences jsonb default '{
  "emailNotifications": true,
  "language": "en",
  "theme": "light",
  "fontSize": "medium"
}'::jsonb;

-- Create function to update user metadata
create or replace function update_user_metadata(
  user_id uuid,
  new_metadata jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update profiles
  set metadata = metadata || new_metadata
  where id = user_id;
end;
$$;

-- Create function to update user preferences
create or replace function update_user_preferences(
  user_id uuid,
  new_preferences jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update profiles
  set preferences = preferences || new_preferences
  where id = user_id;
end;
$$;

-- Add RLS policies
alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Create audit log table
create table if not exists audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  action text not null,
  table_name text not null,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create audit log function
create or replace function audit_log_changes()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data
  )
  values (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    case
      when TG_OP = 'DELETE' then old.id
      else new.id
    end,
    case
      when TG_OP = 'INSERT' then null
      else row_to_json(old)::jsonb
    end,
    case
      when TG_OP = 'DELETE' then null
      else row_to_json(new)::jsonb
    end
  );
  return null;
end;
$$;

-- Add audit triggers
create trigger profiles_audit
  after insert or update or delete on profiles
  for each row execute function audit_log_changes();