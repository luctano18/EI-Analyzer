export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone_number: string | null;
          avatar_url: string | null;
          metadata: Record<string, unknown>;
          preferences: {
            emailNotifications: boolean;
            language: string;
            theme: 'light' | 'dark';
            fontSize: 'small' | 'medium' | 'large';
          };
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      user_demographics: {
        Row: {
          id: string;
          user_id: string;
          gender: string | null;
          custom_gender: string | null;
          ethnicity: string | null;
          custom_ethnicity: string | null;
          age_range: 'under16' | '16orOlder';
          has_parental_consent: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_demographics']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['user_demographics']['Insert']>;
      };
      user_locations: {
        Row: {
          id: string;
          user_id: string;
          city: string | null;
          state: string | null;
          zip_code: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_locations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['user_locations']['Insert']>;
      };
      signup_audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          details: Record<string, unknown>;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
      };
    };
  };
}