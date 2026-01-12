// src/components/WhyChooseUs.tsx
import { motion } from 'framer-motion';
import { schoolInfo } from '../data/schoolInfo';
import { 
  CheckCircle2, ShieldCheck, Users2, Trophy, HeartHandshake, 
  Lightbulb, GraduationCap, Clock 
} from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="scroll-mt-24 py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white 
                 dark:from-gray-950 dark:to-gray-900"
    >
      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
                       text-gray-900 dark:text-white tracking-tight"
          >
            Why Parents Trust Us
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            More than a school — we're partners in raising confident, capable, and compassionate young people.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 }
            }
          }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {schoolInfo.whyChooseUs.map((point, index) => {
            const key = point.title || `why-${index}`;
            // Simple icon rotation — feel free to make a better mapping later
            const icons = [CheckCircle2, ShieldCheck, Users2, Trophy, HeartHandshake, Lightbulb, GraduationCap, Clock];
            const Icon = icons[index % icons.length];

            return (
              <motion.div
                key={key}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.08
                }}
                className="group bg-white dark:bg-gray-800/60 backdrop-blur-sm 
                           rounded-2xl p-8 shadow-md border border-gray-100 
                           dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 
                           transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 
                                rounded-xl mb-6 bg-gradient-to-br from-green-500/10 
                                to-emerald-500/10 dark:from-green-600/20 dark:to-emerald-600/20 
                                text-green-600 dark:text-green-400 group-hover:scale-110 
                                transition-transform duration-300">
                  <Icon className="w-7 h-7" strokeWidth={2.4} />
                </div>

                <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                  {point.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {point.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;