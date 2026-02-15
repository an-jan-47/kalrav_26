import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export const FilterBar = ({ categories, activeCategory, onSelect }: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (category: string) => {
    onSelect(category);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-8 z-40 inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 border backdrop-blur-md group",
          isOpen 
            ? "bg-kalrav-orange/20 border-kalrav-orange text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]" 
            : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30"
        )}
      >
        <Filter size={18} className={cn("transition-colors", isOpen ? "text-kalrav-orange" : "text-white/60 group-hover:text-white")} />
        <span className="font-kalrav tracking-wider text-sm uppercase">
          {activeCategory === 'All' ? 'Filter By' : activeCategory}
        </span>
        <ChevronDown 
            size={16} 
            className={cn("transition-transform duration-300 opacity-60", isOpen ? "rotate-180" : "rotate-0")} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-3 w-64 p-2 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelect(category)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 group mb-1 last:mb-0",
                    activeCategory === category
                      ? "bg-kalrav-orange/20 text-white font-medium"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span className="tracking-wide">{category}</span>
                  {activeCategory === category && (
                    <motion.div
                        layoutId="active-check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        <Check size={14} className="text-kalrav-orange" />
                    </motion.div>
                  
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
