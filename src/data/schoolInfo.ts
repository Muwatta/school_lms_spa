// src/data/schoolInfo.ts
export const schoolInfo = {
  name: "AMUN Bright Minds Academy",
  tagline: "Empowering Future Leaders",
  slogan: "Excellence • Integrity • Innovation",

  location: {
    city: "Jos North",
    state: "Plateau",
    country: "Nigeria",
    fullAddress: "Jos North, Plateau State, Nigeria",
    coordinates: { lat: 9.8965, lng: 8.8583 }, // Approximate Jos North coords – update if exact
  },

  contact: {
    whatsapp: "https://wa.me/+2348036045750?text=Hello%20Amun%20Bright%20Minds%20Academy%2C%20I'm%20interested%20in%20enrolling%20my%20child",
    phone: "+234 803 604 5750",
    email: "info@amunbrightminds.com", // change to real
  },

  hours: {
    regular: "Monday – Friday: 8:00 AM – 4:00 PM",
    office: "Admin Office: 7:30 AM – 5:00 PM",
    tours: "School tours by appointment",
  },

  navItems: [
    { label: "About", href: "#about" },
    { label: "Programs", href: "#classes" }, // better than "Classes"
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Visit Us", href: "#location" },
  ],

  about: {
    overview:
      "Amun Bright Minds Academy is a nurturing, forward-thinking school committed to holistic education that builds confident, capable, and compassionate young minds.",
    mission:
      "To provide quality education that inspires curiosity, fosters strong values, and equips every child with the knowledge, skills, and character for a successful future.",
    values: [
      { title: "Excellence", desc: "We strive for the highest standards in teaching, learning, and personal growth." },
      { title: "Integrity", desc: "Honesty, transparency, and ethical behavior guide everything we do." },
      { title: "Innovation", desc: "We embrace creativity, modern teaching methods, and forward-thinking approaches." },
    ],
  },

  programs: [
    {
      title: "Creche",
      ages: "3 – 5 years",
      maxStudents: 12,
      description:
        "Gentle, nurturing early years program focused on play, safety, social-emotional development, and joyful discovery.",
      features: ["Play-based learning", "Daily routines & care", "Qualified early childhood educators"],
    },
    {
      title: "Primary",
      ages: "6 – 10 years",
      maxStudents: 22,
      description:
        "Strong foundational education emphasizing literacy, numeracy, critical thinking, and character formation.",
      features: ["Bilingual option (English + Hausa)", "After-school enrichment clubs", "Personalized learning support"],
    },
    {
      title: "Secondary",
      ages: "11 – 16 years",
      maxStudents: 25,
      description:
        "Rigorous curriculum preparing students for WAEC, JAMB, and beyond, with focus on leadership and career readiness.",
      features: ["STEM labs & practicals", "Exam coaching", "Career guidance & counseling"],
    },
  ],

  whyChooseUs: [
    {
      title: "Experienced & Passionate Teachers",
      desc: "Qualified educators who genuinely care and continuously grow professionally.",
    },
    {
      title: "Modern & Safe Facilities",
      desc: "Well-equipped classrooms, science labs, library, playground, and secure environment.",
    },
    {
      title: "Proven Track Record",
      desc: "Consistently outstanding results and happy, confident graduates.",
    },
    {
      title: "Small Class Sizes",
      desc: "Personalized attention with maximum 22–25 students per class.",
    },
    {
      title: "Holistic Development",
      desc: "Balanced focus on academics, morals, sports, arts, and life skills.",
    },
  ],

  cta: {
    headline: "Ready to Give Your Child the Best Start?",
    subheadline: "One quick message and we’ll guide you through the next steps.",
    buttonText: "Chat with Us on WhatsApp",
    whatsappLink: "https://wa.me/+2348036045750?text=Hello%20Amun%20Bright%20Minds%20Academy%2C%20I'm%20interested%20in%20enrolling%20my%20child",
  },

  map: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.512!2d8.8583!3d9.8965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTMnNDcuNCJOIDjCwDUxJzI5LjkiRQ!5e0!3m2!1sen!2sng!4v1700000000000",
  },

  // Compatibility aliases used by components expecting flat properties
  whatsappLink: "https://wa.me/+2348036045750?text=Hello%20Amun%20Bright%20Minds%20Academy%2C%20I'm%20interested%20in%20enrolling%20my%20child",
  ctaText: "Ready to Give Your Child the Best Start?",

  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.512!2d8.8583!3d9.8965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTMnNDcuNCJOIDjCwDUxJzI5LjkiRQ!5e0!3m2!1sen!2sng!4v1700000000000",
} as const;