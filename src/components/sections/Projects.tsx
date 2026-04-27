import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EditableText } from '../Editable';

export default function Projects() {
  const { data, updateItem, isEditing } = usePortfolio();

  return (
    <section id="projects" className="py-stack-lg px-8 max-w-container-max mx-auto w-full border-b border-white/5">
      <div className="mb-stack-lg">
        <h2 className="font-h1 text-h1 text-on-surface mb-stack-sm">Featured Work</h2>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          A selection of recent technical projects focusing on artificial intelligence, robust architectures, and intuitive user interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md">
        {data.projects.map((proj: any, idx: number) => (
          <motion.article 
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`flex flex-col group bg-surface/80 backdrop-blur-[12px] border ${isEditing ? 'border-primary' : 'border-white/5'} rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,163,255,0.08)] relative overflow-hidden`}
          >
            {!isEditing && <div className={`absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>}
            
            <div className="mb-stack-md relative z-10 w-full h-48 rounded-lg overflow-hidden border border-outline-variant/20 bg-surface-container">
              {proj.imageUrl ? (
                <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-surface-container-high to-surface-dim relative">
                  <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)]`}></div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <div className={`h-2 w-8 bg-${proj.colorClass} rounded-full`}></div>
                    <div className={`h-2 w-12 bg-primary rounded-full`}></div>
                  </div>
                </div>
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center p-4">
                  <label className="text-xs font-label-caps mb-2 text-primary">Thumbnail URL</label>
                  <input
                    type="text"
                    placeholder="Image URL..."
                    value={proj.imageUrl}
                    onChange={e => updateItem('projects', proj.id, 'imageUrl', e.target.value)}
                    className="w-full bg-surface-container-highest text-on-surface border border-outline-variant rounded p-2 text-sm"
                  />
                </div>
              )}
            </div>

            <div className="flex-grow flex flex-col relative z-10">
              <div className={`flex justify-between items-center mb-stack-sm text-${proj.colorClass}`}>
                <EditableText 
                  value={proj.period} 
                  onChange={(val: string) => updateItem('projects', proj.id, 'period', val)} 
                  className={`font-label-caps tracking-widest uppercase text-${proj.colorClass}`}
                />
                <a href="#" className="text-on-surface-variant group-hover:text-current transition-colors">
                  <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                </a>
              </div>
              <EditableText 
                as="h3"
                value={proj.title} 
                onChange={(val: string) => updateItem('projects', proj.id, 'title', val)} 
                className={`font-h3 text-h3 text-on-surface mb-stack-sm group-hover:text-${proj.colorClass}-fixed transition-colors font-bold`}
              />
              <EditableText 
                multiline
                as="p"
                value={proj.description} 
                onChange={(val: string) => updateItem('projects', proj.id, 'description', val)} 
                className="font-body-md text-on-surface-variant mb-stack-md block"
              />
              
              {isEditing ? (
                <div className="mt-auto pt-stack-sm border-t border-outline-variant/20">
                  <label className="text-xs font-label-caps text-on-surface-variant mb-1 block">Tags (comma-separated)</label>
                  <EditableText 
                    value={proj.tags} 
                    onChange={(val: string) => updateItem('projects', proj.id, 'tags', val)} 
                    className="font-code text-sm"
                  />
                </div>
              ) : (
                <div className="mt-auto flex flex-wrap gap-2 pt-stack-sm border-t border-outline-variant/20">
                  {proj.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean).map((tag: string) => (
                    <span key={tag} className="bg-surface-container-highest text-on-surface font-code text-[12px] px-2 py-1 rounded border border-outline-variant/30">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
