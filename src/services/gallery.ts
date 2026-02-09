import { supabase } from '../lib/supabase';
import { CacheService } from '../utils/cache';

export interface GalleryImage {
  id: number;
  image_link: string;
  created_at: string;
  day: string;
}

export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  return CacheService.get('gallery_images', async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('id, image_link, created_at, day')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gallery images:', error);
      return [];
    }

    return data || [];
  });
};
