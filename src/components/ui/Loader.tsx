import { useEffect, useState } from "react";
import loaderVideo from "../../assets/loader/loader.mp4";

interface LoaderProps {
  isLoading: boolean; 
  onComplete: () => void; 
}

const Loader = ({ isLoading, onComplete }: LoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);

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
      style={{ backgroundColor: "#000000" }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 pointer-events-none ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        className="w-[35%] sm:w-[25%] md:w-[10%] lg:w-[8%] min-w-[100px] max-w-[300px] h-auto"
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
