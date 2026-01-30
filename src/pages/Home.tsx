import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { HorizontalScrollCarousel } from '../components/home/HorizontalScrollCarousel';
import { FAQ } from '../components/home/FAQ';
import { PageBackground } from '../components/ui/PageBackground';
import { EventsSection } from '../components/home/EventsSection';
import HomeBg from '../assets/bg/home.webp';
import { fetchHomeData } from '../services/home';

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
                // Signal that the page is ready (data fetched + mounted)
                window.dispatchEvent(new Event("kalrav-page-loaded"));
            }
        };
        loadData();
    }, []);

  return (
    <Layout noPadding={true} showBowArrow={true}>
      <PageBackground src={HomeBg} parallax={true}/>
      <div className="relative z-10">
        <Hero />
        <About />
        
        <EventsSection 
            events={homeData.legacies.map(l => ({
                id: l.id,
                image: l.image_link
            }))} 
        />

        {homeData.reviews.length > 0 && (
          <HorizontalScrollCarousel 
            title="REVIEWS BY ATTENDEES"
            items={homeData.reviews.map(r => ({
                id: r.id,
                image: r.image_link
            }))}
          />
        )}
        
        <FAQ />
      </div>
    </Layout>
  );
};

export default Home;
