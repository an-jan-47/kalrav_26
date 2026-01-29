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

  // Filter competitions
  const filteredCompetitions = useMemo(() => {
    if (activeCategory === 'All') return competitions;
    return competitions.filter(c => (c.category || 'Uncategorized') === activeCategory);
  }, [competitions, activeCategory]);

  return (
    <Layout>
      <PageBackground src={CompetitionBg} parallax={true} opacity={0.6}/>
      
      <div className="container mx-auto px-6 py-20 min-h-screen">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-12"
        >
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-kalrav tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-6 text-center md:text-left">
                COMPETITIONS
             </h1>
             
        </motion.div>

        {!isLoading && competitions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FilterBar 
                categories={categories} 
                activeCategory={activeCategory} 
                onSelect={setActiveCategory} 
            />
          </motion.div>
        )}

        <CompetitionGrid 
            competitions={filteredCompetitions} 
            isLoading={isLoading} 
        />
      </div>
    </Layout>
  );
};

export default Competitions;
