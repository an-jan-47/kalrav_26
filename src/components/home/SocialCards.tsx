import { useRef, useState, useEffect } from 'react';
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
  size?: 'medium' | 'large';
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

export const SocialCards = ({ cards, className, size = 'medium' }: SocialCardsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const container = scrollRef.current;
      
      let closestIndex = 0;
      let minDistance = Infinity;

      // Find the card closest to the center of the viewport
      Array.from(container.children).forEach((child, index) => {
          const div = child as HTMLElement;
          const childCenter = div.offsetLeft + div.offsetWidth / 2;
          // Adjust for container scroll position logic if needed, but offsetLeft is relative to offsetParent (which is scrollRef)
          // Wait, offsetLeft is relative to the scroll container's content, so checking against scrollLeft + clientWidth/2 is correct.
          // However, child.offsetLeft is static. We need to compare it to scrollLeft + half viewport.
          
          const distance = Math.abs(childCenter - (container.scrollLeft + container.clientWidth / 2));
           if (distance < minDistance) {
               minDistance = distance;
               closestIndex = index;
           }
      });
      
      if (activeIndex !== closestIndex) {
          setActiveIndex(closestIndex);
      }
    };

    const container = scrollRef.current;
    if (container) {
        container.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();
    }
    
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [activeIndex]); // Re-attach if needed, or just [] if stable. But activeIndex dependency isn't needed for the logic itself except for optimization? Actually handleScroll closes over nothing for calculation except container.

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const child = container.children[index] as HTMLElement;
    
    if (child) {
        // Center the card
        const scrollLeft = child.offsetLeft - (container.clientWidth / 2) + (child.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  const handleCardClick = (card: SocialCardProps) => {
    if (card.platform === 'merch') {
      navigate(card.url);
    } else {
      window.open(card.url, '_blank', 'noopener,noreferrer');
    }
  };

  const dimensions = {
      medium: "w-52 h-[130px] md:w-56 md:h-[140px]",
      large: "w-[312px] h-[195px] md:w-[336px] md:h-[210px]"
  };

  const imageSize = {
      medium: { width: 224, height: 140 },
      large: { width: 336, height: 210 }
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
            <div className={cn(
              "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:border-orange-500/50 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] group-hover:-translate-y-1 grayscale-[20%] group-hover:grayscale-0",
              dimensions[size]
            )}>
                {/* Background Image */}
               <LazyImage 
                    src={card.thumbnail} 
                    alt={card.label || card.platform} 
                    width={imageSize[size].width} 
                    height={imageSize[size].height}
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

       {/* Dot Indicators */}
      <div className="w-full flex gap-2 justify-center mt-4 md:hidden">
            {cards.map((_, index) => (
                <button
                    key={index}
                    onClick={() => scrollToCard(index)}
                    className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        activeIndex === index 
                            ? "bg-orange-500 w-6" 
                            : "bg-white/20 w-1.5 hover:bg-white/40"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
      </div>
    </div>
  );
};

