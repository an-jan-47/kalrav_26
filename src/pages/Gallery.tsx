import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { PageBackground } from '../components/ui/PageBackground';
import { VideoSection } from '../components/ui/VideoSection';
import { GalleryDaySection } from '../components/gallery/GalleryDaySection';
import { GallerySkeleton } from '../components/gallery/GallerySkeleton';
import { fetchGalleryImages, type GalleryImage } from '../services/gallery';
import HomeBg from '../assets/bg/gallery.webp';
import { SocialCards } from '../components/home/SocialCards';
import { getOptimizedImageUrl } from '../utils/image';

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
                    {/* Highlights Section */}
                    <div className="w-full max-w-[1600px] mx-auto mb-10 px-4 md:px-12">
                        <div className="text-left mb-4 md:mb-8">
                            <h2 className="text-3xl md:text-5xl font-kalrav text-white/90 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] tracking-wider uppercase">
                                Highlights
                            </h2>
                        </div>
                        <SocialCards cards={[
                            {
                                id: '1',
                                platform: 'instagram',
                                url: 'https://www.instagram.com/reel/DSm-cNSEdX0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                                thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/gallery/after_movie0.webp'), 
                                label: 'Highlights 2025'
                            },
                            {
                                id: '2',
                                platform: 'instagram',
                                url: 'https://www.instagram.com/reel/DHYoUJwz1B3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                                thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/gallery/DSC03563.webp'),
                                label: 'Day 1'
                            },
                            {
                                id: '3',
                                platform: 'instagram',
                                url: 'https://www.instagram.com/reel/DIMfe9NMRlz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                                thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/gallery/IMG_20250307_201908.webp'),
                                label: 'Day 2'
                            },
                            {
                                id: '4',
                                platform: 'instagram',
                                url: 'https://www.instagram.com/reel/DIgvocQscZe/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                                thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/gallery/IMG-20260126-WA0005.jpg.webp'),
                                label: 'Day 3'
                            },
                            {
                                id: '5',
                                platform: 'instagram',
                                url: 'https://www.instagram.com/reel/DL_xZSJvGMw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                                thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/gallery/IMG_8093.webp'),
                                label: 'Neeti Mohan'
                            },
                            // {
                            //     id: '6',
                            //     platform: 'instagram',
                            //     url: 'https://www.instagram.com/reel/DRKe9wDE-rs/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                            //     thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/merch/KALRAV_MERCH_SELLING__2__page-0006-removebg-preview.png'),
                            //     label: 'Council 2026'
                            // },
                            // {
                            //     id: '7',
                            //     platform: 'instagram',
                            //     url: 'https://www.instagram.com/reel/DRCwekPk6iN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
                            //     thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/gallery/theme.webp'), 
                            //     label: 'Team Heads 2026'
                            // },
                        ]} 
                        className="!py-0 !px-0 !max-w-none items-start" 
                        size="large" 
                        autoScroll={true}
                        interval={4000}
                    />
                    </div>

                   <GalleryDaySection 
                        title="Gallery" 
                        images={images} 
                    />
                    
                    {/* Aftermovie Section */}
                    <VideoSection 
                        title="AFTERMOVIE"
                        videoId="dQw4w9Q" 
                    />
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
