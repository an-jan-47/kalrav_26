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
        <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-xl transition-[box-shadow,border-color,background-color] duration-500 group-hover:shadow-[0_0_50px_rgba(249,115,22,0.5)] group-hover:border-orange-500/50">
           
           {/* Aurora Gradients Background - warm subtle glow */}
           <div className="absolute -bottom-[30%] -right-[30%] w-[80%] h-[80%] bg-orange-600/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
           
           {/* Image Container */}
           <div className="absolute inset-0 z-0">
              <LazyImage 
                  src={member.image_url} 
                  alt={member.name || member.category} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-transparent"
                  decoding="async"
              />
              {/* Gradient Mask for Text Readability - Cleaner */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
           </div>

           {/* Content - Bottom Left */}
           <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-sans text-white text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wide uppercase leading-none mb-1 md:mb-2 drop-shadow-lg break-words w-full">
                {member.name}
              </h3>
              <p className="font-sans text-orange-400 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] leading-tight drop-shadow-md group-hover:text-orange-300 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all">
                 {member.position}
              </p>
           </div>
           
           {/* Top Right - Instagram Icon */}
           {member.instagram_url && (
             <a 
                href={member.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-30 p-2 text-white/90 hover:text-white bg-white/5 hover:bg-orange-500 transition-all duration-300 rounded-lg backdrop-blur-md border border-white/10 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] group/icon"
                aria-label="Instagram"
             >
                <Instagram className="w-4 h-4 group-hover/icon:scale-110 transition-transform" />
             </a>
           )}
        </div>

        {/* Back Side (Team Members Only) */}
        {isTeam && (
            <div 
                className="absolute inset-0 w-full h-full bg-[#0a0a0a] border border-white/10 rounded-2xl backface-hidden rotate-y-180 flex flex-col p-4 md:p-6 shadow-xl overflow-hidden"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                aria-hidden={!isFlipped}
            >
                {/* Back Aurora */}
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-orange-600/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full items-center text-center">
                    <h3 className="text-xl md:text-2xl font-kalrav text-white mb-3 tracking-widest uppercase opacity-90 drop-shadow-md">THE TEAM</h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-4 opacity-70" />
                    
                    <div className="w-full flex-1 overflow-hidden relative">
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
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
                                    className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-[10px] text-white transition-colors border border-white/10 font-sans tracking-wide"
                                >
                                    RETRY
                                </button>
                           </div>
                        ) : memberDetails ? (
                            <div className="h-full overflow-y-auto custom-scrollbar pr-2 space-y-2">
                                {memberDetails.split(',').map((name, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="py-2 border-b border-white/5 last:border-0 hover:bg-white/5 rounded px-2 transition-colors"
                                    >
                                        <p className="text-gray-300 font-sans text-sm md:text-base tracking-wide hover:text-orange-200 transition-colors">
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
