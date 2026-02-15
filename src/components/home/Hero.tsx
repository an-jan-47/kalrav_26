import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CountdownTimer } from '../ui/CountdownTimer';
import { SocialCards } from './SocialCards';
import { getOptimizedImageUrl } from '../../utils/image';

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
          scrub: 1, // Smooth scrub for less jitter
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
        className="relative z-10 flex flex-col items-center gap-8 px-2 md:px-4 will-change-transform"
      >
        <CountdownTimer targetDate="2026-02-26T00:00:00+05:30" />
      </div>

       {/* Social Cards */}
       <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
            <SocialCards cards={[
                {
                    id: '1',
                    platform: 'instagram',
                    url: 'https://www.instagram.com/reel/DUYCpV2E4BY/?igsh=MWM3cXlkZGI2NWM0cw==',
                    thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/gallery/after_movie0.webp'), 
                    label: 'Aftermovie'
                },
                {
                    id: '2',
                    platform: 'instagram',
                    url: 'https://www.instagram.com/reel/DUTDw80k6vH/?igsh=enhyZjRybzFlOTQ4',
                    thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/gallery/date_reveal.webp'),
                    label: 'Date Reveal'
                },
                {
                    id: '3',
                    platform: 'merch',
                    url: '/merch',
                    thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/merch/KALRAV_MERCH_SELLING__2__page-0006-removebg-preview.png'),
                    label: 'BUY MERCH'
                },
                {
                    id: '4',
                    platform: 'instagram',
                    url: 'https://www.instagram.com/reel/DUDnptdE6_N/?igsh=M3NkYnYweTRqejdv',
                    thumbnail: getOptimizedImageUrl('https://atgpzwtczetsesrbfmat.supabase.co/storage/v1/object/public/gallery/theme.webp'), 
                    label: 'Theme Reveal'
                },
                
            ]} />
       </div>

   
      <h1 className="sr-only">KALRAV '26 - Cultural Fest</h1>
    </section>
  );
};
