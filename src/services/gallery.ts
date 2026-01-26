import { supabase } from '../lib/supabase';

export interface GalleryImage {
  id: number;
  image_link: string;
  created_at: string;
}

export const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  const { data, error } = await supabase
    .from('gallery')
    .select('id, image_link, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }

  return data || [];
};
