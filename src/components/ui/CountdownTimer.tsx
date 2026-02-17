import { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string; // ISO string
  className?: string;
}

const TimeUnit = memo(({ value, label, index, max }: { value: number; label: string; index: number; max: number }) => {
  // Format with leading zero
  const formattedValue = value < 10 ? `0${value}` : value.toString();
 
  const percent = Math.min((value / max) * 100, 100);
  
  const offset = 100 - percent;

  return (
    <div 
      className="flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-full aspect-square shadow-[0_8px_32px_rgba(249,115,22,0.15)] hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all duration-500 group animate-in fade-in zoom-in-95 fill-mode-forwards relative overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* SVG Progress Overlay */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none overflow-visible">
        <rect 
            x="2" y="2" 
            width="calc(100% - 4px)" 
            height="calc(100% - 4px)" 
            rx="1rem" 
            fill="none" 
            stroke="rgba(255,255,255,0.05)" // Track - faint
            strokeWidth="2" 
        />
        <rect 
            x="2" y="2" 
            width="calc(100% - 4px)" 
            height="calc(100% - 4px)" 
            rx="1rem" 
            fill="none" 
            stroke="#f97316" // Orange-500
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear shadow-[0_0_10px_#f97316]"
            style={{ filter: "drop-shadow(0 0 2px rgba(249,115,22,0.8))" }}
        />
      </svg>

      <div className="flex-1 w-full flex items-center justify-center relative z-10 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span 
            key={formattedValue}
            initial={{ y: "100%", opacity: 0, filter: "blur(5px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-white leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] pb-2 block absolute"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
        {/* Invisible spacer to maintain height */}
        <span className="text-5xl sm:text-6xl md:text-7xl font-sans font-bold text-transparent leading-none pb-2 invisible">
          88
        </span>
      </div>
      <span className="text-sm sm:text-base md:text-lg font-sans font-medium text-white/60 tracking-widest uppercase group-hover:text-orange-400 transition-colors duration-300 relative z-10">
        {label}
      </span>
    </div>
  );
});

TimeUnit.displayName = 'TimeUnit';

export const CountdownTimer = ({ targetDate, className }: CountdownTimerProps) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const maxDays = useMemo(() => {
    const startDate = new Date('2026-01-01T00:00:00+05:30'); // Start of the fest year/season
    const target = new Date(targetDate);
    const diff = target.getTime() - startDate.getTime();
    return Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 1); // Ensure at least 1 day to avoid div by zero
  }, [targetDate]);

  const timerComponents = useMemo(() => {
    return [
      { label: 'Days', value: timeLeft.days, max: maxDays },
      { label: 'Hours', value: timeLeft.hours, max: 24 },
      { label: 'Minutes', value: timeLeft.minutes, max: 60 },
      { label: 'Seconds', value: timeLeft.seconds, max: 60 },
    ];
  }, [timeLeft, maxDays]);

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8 w-full max-w-lg md:max-w-5xl mx-auto", className)}>
      {timerComponents.map((unit, index) => (
        <TimeUnit key={unit.label} value={unit.value} label={unit.label} index={index} max={unit.max} />
      ))}
    </div>
  );
};
