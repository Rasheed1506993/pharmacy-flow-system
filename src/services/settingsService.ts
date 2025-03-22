
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export interface PharmacyProfileFormData {
  pharmacy_name: string;
  owner_name: string;
  license_number: string;
  phone: string;
  address: string;
  city: string;
  employee_count?: number;
}

export interface UserProfileFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
}

export const settingsService = {
  updatePharmacyProfile: async (id: string, data: PharmacyProfileFormData) => {
    const { data: updatedData, error } = await supabase
      .from('pharmacy_profiles')
      .update(data)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return updatedData;
  },
  
  updateUserProfile: async (data: UserProfileFormData) => {
    // This would typically update a user profile table if it existed
    // For now, we'll just update the user's email in auth
    const { data: updatedUser, error } = await supabase.auth.updateUser({
      email: data.email,
    });
    
    if (error) throw error;
    return updatedUser;
  },
  
  changePassword: async (currentPassword: string, newPassword: string) => {
    // In a real implementation, we'd first verify the current password
    // This is simplified for now
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    return data;
  }
};
