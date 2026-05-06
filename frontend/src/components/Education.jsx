import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'
import { HiCalendar } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'
import { api, STATIC_DATA } from '../api/portfolio'

export default function Education() {
  const [education, setEducation] = useState(STATIC_DATA.education)
  const { t } = useLang()

  useEffect(() => {
    api.getEducation().then(r => { if (Array.isArray(r.data) && r.data.length) setEducation(r.data) }).catch(() => {})
  }, [])

  return (
    <section id="education" className="section-wrap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="section-header">
        <h2 className="section-title">
          {t('education.title')} <span className="gradient-text">{t('education.titleAccent')}</span>
        </h2>
        <div className="section-divider" />
      </motion.div>

      <div className="space-y-4">
        {education.map((edu, i) => (
          <motion.div key={edu.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="card flex gap-5 hover:-translate-y-0.5 transition-transform duration-300"
            style={{ border: `1px solid ${i === 0 ? 'rgba(59,130,246,0.2)' : 'var(--border)'}` }}>
            <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border"
                 style={{
                   background: i === 0 ? 'rgba(59,130,246,0.15)' : 'var(--bg-input)',
                   borderColor: i === 0 ? 'rgba(59,130,246,0.3)' : 'var(--border)',
                 }}>
              <FaGraduationCap size={20} style={{ color: i === 0 ? '#60a5fa' : 'var(--text-muted)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>{edu.degree}</h3>
                  <p className="text-blue-400 font-medium text-sm mt-0.5">{edu.school}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full shrink-0"
                     style={{ background: 'var(--bg-input)', border: '1px solid var(--border)',
                              color: 'var(--text-muted)' }}>
                  <HiCalendar size={11} />
                  {edu.start_year === edu.end_year ? edu.start_year : `${edu.start_year} — ${edu.end_year}`}
                </div>
              </div>
              {edu.description && (
                <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>{edu.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
