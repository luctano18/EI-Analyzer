-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  phone_number text,
  location jsonb default '{}'::jsonb,
  metadata jsonb default '{}'::jsonb,
  preferences jsonb default '{
    "emailNotifications": true,
    "language": "en",
    "theme": "light",
    "fontSize": "medium"
  }'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint email_validation check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create audit logs table
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  action text not null,
  table_name text not null,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create audit trigger function
create or replace function audit_log_changes()
returns trigger as $$
declare
  audit_data jsonb;
begin
  audit_data = jsonb_build_object(
    'ip_address', current_setting('request.headers')::jsonb->>'x-forwarded-for',
    'user_agent', current_setting('request.headers')::jsonb->>'user-agent'
  );

  insert into audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data,
    ip_address,
    user_agent
  )
  values (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    coalesce(new.id, old.id),
    case when TG_OP = 'DELETE' then to_jsonb(old) else null end,
    case when TG_OP = 'DELETE' then null else to_jsonb(new) end,
    (audit_data->>'ip_address')::inet,
    audit_data->>'user_agent'
  );
  return null;
end;
$$ language plpgsql security definer;

-- Add audit trigger to profiles table
create trigger profiles_audit_trigger
  after insert or update or delete on public.profiles
  for each row execute function audit_log_changes();