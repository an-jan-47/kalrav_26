import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { PageBackground } from '../components/ui/PageBackground';
import { VideoSection } from '../components/ui/VideoSection';
import { GalleryDaySection } from '../components/gallery/GalleryDaySection';
import { GallerySkeleton } from '../components/gallery/GallerySkeleton';
import { fetchGalleryImages, type GalleryImage } from '../services/gallery';
import HomeBg from '../assets/bg/gallery.webp';

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
      <PageBackground src={HomeBg} parallax={true} opacity={0.5} />
      
      <div className="relative z-10 pt-32 px-4 md:px-12 min-h-screen">
            {loading ? (
                <>
                    <GallerySkeleton />
                    <GallerySkeleton />
                </>
            ) : (
                <div className="flex flex-col w-full">
                   <GalleryDaySection 
                        title="Highlights" 
                        images={images.filter(img => !['1', '2', '3'].includes(img.day))} 
                    />
                    
                    {/* Aftermovie Section */}
                    <VideoSection 
                        title="AFTERMOVIE"
                        videoId="dQw4w9Q" 
                    />

                    {/* Day Sections */}
                    <GalleryDaySection title="Day 1" images={images.filter(img => img.day === '1')} />
                    <GalleryDaySection title="Day 2" images={images.filter(img => img.day === '2')} />
                    <GalleryDaySection title="Day 3" images={images.filter(img => img.day === '3')} />   
                </div>
            )}

            {!loading && images.length === 0 && (
                <div className="text-center text-white/50 py-20">
                    <p>No images found in the gallery.</p>
                </div>
            )}
      </div>
    </Layout>
  );
};

export default Gallery;
