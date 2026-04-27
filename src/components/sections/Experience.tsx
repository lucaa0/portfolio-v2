import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EditableText } from '../Editable';

export default function Experience() {
  const { data, updateItem, isEditing } = usePortfolio();

  return (
    <section id="experience" className="py-stack-lg px-gutter max-w-container-max mx-auto w-full border-b border-white/5">
      <div className="mb-stack-lg text-center md:text-left">
        <h2 className="font-h1 text-h1 text-on-surface mb-unit">Journey</h2>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          A timeline of my professional experience and educational background, reflecting a continuous drive for full-stack mastery and technological innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Experience */}
        <div className="lg:col-span-7">
          <div className="flex items-center space-x-3 mb-stack-md">
            <span className="material-symbols-outlined text-primary-container text-2xl">work</span>
            <h2 className="font-h2 text-h2 text-on-surface">Experience</h2>
          </div>
          
          <div className="relative pl-8 border-l-2 border-outline-variant/30 ml-4 space-y-stack-lg">
            {data.experience.map((exp: any, idx: number) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-primary-container shadow-[0_0_10px_rgba(0,163,255,0.8)] border-2 border-background"></div>
                <div className={`glass-card rounded-xl p-6 ${isEditing ? 'border-primary' : ''}`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div className="flex-1">
                      <EditableText as="h3" value={exp.title} onChange={(val: string) => updateItem('experience', exp.id, 'title', val)} className="font-h3 text-h3 text-on-surface font-bold block" />
                      <EditableText value={exp.company} onChange={(val: string) => updateItem('experience', exp.id, 'company', val)} className="font-body-md text-primary mt-1 block" />
                    </div>
                    <div className="mt-2 md:mt-0 px-3 py-1 bg-surface-container-highest rounded border border-outline-variant/50 w-fit">
                      <EditableText value={exp.period} onChange={(val: string) => updateItem('experience', exp.id, 'period', val)} className="font-label-caps text-on-surface-variant block" />
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <div className="mb-4">
                      <label className="text-xs font-label-caps text-on-surface-variant mb-1 block">Bullet Points (newline separated)</label>
                      <EditableText multiline value={exp.points} onChange={(val: string) => updateItem('experience', exp.id, 'points', val)} className="font-body-md text-on-surface-variant w-full" />
                    </div>
                  ) : (
                    <ul className="space-y-3 font-body-md text-on-surface-variant list-disc list-inside marker:text-primary-container mb-6">
                      {exp.points.split('\n').filter(Boolean).map((pt: string, i: number) => (
                        <li key={i}>{pt.trim()}</li>
                      ))}
                    </ul>
                  )}
                  
                  {isEditing ? (
                    <div>
                      <label className="text-xs font-label-caps text-on-surface-variant mb-1 block">Tags (comma-separated)</label>
                      <EditableText value={exp.tags} onChange={(val: string) => updateItem('experience', exp.id, 'tags', val)} className="font-code text-sm w-full" />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean).map((tag: string) => (
                        <span key={tag} className="px-2 py-1 bg-surface-container text-on-surface font-label-caps rounded border border-outline-variant/30">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="lg:col-span-5 mt-stack-lg lg:mt-0">
          <div className="flex items-center space-x-3 mb-stack-md">
            <span className="material-symbols-outlined text-secondary-container text-2xl">school</span>
            <h2 className="font-h2 text-h2 text-on-surface">Education</h2>
          </div>
          
          <div className="relative pl-8 border-l-2 border-outline-variant/30 ml-4 space-y-stack-md">
            {data.education.map((edu: any, idx: number) => (
              <motion.div 
                key={edu.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 h-3 w-3 rounded-full bg-secondary-container border-2 border-background"></div>
                <div className={`glass-card rounded-lg p-5 ${isEditing ? 'border-secondary' : ''}`}>
                  <EditableText as="h3" value={edu.title} onChange={(val: string) => updateItem('education', edu.id, 'title', val)} className="font-h3 text-on-surface text-[20px] font-bold block" />
                  <EditableText value={edu.subtitle} onChange={(val: string) => updateItem('education', edu.id, 'subtitle', val)} className="font-body-md text-secondary mt-1 block" />
                  <EditableText multiline value={edu.description} onChange={(val: string) => updateItem('education', edu.id, 'description', val)} className="font-body-md text-on-surface-variant mt-2 text-sm block" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
