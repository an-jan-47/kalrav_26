import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { fetchTeamData, type TeamMember } from '../services/team';
import TeamMemberCard from '../components/team/TeamMemberCard';
import { motion } from 'framer-motion';
import { PageBackground } from '../components/ui/PageBackground';
import TeamBg from '../assets/bg/team.webp';

const TeamSection = ({ title, members }: { title: string, members: TeamMember[] }) => {
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
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
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
      <PageBackground src={TeamBg} parallax={true} opacity={0.4} />
      <div className="min-h-screen pt-24 pb-20 bg-black"> 
          
        <div className="container mx-auto px-4">
            {loading ? (
                <div className="flex justify-center items-center min-h-[40vh]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <>
                    <TeamSection title="Our Cultural Council" members={council} />
                    <TeamSection title="Team Heads" members={team} />
                </>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default Team;
