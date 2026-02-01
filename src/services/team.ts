import { supabase } from '../lib/supabase';

export interface TeamMember {
  id: number;
  image_url: string;
  instagram_url: string;
  category: 'council' | 'team';
  team_member?: string;
  position?: string;
  name?: string;
}

// Configuration for hierarchy
export const HIERARCHY = [
    'mentor', 
    'cultural_secretary', 
    'convenor', 
    'creative_director', 
    'oc_team_head', 
    'oc_committee'
] as const;

type HierarchyPosition = typeof HIERARCHY[number] | 'other';

/**
 * Normalizes a raw position string into a standard key.
 */
const normalizePosition = (position?: string): HierarchyPosition => {
    if (!position) return 'other';
    const pos = position.toLowerCase().trim();
    
    if (pos === 'cultural secretary') return 'cultural_secretary';
    if (pos === 'creative director') return 'creative_director';
    if (pos === 'oc team lead' || pos === 'oc team head') return 'oc_team_head';
    if (pos.includes('committee')) return 'oc_committee';
    
    // Check if it matches any known hierarchy key directly
    if (HIERARCHY.includes(pos as any)) return pos as HierarchyPosition;
    
    return 'other';
};

/**
 * Organizes team members into sorted groups based on hierarchy.
 */
export const groupMembersByHierarchy = (members: TeamMember[]) => {
    const grouped: Record<string, TeamMember[]> = {};
    
    // Initialize standard keys
    HIERARCHY.forEach(key => grouped[key] = []);
    grouped['other'] = [];

    members.forEach(member => {
        const key = normalizePosition(member.position);
        if (!grouped[key]) grouped[key] = []; // Safety fallback
        grouped[key].push(member);
    });

    return {
        grouped,
        // Return sorted keys including 'other' if it has members
        sortedKeys: [...HIERARCHY, ...(grouped['other'].length > 0 ? ['other'] : [])]
    };
};

export const fetchTeamData = async () => {
  const { data, error } = await supabase
    .from('teams')
    .select('id, name, image_url, instagram_url, category, position')
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
