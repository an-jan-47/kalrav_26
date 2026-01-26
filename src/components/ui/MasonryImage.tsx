import { useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface MasonryImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  className?: string; // Class for the wrapper
}

export const MasonryImage = ({ src, alt, className, ...props }: MasonryImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-gray-900/50 rounded-xl", className)}>
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
        loading="lazy"
        {...props}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
