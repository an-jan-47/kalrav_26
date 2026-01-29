import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface VideoSectionProps {
  videoId: string;
  title?: string;
  className?: string;
}

export const VideoSection = ({ videoId, title, className }: VideoSectionProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (!iframeRef.current) return;

    const message = inView 
      ? '{"event":"command","func":"playVideo","args":""}'
      : '{"event":"command","func":"pauseVideo","args":""}';

    iframeRef.current.contentWindow?.postMessage(message, '*');
  }, [inView]);

  return (
    <section className={cn("w-full max-w-[1600px] mx-auto mb-20 px-4 md:px-12", className)}>
      {title && (
        <div className="text-left mb-8">
          <h2 className="text-2xl md:text-3xl font-kalrav text-white/90 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] tracking-wider">
            {title}
          </h2>
        </div>
      )}
      
      {/* Container reduced by ~25% visually by restricting max-width or width */}
      <div 
        ref={ref}
        className="relative w-[75%] mx-auto aspect-video bg-black/40 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      >
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="w-full h-full"
        >
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0`}
            title={title || "Video"}
            className="w-full h-full object-cover pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            tabIndex={-1}
          />
        </motion.div>
        
        {/* Transparent overlay to block all interactions */}
        <div className="absolute inset-0 z-20 bg-transparent" />
      </div>
    </section>
  );
};
