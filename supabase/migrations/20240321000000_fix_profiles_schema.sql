-- Drop existing tables if they exist
drop table if exists public.profiles cascade;
drop table if exists public.audit_logs cascade;

-- Create profiles table with updated schema
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text not null,
  phone_number text,
  avatar_url text,
  metadata jsonb default '{}'::jsonb,
  preferences jsonb default '{
    "emailNotifications": true,
    "language": "en",
    "theme": "light",
    "fontSize": "medium"
  }'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint email_format check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  constraint phone_format check (phone_number is null or phone_number ~* '^\+?[1-9]\d{1,14}$')
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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS policies
alter table public.profiles enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Audit logs policies
create policy "Users can view own audit logs"
  on public.audit_logs for select
  using (auth.uid() = user_id);

-- Create trigger for updating timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at_column();

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    metadata,
    preferences
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data, '{}'::jsonb),
    '{
      "emailNotifications": true,
      "language": "en",
      "theme": "light",
      "fontSize": "medium"
    }'::jsonb
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create indexes for better query performance
create index idx_profiles_email on public.profiles(email);
create index idx_profiles_metadata on public.profiles using gin (metadata);
create index idx_profiles_preferences on public.profiles using gin (preferences);
create index idx_audit_logs_user_id on public.audit_logs(user_id);
create index idx_audit_logs_created_at on public.audit_logs(created_at);