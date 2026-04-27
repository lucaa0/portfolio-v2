import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="max-w-container-max mx-auto px-gutter py-stack-lg relative z-10 border-b border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-8 bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-10 md:p-14 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-container/50 to-transparent opacity-50"></div>
          
          <h3 className="font-h2 text-h2 text-on-surface mb-stack-md flex items-center gap-4 relative z-10">
            <span className="material-symbols-outlined text-primary-container text-[32px]">person</span>
            About me
          </h3>
          
          <p className="font-body-lg text-on-surface-variant max-w-2xl relative z-10 leading-relaxed">
            Sviluppatore full stack junior appassionato di web moderno, design e strumenti AI. 
            Mi concentro sulla creazione di interfacce utente eleganti e performanti, supportate da 
            architetture back-end solide. Il mio approccio combina la precisione tecnica con un 
            forte senso estetico, utilizzando l'intelligenza artificiale per ottimizzare il flusso 
            di lavoro e spingere i limiti di ciò che è possibile sul web.
          </p>
        </motion.div>

        <div className="md:col-span-4 flex flex-col gap-gutter">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 glass-card rounded-xl p-8 flex flex-col justify-center items-start hover:border-secondary-container/50"
          >
            <span className="material-symbols-outlined text-secondary-container mb-4 text-[28px]">code_blocks</span>
            <h4 className="font-h3 text-h3 text-on-surface mb-2">Tech Stack</h4>
            <p className="font-body-md text-on-surface-variant">React, Node.js, Tailwind CSS, TypeScript, Next.js</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1 glass-card rounded-xl p-8 flex flex-col justify-center items-start hover:border-primary-container/50 relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span className="material-symbols-outlined text-[120px]">smart_toy</span>
            </div>
            <span className="material-symbols-outlined text-primary-container mb-4 relative z-10 text-[28px]">memory</span>
            <h4 className="font-h3 text-h3 text-on-surface mb-2 relative z-10">AI Integration</h4>
            <p className="font-body-md text-on-surface-variant relative z-10">Augmented workflows & API integration</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
