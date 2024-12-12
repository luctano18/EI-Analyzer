-- Create analytics tables
create table analytics (
  id uuid default uuid_generate_v4() primary key,
  total_visits bigint default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table user_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  session_id text not null,
  last_active timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table traffic_logs (
  id uuid default uuid_generate_v4() primary key,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  visitors integer not null default 0,
  page_views integer not null default 0
);

-- Create indexes
create index idx_user_sessions_last_active on user_sessions(last_active);
create index idx_traffic_logs_timestamp on traffic_logs(timestamp);

-- Create function to update total visits
create or replace function increment_total_visits()
returns trigger as $$
begin
  insert into analytics (total_visits)
  values (1)
  on conflict (id) do update
  set total_visits = analytics.total_visits + 1,
      updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for new user sessions
create trigger on_new_session
  after insert on user_sessions
  for each row execute procedure increment_total_visits();

-- Create function to clean up old sessions
create or replace function cleanup_old_sessions()
returns void as $$
begin
  delete from user_sessions
  where last_active < now() - interval '1 hour';
end;
$$ language plpgsql;

-- Set up RLS
alter table analytics enable row level security;
alter table user_sessions enable row level security;
alter table traffic_logs enable row level security;

-- Create policies
create policy "Analytics are viewable by everyone"
  on analytics for select
  using ( true );

create policy "User sessions are viewable by everyone"
  on user_sessions for select
  using ( true );

create policy "Traffic logs are viewable by everyone"
  on traffic_logs for select
  using ( true );