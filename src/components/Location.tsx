// src/components/Location.tsx
import { motion } from 'framer-motion';
import { MapPin, Clock, MessageCircle } from 'lucide-react'; 
import { schoolInfo } from '../data/schoolInfo';


const Location = () => {
  return (
    <section
      id="location"
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
            Visit Us Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            We're conveniently located in the heart of Jos, Plateau — come see our vibrant campus!
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Map – bigger & responsive */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70, damping: 16 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <iframe
              src={schoolInfo.mapEmbed}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[500px]"
            />
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.15 }}
            className="bg-white dark:bg-gray-800/70 backdrop-blur-sm 
                       rounded-2xl p-8 md:p-10 shadow-lg border 
                       border-gray-100 dark:border-gray-700"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 
                                flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <MapPin className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Our Address
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {schoolInfo.location.fullAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-950/50 
                                flex items-center justify-center text-green-600 dark:text-green-400">
                  <Clock className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    School Hours
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {schoolInfo.hours.regular}
                  </p>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={schoolInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 
                             text-white px-8 py-4 rounded-full font-semibold text-lg 
                             shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <MessageCircle className="w-6 h-6" />
                  Get Directions & Book a Tour
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;