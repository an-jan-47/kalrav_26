import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (prefersReducedMotion || !textRef.current || !containerRef.current) return;

      // Initial state
      gsap.set(textRef.current, { scale: 1, opacity: 1 });

      // Scroll-scrubbed animation
      gsap.to(textRef.current, {
        scale: 3,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center "
    >
      {/* Background container (preserved from previous code) */}
      <div className="absolute inset-0 z-0 " />

      {/* SEO ONLY: Hidden H1 */}
      <h1 className="sr-only">KALRAV '26</h1>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 z-20 text-white cursor-pointer"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};
