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

create trigger update_contact_updated_at
  before update on public.user_contact
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

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Create base profile
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );

  -- Create default preferences
  insert into public.user_preferences (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();