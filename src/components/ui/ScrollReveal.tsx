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
  rotationEnd = 'bottom center', // Adjusted for better visibility trigger
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

    // Initial Set
    const wordElements = el.querySelectorAll<HTMLElement>('.word');
    
    // Clear any previous GSAP styles
    gsap.set(el, { clearProps: 'all' });
    gsap.set(wordElements, { clearProps: 'all' });

    // Rotate Animation on Container
    // This creates a slight tilt that straightens out as you scroll
    const rotateTimeline = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom', // Start when top of element hits bottom of viewport
          end: rotationEnd,
          scrub: true,
        }
      }
    );

    // Opacity & Blur Animation on Words
    const wordTimeline = gsap.fromTo(
      wordElements,
      { 
        opacity: baseOpacity, 
        willChange: 'opacity, filter, transform',
        filter: enableBlur ? `blur(${blurStrength}px)` : 'none'
      },
      {
        ease: 'none',
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=10%', // Start slightly later
          end: wordAnimationEnd,
          scrub: true,
        }
      }
    );

    return () => {
        rotateTimeline.scrollTrigger?.kill();
        rotateTimeline.kill();
        wordTimeline.scrollTrigger?.kill();
        wordTimeline.kill();
    };
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
