// src/components/Classes.tsx
import { motion } from 'framer-motion';
import { schoolInfo } from '../data/schoolInfo';
import { BookOpen, GraduationCap, Users, Brain, Heart, Palette } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Primary: BookOpen,
  Secondary: GraduationCap,
  Preschool: Users,
  'Pre-Primary': Heart,
  Advanced: Brain,
  Creative: Palette,
};

const Classes = () => {
  return (
    <section
      id="classes"
      className="scroll-mt-24 py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-gray-100 
                 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"
    >
      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Where Every Child Thrives
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            From joyful early years to confident young adults — our programs nurture curiosity, 
            character, and academic excellence in a safe, supportive environment.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
          }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {schoolInfo.programs.map((cls: any, index: number) => {
            const IconComponent = iconMap[cls.title] || BookOpen;

            return (
              <motion.div
                key={cls.title}
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.92 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 16,
                  delay: index * 0.08
                }}
                className="group relative bg-white dark:bg-gray-800/70 backdrop-blur-sm 
                           rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                           transition-all duration-400 hover:-translate-y-3 border 
                           border-gray-100 dark:border-gray-700"
              >
                {/* Subtle top gradient accent */}
                <div className="h-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500" />

                <div className="p-7 md:p-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 
                                  rounded-xl mb-6 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 
                                  dark:from-indigo-600/20 dark:to-blue-600/20 
                                  text-indigo-600 dark:text-indigo-400 group-hover:scale-110 
                                  transition-transform duration-300">
                    <IconComponent className="w-7 h-7" strokeWidth={2.4} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cls.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {cls.description}
                  </p>

                  {/* Richer details */}
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Ages {cls.ages}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Max {cls.maxStudents} students per class
                    </li>
                    {cls.features?.map((f: string) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <a
                      href={`${schoolInfo.whatsappLink}?text=${encodeURIComponent(`Hi, I'm interested in ${cls.title} at ${schoolInfo.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition"
                    >
                      Enquire about {cls.title}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Classes;