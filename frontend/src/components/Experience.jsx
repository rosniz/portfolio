import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiBriefcase, HiCalendar } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'
import { api, STATIC_DATA } from '../api/portfolio'

function ExperienceCard({ exp, index }) {
  const bullets = exp.description?.split('\n').filter(Boolean) || []
  const isRecent = exp.end_date?.toLowerCase().includes("aujourd") || exp.end_date?.toLowerCase().includes("today")

  return (
    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12 pb-12 last:pb-0">
      <div className="absolute left-4 top-6 bottom-0 w-px"
           style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), transparent)' }} />
      <div className="absolute left-0 top-3 w-8 h-8 rounded-full flex items-center justify-center"
           style={{
             background: isRecent ? 'rgba(59,130,246,0.2)' : 'var(--bg-input)',
             border: `2px solid ${isRecent ? '#3b82f6' : 'var(--border)'}`,
             boxShadow: isRecent ? '0 0 16px rgba(59,130,246,0.3)' : 'none',
           }}>
        <HiBriefcase size={14} style={{ color: isRecent ? '#60a5fa' : 'var(--text-dimmed)' }} />
      </div>
      <div className="card" style={{ border: `1px solid ${isRecent ? 'rgba(59,130,246,0.2)' : 'var(--border)'}` }}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-[17px]" style={{ color: 'var(--text-primary)' }}>{exp.title}</h3>
            <p className="text-blue-400 font-medium text-sm mt-1">{exp.company}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full shrink-0"
               style={{
                 background: isRecent ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)',
                 border: `1px solid ${isRecent ? 'rgba(59,130,246,0.25)' : 'var(--border)'}`,
                 color: isRecent ? '#60a5fa' : 'var(--text-muted)',
               }}>
            <HiCalendar size={11} /> {exp.start_date} — {exp.end_date}
          </div>
        </div>
        <ul className="space-y-2 mb-5">
          {bullets.map((line, i) => (
            <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="shrink-0 mt-0.5" style={{ color: i % 2 === 0 ? '#3b82f6' : '#f43f5e' }}>▸</span>
              <span>{line.replace(/^[•▸\-]\s*/, '')}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies?.map((t, i) => <span key={i} className="tag">{t}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [experiences, setExperiences] = useState(STATIC_DATA.experiences)
  const { t } = useLang()

  useEffect(() => {
    api.getExperiences().then(r => { if (r.data.length) setExperiences(r.data) }).catch(() => {})
  }, [])

  return (
    <section id="experience" className="section-wrap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="section-header">
        <h2 className="section-title">
          {t('experience.title')} <span className="gradient-text">{t('experience.titleAccent')}</span>
        </h2>
        <div className="section-divider" />
      </motion.div>
      <div>{experiences.map((exp, i) => <ExperienceCard key={exp.id} exp={exp} index={i} />)}</div>
    </section>
  )
}
