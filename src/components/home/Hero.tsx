import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CountdownTimer } from '../ui/CountdownTimer';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (prefersReducedMotion || !contentRef.current || !containerRef.current) return;

      // Initial state
      gsap.set(contentRef.current, { scale: 1, opacity: 1 });

      // Scroll-scrubbed animation
      gsap.to(contentRef.current, {
        scale: 1.5,
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
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background container */}
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-10" />

      {/* Hero Content */}
      <div 
        ref={contentRef} 
        className="relative z-10 flex flex-col items-center gap-8 px-4"
      >
        <CountdownTimer targetDate="2026-02-26T00:00:00+05:30" />
      </div>

      {/* SEO ONLY: Hidden H1 (Kept for structure if needed, but we have a visible one now) */}
      <h1 className="sr-only">KALRAV '26 - Cultural Fest</h1>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 z-20 text-white cursor-pointer"
        role="button"
        aria-label="Scroll down to explore"
        tabIndex={0}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};
