import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LazyImage } from "../ui/LazyImage";

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
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });



  // Hardcoded Review Texts (Restored)
  const REVIEW_TEXTS = [
    { text: "The concerts were mind-blowing.", subtext: "Music Club Lead" },
    { text: "Loved the gaming events!", subtext: "Esports Participant" },
    { text: "So well organized. Can't wait for '26.", subtext: "Sponsor Rep" },
    { text: "The vibe, the people, everything was perfect.", subtext: "General Attendee" },
    { text: "Chaos of Shadow theme sounds epic!", subtext: "Alumni" },
  ];

  // Create a combined list of { image, text, subtext }
  // We use Omit to override the 'id' type from number to string | number if needed, 
  // or just Keep it number but since we are appending index, we need to be careful.
  // Ideally we just make a new type that doesn't strictly extend if we change ID type.
  type CombinedItem = Omit<ReviewItem, 'id'> & {
      id: string | number;
      text: string;
      subtext: string;
  };
  
  const combinedItems: CombinedItem[] = [];
  // Repeat at least enough times to have ~10-15 items for good scroll
  const repeatCount = items.length > 5 ? 2 : 4; 
  
  if (items.length > 0) {
      for (let i = 0; i < repeatCount; i++) {
        items.forEach((item, index) => {
            const textData = REVIEW_TEXTS[(index + i * items.length) % REVIEW_TEXTS.length];
            combinedItems.push({
                id: `${item.id}-${i}`, // Now valid because id is string | number
                image: item.image,
                ...textData
            });
        });
      }
  }

  // Adjust scroll range. 0% to -50% means we scroll 50% of the container width.
  // If the container is 4x the original items, 50% scroll means we see 2x items.
  // This is a seamless loop effect.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  if (!items.length) return <div ref={targetRef} className="hidden" />;

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full bg-black/20">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">

        {title && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-20 mb-12 px-4"
          >
            <h2 className="text-center text-3xl md:text-5xl font-kalrav text-white tracking-wider drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              {title}
            </h2>
          </motion.div>
        )}

        <motion.div
          style={{ x }}
          className="flex gap-8 pl-[10vw] will-change-transform"
        >
          {combinedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group relative h-[400px] w-[300px] md:h-[500px] md:w-[400px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-gray-900 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-purple-500/30"
            >
              <LazyImage 
                src={item.image} 
                alt="Review"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Restored Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 opacity-80 transition-opacity duration-300" />
              
              <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
                <p className="text-lg md:text-xl italic text-white/90 line-clamp-3">
                  “{item.text}”
                </p>

                {item.subtext && (
                  <>
                    <div className="h-0.5 w-14 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                      {item.subtext}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
