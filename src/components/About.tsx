// src/components/About.tsx
import { motion } from 'framer-motion';
import { schoolInfo } from '../data/schoolInfo';
import { 
  Trophy, 
  HeartHandshake, 
  Lightbulb, 
  Users, 
  Star, 
  BookOpen 
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Excellence: Trophy,
  Integrity: HeartHandshake,
  Innovation: Lightbulb,
  Community: Users,
  Leadership: Star,
  Learning: BookOpen,
  // Add your real values here
};

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white 
                 dark:from-gray-950 dark:to-gray-900"
    >
      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 
                       text-gray-900 dark:text-white tracking-tight"
          >
            About {schoolInfo.name}
          </motion.h2>

          {/* ... rest of the intro paragraphs remain the same ... */}
        </div>

        {/* Colorful Values Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid gap-6 md:grid-cols-3"
        >
          {schoolInfo.about.values.map((value, index) => {
            const key = value.title || `val-${index}`;
            const IconComponent = iconMap[value.title] || BookOpen;

            return (
              <motion.div
                key={key}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1
                }}
                className="bg-white dark:bg-gray-800/60 backdrop-blur-sm 
                           border border-gray-200 dark:border-gray-700 
                           rounded-2xl p-8 shadow-sm hover:shadow-xl 
                           transition-all duration-300 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 
                                rounded-full mb-6
                                bg-gradient-to-br from-blue-500 to-green-500
                                dark:from-blue-600 dark:to-green-600
                                text-white shadow-md group-hover:scale-110 
                                group-hover:shadow-lg transition-all duration-300">
                  <IconComponent className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {value.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;