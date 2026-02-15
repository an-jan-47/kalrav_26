import React, { useEffect, useRef, useMemo, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string; // Restricting to string for this specific logic
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom center', 
  wordAnimationEnd = 'bottom center'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = children;
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use window if no container ref provided
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    
    // Check for mobile/reduced motion preference
    
    const effectiveBlur = blurStrength / 2; 
    const useBlur = enableBlur && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
        // Initial Clear
        gsap.set(el, { clearProps: 'all' });
        const wordElements = el.querySelectorAll('.word');
        gsap.set(wordElements, { clearProps: 'all' });

        // Single timeline for synchronized, efficient animation
        // We use one ScrollTrigger to drive the main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top 85%', // Trigger slightly earlier for smoother entry
                end: wordAnimationEnd, // Use the prop
                scrub: 1, // Smooth scrolling (1s catch-up) to eliminate jitter
            }
        });

        // 1. Container Rotation (Subtle 3D effect)
        // We can animate this in parallel with words
        tl.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: baseRotation },
            { 
                rotate: 0, 
                ease: 'power2.out',
                duration: 1 // Relative duration in scrub timeline
            },
            0 // Start at time 0
        );

        // 2. Word Reveal (Staggered)
        tl.fromTo(
            wordElements,
            { 
                opacity: baseOpacity, 
                filter: useBlur ? `blur(${effectiveBlur}px)` : 'none',
                y: 10, // Slight Y translation for better feel
                willChange: 'opacity, transform, filter' 
            },
            {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                stagger: 0.1, // Stagger relative to scrub progress
                ease: 'power2.out',
                duration: 1,
                force3D: true // Force hardware acceleration
            },
            0 // Start concurrent with rotation
        );
    });

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={cn("my-5", containerClassName)}>
      <p className={cn("font-semibold leading-relaxed", textClassName)}>
        {splitText}
      </p>
    </div>
  );
};

export default ScrollReveal;
