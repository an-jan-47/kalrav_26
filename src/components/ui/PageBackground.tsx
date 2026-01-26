import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface PageBackgroundProps {
  src: string;
  alt?: string;
  parallax?: boolean;
  opacity?: number;
  showOverlay?: boolean;
}

export const PageBackground = ({ 
  src, 
  alt = "Background", 
  parallax = false,
  opacity = 1,
  showOverlay = true 
}: PageBackgroundProps) => {
  const { scrollY } = useScroll();
  
  // Default values for non-parallax (static)
  let y: MotionValue<number> | number = 0;
  let scale: MotionValue<number> | number = 1;

  if (parallax) {
    y = useTransform(scrollY, [0, 1000], [0, 0]);  
    scale = useTransform(scrollY, [0, 1000], [1.2, 1.8]);
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black" /> 
      <motion.div 
        style={{ y, scale, opacity }}
        className="relative w-full h-full"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover object-center bg-black/20" 
        />
        {/* Overlay for better text readability across all pages */}
        {showOverlay && <div className="absolute inset-0 bg-black/60" />} 
      </motion.div>
    </div>
  );
};
