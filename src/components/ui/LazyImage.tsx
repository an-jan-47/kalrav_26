import { useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface LazyImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage = ({ src, alt, className, ...props }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("overflow-hidden bg-gray-900 relative", className)}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: loaded ? 1 : 0,
          scale: loaded ? 1 : 1.1
        }}
        transition={{ duration: 0.5 }}
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover"
        loading="lazy"
        {...props}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-kalrav-purple border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
