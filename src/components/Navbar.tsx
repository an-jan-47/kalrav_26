import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

const navItemsLeft = [
  { name: 'HOME', path: '/' },
  { name: 'ITINERARY', path: '/itinerary' },
  { name: 'GALLERY', path: '/gallery' },
];

const navItemsRight = [
  { name: 'COMPETITION', path: '/competitions' },
  { name: 'SPONSORS', path: '/sponsors' },
  { name: 'TEAM', path: '/team' },
  
];

const NavButton = ({ item, isActive }: { item: { name: string, path: string }, isActive: boolean }) => {
    return (
        <NavLink
            to={item.path}
            className="relative group py-2"
        >
            <motion.span
                className={cn(
                    "relative z-10 text-sm font-medium tracking-widest transition-colors font-kalrav uppercase",
                    isActive ? "text-orange-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "text-gray-300 group-hover:text-orange-300"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {item.name}
            </motion.span>
            
           {/* {isActive && (
                <motion.div
                    layoutId="navbar-active"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )} */}
        </NavLink>
    );
};

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
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
        scrolled ? 'bg-black/90 backdrop-blur-md pt-2 pb-0' : 'bg-transparent pt-6 pb-4'
      )}
    >
      <div className="w-full flex flex-col items-center">
        
        {/* Desktop Flex Container */}
        <div className="hidden md:flex w-full items-center justify-center relative px-10">
            
            {/* Left Line & Links */}
            <div className="flex-1 flex justify-end items-center h-full border-b border-white/20 pb-4 pr-8 relative">
                <div className="flex gap-12">
                     {navItemsLeft.map((item) => (
                        <NavButton key={item.name} item={item} isActive={location.pathname === item.path} />
                    ))}
                </div>
            </div>

            {/* Center Curve Logo Area */}
            <div className="relative shrink-0 -mb-[42px] z-20 flex flex-col items-center justify-start h-[100px] w-[200px]">
                
                
                {/* Logo Text */}
                <NavLink to="/" className="relative z-30 font-kalrav text-2xl text-white tracking-widest pt-2 hover:text-orange-400 transition-colors drop-shadow-md">
                    KALRAV '<span className="font-kalrav text-2xl">26</span>
                </NavLink>
            
            </div>

            {/* Right Line & Links */}
            <div className="flex-1 flex justify-start items-center h-full border-b border-white/20 pb-4 pl-8 relative">
              
                 <div className="flex gap-12">
                    {navItemsRight.map((item) => (
                        <NavButton key={item.name} item={item} isActive={location.pathname === item.path} />
                    ))}
                 </div>
            </div>

        </div>

        {/* Mobile Nav Header */}
        <div className="md:hidden w-full px-6 flex justify-center items-center pb-4 border-b border-white/10 relative">
             <NavLink to="/" className="text-xl font-kalrav text-white tracking-widest">
                KALRAV '26
             </NavLink>
             <button onClick={() => setIsOpen(!isOpen)} className="text-white absolute right-6">
                  {isOpen ? <X /> : <Menu />}
             </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/80 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-6">
              {[...navItemsLeft, ...navItemsRight].map((item) => (
                <NavLink
                  key={item.name}
                  onClick={() => setIsOpen(false)}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "text-lg font-kalrav tracking-widest",
                    isActive ? "text-orange-400" : "text-white/70"
                  )}
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
