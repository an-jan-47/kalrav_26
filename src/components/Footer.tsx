import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-kalrav-dark relative overflow-hidden pt-20 pb-10">
        
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kalrav-purple to-transparent opacity-50" />

      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-kalrav text-white mb-6 tracking-widest drop-shadow-[0_0_10px_rgba(109,40,217,0.5)]">
          KALRAV '26
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto font-light">
          The biggest cultural fest of the year.
        </p>

        <div className="flex justify-center space-x-6 mb-12">
          {[Instagram, Twitter, Linkedin, Github].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-400 hover:text-kalrav-purple transition-colors transform hover:scale-110"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        <div className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Kalrav Fest. All rights reserved.
        </div>
      </div>
      
     {/*glow*/}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-kalrav-purple/20 blur-[100px] rounded-full pointer-events-none" />
    </footer>
  );
};

