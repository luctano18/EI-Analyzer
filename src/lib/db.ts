import { supabase } from './supabase-config';
import { z } from 'zod';
import { Database } from '../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

const profileSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(2),
  phone_number: z.string().optional(),
  location: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
  preferences: z.record(z.unknown()).optional(),
});

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(
  userId: string,
  profile: Partial<z.infer<typeof profileSchema>>
) {
  const validatedData = profileSchema.partial().parse(profile);

  const { data, error } = await supabase
    .from('profiles')
    .update(validatedData)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const filePath = `avatars/${userId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  await updateProfile(userId, { avatar_url: publicUrl });
  return publicUrl;
}