import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'ITINERARY', path: '/itinerary' },
  { name: 'BOOK TICKETS', path: '/tickets' },
  { name: 'GALLERY', path: '/gallery' },
  { name: 'COMPETITION', path: '/competitions' },
  { name: 'SPONSORS', path: '/sponsors' },
  { name: 'TEAM', path: '/team' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform',
        scrolled ? 'bg-dark/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-kalrav text-white tracking-widest hover:text-kalrav-purple transition-colors">
          KALRAV '26
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  'text-sm font-medium tracking-widest transition-colors hover:text-kalrav-accent font-kalrav',
                  isActive ? 'text-kalrav-purple drop-shadow-[0_0_8px_rgba(109,40,217,0.8)]' : 'text-gray-300'
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-kalrav-purple transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-kalrav-dark/95 backdrop-blur-xl border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col items-center py-8 space-y-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      'text-lg font-kalrav tracking-widest transition-colors hover:text-kalrav-accent',
                      isActive ? 'text-kalrav-purple drop-shadow-[0_0_8px_rgba(109,40,217,0.8)]' : 'text-gray-300'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
