import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { LazyImage } from '../components/ui/LazyImage';

const galleryImages = [
  
];

const Gallery = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
         {/* Aftermovie Section */}
         <section className="mb-20">
            <h2 className="text-3xl font-kalrav text-white mb-8 tracking-widest border-b border-white/10 pb-4">AFTERMOVIE</h2>
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(109,40,217,0.2)]">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="" 
                    title="Aftermovie" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                    className="w-full h-full"
                ></iframe>
            </div>
         </section>

        <h1 className="text-5xl font-kalrav text-white mb-12 tracking-widest text-center">GALLERY</h1>

        
      </div>
    </Layout>
  );
};

export default Gallery;
