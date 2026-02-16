import { useState, useEffect, useRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface MasonryImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export const MasonryImage = ({ src, alt, className, aspectRatio, ...props }: MasonryImageProps) => {
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     const observer = new IntersectionObserver(([entry]) => {
         if (entry.isIntersecting) {
             setInView(true);
             observer.disconnect();
         }
     }, {
         rootMargin: '100px', // Fetch slightly before it enters viewport
         threshold: 0.1
     });

     if (containerRef.current) {
         observer.observe(containerRef.current);
     }

     return () => observer.disconnect();
  }, []);

  return (
    <div 
        ref={containerRef}
        style={aspectRatio ? { aspectRatio } : undefined}
        className={cn(
            "relative overflow-hidden bg-white/5 rounded-xl transition-all duration-300", 
            !aspectRatio && (loaded ? "min-h-0" : "min-h-[200px]"), 
            className
        )}
    >
      {inView && !hasError && (
        <motion.img
            src={src}
            alt={alt}
            decoding="async"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
            opacity: loaded ? 1 : 0,
            scale: loaded ? 1 : 1.05
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onLoad={() => setLoaded(true)}
            onError={() => {
                setLoaded(true);
                setHasError(true);
            }}
            className={cn("block w-full object-cover", aspectRatio ? "h-full" : "h-auto")}
            {...props}
        />
      )}

      {(!inView || (!loaded && !hasError)) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 h-full min-h-[200px]">
            <div className="w-8 h-8 border-2 border-white/20 border-t-orange-500 rounded-full animate-spin" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-white/20 h-full min-h-[200px]">
            <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
};
