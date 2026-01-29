import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Loader2 } from 'lucide-react';
import { fetchTeamMemberDetails, type TeamMember } from '../../services/team';
import { LazyImage } from '../ui/LazyImage';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [memberDetails, setMemberDetails] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const isTeam = member.category === 'team';

  const handleFlip = async () => {
    if (!isTeam) return;

    if (!isFlipped && !memberDetails && !isLoading) {
      setIsLoading(true);
      // Flip immediately for better UX
      setIsFlipped(true); 
      
      try {
        const details = await fetchTeamMemberDetails(member.id);
        setMemberDetails(details);
      } catch (error) {
        console.error("Failed to load details", error);
      } finally {
        setIsLoading(false);
      }
    } else {
        setIsFlipped(!isFlipped);
    }
  };

  return (
    <div 
      className={`group relative perspective-1000 h-full ${isTeam ? 'cursor-pointer' : ''}`}
      onClick={handleFlip}
    >
      <motion.div 
        className="w-full h-full relative preserve-3d transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div className="aspect-[3/4] w-full relative overflow-hidden rounded-xl backface-hidden shadow-lg border border-white/10 bg-gray-900">
           {/* Image */}
           <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-103">
              <LazyImage 
                  src={member.image_url} 
                  alt={member.category} 
                  className="w-full h-full object-cover bg-transparent"
              />
           </div>
           
           {member.instagram_url && (
               <a 
                 href={member.instagram_url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="absolute bottom-3 right-3 md:bottom-3 md:right-4 z-20"
                 onClick={(e) => e.stopPropagation()}
               >
                  <div className="text-white/60 hover:text-orange-400 transition-colors duration-300 p-2 md:p-2.5 rounded-full bg-black/40 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] backdrop-blur-sm">
                      <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
               </a>
           )}
        </div>

        {/* Back Face */}
        {isTeam && (
            <div 
                className="absolute inset-0 w-full h-full bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/20 backface-hidden rotate-y-180 flex flex-col justify-center items-center p-3 md:p-6 text-center shadow-[0_0_30px_rgba(234,88,12,0.15)]"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                <h3 className="text-orange-400 font-kalrav text-lg md:text-2xl tracking-widest mb-2 md:mb-4">TEAM MEMBERS</h3>
                <div className="w-8 md:w-12 h-0.5 bg-orange-500/50 mb-3 md:mb-6 rounded-full"></div>
                
                <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden">
                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center text-orange-400">
                            <Loader2 className="w-6 h-6 animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-1 md:space-y-2 overflow-y-auto max-h-[85%] custom-scrollbar w-full px-1 md:px-2">
                             {memberDetails ? (
                                memberDetails.split(',').map((name, index) => (
                                    <p key={index} className="text-white/80 font-medium tracking-wide text-xs md:text-lg border-b border-white/5 py-1 last:border-0 hover:text-white transition-colors">
                                        {name.trim()}
                                    </p>
                                ))
                             ) : (
                                <p className="text-white/50 italic text-xs md:text-base mt-4">No members listed</p>
                             )}
                        </div>
                    )}
                </div>
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default TeamMemberCard;
