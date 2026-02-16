import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { PageBackground } from '../components/ui/PageBackground';
import { CompetitionGrid } from '../components/competitions/CompetitionGrid';
import { FilterBar } from '../components/competitions/FilterBar';
import { fetchCompetitions, type Competition } from '../services/competitions';
import CompetitionBg from '../assets/bg/competition.webp';

const Competitions = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let isMounted = true;

    const loadCompetitions = async () => {
      try {
        const data = await fetchCompetitions();
        if (isMounted) {
          setCompetitions(data);
        }
      } catch (error) {
        console.error('Failed to load competitions:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCompetitions();

    return () => {
      isMounted = false;
    };
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(competitions.map(c => c.category || 'Uncategorized')));
    return ['All', ...uniqueCategories].sort();
  }, [competitions]);

  // Group competitions by category
  const groupedCompetitions = useMemo(() => {
     if (activeCategory === 'All') {
         // Return all categories with their competitions
         const groups: Record<string, Competition[]> = {};
         competitions.forEach(comp => {
             const cat = comp.category || 'Uncategorized';
             if (!groups[cat]) groups[cat] = [];
             groups[cat].push(comp);
         });
         return groups;
     } else {
         // Return only the active category
         return {
             [activeCategory]: competitions.filter(c => (c.category || 'Uncategorized') === activeCategory)
         };
     }
  }, [competitions, activeCategory]);

  return (
    <Layout>
      <PageBackground src={CompetitionBg} parallax={true} opacity={0.6}/>
      
      <div className="relative z-10 pt-16 px-4 md:px-12 min-h-screen">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="w-full max-w-[1600px] mx-auto mb-4 px-4 md:px-12 flex flex-row justify-between items-center gap-4"
        >
             <div className="text-left">
                <h2 className="text-3xl md:text-5xl font-kalrav text-white/90 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] tracking-wider uppercase">
                    COMPETITIONS
                </h2>
             </div>

            {!isLoading && competitions.length > 0 && (
                <div className="flex-shrink-0 relative z-50">
                    <FilterBar 
                        categories={categories} 
                        activeCategory={activeCategory} 
                        onSelect={setActiveCategory} 
                    />
                </div>
            )}
        </motion.div>

        {isLoading ? (
             <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12">
                <CompetitionGrid competitions={[]} isLoading={true} />
             </div>
        ) : (
            <div className="space-y-12 w-full max-w-[1600px] mx-auto px-4 md:px-12">
                {Object.entries(groupedCompetitions).map(([category, comps]) => (
                    <motion.div 
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-kalrav text-white mb-8 border-b border-orange-500/50 pb-2 inline-block drop-shadow-md">
                            {category}
                        </h2>
                        <CompetitionGrid 
                            competitions={comps} 
                            isLoading={false} 
                        />
                    </motion.div>
                ))}

                {Object.keys(groupedCompetitions).length === 0 && (
                     <div className="flex flex-col items-center justify-center py-20 text-white/50">
                        <p className="text-xl">No competitions found.</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </Layout>
  );
};

export default Competitions;
