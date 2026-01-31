import { Layout } from '../components/Layout';
import { PageBackground } from '../components/ui/PageBackground';
import ItineraryBg from '../assets/bg/itenary.webp'


const Itinerary = () => {
  return (
    <Layout>
       <PageBackground src={ItineraryBg} parallax={true} opacity={0.5} />
      <div className="relative z-10 min-h-screen flex items-center justify-center font-kalrav">
        <h1 className="text-4xl text-white ">COMING SOON</h1>
      </div>
    </Layout>
  );
};

export default Itinerary;
