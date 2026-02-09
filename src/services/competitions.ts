import { supabase } from '../lib/supabase';
import { CacheService } from '../utils/cache';

export interface Competition {
  id: number;
  category: string;
  poster_path: string;
  redirect_url: string;
}

export const fetchCompetitions = async (): Promise<Competition[]> => {
  return CacheService.get('competitions_data', async () => {
    const { data, error } = await supabase
      .from('competitions')
      .select('id,category, poster_path, redirect_url');

    if (error) {
      console.error('Error fetching competitions:', error);
      return [];
    }

    return data || [];
  });
};
