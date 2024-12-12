-- Create consulting_plans table
create table consulting_plans (
  id text primary key,
  name text not null,
  price decimal(10,2) not null,
  minutes integer not null,
  features jsonb not null default '[]',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_plans table
create table user_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  plan_id text references consulting_plans(id) not null,
  minutes_remaining integer not null,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create consulting_sessions table
create table consulting_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  plan_id text references consulting_plans(id) not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  minutes_used integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to update consulting minutes
create or replace function update_consulting_minutes(
  p_user_id uuid,
  p_minutes_used integer
)
returns void
language plpgsql
security definer
as $$
begin
  update user_plans
  set minutes_remaining = greatest(0, minutes_remaining - p_minutes_used)
  where user_id = p_user_id
  and minutes_remaining > 0
  and expires_at > now()
  order by expires_at asc
  limit 1;
end;
$$;

-- Insert default plans
insert into consulting_plans (id, name, price, minutes, features) values
  ('trial', 'Free Trial', 0, 15, '["15 minutes of consulting", "Basic chat features", "Email support", "One-time use"]'),
  ('casual', 'Casual', 29.99, 60, '["60 minutes of consulting", "Advanced chat features", "Priority email support", "Valid for 30 days", "Rollover unused minutes"]'),
  ('unlimited', 'Unlimited', 99.99, -1, '["Unlimited consulting", "Premium chat features", "24/7 priority support", "Custom insights dashboard", "Monthly strategy session"]');

-- Set up RLS
alter table consulting_plans enable row level security;
alter table user_plans enable row level security;
alter table consulting_sessions enable row level security;

-- Create policies
create policy "Consulting plans are viewable by everyone"
  on consulting_plans for select
  using ( true );

create policy "Users can view own plans"
  on user_plans for select
  using ( auth.uid() = user_id );

create policy "Users can view own sessions"
  on consulting_sessions for select
  using ( auth.uid() = user_id );

create policy "Users can insert own sessions"
  on consulting_sessions for insert
  with check ( auth.uid() = user_id );