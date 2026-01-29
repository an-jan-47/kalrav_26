import { supabase } from '../lib/supabase';

export interface TeamMember {
  id: number;
  image_url: string;
  instagram_url: string;
  category: 'council' | 'team';
  team_member?: string;
}

export const fetchTeamData = async () => {
  const { data, error } = await supabase
    .from('teams')
    .select('id,image_url, instagram_url, category')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching team data:', error);
    return { council: [], team: [] };
  }

  const members = (data || []) as TeamMember[];
  
  return {
    council: members.filter(m => m.category?.toLowerCase().trim() === 'council'),
    team: members.filter(m => m.category?.toLowerCase().trim() === 'team')
  };
};

export const fetchTeamMemberDetails = async (id: number) => {
  const { data, error } = await supabase
    .from('teams')
    .select('team_member')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching member details:', error);
    return null;
  }

  return data?.team_member || '';
};
