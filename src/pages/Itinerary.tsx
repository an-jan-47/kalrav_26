import { Layout } from '../components/Layout';
import { PageBackground } from '../components/ui/PageBackground';
import ItineraryBg from '../assets/bg/itenary.webp'
import day1Img from '../assets/itenary/day1.webp';
import day2Img from '../assets/itenary/day2.webp';
import day3Img from '../assets/itenary/day3.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from 'framer-motion';

const itineraryDays = [
  { id: 'day1', src: day1Img, alt: 'Day 1 Itinerary' },
  { id: 'day2', src: day2Img, alt: 'Day 2 Itinerary' },
  { id: 'day3', src: day3Img, alt: 'Day 3 Itinerary' },
];

const Itinerary = () => {
  return (
    <Layout>
      <PageBackground src={ItineraryBg} parallax={true} opacity={0.9} />
      <div className="relative z-10 min-h-screen flex flex-col items-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-kalrav text-white/90 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] tracking-wider uppercase mb-12 text-center"
        >
          ITINERARY
        </motion.h1>
        
        <div className="w-full flex flex-col gap-12 md:gap-20">
          {itineraryDays.map((day) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/5 bg-black/20 backdrop-blur-sm relative flex items-center justify-center p-2 md:p-4"
            >
              <LazyLoadImage
                src={day.src}
                alt={day.alt}
                effect="blur"
                className="w-full h-full object-contain drop-shadow-2xl"
                wrapperProps={{
                  style: { display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Itinerary;
