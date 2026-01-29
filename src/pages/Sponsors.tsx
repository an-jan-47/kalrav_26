import { Layout } from '../components/Layout';
import { PageBackground } from '../components/ui/PageBackground';
import SponserBg from '../assets/bg/sponser.webp'

// const SponsorCard = ({ name, tier }: { name: string, tier: string }) => (
//   <div>
//     <h3>{name}</h3>
//     <p>{tier}</p>
//   </div>  
// );

const Sponsors = () => {
    // Dummy Data
  return (
    <Layout>
      <PageBackground src={SponserBg} parallax={true} opacity={0.4} />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl font-kalrav text-center text-white mb-16 tracking-widest">OFFICIAL PARTNERS</h1>
        <h2 className="text-3xl font-kalrav text-center text-white mb-16 tracking-widest">Coming Soon...</h2>
        
        
      </div>
    </Layout>
  );
};

export default Sponsors;
