import { useState, useEffect, useRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface MasonryImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  className?: string;
}

export const MasonryImage = ({ src, alt, className, ...props }: MasonryImageProps) => {
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
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
        className={cn("relative overflow-hidden bg-gray-900/50 rounded-xl min-h-[200px]", className)}
    >
      {inView && (
        <motion.img
            src={src}
            alt={alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
            opacity: loaded ? 1 : 0,
            scale: loaded ? 1 : 1.05
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onLoad={() => setLoaded(true)}
            className="block w-full h-auto object-cover"
            {...props}
        />
      )}

      {(!inView || !loaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="w-8 h-8 border-2 border-white/20 border-t-orange-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
