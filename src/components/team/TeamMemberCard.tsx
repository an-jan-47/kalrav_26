import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Loader2 } from 'lucide-react';
import { fetchTeamMemberDetails, type TeamMember } from '../../services/team';
import { LazyImage } from '../ui/LazyImage';

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard = memo(({ member, index }: TeamMemberCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [memberDetails, setMemberDetails] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const isTeam = member.category?.toLowerCase() === 'team';

  const handleFlip = async () => {
    if (!isTeam) return;

    setIsFlipped(prev => !prev);

    if (!isFlipped && !memberDetails && !isLoading) {
      setIsLoading(true);
      setHasError(false);
      
      try {
        const details = await fetchTeamMemberDetails(member.id);
        setMemberDetails(details || null);
      } catch (error) {
        console.error("Failed to load details", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div 
      className={`group relative perspective-1000 w-full aspect-[3/4] ${isTeam ? 'cursor-pointer' : ''}`}
      onClick={handleFlip}
      role={isTeam ? "button" : "article"}
      aria-label={`${member.name} - ${member.position}`}
      aria-expanded={isFlipped}
      tabIndex={isTeam ? 0 : -1}
      onKeyDown={(e) => {
        if (isTeam && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleFlip();
        }
      }}
    >
      <motion.div 
        className="w-full h-full relative preserve-3d transition-all duration-700 ease-out will-change-transform"
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          rotateY: isFlipped ? 180 : 0 
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: Math.min(index * 0.05, 0.3) }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:border-orange-500/30">
           
           {/* Image Container */}
           <div className="absolute inset-0 z-0">
              <LazyImage 
                  src={member.image_url} 
                  alt={member.name || member.category} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] bg-transparent"
                  decoding="async"
              />
           </div>
           
           {/* Top Right - Instagram Icon */}
           {member.instagram_url && (
             <a 
                href={member.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-30 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-orange-600 rounded-full transition-colors backdrop-blur-sm"
                aria-label="Instagram"
             >
                <Instagram className="w-4 h-4" />
             </a>
           )}
        </div>

        {/* Back Side (Team Members Only) */}
        {isTeam && (
            <div 
                className="absolute inset-0 w-full h-full bg-neutral-900 border border-white/10 rounded-xl backface-hidden rotate-y-180 flex flex-col p-4 shadow-xl overflow-hidden"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                aria-hidden={!isFlipped}
            >
                <div className="relative z-10 flex flex-col h-full items-center text-center w-full">
                    <h3 className="text-lg font-bold text-white mb-2 tracking-widest uppercase">THE TEAM</h3>
                    <div className="w-12 h-0.5 bg-orange-500 mb-3" />
                    
                    <div className="w-full flex-1 overflow-hidden relative">
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                            </div>
                        ) : hasError ? (
                           <div className="h-full flex flex-col items-center justify-center space-y-2">
                                <p className="text-red-400 text-xs">Failed load</p>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFlip(); 
                                        setTimeout(() => handleFlip(), 100);
                                    }} 
                                    className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs text-white"
                                >
                                    Retry
                                </button>
                           </div>
                        ) : memberDetails ? (
                            <div className="h-full overflow-y-auto custom-scrollbar pr-1 w-full text-left">
                                <ul className="space-y-1">
                                {memberDetails.split(',').map((name, idx) => (
                                    <li 
                                        key={idx}
                                        className="text-gray-300 text-sm py-1 border-b border-white/5 last:border-0"
                                    >
                                        {name.trim()}
                                    </li>
                                ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-white/30 text-xs italic">No members</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
      </motion.div>
    </div>
  );
});

export default TeamMemberCard;
