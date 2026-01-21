import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { LazyImage } from '../components/ui/LazyImage';

const competitions = [
  { id: 1, title: '', image: 'https://placehold.co/600x800/1a1a1a/FFF?text=', link: '#' },
  { id: 2, title: '', image: 'https://placehold.co/600x800/1a1a1a/FFF?text=', link: '#' },
  { id: 3, title: '', image: 'https://placehold.co/600x800/1a1a1a/FFF?text=', link: '#' },
  { id: 4, title: '', image: 'https://placehold.co/600x800/1a1a1a/FFF?text=', link: '#' },
  { id: 5, title: '', image: 'https://placehold.co/600x800/1a1a1a/FFF?text=', link: '#' },
  { id: 6, title: '', image: 'https://placehold.co/600x800/1a1a1a/FFF?text=', link: '#' },
];

const Competitions = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex justify-between items-end mb-12 border-b border-white/10 pb-4"
        >
             <h1 className="text-5xl md:text-6xl font-kalrav tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                COMPETITIONS
             </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions.map((comp, index) => (
            <motion.a
              key={comp.id}
              href={comp.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-kalrav-purple/50 transition-colors"
            >
              <LazyImage 
                src={comp.image} 
                alt={comp.title} 
                className="w-full h-full transition-transform duration-500 group-hover:scale-110" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl font-kalrav text-white mb-2">{comp.title}</h3>
                <div className="flex items-center text-kalrav-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info size={16} className="mr-2" />
                    <span>Click to Register</span>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Info size={24} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Competitions;
