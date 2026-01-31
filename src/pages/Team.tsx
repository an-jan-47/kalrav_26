import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { fetchTeamData, type TeamMember } from '../services/team';
import TeamMemberCard from '../components/team/TeamMemberCard';
import { motion } from 'framer-motion';
import { PageBackground } from '../components/ui/PageBackground';
import TeamBg from '../assets/bg/team.webp';

const CouncilSection = ({ members }: { members: TeamMember[] }) => {
    if (members.length === 0) return null;

    // Defined hierarchy order
    const hierarchy = ['mentor', 'convenor', 'cultural_sec', 'oc_head', 'creative_dir', 'oc_committee'];
    
    // Group members by position (handling variants like oc_commmitee)
    const groupedMembers: Record<string, TeamMember[]> = {};
    
    // Initialize groups
    hierarchy.forEach(key => groupedMembers[key] = []);
    
    members.forEach(member => {
        let pos = member.position ? member.position.toLowerCase() : 'other';
        // Normalize typos/variants
        if (pos === 'oc_commmitee') pos = 'oc_committee';
        
        if (hierarchy.includes(pos)) {
            groupedMembers[pos].push(member);
        } else {
             // Fallback for unexpected positions, maybe put them at the end or ignore? 
             // Ideally we shouldn't have 'other' in Council based on user request, but for safety:
            if (!groupedMembers['other']) groupedMembers['other'] = [];
            groupedMembers['other'].push(member);
            if (!hierarchy.includes('other')) hierarchy.push('other');
        }
    });

    return (
        <div className="mb-20">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-kalrav text-center text-white mb-12 tracking-widest drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            >
                OUR CULTURAL COUNCIL
            </motion.h2>
            
            <div className="flex flex-col gap-12 max-w-7xl mx-auto px-4">
                {hierarchy.map((key) => {
                    const group = groupedMembers[key];
                    if (!group || group.length === 0) return null;

                    return (
                        <div key={key} className="flex flex-wrap justify-center gap-4 md:gap-5 w-full">
                            {group.map((member) => (
                                <div key={member.id} className="w-[45%] md:w-[20%] lg:w-[15%]">
                                    <TeamMemberCard member={member} />
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const GenericTeamSection = ({ title, members }: { title: string, members: TeamMember[] }) => {
    if (members.length === 0) return null;
    
    return (
        <div className="mb-20">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-kalrav text-center text-white mb-12 tracking-widest drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            >
                {title.toUpperCase()}
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto px-4">
                {members.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
};

const Team = () => {
   
   const [council, setCouncil] = useState<TeamMember[]>([]);
   const [team, setTeam] = useState<TeamMember[]>([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     const loadData = async () => {
       try {
         const { council, team } = await fetchTeamData();
         // Basic sort can stay, grouping handles the rest
         setCouncil(council);
         setTeam(team);
       } catch (error) {
         console.error("Failed to load team data", error);
       } finally {
         setLoading(false);
       }
     };
     loadData();
   }, []);
 
   return (
     <Layout>
       <PageBackground src={TeamBg} parallax={true} opacity={0.6} />
       <div className="min-h-screen pt-24 pb-20 bg-black"> 
           
         <div className="container mx-auto px-4">
             {loading ? (
                 <div className="flex justify-center items-center min-h-[40vh]">
                     <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
                 </div>
             ) : (
                 <>
                     <CouncilSection members={council} />
                     <GenericTeamSection title="Team Heads" members={team} />
                 </>
             )}
         </div>
       </div>
     </Layout>
   );
 };

export default Team;
