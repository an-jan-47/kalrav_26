import { supabase } from '../lib/supabase';
import { CacheService } from '../utils/cache';

export interface MerchProduct {
  id: number;
  created_at: string;
  images: string[]; // Changed from image_link: string
  name: string;
  description: string;
  is_active: boolean;
  order_index: number;
  price: number;
}

export const fetchMerchProducts = async () => {
  return CacheService.get('merch_products', async () => {
    const { data, error } = await supabase
      .from('merch_products')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching merch products:', error);
      return [];
    }

    // Parse comma-separated image links
    return (data || []).map((product: any) => ({
      ...product,
      images: product.image_link ? product.image_link.split(',').map((url: string) => url.trim()) : [],
      image_link: undefined, // internal cleanup
    })) as MerchProduct[];
  });
};
