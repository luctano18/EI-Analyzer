-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create enum types for fixed options
create type user_age_range as enum ('under16', '16orOlder');
create type user_theme as enum ('light', 'dark', 'system');
create type user_font_size as enum ('small', 'medium', 'large');

-- Create base profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text not null,
  phone_number text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint email_format check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  constraint phone_format check (phone_number is null or phone_number ~* '^\+?[1-9]\d{1,14}$')
);

-- Create user demographics table
create table public.user_demographics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  gender text,
  custom_gender text,
  ethnicity text,
  custom_ethnicity text,
  age_range user_age_range not null,
  has_parental_consent boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user locations table
create table public.user_locations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  state text,
  city text,
  zip_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint zip_code_format check (zip_code is null or zip_code ~* '^\d{5}(-\d{4})?$')
);

-- Create user preferences table
create table public.user_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  theme user_theme default 'light' not null,
  font_size user_font_size default 'medium' not null,
  email_notifications boolean default true not null,
  language text default 'en' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create audit logs table
create table public.signup_audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  action text not null,
  details jsonb not null,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to handle new user signup
create or replace function handle_new_signup()
returns trigger as $$
begin
  -- Create user preferences
  insert into public.user_preferences (user_id)
  values (new.id);

  -- Log the signup
  insert into public.signup_audit_logs (
    user_id,
    action,
    details,
    ip_address,
    user_agent
  ) values (
    new.id,
    'SIGNUP',
    jsonb_build_object(
      'email', new.email,
      'timestamp', now()
    ),
    inet_client_addr(),
    current_setting('request.headers', true)::json->>'user-agent'
  );

  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_user_signup
  after insert on public.profiles
  for each row execute function handle_new_signup();

-- Create function to update timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add update timestamp triggers
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at_column();

create trigger update_demographics_updated_at
  before update on public.user_demographics
  for each row execute function update_updated_at_column();

create trigger update_locations_updated_at
  before update on public.user_locations
  for each row execute function update_updated_at_column();

create trigger update_preferences_updated_at
  before update on public.user_preferences
  for each row execute function update_updated_at_column();

-- Set up RLS policies
alter table public.profiles enable row level security;
alter table public.user_demographics enable row level security;
alter table public.user_locations enable row level security;
alter table public.user_preferences enable row level security;
alter table public.signup_audit_logs enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Demographics policies
create policy "Users can view own demographics"
  on public.user_demographics for select
  using (auth.uid() = user_id);

create policy "Users can update own demographics"
  on public.user_demographics for update
  using (auth.uid() = user_id);

-- Locations policies
create policy "Users can view own location"
  on public.user_locations for select
  using (auth.uid() = user_id);

create policy "Users can update own location"
  on public.user_locations for update
  using (auth.uid() = user_id);

-- Preferences policies
create policy "Users can view own preferences"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update own preferences"
  on public.user_preferences for update
  using (auth.uid() = user_id);

-- Audit logs policies (read-only for users)
create policy "Users can view own audit logs"
  on public.signup_audit_logs for select
  using (auth.uid() = user_id);

-- Create indexes for better query performance
create index idx_profiles_email on public.profiles(email);
create index idx_demographics_user_id on public.user_demographics(user_id);
create index idx_locations_user_id on public.user_locations(user_id);
create index idx_preferences_user_id on public.user_preferences(user_id);
create index idx_audit_logs_user_id on public.signup_audit_logs(user_id);
create index idx_audit_logs_created_at on public.signup_audit_logs(created_at);