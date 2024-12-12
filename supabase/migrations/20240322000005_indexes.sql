-- Create indexes for better query performance
create index idx_profiles_email on public.profiles(email);
create index idx_contact_user_id on public.user_contact(user_id);
create index idx_demographics_user_id on public.user_demographics(user_id);
create index idx_locations_user_id on public.user_locations(user_id);
create index idx_preferences_user_id on public.user_preferences(user_id);
create index idx_audit_logs_user_id on public.audit_logs(user_id);
create index idx_audit_logs_created_at on public.audit_logs(created_at);
create index idx_audit_logs_table_name on public.audit_logs(table_name);