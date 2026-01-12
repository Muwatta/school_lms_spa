import { motion } from 'framer-motion';

type Props = {
  data: typeof import('../data/schoolInfo').schoolInfo;
};

export default function AdmissionCTA({ data }: Props) {
  // Optional: Add custom pre-filled message
  const message = `Hello! 👋\nI'm interested in enrolling at ${data.name}.\nCan you please share:\n• Admission requirements\n• Available classes\n• Application process\nThank you!`;

  const whatsappLink = `${data.whatsappLink}?text=${encodeURIComponent(message)}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="my-16 md:my-24 mx-4 md:mx-8 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-2xl overflow-hidden"
    >
      <div className="px-6 py-16 md:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
          {data.ctaText}
        </h2>

        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
          Get instant answers about admission, fees, and classes
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 px-10 py-6 rounded-2xl text-xl md:text-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-500/30 focus:outline-none focus:ring-4 focus:ring-green-400"
        >
          <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 1.479 0 .463.213.926.242 1.023.03.099.415 1.05 1.003 2.07.588 1.02 1.68 1.97 2.94 2.46.39.168.69.276.92.354.386.155.736.132 1.014.08.315-.058 1.02-.417 1.315-.825.295-.408.295-.758.206-.825-.089-.067-.335-.099-.632-.198z" />
          </svg>
          <span>Chat on WhatsApp Now</span>
        </a>

        <p className="mt-8 text-sm md:text-base opacity-75">
          Most parents get a reply within minutes during school hours
        </p>
      </div>
    </motion.section>
  );
}