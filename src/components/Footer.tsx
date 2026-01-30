import { motion } from 'framer-motion';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import BowArrowAnimation from './ui/BowArrowAnimation';

interface FooterProps {
  showBowArrow?: boolean;
}

export const Footer = ({ showBowArrow = false }: FooterProps) => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/kalrav_/" },
    { icon: Youtube, href: "https://youtube.com/@kalravdduc?si=iIMVu6A4DkCEPjKb" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/kalrav-dduc-4642b32b5/?originalSubdomain=in" }
  ];

  return (
    <footer className="relative w-full py-12 mt-10 border-t border-white/5 flex flex-col items-center justify-center gap-8 z-10 bg-transparent">
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl ld:text-6xl font-kalrav tracking-widest text-white drop-shadow-2xl">
          KALRAV<span className="text-orange-500">'26</span>
        </h2>
      </motion.div>

      {/* Socials */}
      <div className="flex gap-8">
        {socialLinks.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white/60 hover:text-orange-400 transition-colors duration-300 p-3 rounded-full bg-white/5 border border-white/5 hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          >
            <item.icon size={24} />
          </motion.a>
        ))}
      </div>
      
      {/* Scroll-Synced Bow & Arrow Animation */}
      {showBowArrow && <BowArrowAnimation />}

      {/* Made By
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-white/40 text-sm font-medium tracking-wide mt-4"
      >
        Made with <span className="text-orange-500 animate-pulse">❤</span> by Tech Team
      </motion.p> */}
    </footer>
  );
};

