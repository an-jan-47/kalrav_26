import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowImg from "../../assets/elements/arrow.png";
import BowImg from "../../assets/elements/bow.png";

gsap.registerPlugin(ScrollTrigger);

const BowArrowAnimation = () => {
    // We now ref a wrapper div that contains both arrow img and glow
    const arrowWrapperRef = useRef<HTMLDivElement>(null);
    const arrowImgRef = useRef<HTMLImageElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    
    const bowRef = useRef<HTMLImageElement>(null);
    const portalArrowRef = useRef<HTMLDivElement>(document.createElement("div"));

    useEffect(() => {
        const portalElement = portalArrowRef.current;
        document.body.appendChild(portalElement);
        
        Object.assign(portalElement.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 5, 
            overflow: 'hidden'
        });

        const ctx = gsap.context(() => {
            if (!arrowWrapperRef.current || !bowRef.current) return;
            
            // Function to calculate target Y position
            const getTargetY = () => {
                if (!bowRef.current || !arrowWrapperRef.current) return 0; // Use wrapper ref

                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                const bowRectAbsolute = bowRef.current.getBoundingClientRect();
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                
                const bowAbsoluteTop = bowRectAbsolute.top + scrollTop;
                const bowViewportYAtBottom = bowAbsoluteTop - maxScroll;

                // Adjust for alignment (center to center)
                // Use wrapper height
                const arrowHeight = arrowWrapperRef.current.offsetHeight; 
                const bowHeight = bowRef.current.offsetHeight;
                
                const centerOffset = (bowHeight / 2) - (arrowHeight / 2);
                
                // Get margin form wrapper NOT img
                const style = window.getComputedStyle(arrowWrapperRef.current);
                const marginTop = parseFloat(style.marginTop) || 0;

                return (bowViewportYAtBottom + centerOffset) - marginTop;
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.1, 
                    invalidateOnRefresh: true 
                }
            });

            // 1. Move the Arrow Wrapper Down
            tl.to(arrowWrapperRef.current, {
                y: getTargetY, 
                ease: "none",
            });

            // 2. Fade out the Glow (Partial)
            if (glowRef.current) {
                tl.to(glowRef.current, {
                    opacity: 0.6, // Keep some glow visible
                    scale: 0.8, // Reduced scale shrinkage
                    ease: "none" 
                }, "<"); // "<" syncs start time
            }
            
            setTimeout(() => ScrollTrigger.refresh(), 500);
            setTimeout(() => ScrollTrigger.refresh(), 2000);
        });

        return () => {
             ctx.revert();
             if (document.body.contains(portalElement)) {
                document.body.removeChild(portalElement);
             }
        };
    }, []);

  return (
    <>
      {/* The Arrow Wrapper (Portal) */}
      {createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)', 
            zIndex: 5 
        }}>
            {/* Wrapper that gets animated */}
            <div 
                ref={arrowWrapperRef}
                className="relative flex flex-col items-center justify-center"
                 style={{ 
                    marginTop: '65px', 
                    willChange: 'transform'
                }} 
            >
                {/* Glow Effect - Absolute at top tip - DECREASED INTENSITY (50%) */}
                 <div 
                    ref={glowRef}
                    className="absolute -top-6 w-12 h-12 bg-orange-500/50 rounded-full blur-[20px] pointer-events-none md:w-16 md:h-16 md:-top-8 drop-shadow-[0_0_20px_rgba(255,140,0,0.5)]"
                    style={{
                        willChange: 'opacity, transform',
                        zIndex: -1 // Behind arrow
                    }}
                 />

                <img 
                    ref={arrowImgRef}
                    src={ArrowImg} 
                    alt="Golden Arrow" 
                    className="w-32 md:w-40 opacity-90 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] relative z-10"
                />
            </div>
        </div>,
        portalArrowRef.current
      )}

      {/* The Bow (Static Target) */}
      <div className="relative z-50 flex justify-center items-center mt-6 mb-2 pointer-events-none select-none">
        <img 
            ref={bowRef}
            src={BowImg} 
            alt="Ancient Bow" 
            className="w-32 md:w-44 opacity-100 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)] -translate-x-[10px]"
        />
      </div>
    </>
  );
};

export default BowArrowAnimation;
