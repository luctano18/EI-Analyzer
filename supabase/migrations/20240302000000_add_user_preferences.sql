-- Add preferences column to profiles table
alter table profiles add column if not exists preferences jsonb default '{
  "emailNotifications": true,
  "language": "en",
  "fontSize": "medium",
  "colorScheme": "amber"
}'::jsonb;

-- Create function to update preferences
create or replace function update_user_preferences(
  user_id uuid,
  new_preferences jsonb
)
returns void
language plpgsql
security definer
as $$
begin
  update profiles
  set preferences = new_preferences
  where id = user_id;
end;
$$;