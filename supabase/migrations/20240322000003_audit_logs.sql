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

-- Set up RLS policies
alter table public.audit_logs enable row level security;

create policy "Users can view own audit logs"
  on public.audit_logs for select
  using (auth.uid() = user_id);

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

-- Add audit triggers
create trigger profiles_audit_trigger
  after insert or update or delete on public.profiles
  for each row execute function audit_log_changes();

create trigger preferences_audit_trigger
  after insert or update or delete on public.user_preferences
  for each row execute function audit_log_changes();

create trigger demographics_audit_trigger
  after insert or update or delete on public.user_demographics
  for each row execute function audit_log_changes();