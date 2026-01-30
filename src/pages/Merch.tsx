import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMerchProducts, type MerchProduct } from '../services/merch';
import { LazyImage } from '../components/ui/LazyImage';
import SEO from '../components/SEO';
import { Layout } from '../components/Layout';
import { Loader2, ArrowRight } from 'lucide-react';


const Merch = () => {
    // ... state logic remains same
    const [products, setProducts] = useState<MerchProduct[]>([]);
    const [activeProduct, setActiveProduct] = useState<MerchProduct | null>(null);
    const [loading, setLoading] = useState(true);

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
                image={activeProduct?.image_link}
            />

            <div className="relative h-[100dvh] w-full bg-kalrav-dark flex flex-col pt-14 md:pt-16 overflow-hidden">
                {/* Background Typography */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                    <h1 className="text-[18vw] font-kalrav text-white/[0.04] whitespace-nowrap leading-none tracking-tighter transform -translate-y-12">
                        KALRAV MERCH
                    </h1>
                </div>

                {/* Main Content Container (Flex Column) */}
                <div className="relative z-10 flex flex-col w-full h-full max-w-[95%] lg:max-w-7xl mx-auto px-2 md:px-4">
                    
                    {/* Upper Section: Hero Product (Takes available flexibility) */}
                    <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 items-center min-h-0">
                        {/* Left: Description */}
                        <div className="hidden lg:flex flex-col items-start justify-center space-y-4 order-1">
                            <AnimatePresence mode="wait">
                                {activeProduct && (
                                    <motion.div
                                        key={`desc-${activeProduct.id}`}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-2 text-left"
                                    >
                                        <h3 className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase">
                                            DESCRIPTION
                                        </h3>
                                        <p className="text-white/80 text-lg lg:text-xl font-light leading-snug max-w-sm">
                                            {activeProduct.description}
                                        </p>
                                        <div className="h-1 w-12 bg-white/20 rounded-full mt-2" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Center: Image (Floating) */}
                        <div className="w-full h-full flex items-center justify-center relative order-2 py-4 lg:py-0">
                            <AnimatePresence mode="wait">
                                {activeProduct && (
                                    <motion.div
                                        key={activeProduct.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full flex items-center justify-center"
                                    >
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-full flex justify-center items-center"
                                        >
                                            <img
                                                src={activeProduct.image_link}
                                                alt={activeProduct.name}
                                                className="w-auto h-[35vh] md:h-[45vh] lg:h-[55vh] max-h-[500px] object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
                                            />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right: Info & Actions */}
                        <div className="flex flex-col items-center lg:items-end justify-center text-center lg:text-right order-3 space-y-2 lg:space-y-6">
                            <AnimatePresence mode="wait">
                                {activeProduct && (
                                    <motion.div
                                        key={`info-${activeProduct.id}`}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.4 }}
                                        className="flex flex-col items-center lg:items-end space-y-2 lg:space-y-4"
                                    >
                                        <div>
                                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-kalrav text-white tracking-wider leading-none">
                                                {activeProduct.name}
                                            </h2>
                                            
                                        </div>

                                        {/* Mobile Description */}
                                        <p className="lg:hidden text-white/70 text-sm max-w-[80%] leading-tight">
                                            {activeProduct.description}
                                        </p>

                                        <div className="flex flex-col items-center lg:items-end space-y-2 lg:space-y-4 mt-2">
                                            <div className="text-3xl md:text-5xl font-bold text-white font-mono tracking-tighter">
                                                ₹{activeProduct.price}
                                            </div>
                                            <button className="group relative px-6 py-2 md:px-8 md:py-3 bg-white text-black font-bold text-sm md:text-lg rounded-full overflow-hidden transition-all hover:bg-orange-500 hover:text-white hover:scale-105">
                                                <div className="relative z-10 flex items-center gap-2">
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
                    <div className="w-full z-20 pb-4 lg:pb-8 flex-shrink-0">
                        <div className="max-w-7xl mx-auto">
                            <h4 className="text-white/30 text-[10px] font-bold tracking-widest mb-3 lg:ml-4 text-center lg:text-left">
                                BROWSE COLLECTION
                            </h4>
                            {/* Hide scrollbar but allow scroll context */}
                            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar px-1 lg:px-4 snap-x snap-mandatory">
                                {products.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductSwitch(product)}
                                        className={`group relative flex-shrink-0 w-32 h-40 md:w-44 md:h-52 rounded-xl overflow-hidden transition-all duration-300 snap-center ${activeProduct?.id === product.id
                                                ? 'ring-1 ring-orange-500 scale-100 shadow-lg shadow-orange-500/10'
                                                : 'opacity-60 hover:opacity-100 hover:scale-105'
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-gray-900">
                                            <LazyImage
                                                src={product.image_link}
                                                alt={product.name}
                                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                            />
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3 text-left">
                                            <h4 className={`font-kalrav uppercase text-lg leading-none mb-0.5 ${activeProduct?.id === product.id ? 'text-orange-400' : 'text-white'}`}>
                                                {product.name}
                                            </h4>
                                            <span className="text-white/80 font-mono text-xs font-bold">
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
