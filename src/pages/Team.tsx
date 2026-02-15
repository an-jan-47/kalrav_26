import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { fetchTeamData, groupMembersByHierarchy, type TeamMember } from '../services/team';
import TeamSection from '../components/team/TeamSection';
import { PageBackground } from '../components/ui/PageBackground';
import TeamBg from '../assets/bg/team.webp';
import { Loader2 } from 'lucide-react';

const Team = () => {
   const [council, setCouncil] = useState<TeamMember[]>([]);
   const [team, setTeam] = useState<TeamMember[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   useEffect(() => {
     let mounted = true;

     const loadData = async () => {
       try {
         const { council, team } = await fetchTeamData();
         
         if (mounted) {
             setCouncil(council);
             setTeam(team);
         }
       } catch (err) {
         console.error("Failed to load team data", err);
         if (mounted) {
             setError("Failed to load team data. Please try again later.");
         }
       } finally {
         if (mounted) {
             setLoading(false);
         }
       }
     };

     loadData();
     
     return () => { mounted = false; };
   }, []);
   
   const { grouped: groupedCouncil, sortedKeys } = groupMembersByHierarchy(council);
   
   // Calculate running index for staggered animation continuity
   let runningIndex = 0;

   return (
     <Layout>
       <PageBackground src={TeamBg} parallax={true} opacity={0.7} />
       <div className="min-h-screen pt-24 pb-20 bg-black text-white"> 
           
         <div className="container mx-auto px-4">
             {loading ? (
                 <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
                     <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
                     <p className="text-gray-400 animate-pulse">Summoning the Council..</p>
                 </div>
             ) : error ? (
                 <div className="flex justify-center items-center min-h-[50vh]">
                     <div className="text-red-400 bg-red-900/10 border border-red-500/20 p-6 rounded-lg backdrop-blur-md">
                         <p>{error}</p>
                     </div>
                 </div>
             ) : (
                 <>
                     {/* Council Sections */}
                     <div className="mb-24">
                        <h2 className="text-3xl md:text-5xl font-kalrav text-center text-white mb-16 tracking-widest drop-shadow-[0_0_25px_rgba(249,115,22,0.6)]">
                            OUR CULTURAL COUNCIL
                        </h2>
                        
                        {sortedKeys.map((key) => {
                            const group = groupedCouncil[key];
                            if (!group || group.length === 0) return null;

                            
                            const startIndex = runningIndex;
                            // Update running index for next group
                            runningIndex += group.length;

                            return (
                                <TeamSection 
                                    key={key} 
                                    title="" // Title specific groups if needed, or keep unified under main header
                                    members={group} 
                                    startIndex={startIndex}
                                    className="mb-8 last:mb-0"
                                />
                            );
                        })}
                     </div>

                     {/* Team Heads Section */}
                     <TeamSection 
                        title="Team Heads" 
                        members={team} 
                        startIndex={runningIndex} // Continue animation sequence
                     />
                 </>
             )}
         </div>
       </div>
     </Layout>
   );
 };

export default Team;
