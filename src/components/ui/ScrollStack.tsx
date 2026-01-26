import React from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
  heightClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ 
  children, 
  className,
  heightClassName = 'h-[400px]'
}) => {
  return (
    <div
      className={cn(
        "scroll-stack-card relative w-full max-w-4xl mx-auto my-4 transition-all duration-500 ease-out",
        heightClassName,
        className
      )}
    >
      <div className="w-full h-full rounded-[30px] overflow-hidden shadow-2xl">
         {children}
      </div>
    </div>
  );
};

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  stackOffset?: number; // Distance from top where stack starts (px)
  cardOffset?: number; // Distance between stacked cards (px)
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className,
  stackOffset = 150, // Start sticking 150px from top
  cardOffset = 40    // Each subsequent card is 40px lower
}) => {
  
  return (
    <div className={cn("relative w-full px-4 pb-24", className)}>
      <div className="flex flex-col items-center">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            // Apply sticky positioning natively
            return (
              <div 
                className="w-full flex justify-center sticky origin-top"
                style={{
                  top: `${stackOffset + index * cardOffset}px`, 
                  zIndex: index + 1,
                  // Add a tiny margin bottom to push the flow content down so resizing works
                  marginBottom: `${cardOffset}px` 
                }}
              >
                {child}
              </div>
            );
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default ScrollStack;
