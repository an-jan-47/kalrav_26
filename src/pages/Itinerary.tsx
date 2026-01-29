import { Layout } from '../components/Layout';
import { PageBackground } from '../components/ui/PageBackground';
import ItineraryBg from '../assets/bg/itenary.webp'


const Itinerary = () => {
  return (
    <Layout>
       <PageBackground src={ItineraryBg} parallax={true} opacity={0.4} />
      <div className="min-h-screen flex items-center justify-center font-kalrav">
        <h1 className="text-4xl text-white ">Coming Soon</h1>
      </div>
    </Layout>
  );
};

export default Itinerary;
