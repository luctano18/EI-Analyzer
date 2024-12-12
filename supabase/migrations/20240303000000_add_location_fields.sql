-- Add location fields to profiles table
alter table profiles add column if not exists location jsonb default '{
  "address": null,
  "city": null,
  "state": null,
  "zipCode": null
}'::jsonb;

-- Create index for location-based queries
create index if not exists idx_profiles_location on profiles using gin (location);

-- Create function to update location
create or replace function update_user_location(
  user_id uuid,
  new_location jsonb
)
returns void
language plpgsql
security definer
as $$
begin
  update profiles
  set location = new_location
  where id = user_id;
end;
$$;