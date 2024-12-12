-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Create journal_entries table
create table journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  content text not null,
  emotion text not null,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create emotion_logs table
create table emotion_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  emotion text not null,
  intensity integer not null check (intensity >= 0 and intensity <= 10),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create favorite_proverbs table
create table favorite_proverbs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  proverb_id text not null,
  proverb_text text not null,
  is_favorite boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, proverb_id)
);

-- Create newsletter_subscribers table
create table newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  subscribed boolean default true,
  source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_email unique (email)
);

-- Set up row level security (RLS)
alter table profiles enable row level security;
alter table journal_entries enable row level security;
alter table emotion_logs enable row level security;
alter table favorite_proverbs enable row level security;
alter table newsletter_subscribers enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Journal entries policies
create policy "Users can view own entries"
  on journal_entries for select
  using ( auth.uid() = user_id );

create policy "Users can insert own entries"
  on journal_entries for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own entries"
  on journal_entries for update
  using ( auth.uid() = user_id );

-- Emotion logs policies
create policy "Users can view own logs"
  on emotion_logs for select
  using ( auth.uid() = user_id );

create policy "Users can insert own logs"
  on emotion_logs for insert
  with check ( auth.uid() = user_id );

-- Favorite proverbs policies
create policy "Users can view own favorites"
  on favorite_proverbs for select
  using ( auth.uid() = user_id );

create policy "Users can manage own favorites"
  on favorite_proverbs for all
  using ( auth.uid() = user_id );

-- Newsletter subscribers policies
create policy "Anyone can subscribe to newsletter"
  on newsletter_subscribers for insert
  to anon
  with check ( true );

create policy "Subscribers can view own subscription"
  on newsletter_subscribers for select
  using ( email = current_user );

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();