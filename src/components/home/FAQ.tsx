import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const questions = [
  {
    question:"What Is Kalrav?",
    answer:"Annual Culture Fest of. Deen Dayal Upadhyaya College,University of Delhi. To celebrate a year of togetherness with diversity and essence of Indian tradition , KALRAV- The cultural fest of Deen Dayal Upadhaya College,University of Delhi is organised"

  },
  {
    question: "When and where is Kalrav '26 taking place?",
    answer: "Kalrav '26 will be held soon, at the main campus grounds. The venue maps will be shared on our social media handles closer to the event."
  },
  {
    question: "How can I register for the competitions?",
    answer: "Registration opens on February 1st, 2026. You can register directly through this website or visit our on-campus desks. Early bird registrations get special perks!"
  },
  {
    question: "Are outsiders allowed to participate?",
    answer: "Yes! Kalrav '26 is an free and open-for-all fest. Students from other colleges can participate in competitions and attend events, provided they carry their college ID cards."
  },
  {
    question: "What is the theme Theme about?",
    answer: "Explaination of theme"
  },
  {
    question:"Rules And Regulations",
    answer:"Everyone is requested to follow these instructions: Entry starts from 8:00 AM onwards.  Gates close at 2:00 PM sharp. Please be on time.  Only college students are allowed.  Bring your college ID along with government issued ID (Aadhar, PAN Card, Driving License etc.) to avoid any hassle.  Everyone must install the ( sponser 1) app. It would be checked at the time of entry. Individuals are expected to install the sponsoring app beforehand to ensure smooth entry.  No food items will be allowed inside the concert ground.  Bring cash for all transactions due to possible congestion in the network.  No cars allowed in campus"
  }
];

const AccordionItem = ({ 
  question, 
  answer, 
  isOpen, 
  onClick,
  index 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
  index: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-white/10 last:border-none"
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-xl font-medium font-kalrav-body transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
          {question}
        </span>
        <span className={`ml-4 p-2 rounded-full border border-white/10 transition-all duration-300 ${isOpen ? 'bg-white text-black rotate-180' : 'bg-transparent text-white group-hover:bg-white/10'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/60 leading-relaxed max-w-3xl font-kalrav-body">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-kalrav mb-6">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-kalrav-body">
            Everything you need to know about Kalrav '26. Can't find your answer? Reach out to us directly.
          </p>
        </motion.div>

        <div className="bg-gray-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/5">
          {questions.map((q, i) => (
            <AccordionItem
              key={i}
              question={q.question}
              answer={q.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
