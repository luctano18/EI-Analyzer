-- Drop existing policies
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can view own profile" on public.profiles;

-- Create updated policies for profiles
create policy "Enable insert for authenticated users only"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Enable update for users based on id"
  on public.profiles for update using (
    auth.uid() = id
  );

create policy "Enable read access for users based on id"
  on public.profiles for select using (
    auth.uid() = id
  );

-- Update the handle_new_user function to handle metadata
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    phone_number,
    metadata
  ) values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone_number',
    jsonb_build_object(
      'gender', new.raw_user_meta_data->>'gender',
      'ethnicity', new.raw_user_meta_data->>'ethnicity',
      'age_range', new.raw_user_meta_data->>'age_range',
      'has_parental_consent', (new.raw_user_meta_data->>'has_parental_consent')::boolean
    )
  );

  -- Insert demographics
  insert into public.user_demographics (
    user_id,
    gender,
    ethnicity,
    age_range,
    has_parental_consent
  ) values (
    new.id,
    new.raw_user_meta_data->>'gender',
    new.raw_user_meta_data->>'ethnicity',
    new.raw_user_meta_data->>'age_range',
    (new.raw_user_meta_data->>'has_parental_consent')::boolean
  );

  -- Insert location
  insert into public.user_locations (
    user_id,
    city,
    state,
    zip_code
  ) values (
    new.id,
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'state',
    new.raw_user_meta_data->>'zip_code'
  );

  return new;
end;
$$ language plpgsql security definer;