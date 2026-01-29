import { useRef, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LazyImage } from "../ui/LazyImage";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export interface ReviewItem {
  id: number;
  image: string;
}

type HorizontalScrollCarouselProps = {
  items: ReviewItem[];
  title?: string;
};

export const HorizontalScrollCarousel = ({
  items,
  title,
}: HorizontalScrollCarouselProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Hardcoded Review Texts (Exactly 5 as requested)
  const REVIEW_TEXTS = useMemo(() => [
    { text: "The concerts were mind-blowing.", subtext: "Music Club Lead" },
    { text: "So well organized. Can't wait for '26.", subtext: "Sponsor Rep" },
    { text: "Can't Hold my excitement for '26!", subtext: "Alumni" },
    { text: "The vibe, the people, everything was perfect.", subtext: "General Attendee" },
    { text: "Most memorable college fest ever.", subtext: "Cultural Sec" },
  ], []);

  // Combine items with text, ensuring exactly 5 cards
  const cards = useMemo(() => {
    if (items.length === 0) return [];
    return REVIEW_TEXTS.map((review, index) => {
      // Loop through available images if fewer than 5
      const item = items[index % items.length];
      return {
        id: `review-${index}`,
        image: item.image,
        ...review
      };
    });
  }, [items, REVIEW_TEXTS]);

  useLayoutEffect(() => {
    if (cards.length === 0 || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const section = sectionRef.current!;
      


      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 64), // Scroll until end with some padding
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2000", // Adjust scroll length for feel
          scrub: 1, // "Butter-like" smoothing
          pin: true,
          invalidateOnRefresh: true,
          // snap: 1 / (cards.length - 1), // Optional: snap to cards
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [cards]);

  if (cards.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative w-full bg-black/20 overflow-hidden">
      {/* Title (Static or animated separately) */}
      <div className="absolute top-10 left-0 w-full z-20 text-center pointer-events-none">
          {title && (
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-kalrav text-white tracking-wider drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            >
              {title}
            </motion.h2>
          )}
      </div>

      {/* Sticky Container */}
      <div className="h-screen w-full flex items-center overflow-hidden">
        {/* Track */}
        <div 
          ref={trackRef} 
          className="flex gap-4 md:gap-8 px-4 md:px-[5vw] w-max items-center"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative h-[50vh] w-[80vw] md:h-[60vh] md:w-[30vw] flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-gray-900 shadow-2xl transition-all duration-500 hover:border-orange-500/30"
            >
              <LazyImage 
                src={card.image} 
                alt="Review"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 opacity-80" />
              
              <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
                <p className="text-lg md:text-2xl italic text-white/90 line-clamp-4 font-normal tracking-wide">
                  “{card.text}”
                </p>

                {card.subtext && (
                  <>
                    <div className="h-0.5 w-14 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                      {card.subtext}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
