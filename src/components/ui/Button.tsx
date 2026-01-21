import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kalrav-accent disabled:pointer-events-none disabled:opacity-50 font-kalrav tracking-wider";
    
    const variants = {
      primary: "bg-kalrav-purple text-white hover:bg-kalrav-accent shadow-[0_0_15px_rgba(109,40,217,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]",
      outline: "border border-kalrav-purple text-kalrav-purple hover:bg-kalrav-purple/10",
      ghost: "hover:bg-kalrav-purple/10 text-white",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
