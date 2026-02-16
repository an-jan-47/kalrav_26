import type { Competition } from '../../services/competitions';
import { CompetitionCard } from './CompetitionCard';

interface CompetitionGridProps {
  competitions: Competition[];
  isLoading: boolean;
}

export const CompetitionGrid = ({ competitions, isLoading }: CompetitionGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="aspect-[3/4] rounded-xl bg-white/5 animate-pulse border border-white/5" 
          />
        ))}
      </div>
    );
  }

  if (competitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white/50">
        <p className="text-xl">No competitions found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center">
      {competitions.map((comp, index) => (
        <CompetitionCard key={comp.id} competition={comp} index={index} />
      ))}
    </div>
  );
};
