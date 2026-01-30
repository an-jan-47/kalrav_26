import { supabase } from '../lib/supabase';

export interface MerchProduct {
  id: number;
  created_at: string;
  image_link: string;
  name: string;
  description: string;
  is_active: boolean;
  order_index: number;
  price: number; 
}

export const fetchMerchProducts = async () => {
  const { data, error } = await supabase
    .from('merch_products')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching merch products:', error);
    return [];
  }

  return (data || []) as MerchProduct[];
};
