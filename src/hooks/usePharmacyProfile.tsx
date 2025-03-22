
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export const usePharmacyProfile = () => {
  const [pharmacyProfile, setPharmacyProfile] = useState<Tables<'pharmacy_profiles'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPharmacyProfile = async () => {
      try {
        setLoading(true);
        
        // First get the current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Get the pharmacy profile for the current user
        const { data, error } = await supabase
          .from('pharmacy_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) throw error;
        
        setPharmacyProfile(data);
      } catch (err) {
        console.error('Error fetching pharmacy profile:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchPharmacyProfile();
  }, []);
  
  return { pharmacyProfile, loading, error };
};
