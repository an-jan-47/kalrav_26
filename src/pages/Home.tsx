import { Layout } from '../components/Layout';
import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <About />
      
      {/* Placeholder for Events */}
      <section className="py-20 px-6">
        <h2 className="text-center text-4xl font-kalrav mb-12">PAST SOCIETY EVENTS</h2>
        <div className="grid md:grid-cols-3 gap-8 container mx-auto">
             {[1, 2, 3].map(i => (
                 <div key={i} className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
             ))}
        </div>
      </section>

      {/* Placeholder for Reviews */}
      <section className="py-20 px-6">
          <h2 className="text-center text-4xl font-kalrav mb-12">REVIEWS BY ATTENDEES</h2>
           <div className="flex flex-wrap justify-center gap-4 container mx-auto">
             {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="w-48 h-64 bg-gray-800/50 rounded-lg border border-white/5"></div>
             ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
