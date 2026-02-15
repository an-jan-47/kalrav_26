import { useEffect, useState } from "react";
import loaderVideo from "../../assets/loader/loader.mp4";

interface LoaderProps {
  isLoading: boolean; 
  onComplete: () => void; 
}

const Loader = ({ isLoading, onComplete }: LoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Lock scroll when loader is active
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      
      setIsExiting(true);
   
      const timer = setTimeout(() => {
        onComplete();
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 pointer-events-none will-change-opacity ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        className="w-[35%] sm:w-[25%] md:w-[10%] lg:w-[8%] min-w-[100px] max-w-[300px] h-auto mix-blend-screen"
        src={loaderVideo}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default Loader;
