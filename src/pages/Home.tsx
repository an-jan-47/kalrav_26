import { useEffect, useState, Suspense, lazy } from 'react';
import { Layout } from '../components/Layout';
import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { PageBackground } from '../components/ui/PageBackground';
import HomeBg from '../assets/bg/home.webp';
import { fetchHomeData } from '../services/home';

// Lazy load below-the-fold components
const HorizontalScrollCarousel = lazy(() => import('../components/home/HorizontalScrollCarousel').then(module => ({ default: module.HorizontalScrollCarousel })));
const FAQ = lazy(() => import('../components/home/FAQ').then(module => ({ default: module.FAQ })));
const EventsSection = lazy(() => import('../components/home/EventsSection').then(module => ({ default: module.EventsSection })));

const Home = () => {
    const [homeData, setHomeData] = useState<{
        reviews: { id: number; image_link: string }[];
        legacies: { id: number; image_link: string }[];
    }>({ reviews: [], legacies: [] });
    const [, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchHomeData();
                setHomeData(data);
            } catch (error) {
                console.error("Failed to fetch home data", error);
            } finally {
                setLoading(false);
                
                window.dispatchEvent(new Event("kalrav-page-loaded"));
            }
        };
        loadData();
    }, []);

  return (
    <Layout noPadding={true} showBowArrow={true}>
      <PageBackground src={HomeBg} parallax={true} priority={true} />
      <div className="relative z-10">
        <Hero />
        <About />
        
        <Suspense fallback={<div className="h-96" />}>
          <EventsSection 
              events={homeData.legacies.map(l => ({
                  id: l.id,
                  image: l.image_link
              }))} 
          />
        </Suspense>

        {homeData.reviews.length > 0 && (
          <Suspense fallback={<div className="h-64" />}>
            <HorizontalScrollCarousel 
              title="REVIEWS BY ATTENDEES"
              items={homeData.reviews.map(r => ({
                  id: r.id,
                  image: r.image_link
              }))}
            />
          </Suspense>
        )}
        
        <Suspense fallback={<div className="h-screen" />}>
          <FAQ />
        </Suspense>
      </div>
    </Layout>
  );
};

export default Home;
