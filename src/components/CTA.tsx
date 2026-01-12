// src/components/CTA.tsx
import { motion } from 'framer-motion';
import { MessageCircleHeart, ArrowRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { schoolInfo } from '../data/schoolInfo';

// Testimonials (keep or replace with real ones)
const testimonials = [
  {
    name: "Aisha Muhammad",
    role: "Parent of Year 5 student",
    text: "The transformation in my daughter's confidence is incredible. Best decision we ever made!",
    rating: 5,
  },
  {
    name: "Dr. Ibrahim Yusuf",
    role: "Parent & Medical Doctor",
    text: "Excellent academics balanced with strong character building. Highly recommended!",
    rating: 5,
  },
  {
    name: "Fatima Bello",
    role: "Parent of twin boys",
    text: "The teachers truly care. My boys look forward to school every single day.",
    rating: 5,
  },
];

const CTA = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="cta"
      className="relative py-20 md:py-32 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
    >
      <div className="container mx-auto px-5 md:px-8 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Testimonials – first on mobile */}
          <div className="space-y-8 order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
              What Parents Say
            </h3>

            <div className="relative min-h-[200px] md:min-h-[180px]">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: i === current ? 1 : 0,
                    y: i === current ? 0 : 20,
                  }}
                  transition={{ duration: 0.7 }}
                  className={`absolute inset-0 ${i === current ? '' : 'pointer-events-none'}`}
                >
                  <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-base md:text-lg font-light italic leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
                      "{t.text}"
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-gray-500 dark:text-gray-400">{t.role}</p>
                      </div>
                      <div className="flex text-yellow-500">
                        {Array(5).fill(0).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${idx < t.rating ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === current
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main CTA – second on mobile */}
          <div className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              {schoolInfo.ctaText}
            </h2>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Join the families who already trust us with their children’s future.
            </p>

            {/* Big, friendly WhatsApp button */}
            <motion.a
              href={schoolInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-4 px-10 py-5 
                         bg-green-600 hover:bg-green-700 
                         text-white font-semibold text-lg md:text-xl
                         rounded-full shadow-lg hover:shadow-xl 
                         transition-all duration-300 w-full max-w-sm mx-auto lg:mx-0"
            >
              <MessageCircleHeart className="w-7 h-7" strokeWidth={2} />
              <span>Chat on WhatsApp Now</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.a>

            {/* Trust signals – compact & centered */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-base text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Reply within minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span>Free school tour</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;