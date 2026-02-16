import { supabase } from '../lib/supabase';
import { CacheService } from '../utils/cache';

export interface GalleryImage {
  id: number;
  image_link: string;
  created_at: string;
}

export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  return CacheService.get('gallery_images', async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('id, image_link, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery images:', error);
        return [];
      }

      // Filter out items with no image link
      return (data || []).filter((item: GalleryImage) => item.image_link && item.image_link.trim() !== '');
    } catch (err) {
      console.error('Unexpected error in fetchGalleryImages:', err);
      return [];
    }
  });
};
