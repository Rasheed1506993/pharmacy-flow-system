
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';
import { usePharmacyProfile } from './usePharmacyProfile';

// Fetch products data
export const fetchProducts = async (pharmacyId: string | undefined) => {
  if (!pharmacyId) {
    throw new Error('Pharmacy ID is required');
  }
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('pharmacy_id', pharmacyId);
    
  if (error) throw error;
  
  return data || [];
};

// Hook for retrieving products
export const useProducts = () => {
  const { pharmacyProfile, loading: profileLoading } = usePharmacyProfile();
  const pharmacyId = pharmacyProfile?.id;
  
  const query = useQuery({
    queryKey: ['products', pharmacyId],
    queryFn: () => fetchProducts(pharmacyId),
    enabled: !!pharmacyId && !profileLoading,
    staleTime: 5 * 60 * 1000, // 5 minutes
    meta: {
      errorHandler: (error: any) => {
        console.error('Error fetching products:', error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء جلب بيانات المنتجات. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
      }
    }
  });

  const { data: products, isLoading, isError, error, refetch } = query;

  return {
    products: products || [],
    isLoading: isLoading || profileLoading,
    isError,
    error,
    refetch,
    pharmacyId
  };
};

// Add a product
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { pharmacyProfile } = usePharmacyProfile();
  
  return useMutation({
    mutationFn: async (productData: Omit<Tables<'products'>, 'id' | 'created_at' | 'updated_at'>) => {
      if (!pharmacyProfile?.id) {
        throw new Error('Pharmacy ID is required');
      }
      
      const newProduct = {
        ...productData,
        pharmacy_id: pharmacyProfile.id
      };
      
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "تمت الإضافة بنجاح",
        description: "تمت إضافة المنتج بنجاح",
      });
    },
    onError: (error) => {
      console.error('Error adding product:', error);
      toast({
        title: "خطأ في الإضافة",
        description: "حدث خطأ أثناء إضافة المنتج. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  });
};

// Update a product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Tables<'products'>> }) => {
      const { data: updatedProduct, error } = await supabase
        .from('products')
        .update(data)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return updatedProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث المنتج بنجاح",
      });
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث المنتج. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  });
};

// Delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف المنتج بنجاح",
      });
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف المنتج. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  });
};
