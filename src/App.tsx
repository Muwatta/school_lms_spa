// src/App.tsx
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Classes from './components/Classes';
import WhyChooseUs from './components/WhyChooseUs';
import CTA from './components/CTA';
import Location from './components/Location';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30 
                     dark:from-gray-950 dark:via-gray-900 dark:to-gray-800/70">
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero />
        <About />
        <Classes />
        <WhyChooseUs />
        <CTA />
        <Location />
      </motion.main>

      <Footer />

      {/* Chatbot (floating) */}
      <Chatbot />
    </div>
  );
};

export default App;