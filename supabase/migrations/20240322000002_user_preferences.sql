-- Create user preferences table
create table public.user_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  theme text default 'light' not null,
  font_size text default 'medium' not null,
  email_notifications boolean default true not null,
  language text default 'en' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint theme_values check (theme in ('light', 'dark', 'system')),
  constraint font_size_values check (font_size in ('small', 'medium', 'large')),
  constraint language_format check (language ~ '^[a-z]{2}(-[A-Z]{2})?$')
);

-- Set up RLS policies
alter table public.user_preferences enable row level security;

create policy "Users can view own preferences"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update own preferences"
  on public.user_preferences for update
  using (auth.uid() = user_id);