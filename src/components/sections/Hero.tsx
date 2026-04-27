import { motion } from 'motion/react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-gutter pt-stack-lg border-b border-white/5">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJWJmzmd2SH0oo6WS-vXhctlbUOG9x76If1UeLi7DqxERUgVSi5tU2LeUydm4xrRSDMsxXpVg3uW_RziBXtLDAqz6F5Z5konzRqzvfGfh8h5vuX46IJ4Pp1P5yPpMibx6jorBwoRNGCgCW-PGDWS9QfbQ3-jMCc8c9Lrnc8zH5xpHiBWfWRjectHlPGO_oPFVAYWGay8cyMY4Anj-R8hluvFGacwpH0Qls5OHbGwZBnYuAeQTBo0_uEqiHz9tZ07NhQKscl3Pckhw" 
          alt="Abstract dark background" 
          className="w-full h-full object-cover opacity-[0.15]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-container-max mx-auto text-center flex flex-col items-center gap-stack-md mt-stack-lg">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-container/30 bg-surface-container/50 backdrop-blur-md mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_10px_rgba(0,163,255,0.8)]"></span>
          <span className="font-label-caps text-on-surface-variant uppercase">Available for new opportunities</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-h1 text-h1 text-on-surface tracking-tight leading-tight max-w-4xl drop-shadow-2xl"
        >
          Luca Enea
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-h3 text-h3 text-primary-container/90 max-w-2xl font-light"
        >
          Junior Full Stack Developer <span className="text-outline-variant mx-2">·</span> AI-Augmented Workflow
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 mt-8"
        >
          <button onClick={() => scrollTo('projects')} className="bg-primary-container text-background px-8 py-4 rounded-lg font-label-caps uppercase tracking-widest hover:bg-primary transition-colors shadow-[0_0_30px_rgba(0,163,255,0.2)] hover:shadow-[0_0_40px_rgba(0,163,255,0.4)] border border-transparent">
            View Projects
          </button>
          <button onClick={() => scrollTo('contact')} className="bg-transparent border border-secondary-container text-secondary-container px-8 py-4 rounded-lg font-label-caps uppercase tracking-widest hover:bg-secondary-container/10 transition-colors backdrop-blur-sm">
            Get in touch
          </button>
        </motion.div>
      </div>
    </section>
  );
}
