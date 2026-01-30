import { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Home = lazy(() => import("./pages/Home"));
const Competitions = lazy(() => import("./pages/Competitions"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Team = lazy(() => import("./pages/Team"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const Itinerary = lazy(() => import("./pages/Itinerary"));
const Merch = lazy(() => import("./pages/Merch"));

import ScrollToTop from "./components/ui/ScrollToTop";
import SEO from "./components/SEO";
import Loader from "./components/ui/Loader";

function App() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show loader on initial visit to home page
    if (location.pathname === "/") {
      setShowLoader(true);
      
      const handleLoad = () => {
        document.fonts.ready.then(() => {
           setIsLoading(false);
        });
      };

      // Wait for Home component to signal it's ready (data fetched)
      window.addEventListener("kalrav-page-loaded", handleLoad);
      
      // Safety timeout (10s) in case event doesn't fire
      const timeout = setTimeout(() => {
         handleLoad();
      }, 10000);

      return () => {
        window.removeEventListener("kalrav-page-loaded", handleLoad);
        clearTimeout(timeout);
      };
    } else {
      setShowLoader(false);
    }
  }, []); // Empty dependency array ensures this runs only on mount (refresh)

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      <ScrollToTop />
      <SEO />
      <Analytics />
      <SpeedInsights />
      
      {showLoader && (
        <Loader 
          isLoading={isLoading} 
          onComplete={handleLoaderComplete} 
        />
      )}

      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/merch" element={<Merch />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
