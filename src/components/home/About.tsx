import ScrollReveal from '../ui/ScrollReveal';

export const About = () => {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-kalrav-orange/10 blur-[80px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-kalrav-accent/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col gap-20">
        
        {/* About Us */}
        <div className="flex flex-col items-start text-left max-w-4xl">
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-kalrav text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-8 drop-shadow-lg uppercase tracking-wider">
            About Us
          </h2>

          <ScrollReveal 
              baseRotation={1.2} 
              baseOpacity={0.1}
              blurStrength={2}
              containerClassName="mb-8"
              textClassName="text-gray-100 text-lg md:text-xl font-kalrav-body font-normal leading-loose tracking-wide text-left drop-shadow-sm whitespace-pre-line"
          >
            {`The revival of Kalrav, the annual extravaganza organized by Deen Dayal Upadhyaya, brings with it an electrifying anticipation! With over 20,000 students from 100+ colleges nationwide eagerly awaiting its return, Kalrav holds immense significance.

This year's Kalrav pledges an unforgettable experience, showcasing a myriad of delights from tantalizing cuisine to vibrant music and playful activities. The lineup promises an even grander musical spectacle, building upon the legacy of past performances featuring icons like Honey Singh, Jubin Nautiyal, and Guru Randhawa.

With renowned artists, musicians, and performers gracing the stage, the campus is set to transform into a captivating mosaic of creativity and camaraderie.`}
            
          </ScrollReveal>

           <ScrollReveal 
              baseRotation={0} 
              baseOpacity={0.1}
              containerClassName="mt-4"
              textClassName="text-orange-400 text-xl md:text-2xl font-kalrav-body font-medium tracking-wider leading-relaxed text-left drop-shadow-[0_0_15px_rgba(251,146,60,0.4)]"
              enableBlur={true}
              blurStrength={2}
          >
            So, mark your calendars and immerse yourself in the enchantment of Kalrav.
          </ScrollReveal>
        </div>

        {/* About Theme */}
        <div className="flex flex-col items-end text-right max-w-4xl ml-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-kalrav text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-200 to-white mb-8 drop-shadow-lg uppercase tracking-wider">
            About Theme
          </h2>

           <ScrollReveal 
              baseRotation={-1.2} 
              baseOpacity={0.1}
              blurStrength={2}
              containerClassName="mb-8"
              textClassName="text-gray-100 text-lg md:text-xl font-kalrav-body font-normal leading-loose tracking-wide text-right drop-shadow-sm whitespace-pre-line"
          >
            {`तमःक्षयः (Tamaḥkṣayaḥ)  End of Darkness represents the breaking point where silence ends and expression begins. It symbolizes the destruction of ignorance, fear, and limitation, making way for creativity, courage, and identity.

Kalrav ’26 embraces this moment of transformation where chaos is confronted, voices rise from the shadows, and culture emerges stronger, louder, and unapologetically alive.`}
          </ScrollReveal>      
        </div>
      </div>      
    </section>
  );
};
