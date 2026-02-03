import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Loader2 } from 'lucide-react';
import { fetchTeamMemberDetails, type TeamMember } from '../../services/team';
import { LazyImage } from '../ui/LazyImage';
import cardBg from '../../assets/team/card.webp';

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
        <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-xl shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]">
           
           {/* Card Background Frame - Layer 0 (Bottom) */}
           <img 
              src={cardBg} 
              alt="Card Frame" 
              className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none"
              loading="eager"
              decoding="sync"
           />

           {/* Image Container - Layer 10 (Middle) */}
           {/* Adjusted to fit the window of the frame, assuming the white bar is bottom ~20% */}
           <div className="absolute top-[6%] left-[6%] right-[6%] bottom-[18%] z-10 rounded-t-lg overflow-hidden">
              <LazyImage 
                  src={member.image_url} 
                  alt={member.name || member.category} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-transparent"
                  decoding="async"
              />
           </div>

           {/* Text Container - Layer 20 (Top) */}
           {/* Positioned explicitly in the white bottom area */}
           <div className="absolute bottom-0 left-0 right-0 h-[20%] z-20 flex flex-col items-center justify-center text-center px-1 pb-0.1">
              <h3 className="font-sans text-black text-[clamp(0.8rem,3.5vw,1.4rem)] md:text-[1.6rem] tracking-normal uppercase font-extrabold mb-0.5 leading-none w-full truncate">
                {member.name}
              </h3>
              <p className="font-sans text-black/70 text-[0.55rem] md:text-[0.7rem] font-bold uppercase tracking-widest leading-tight w-full truncate px-2">
                 {member.position}
              </p>
           </div>
           
           {/* Instagram Icon - Layer 30 (Topmost) */}
           {member.instagram_url && (
             <a 
                href={member.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-[8%] right-[8%] z-30 p-2 text-white/90 hover:text-orange-400 transition-colors drop-shadow-md bg-black/20 rounded-full backdrop-blur-sm"
                aria-label="Instagram"
             >
                <Instagram className="w-4 h-4" />
             </a>
           )}
        </div>

        {/* Back Side (Team Members Only) */}
        {isTeam && (
            <div 
                className="absolute inset-0 w-full h-full bg-black/95 border border-white/10 rounded-xl backface-hidden rotate-y-180 flex flex-col p-5 shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                aria-hidden={!isFlipped}
            >
                {/* Decorative gradients - Reduced opacity for minimal look */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/10 rounded-full blur-[40px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-600/10 rounded-full blur-[40px] pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full items-center text-center">
                    <h3 className="text-lg md:text-xl font-sans font-bold text-white mb-2 tracking-widest uppercase opacity-90">THE TEAM</h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4" />
                    
                    <div className="w-full flex-1 overflow-hidden relative">
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                            </div>
                        ) : hasError ? (
                           <div className="h-full flex flex-col items-center justify-center space-y-3">
                                <p className="text-red-300 text-xs font-sans">Failed to load</p>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFlip(); 
                                        setTimeout(() => handleFlip(), 100);
                                    }} 
                                    className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] text-white transition-colors border border-white/10 font-sans"
                                >
                                    Retry
                                </button>
                           </div>
                        ) : memberDetails ? (
                            <div className="h-full overflow-y-auto custom-scrollbar pr-1 space-y-1">
                                {memberDetails.split(',').map((name, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="py-1 border-b border-white/5 last:border-0"
                                    >
                                        <p className="text-gray-300 font-sans text-xs md:text-sm tracking-wide hover:text-white transition-colors">
                                            {name.trim()}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-white/30 text-xs italic font-sans">No additional members</p>
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
