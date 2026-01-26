import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { PageBackground } from '../components/ui/PageBackground';
import { MasonryGrid } from '../components/ui/MasonryGrid';
import { MasonryImage } from '../components/ui/MasonryImage';
import { fetchGalleryImages, type GalleryImage } from '../services/gallery';
import HomeBg from '../assets/bg/gallery.webp';
import { motion } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchGalleryImages();
        setImages(data);
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <Layout noPadding={true}>
      <PageBackground src={HomeBg} parallax={true} opacity={0.4} />
      
      <div className="relative z-10 pt-32 px-4 md:px-12 min-h-screen">
        <div className="text-left mb-16 container mx-auto">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-kalrav text-white mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                GALLERY
            </h1>
        </div>

        <div className="w-full max-w-[1600px] mx-auto pb-20">
            {loading ? (
                 <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 p-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white/5 rounded-xl animate-pulse h-64 w-full break-inside-avoid" />
                    ))}
                 </div>
            ) : (
                <MasonryGrid>
                    {images.map((img, index) => (
                         <motion.div 
                            key={img.id} 
                            className="break-inside-avoid mb-6 group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                         >
                            <MasonryImage 
                                src={img.image_link} 
                                alt={`Gallery Image ${img.id}`} 
                                className="w-full h-auto transition-all duration-500 ease-out group-hover:scale-[1.02] shadow-lg hover:shadow-purple-500/20"
                            />
                         </motion.div>
                    ))}
                </MasonryGrid>
            )}

            {!loading && images.length === 0 && (
                <div className="text-center text-white/50 py-20">
                    <p>No images found in the gallery.</p>
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
