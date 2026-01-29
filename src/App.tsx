import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Home = lazy(() => import("./pages/Home"));
const Competitions = lazy(() => import("./pages/Competitions"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Team = lazy(() => import("./pages/Team"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const Itinerary = lazy(() => import("./pages/Itinerary"));

import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Analytics />
      <SpeedInsights />
      <Suspense
        fallback={
          <div className="min-h-screen bg-kalrav-dark flex items-center justify-center text-white font-kalrav text-xl tracking-widest animate-pulse">
            LOADING ....
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
