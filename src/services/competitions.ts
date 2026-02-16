import { supabase } from '../lib/supabase';
import { CacheService } from '../utils/cache';

export interface Competition {
  id: number;
  category: string;
  poster_path: string;
  redirect_url: string;
}

export const fetchCompetitions = async (): Promise<Competition[]> => {
  // Use a shorter cache time (1 minute) for competitions to allow easier updates
  return CacheService.get('competitions_v1', async () => {
    const { data, error } = await supabase
      .from('competitions')
      .select('id,category, poster_path, redirect_url')
      .order('id', { ascending: true }); // Ensure consistent ordering

    if (error) {
      console.error('Error fetching competitions:', error);
      return [];
    }

    return data || [];
  }, 60 * 1000); // 1 minute TTL
};
