import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, ShoppingBag, ExternalLink, Play } from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';
import { cn } from '../../utils/cn';
import { useNavigate } from 'react-router-dom';

export type SocialPlatform = 'youtube' | 'instagram' | 'merch';

export interface SocialCardProps {
  id: string;
  platform: SocialPlatform;
  url: string;
  thumbnail: string;
  label?: string;
  title?: string;
}

interface SocialCardsProps {
  cards: SocialCardProps[];
  className?: string;
}

const PlatformIcon = ({ platform }: { platform: SocialPlatform }) => {
  switch (platform) {
    case 'youtube':
      return <Youtube className="text-red-500" size={20} />;
    case 'instagram':
      return <Instagram className="text-white-500" size={20} />;
    case 'merch':
      return <ShoppingBag className="text-white-500" size={20} />;
    default:
      return <ExternalLink size={20} />;
  }
};

const CardOverlay = ({ platform }: { platform: SocialPlatform }) => {
    if (platform === 'youtube') {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="bg-red-600/90 rounded-full p-3 backdrop-blur-sm shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play fill="white" className="text-white ml-1" size={20} />
                </div>
            </div>
        );
    }
    return null;
}

export const SocialCards = ({ cards, className }: SocialCardsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleCardClick = (card: SocialCardProps) => {
    if (card.platform === 'merch') {
      navigate(card.url);
    } else {
      window.open(card.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={cn("w-full max-w-[90rem] px-4 py-2 flex flex-col items-center", className)}>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 pt-2 no-scrollbar px-4 md:px-6 w-fit max-w-full justify-start touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex-shrink-0 snap-center group relative cursor-pointer"
            onClick={() => handleCardClick(card)}
            role="link"
            tabIndex={0}
            aria-label={`${card.label || 'View'} on ${card.platform}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(card);
                }
            }}
          >
            {/* Glass Card Container */}
            <div className="
              relative overflow-hidden rounded-2xl 
              w-52 h-[130px] md:w-56 md:h-[140px]
              border border-white/10 bg-white/5 backdrop-blur-md 
              shadow-lg transition-all duration-300
              group-hover:border-orange-500/50 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]
              group-hover:-translate-y-1
              grayscale-[20%] group-hover:grayscale-0
            ">
                {/* Background Image */}
               <LazyImage 
                    src={card.thumbnail} 
                    alt={card.label || card.platform} 
                    width={224} 
                    height={140}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />

               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

               {/* Center Action Overlay (Play Button etc) */}
               <CardOverlay platform={card.platform} />

               {/* Content */}
               <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
                    <div className="flex flex-col">

                        {card.label && (
                             <span className="text-xs uppercase tracking-wider text-white font-medium truncate max-w-[100px] leading-tight shadow-black drop-shadow-md">
                                {card.label}
                            </span>
                        )}
                    </div>
                   
                    <div className="text-white/80 group-hover:text-white transition-colors">
                         <PlatformIcon platform={card.platform} />
                    </div>
               </div>

                {/* Hover Redirect Overlay */}
               <div className="absolute top-2 right-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-white text-xs font-medium">Visit</span>
                        <ExternalLink size={12} className="text-white" />
                    </div>
               </div>

                {/* Hover Glow Effect */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-orange-500/10 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
