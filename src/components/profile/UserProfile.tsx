import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { User, Settings, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Profile } from '../../lib/supabase';
import EditProfileForm from './EditProfileForm';
import PreferencesForm from './PreferencesForm';

export default function UserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex space-x-1 rounded-xl bg-amber-100/20 p-1">
          <TabsTrigger
            value="profile"
            className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-amber-400 focus:outline-none focus:ring-2 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-amber-400 focus:outline-none focus:ring-2 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="profile" className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
            <EditProfileForm profile={profile} onUpdate={loadProfile} />
          </TabsContent>

          <TabsContent value="preferences" className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
            <PreferencesForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}