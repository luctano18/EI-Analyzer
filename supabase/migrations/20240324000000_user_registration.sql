-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create profiles table
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
  constraint email_format check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  constraint phone_format check (phone_number is null or phone_number ~* '^\+?[1-9]\d{1,14}$')
);

-- Create user demographics table
create table public.user_demographics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  gender text,
  ethnicity text,
  age_range text not null check (age_range in ('under16', '16orOlder')),
  has_parental_consent boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user locations table
create table public.user_locations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  city text,
  state text,
  zip_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint zip_code_format check (zip_code is null or zip_code ~* '^\d{5}(-\d{4})?$')
);

-- Set up RLS policies
alter table public.profiles enable row level security;
alter table public.user_demographics enable row level security;
alter table public.user_locations enable row level security;

-- Create policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

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

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();