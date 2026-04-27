import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EditableText } from '../Editable';

export default function Contact() {
  const { data, updateData, isEditing } = usePortfolio();

  const updateContact = (field: string, value: string) => {
    updateData('contact', { ...data.contact, [field]: value });
  };

  return (
    <section id="contact" className="max-w-container-max mx-auto px-gutter py-stack-lg">
      <div className="mb-stack-md">
        <h2 className="font-h2 text-h2 text-on-surface">Initiate Connection</h2>
        <p className="font-body-md text-on-surface-variant mt-2">Ready to architect the next solution? Open a channel below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-stack-md"
        >
          <form className="space-y-stack-sm flex flex-col" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block font-label-caps text-on-surface-variant mb-2 uppercase">Subject ID</label>
              <input type="text" placeholder="Your Name" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container/50 transition-all font-body-md placeholder-outline outline-none" />
            </div>
            <div>
              <label className="block font-label-caps text-on-surface-variant mb-2 uppercase">Return Address</label>
              <input type="email" placeholder="email@domain.com" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container/50 transition-all font-body-md placeholder-outline outline-none" />
            </div>
            <div>
              <label className="block font-label-caps text-on-surface-variant mb-2 uppercase">Payload</label>
              <textarea placeholder="Describe your project requirements..." rows={4} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container/50 transition-all font-body-md placeholder-outline resize-none outline-none"></textarea>
            </div>
            <button type="button" className="mt-4 bg-primary-container text-on-primary-container font-label-caps px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(0,163,255,0.3)] transition-all flex items-center justify-center gap-2 uppercase w-full md:w-auto self-start tracking-widest">
              <span>Transmit Message</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-stack-sm"
        >
          <div className={`glass-card rounded-xl p-stack-sm flex items-center gap-4 hover:border-primary-container/50 transition-colors group ${isEditing ? 'border-primary' : ''}`}>
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center border border-white/5 group-hover:bg-primary-container/10 transition-colors">
              <span className="material-symbols-outlined text-primary-container">mail</span>
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <p className="font-label-caps text-on-surface-variant uppercase">Secure Email</p>
              <EditableText value={data.contact.email} onChange={(v: string) => updateContact('email', v)} className="font-body-md text-on-surface block w-full" />
            </div>
          </div>
          
          <div className={`glass-card rounded-xl p-stack-sm flex items-center gap-4 hover:border-secondary-container/50 transition-colors group ${isEditing ? 'border-secondary' : ''}`}>
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center border border-white/5 group-hover:bg-secondary-container/10 transition-colors">
              <span className="material-symbols-outlined text-secondary-container">phone</span>
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <p className="font-label-caps text-on-surface-variant uppercase">Direct Line</p>
              <EditableText value={data.contact.phone} onChange={(v: string) => updateContact('phone', v)} className="font-body-md text-on-surface block w-full" />
            </div>
          </div>
          
          <div className={`glass-card rounded-xl p-stack-sm flex items-center gap-4 hover:border-primary-container/50 transition-colors group ${isEditing ? 'border-primary' : ''}`}>
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center border border-white/5 group-hover:bg-primary-container/10 transition-colors">
              <span className="material-symbols-outlined text-primary-container">location_on</span>
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <p className="font-label-caps text-on-surface-variant uppercase">Base of Operations</p>
              <EditableText value={data.contact.location} onChange={(v: string) => updateContact('location', v)} className="font-body-md text-on-surface block w-full" />
            </div>
          </div>
          
          <div className={`glass-card rounded-xl p-stack-sm flex items-center gap-4 hover:border-secondary-container/50 transition-colors group ${isEditing ? 'border-secondary' : ''}`}>
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center border border-white/5 group-hover:bg-secondary-container/10 transition-colors">
              <span className="material-symbols-outlined text-secondary-container">code</span>
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <p className="font-label-caps text-on-surface-variant uppercase">Repository Link</p>
              {isEditing ? (
                 <EditableText value={data.contact.githubLink} onChange={(v: string) => updateContact('githubLink', v)} className="font-code text-xs block w-full mb-1 text-on-surface-variant" />
              ) : null}
              <EditableText value={data.contact.github} onChange={(v: string) => updateContact('github', v)} className="font-body-md text-primary-container block w-full truncate" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
