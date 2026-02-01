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
      <PageBackground src={SponserBg} parallax={true} opacity={0.9} />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center font-kalrav pt-20">
        <h2 className="text-3xl md:text-4xl text-white/80 tracking-widest">COMING SOON</h2>
      </div>
    </Layout>
  );
};

export default Sponsors;
