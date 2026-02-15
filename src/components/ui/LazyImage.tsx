import { useState, useEffect, useRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface LazyImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage = ({ src, alt, className, ...props }: LazyImageProps) => {
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
      rootMargin: '400px', 
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
      className={cn("overflow-hidden relative", className)}
    >
      {inView && (
        <motion.img
          key="img"
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: loaded ? 1 : 0,
            scale: loaded ? 1 : 1.1
          }}
          transition={{ duration: 0.5 }}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)} 
          className="w-full h-full object-cover"
          {...props}
        />
      )}
      {(!inView || !loaded) && (
        <div key="placeholder" className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
