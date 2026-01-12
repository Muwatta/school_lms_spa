// src/components/Hero.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { schoolInfo } from '../data/schoolInfo';

const slides = [
  {
    url: "https://th.bing.com/th/id/OIP.x_K-njqvMlw_Nm0CAfbGawHaD0?w=318&h=179&c=7&r=0&o=7&pid=1.7&rm=3",
    alt: "Happy students in modern classroom",
  },
  {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    alt: "Kids running joyfully outdoors at school",
  },
  {
    url: "https://media.istockphoto.com/id/803141126/photo/kids-showing-hands-during-a-lesson-at-an-elementary-school.webp?a=1&b=1&s=612x612&w=0&k=20&c=9U1tWJsdo_Lge3sjKEVC5tQgZtL3pVudMId8bhMgtZs=",
    alt: "Group of students walking to school with backpacks",
  },
  {
    url: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    alt: "Beautiful school building with green campus",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [greetCycle, setGreetCycle] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Accessibility: respect user preference for reduced motion
  const prefersReducedMotion = useReducedMotion();

  // Retrigger the welcome animation every 10s (paused on hover/touch or if user prefers reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isPaused) return;
    const t = setInterval(() => setGreetCycle((g) => g + 1), 10000);
    return () => clearInterval(t);
  }, [isPaused, prefersReducedMotion]);

  const prefix = 'Welcome to ';
  const prefixChars = prefix.split('');
  const nameChars = schoolInfo.name.split('');

  const headingContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
  } as const;

  const letterVariant = {
    hidden: { y: 22, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 16 } },
  } as const;



  return (
    <section
      className="relative min-h-[90vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 8000)}
    >
      {/* Background Slides – beautiful crossfade + subtle zoom */}
      <AnimatePresence initial={false}>
        <motion.img
          key={current}
          src={slides[current].url}
          alt={slides[current].alt}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.68] saturate-[1.05]"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 2.2,
              ease: [0.215, 0.61, 0.355, 1],
            },
          }}
          exit={{
            opacity: 0,
            scale: 1.06,
            transition: { duration: 1.6, ease: "easeIn" },
          }}
          loading={current === 0 ? "eager" : "lazy"}
        />
      </AnimatePresence>

      {/* Overlay – stronger at bottom, softer at top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

      {/* Main Content – elegant staggered entrance */}
      <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-16 text-center text-white max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="space-y-8 md:space-y-10"
        >
          <motion.h1
            key={greetCycle}
            variants={headingContainer}
            initial="hidden"
            animate="visible"
            className="font-black leading-[1.02] tracking-tight drop-shadow-2xl max-w-[min(100%,60ch)] mx-auto break-words text-[clamp(1.5rem,5.2vw,4rem)]"
          >
            <span className="block overflow-hidden">
              <motion.span className="inline-block mr-2 align-middle text-amber-300" variants={letterVariant}>
                <Star className="w-6 h-6" />
              </motion.span>

              <motion.span className="inline-block whitespace-normal" aria-hidden>
                {prefixChars.map((ch, i) => (
                  <motion.span
                    key={`p-${i}`}
                    className="inline-block"
                    variants={letterVariant}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </motion.span>
                ))}

                <motion.span
                  className="inline-block ml-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-pink-300 to-amber-300"
                  aria-hidden
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.03, 1], opacity: [1, 0.98, 1] }}
                  transition={prefersReducedMotion ? undefined : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {nameChars.map((ch, i) => (
                    <motion.span key={`n-${i}`} className="inline-block" variants={letterVariant}>
                      {ch === ' ' ? '\u00A0' : ch}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 18,
              delay: 0.7,
            }}
            className="text-[clamp(1rem,2.2vw,1.75rem)] font-light opacity-95 tracking-wide"
          >
            {schoolInfo.tagline}
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 14,
              delay: 1.0,
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href={`${schoolInfo.whatsappLink}?text=${encodeURIComponent("Hello! I'm interested in " + schoolInfo.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ translateY: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-2xl hover:shadow-[0_20px_40px_rgba(37,213,102,0.25)] transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/30"
                aria-label={`Chat with ${schoolInfo.name} on WhatsApp`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 1.479 0 .463.213.926.242 1.023.03.099.415 1.05 1.003 2.07.588 1.02 1.68 1.97 2.94 2.46.39.168.69.276.92.354.386.155.736.132 1.014.08.315-.058 1.02-.417 1.315-.825.295-.408.295-.758.206-.825-.089-.067-.335-.099-.632-.198z" />
                </svg>
                <span>Chat on WhatsApp</span>
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>

              <motion.a
                href={`${schoolInfo.whatsappLink}?text=${encodeURIComponent("Hi, I'd like to book a tour at " + schoolInfo.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ translateY: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-3 rounded-full font-medium hover:bg-white/8 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                aria-label={`Book a tour at ${schoolInfo.name}`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Book a tour</span>
              </motion.a>
            </div>

            <div className="mt-4 text-sm text-white/90 flex items-center justify-center gap-3">
              <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              <span>{schoolInfo.hours.regular}</span>
              <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs">Free tour</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Dots – elegant & minimal */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
              i === current
                ? 'bg-white scale-130 shadow-lg shadow-white/40'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;