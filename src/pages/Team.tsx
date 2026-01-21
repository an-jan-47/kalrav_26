import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { LazyImage } from '../components/ui/LazyImage';

const TeamMember = ({ name, role, image }: { name: string, role: string, image: string }) => (
  <div>
    <h3>{name}</h3>
    <p>{role}</p>
    <LazyImage src={image} alt={name} />
  </div>  
);

const Team = () => {
    

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
            <h1 className="text-5xl font-kalrav text-white mb-4 tracking-widest drop-shadow-[0_0_10px_rgba(109,40,217,0.5)]">MEET THE TEAM</h1>
            
        </div>

        
      </div>
    </Layout>
  );
};

export default Team;
