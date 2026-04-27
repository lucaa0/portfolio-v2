import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EditableText } from '../Editable';

export default function Skills() {
  const { data, updateItem, isEditing } = usePortfolio();

  return (
    <section id="skills" className="max-w-container-max mx-auto px-gutter py-stack-lg border-b border-white/5">
      <div className="mb-stack-lg text-center md:text-left">
        <h2 className="font-h1 text-h1 text-on-surface mb-stack-sm">Technical Arsenal</h2>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          A curated overview of my capabilities across the full stack, AI integration, and modern development operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {data.skills.map((cat: any, idx: number) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-card rounded-xl p-stack-md transition-all duration-300 flex flex-col group hover:shadow-[0_0_40px_rgba(0,163,255,0.15)] ${isEditing ? 'border-primary' : 'hover:border-primary/30'} ${cat.spanClass || ''}`}
          >
            <div className="flex items-center gap-3 mb-stack-sm">
              {isEditing ? (
                <div className="flex flex-col">
                   <label className="text-xs text-on-surface-variant">Icon (Google Material)</label>
                   <EditableText value={cat.icon} onChange={(val: string) => updateItem('skills', cat.id, 'icon', val)} className="font-code text-sm w-24" />
                </div>
              ) : (
                <span className={`material-symbols-outlined text-${cat.colorClass}-container text-[28px] group-hover:scale-110 transition-transform`}>{cat.icon}</span>
              )}
              <div className="flex-1">
                <EditableText as="h3" value={cat.title} onChange={(val: string) => updateItem('skills', cat.id, 'title', val)} className="font-h3 text-h3 text-on-surface font-bold" />
              </div>
            </div>
            
            {isEditing ? (
              <div className="mt-4">
                <label className="text-xs font-label-caps text-on-surface-variant mb-1 block">Skills (comma-separated)</label>
                <EditableText multiline value={cat.items} onChange={(val: string) => updateItem('skills', cat.id, 'items', val)} className="font-label-caps text-sm w-full" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mt-auto">
                {cat.items.split(',').map((skill: string) => skill.trim()).filter(Boolean).map((skill: string) => (
                  <span key={skill} className="bg-surface-container-high border border-outline-variant text-on-surface font-label-caps px-3 py-1.5 rounded-full uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
