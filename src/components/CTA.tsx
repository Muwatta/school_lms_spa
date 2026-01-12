// src/components/CTA.tsx
import { motion } from 'framer-motion';
import { MessageCircleHeart, ArrowRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { schoolInfo } from '../data/schoolInfo';

// Testimonials data (replace with real ones later)
const testimonials = [
  {
    name: "Aisha Muhammad",
    role: "Parent of Year 5 student",
    text: "The transformation in my daughter's confidence since joining is incredible. Best decision we ever made!",
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
      className="relative py-28 md:py-40 overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-700 text-white"
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,white_0%,transparent_65%)]"
        />
      </div>

      <div className="relative container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* Testimonials Column */}
          <div className="space-y-10 order-2 lg:order-1">
            <h3 className="text-3xl md:text-4xl font-bold text-center lg:text-left">
              What Parents Say
            </h3>

            <div className="relative min-h-[260px] md:min-h-[220px]">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: i === current ? 1 : 0,
                    y: i === current ? 0 : 30,
                  }}
                  transition={{ duration: 0.8 }}
                  className={`absolute inset-0 ${i === current ? '' : 'pointer-events-none'}`}
                >
                  <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{t.name}</p>
                        <p className="text-white/70 text-sm">{t.role}</p>
                      </div>
                    </div>

                    <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-6">
                      "{t.text}"
                    </p>

                    <div className="flex text-yellow-300">
                      {Array(5).fill(0).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-5 h-5 ${idx < t.rating ? 'fill-current' : 'stroke-current'}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-4 h-4 rounded-full transition-all duration-400 border-2 border-white ${
                    i === current ? 'bg-white scale-125' : 'bg-transparent hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA Column */}
          <div className="space-y-10 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-2xl">
              {schoolInfo.ctaText}
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-light opacity-95 leading-relaxed">
              Join the families who already trust us with their children’s future.
            </p>

            <motion.a
              href={schoolInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center gap-5 px-12 py-7 
                         bg-[#25D366] hover:bg-[#1fb956] rounded-full font-bold text-2xl md:text-3xl
                         shadow-2xl hover:shadow-[0_30px_70px_rgba(37,213,102,0.55)]
                         transition-all duration-400 overflow-hidden border-2 border-white/20 mx-auto lg:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <MessageCircleHeart className="w-10 h-10 relative z-10" strokeWidth={2} />
              <span className="relative z-10">Chat on WhatsApp Now</span>
              <ArrowRight className="w-8 h-8 relative z-10 group-hover:translate-x-3 transition-transform" />
            </motion.a>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-6 text-lg opacity-90">
              <div className="flex items-center gap-3">
                <span className="text-emerald-300 text-2xl">✓</span>
                <span>Reply within minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-300 text-2xl">✓</span>
                <span>Free school tour & consultation</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;