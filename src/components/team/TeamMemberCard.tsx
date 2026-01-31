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
        whileHover={{ y: -10, scale: 1.02 }}
        viewport={{ once: true }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full h-full relative overflow-hidden rounded-xl backface-hidden bg-white/5 backdrop-blur-md border border-white/10 flex flex-col shadow-xl">
           <div className="h-[75%] w-full relative overflow-hidden bg-black/20">
              <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                <LazyImage 
                    src={member.image_url} 
                    alt={member.category} 
                    className="w-full h-full object-cover"
                />
              </div>
              
              {member.instagram_url && (
                <a 
                  href={member.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                   <div className="text-white/80 hover:text-orange-400 transition-colors duration-300 p-2 rounded-full bg-black/40 border border-white/10 hover:bg-black/60 backdrop-blur-sm">
                       <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                   </div>
                </a>
               )}
           </div>

           <div className="h-[25%] w-full flex flex-col items-center justify-center p-2 text-center bg-white/5 border-t border-white/5">
                {member.name && (
                   <h3 className="text-white font-kalrav text-lg md:text-xl tracking-wider leading-tight mb-1">
                       {member.name}
                   </h3>
               )}
               {member.position && (
                   <div className="text-orange-300 font-mono text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-90">
                       {member.position}
                   </div>
               )}
           </div>
        </div>

        {isTeam && (
            <div 
                className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-md rounded-xl border border-white/10 backface-hidden rotate-y-180 flex flex-col justify-center items-center p-3 md:p-6 text-center shadow-[0_0_30px_rgba(234,88,12,0.1)]"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                <h3 className="text-orange-400 font-kalrav text-base md:text-xl tracking-widest mb-2">TEAM MEMBERS</h3>
                <div className="w-8 md:w-12 h-0.5 bg-orange-500/50 mb-2 md:mb-4 rounded-full"></div>
                
                <div className="w-full h-full flex flex-col items-center justify-start overflow-hidden">
                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center text-orange-400">
                            <Loader2 className="w-5 h-5 animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-1 overflow-y-auto max-h-[85%] custom-scrollbar w-full px-1">
                             {memberDetails ? (
                                memberDetails.split(',').map((name, index) => (
                                    <p key={index} className="text-white/80 font-medium tracking-wide text-[10px] md:text-sm border-b border-white/5 py-1 last:border-0 hover:text-white transition-colors">
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
