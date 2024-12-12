-- Create user details tables
create table public.user_contact (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  phone_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint phone_format check (phone_number is null or phone_number ~* '^\+?[1-9]\d{1,14}$')
);

create table public.user_demographics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  gender text,
  custom_gender text,
  ethnicity text,
  custom_ethnicity text,
  age_range text not null,
  has_parental_consent boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

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

-- Set up RLS policies
alter table public.user_contact enable row level security;
alter table public.user_demographics enable row level security;
alter table public.user_locations enable row level security;

-- Contact policies
create policy "Users can view own contact"
  on public.user_contact for select
  using (auth.uid() = user_id);

create policy "Users can update own contact"
  on public.user_contact for update
  using (auth.uid() = user_id);

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