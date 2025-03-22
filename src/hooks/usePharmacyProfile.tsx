
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';

export const fetchPharmacyProfile = async () => {
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
  
  return data;
};

export const usePharmacyProfile = () => {
  const query = useQuery({
    queryKey: ['pharmacyProfile'],
    queryFn: fetchPharmacyProfile,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    onError: (error) => {
      console.error('Error fetching pharmacy profile:', error);
      toast({
        title: "خطأ في تحميل بيانات الصيدلية",
        description: "لم نتمكن من تحميل بيانات الصيدلية. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  });

  const { data: pharmacyProfile, isLoading, isError, error, refetch } = query;

  return { 
    pharmacyProfile, 
    loading: isLoading, 
    error, 
    isError,
    refetch 
  };
};
