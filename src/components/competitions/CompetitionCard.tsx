import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import type { Competition } from '../../services/competitions';
import { LazyImage } from '../ui/LazyImage';

interface CompetitionCardProps {
  competition: Competition;
  index: number;
}

export const CompetitionCard = ({ competition, index }: CompetitionCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
  });

  const handleClick = () => {
    if (competition.redirect_url) {
      window.open(competition.redirect_url);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-full aspect-[3/4] bg-neutral-900/50 rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-kalrav-orange/50 transition-all duration-300 shadow-lg hover:shadow-kalrav-orange/20"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {inView ? (
        <LazyImage
          src={competition.poster_path}
          alt={competition.category || 'Competition'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-neutral-900 animate-pulse" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 select-none">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">  
          <div className="flex items-center text-white/80 text-sm font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
            <span>Click to Register</span>
            <ExternalLink size={14} className="ml-2" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
