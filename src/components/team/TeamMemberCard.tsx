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
  
  const isTeam = member.category?.toLowerCase() === 'team'; // increased robustness

  const handleFlip = async () => {
    if (!isTeam) return;

    // Toggle flip state
    setIsFlipped(prev => !prev);

    // Fetch details only if flipping to back and data is missing
    if (!isFlipped && !memberDetails && !isLoading) {
      setIsLoading(true);
      setHasError(false);
      
      try {
        const details = await fetchTeamMemberDetails(member.id);
        if (details) {
            setMemberDetails(details);
        } else {
            setMemberDetails(null); // Explicit null for empty
        }
      } catch (error) {
        console.error("Failed to load details", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        className="w-full h-full relative preserve-3d transition-all duration-500"
        initial={{ opacity: 0, y: 30, rotateY: 0 }}
        whileInView={{ opacity: 1, y: 0, rotateY: isFlipped ? 180 : 0 }}
        viewport={{ once: true, margin: "-50px" }}
        animate={{ 
            rotateY: isFlipped ? 180 : 0
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 20,
            delay: Math.min(index * 0.05, 0.3) // Faster stagger for mobile feel
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div className="w-full h-full relative overflow-hidden rounded-xl backface-hidden bg-white/5 backdrop-blur-md border border-white/10 flex flex-col shadow-[0_4px_30px_rgba(0,0,0,0.1)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] group-hover:border-orange-500/30 transition-all duration-300">
           {/* Image Container */}
           <div className="h-[78%] w-full relative overflow-hidden rounded-t-xl">
              <div className="w-full h-full transform transition-transform duration-700 group-hover:scale-110">
                <LazyImage 
                    src={member.image_url} 
                    alt={member.name || member.category} 
                    className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

              {member.instagram_url && (
                <a 
                  href={member.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 z-30 opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
                  onClick={handleSocialClick}
                  aria-label={`Visit ${member.name}'s Instagram`}
                >
                   <div className="text-white hover:text-orange-400 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 transition-colors">
                       <Instagram className="w-4 h-4" />
                   </div>
                </a>
               )}
           </div>

           {/* Content Box - Glass Effect */}
           <div className="h-[22%] w-full flex flex-col items-center justify-center p-2 text-center bg-white/5 backdrop-blur-md border-t border-white/10 relative z-10 group-hover:bg-orange-900/20 transition-colors duration-300">
                {member.name && (
                   <h3 className="text-white font-kalrav text-lg md:text-xl tracking-wider leading-none mb-1 drop-shadow-lg break-words w-full px-2">
                       {member.name}
                   </h3>
               )}
               {member.position && (
                   <div className="text-orange-300 font-kalrav text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold break-words w-full px-2">
                       {member.position}
                   </div>
               )}
           </div>
        </div>

        {/* Back Side (Team Members Only) */}
        {isTeam && (
            <div 
                className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-xl rounded-xl border border-orange-500/20 backface-hidden rotate-y-180 flex flex-col justify-center items-center p-4 text-center shadow-[0_0_30px_rgba(249,115,22,0.2)] overflow-hidden"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                aria-hidden={!isFlipped}
            >
                {/* Background decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/20 rounded-full blur-[50px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-[50px] pointer-events-none" />

                <h3 className="text-orange-300 font-kalrav text-xl tracking-widest mb-1 relative z-10 drop-shadow-md">THE TEAM</h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-4 opacity-70"></div>
                
                <div className="w-full flex-1 flex flex-col items-center justify-start overflow-hidden relative z-10">
                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center text-orange-400">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="sr-only">Loading team members...</span>
                        </div>
                    ) : hasError ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-red-400 space-y-2">
                            <p className="text-xs">Failed to load</p>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFlip(); // Re-trigger flip to try again logic eventually, or better just reset
                                    setIsFlipped(true); // Keep flipped
                                    setIsLoading(true);
                                    // ideally would have a retry function
                                }} 
                                className="text-xs underline hover:text-white"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-1.5 overflow-y-auto max-h-full custom-scrollbar w-full px-2 py-1">
                             {memberDetails ? (
                                memberDetails.split(',').map((name, index) => (
                                    <div key={index} className="group/item flex items-center justify-center w-full">
                                        <p className="text-gray-200 font-kalrav-body text-sm hover:text-white transition-colors duration-200 tracking-wide text-center w-full border-b border-white/5 pb-1 last:border-0 shadow-sm">
                                            {name.trim()}
                                        </p>
                                    </div>
                                ))
                             ) : (
                                <p className="text-white/40 italic text-xs mt-4">No members listed</p>
                             )}
                        </div>
                    )}
                </div>
            </div>
        )}
      </motion.div>
    </div>
  );
});

export default TeamMemberCard;
