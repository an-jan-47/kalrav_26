import { supabase } from '../lib/supabase';

export interface LegacyEvent {
  id: number;
  image_link: string;
  created_at: string;
}

export interface Review {
  id: number;
  image_link: string;
  created_at: string;
  // If we had text/name columns, we'd add them here. 
  // For now, based on instructions "fetch images... and use them as background", 
  // we might mock the text or if the table HAS text, use it.
  // The user prompt said: "fetch images from the reviews table... and use them as the background".
  // It implies the reviews table might JUST be images, or images are the focus.
}

export const fetchHomeData = async () => {
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
};
