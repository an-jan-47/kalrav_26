import { supabase } from '../lib/supabase';
import { CacheService } from '../utils/cache';

export interface LegacyEvent {
  id: number;
  image_link: string;
  created_at: string;
}

export interface Review {
  id: number;
  image_link: string;
  created_at: string;
  
}

export const fetchHomeData = async () => {
  return CacheService.get('home_data', async () => {
    const [reviewsRes, legaciesRes] = await Promise.all([
      supabase
        .from('reviews')
        .select('id, image_link, created_at')
        .order('created_at', { ascending: false }),
      supabase
        .from('past_legacies')
        .select('id, image_link, created_at')
        .order('created_at', { ascending: false })
    ]);

    if (reviewsRes.error) console.error('Error fetching reviews:', reviewsRes.error);
    if (legaciesRes.error) console.error('Error fetching legacies:', legaciesRes.error);

    return {
      reviews: reviewsRes.data || [],
      legacies: legaciesRes.data || []
    };
  });
};
