import { MasonryGrid } from '../ui/MasonryGrid';
import { MasonryImage } from '../ui/MasonryImage';
import { motion } from 'framer-motion';
import type { GalleryImage } from '../../services/gallery';

interface GalleryDaySectionProps {
  title: string;
  images: GalleryImage[];
}

export const GalleryDaySection = ({ title, images }: GalleryDaySectionProps) => {
  if (images.length === 0) return null;

  return (
    <section className="w-full max-w-[1600px] mx-auto mb-20 px-4 md:px-12">
      <div className="text-left mb-8">
        <h2 className="text-2xl md:text-3xl font-kalrav text-white/90 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] tracking-wider uppercase">
          {title}
        </h2>
      </div>

      <MasonryGrid>
        {images.map((img, index) => (
            <motion.div 
            key={img.id} 
            className="break-inside-avoid mb-6 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
            >
            <MasonryImage 
                src={img.image_link} 
                alt={`Day ${title} - Image ${img.id}`} 
                className="w-full h-auto transition-all duration-500 ease-out group-hover:scale-[1.02]"
            />
            </motion.div>
        ))}
      </MasonryGrid>
    </section>
  );
};
