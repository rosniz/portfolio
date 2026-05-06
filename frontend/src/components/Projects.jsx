import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { HiCalendar, HiSparkles } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'
import { api, STATIC_DATA } from '../api/portfolio'

const GRADIENTS = [
  'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
  'linear-gradient(135deg, #7f1d1d 0%, #1c1917 100%)',
  'linear-gradient(135deg, #064e3b 0%, #1c1917 100%)',
  'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
  'linear-gradient(135deg, #713f12 0%, #1c1917 100%)',
  'linear-gradient(135deg, #0c4a6e 0%, #1e1b4b 100%)',
]

function ProjectCard({ project, index }) {
  const { t } = useLang()

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)',
               transition: 'all 0.35s ease', boxShadow: 'var(--shadow-card)' }}
      whileHover={{ y: -6 }}>
      {/* Banner */}
      <div className="h-40 relative overflow-hidden" style={{ background: GRADIENTS[index % GRADIENTS.length] }}>
        {project.image_url ? (
          <img src={project.image_url} alt={project.title}
               className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl font-black text-white/10 select-none tracking-tight">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to top, var(--bg-card), transparent 60%)' }} />

        <div className="absolute top-3 left-3 flex gap-2">
          {project.featured && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-blue-300"
                  style={{ background: 'rgba(59,130,246,0.25)', border: '1px solid rgba(59,130,246,0.4)' }}>
              <HiSparkles size={10} /> {t('projects.featured')}
            </span>
          )}
          {project.end_date === 'En cours' && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.4)',
                           color: '#fbbf24' }}>
              ⚡ {t('projects.inProgress')}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
               className="p-2 rounded-lg text-slate-300 hover:text-white transition-colors"
               style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
              <FaGithub size={15} />
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer"
               className="p-2 rounded-lg text-slate-300 hover:text-blue-400 transition-colors"
               style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
              <FaExternalLinkAlt size={13} />
            </a>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-[11px] font-mono mb-2"
             style={{ color: 'var(--text-dimmed)' }}>
          <HiCalendar size={11} /> {project.start_date} — {project.end_date}
        </div>
        <h3 className="font-bold text-[16px] mb-2 group-hover:text-blue-400 transition-colors"
            style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies?.map((t_, i) => (
            <span key={i} className={i % 2 === 0 ? 'tag' : 'tag-red'}>{t_}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState(STATIC_DATA.projects)
  const { t } = useLang()

  useEffect(() => {
    api.getProjects().then(r => { if (r.data.length) setProjects(r.data) }).catch(() => {})
  }, [])

  return (
    <section id="projects" className="section-wrap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="section-header">
        <h2 className="section-title">
          {t('projects.title')} <span className="gradient-text">{t('projects.titleAccent')}</span>
        </h2>
        <div className="section-divider" />
        <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>{t('projects.subtitle')}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  )
}
