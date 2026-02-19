import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMerchProducts, type MerchProduct } from '../services/merch';
import { LazyImage } from '../components/ui/LazyImage';
import SEO from '../components/SEO';
import { Layout } from '../components/Layout';
import { Loader2, ArrowRight } from 'lucide-react';


import { getProxiedUrl } from '../utils/image';

const Merch = () => {
    // ... state logic remains same
    const [products, setProducts] = useState<MerchProduct[]>([]);
    const [activeProduct, setActiveProduct] = useState<MerchProduct | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setCurrentImageIndex(0);
        // Prefetch images for smooth sliding
        if (activeProduct?.images) {
            activeProduct.images.forEach((src) => {
                const img = new Image();
                img.src = getProxiedUrl(src);
            });
        }
    }, [activeProduct]);

    useEffect(() => {
        const loadMerch = async () => {
            const data = await fetchMerchProducts();
            setProducts(data);
            if (data.length > 0) {
                setActiveProduct(data[0]);
            }
            setLoading(false);
        };
        loadMerch();
    }, []);

    const handleProductSwitch = (product: MerchProduct) => {
        setActiveProduct(product);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-kalrav-dark flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <Layout>
            <SEO
                title="Merch"
                description="Exclusive Kalrav '26 Merchandise using premium quality materials. Grab yours now!"
                image={activeProduct?.images[0]}
            />

            <div className="relative h-[100dvh] w-full bg-kalrav-dark flex flex-col pt-6 md:pt-8 overflow-hidden">
                {/* Background Typography */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                    <h1 className="text-[15vw] font-kalrav font-black text-white/[0.04] whitespace-nowrap leading-none tracking-tighter transform -translate-y-12">
                        KALRAV MERCH
                    </h1>
                </div>

                {/* Main Content Container (Flex Column) */}
                <div className="relative z-10 flex flex-col w-full h-full max-w-[98%] lg:max-w-[95%] mx-auto px-2 md:px-4 gap-4 lg:gap-10">
                    
                    {/* Upper Section: Hero Product (Takes available flexibility) */}
                    <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 items-center min-h-0">
                        {/* Left: Description */}
                        <div className="hidden lg:flex flex-col items-start justify-center space-y-4 order-1 pl-4 lg:pl-12">
                            <AnimatePresence mode="wait">
                                {activeProduct && (
                                    <motion.div
                                        key={`desc-${activeProduct.id}`}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-2 text-left w-full"
                                    >
                                        <h3 className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase font-sans">
                                            DESCRIPTION
                                        </h3>
                                        <p className="text-white/80 text-base lg:text-lg font-normal leading-relaxed max-w-md font-sans whitespace-pre-line">
                                            {activeProduct.description}
                                        </p>
                                        <div className="h-1 w-12 bg-white/20 rounded-full mt-2" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Center: Image (Floating Slider) */}
                        <div className="w-full h-full flex flex-col items-center justify-center relative order-2 py-4 lg:py-0 overflow-visible">
                            <AnimatePresence mode="wait">
                                {activeProduct && (
                                    <motion.div
                                        key={activeProduct.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full flex flex-col items-center justify-center relative group/slider"
                                    >
                                        <div className="relative w-full h-[35vh] md:h-[50vh] lg:h-[55vh] max-h-[600px] flex items-center justify-center">
                                            {/* Radial Gradient for Visibility - Orange Glow */}
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.3)_0%,_transparent_70%)] opacity-100 blur-2xl pointer-events-none" />
                                            
                                            <AnimatePresence mode="popLayout" custom={currentImageIndex}>
                                                <motion.img
                                                    key={`${activeProduct.id}-${currentImageIndex}`}
                                                    src={getProxiedUrl(activeProduct.images[currentImageIndex])}
                                                    alt={activeProduct.name}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    drag="x"
                                                    dragConstraints={{ left: 0, right: 0 }}
                                                    dragElastic={0.2}
                                                    onDragEnd={(_, { offset, velocity }) => {
                                                        const swipe = Math.abs(offset.x) * velocity.x;
                                                        if (swipe < -100 || offset.x < -100) {
                                                              // Next
                                                              if (currentImageIndex < activeProduct.images.length - 1) {
                                                                  setCurrentImageIndex(currentImageIndex + 1);
                                                              }
                                                        } else if (swipe > 100 || offset.x > 100) {
                                                              // Prev
                                                              if (currentImageIndex > 0) {
                                                                  setCurrentImageIndex(currentImageIndex - 1);
                                                              }
                                                        }
                                                    }}
                                                    whileHover={{ scale: 1.1, rotate: 2 }}
                                                    className="absolute w-auto h-full max-w-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing transition-transform duration-500"
                                                />
                                            </AnimatePresence>

                                            {/* Navigation Buttons (Desktop) */}
                                            {activeProduct.images.length > 1 && (
                                              <>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); if (currentImageIndex > 0) setCurrentImageIndex(currentImageIndex - 1); }}
                                                    disabled={currentImageIndex === 0}
                                                    className={`absolute left-0 p-2 rounded-full bg-black/20 text-white backdrop-blur-sm transition-opacity ${currentImageIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/slider:opacity-100 hover:bg-black/40'}`}
                                                >
                                                    ←
                                                </button>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); if (currentImageIndex < activeProduct.images.length - 1) setCurrentImageIndex(currentImageIndex + 1); }}
                                                    disabled={currentImageIndex === activeProduct.images.length - 1}
                                                    className={`absolute right-0 p-2 rounded-full bg-black/20 text-white backdrop-blur-sm transition-opacity ${currentImageIndex === activeProduct.images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/slider:opacity-100 hover:bg-black/40'}`}
                                                >
                                                    →
                                                </button>
                                              </>
                                            )}
                                        </div>

                                        {/* Pagination Dots */}
                                        {activeProduct.images.length > 1 && (
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                                {activeProduct.images.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                            currentImageIndex === idx 
                                                                ? 'bg-orange-500 w-6' 
                                                                : 'bg-white/20 hover:bg-white/40'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right: Info & Actions */}
                        <div className="flex flex-col items-center lg:items-end justify-center text-center lg:text-right order-3 space-y-2 lg:space-y-6 pr-4 lg:pr-12">
                            <AnimatePresence mode="wait">
                                {activeProduct && (
                                    <motion.div
                                        key={`info-${activeProduct.id}`}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.4 }}
                                        className="flex flex-col items-center lg:items-end space-y-2 lg:space-y-4 w-full"
                                    >
                                        <div className="w-full">
                                            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-sans font-bold text-white tracking-wide leading-tight break-words px-2 lg:px-0">
                                                {activeProduct.name}
                                            </h2>
                                            
                                        </div>

                                        {/* Mobile Description */}
                                        <p className="lg:hidden text-white/70 text-xs sm:text-sm max-w-[95%] leading-snug font-sans line-clamp-3">
                                            {activeProduct.description}
                                        </p>

                                        <div className="flex flex-col items-center lg:items-end space-y-2 lg:space-y-4 mt-1 lg:mt-2">
                                            <div className="text-xl sm:text-2xl md:text-4xl font-bold text-white font-mono tracking-tighter">
                                                ₹{activeProduct.price}
                                            </div>
                                            <button className="group relative px-6 py-2 md:px-8 md:py-3 bg-white text-black font-bold text-sm md:text-lg rounded-full overflow-hidden transition-all hover:bg-orange-500 hover:text-white hover:scale-105">
                                                <div className="relative z-10 flex items-center gap-2 font-sans">
                                                    <span>BUY NOW</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Lower Section: Carousel Strip (Compact) */}
                    <div className="w-full z-20 pb-4 lg:pb-8 flex-shrink-0 flex justify-center min-h-[140px]">
                        <div className="max-w-4xl w-full mx-auto px-4 md:px-12">
                            <h4 className="text-white/30 text-[10px] font-bold tracking-widest mb-2 text-center font-sans">
                                BROWSE COLLECTION
                            </h4>
                            {/* Hide scrollbar but allow scroll context */}
                            <div className="flex items-center justify-start md:justify-center gap-3 lg:gap-4 overflow-x-auto no-scrollbar px-1 py-4 snap-x snap-mandatory w-full">
                                {products.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductSwitch(product)}
                                        className={`group relative flex-shrink-0 w-28 h-36 md:w-44 md:h-52 rounded-xl overflow-hidden transition-all duration-300 snap-center ${activeProduct?.id === product.id
                                                ? 'border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-105 z-10'
                                                : 'opacity-60 hover:opacity-100 hover:scale-105 border border-white/10'
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-gray-900">
                                            <LazyImage
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                            />
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-2 md:p-3 text-left">
                                            <h4 className={`font-sans font-bold uppercase text-[10px] md:text-sm leading-none mb-0.5 truncate ${activeProduct?.id === product.id ? 'text-orange-400' : 'text-white'}`}>
                                                {product.name}
                                            </h4>
                                            <span className="text-white/80 font-mono text-[10px] md:text-xs font-bold">
                                                ₹{product.price}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                 {/* No-Scrollbar utility style since we don't have standard tailwind plugin for it installed */}
                <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </div>
        </Layout>
    );
};

export default Merch;
