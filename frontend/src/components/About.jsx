import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiCode, HiChip, HiChartBar, HiUsers } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'
import { api, STATIC_DATA } from '../api/portfolio'

const QUALITIES = {
  fr: ['Esprit analytique', 'Prompt Engineering', 'Leadership de projet',
       'Esprit entrepreneurial', 'DevOps', 'Orientation résultat',
       'Sens de la pédagogie', 'Polyvalence technologique'],
  en: ['Analytical mindset', 'Prompt Engineering', 'Project leadership',
       'Entrepreneurial spirit', 'DevOps', 'Results-driven',
       'Pedagogical skills', 'Tech versatility'],
}

export default function About() {
  const [profile, setProfile] = useState(STATIC_DATA.profile)
  const { t, lang } = useLang()

  useEffect(() => {
    api.getProfile().then(r => setProfile(r.data)).catch(() => {})
  }, [])

  const STATS = [
    { icon: HiCode,     value: '4+',  label: t('about.stats.experience'),     color: '#3b82f6', bg: 'rgba(59,130,246,0.1)'  },
    { icon: HiChip,     value: '2',   label: t('about.stats.projects'),        color: '#f43f5e', bg: 'rgba(244,63,94,0.1)'   },
    { icon: HiChartBar, value: '8+',  label: t('about.stats.certifications'),  color: '#3b82f6', bg: 'rgba(59,130,246,0.1)'  },
    { icon: HiUsers,    value: '100%',label: t('about.stats.client'),          color: '#f43f5e', bg: 'rgba(244,63,94,0.1)'   },
  ]

  return (
    <section id="about" className="section-wrap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="section-header">
        <h2 className="section-title">
          {t('about.title')} <span className="gradient-text">{t('about.titleAccent')}</span>
        </h2>
        <div className="section-divider" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.1 }}
        className="relative mb-8 p-6 rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)',
                 borderLeft: '3px solid #3b82f6' }}>
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
             style={{ background: 'radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 70%)' }} />
        <p className="text-[15px] leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>
          {profile.bio}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="card text-center group">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3
                            transition-transform duration-300 group-hover:scale-110"
                 style={{ background: s.bg, border: `1px solid ${s.color}30` }}>
              <s.icon size={22} style={{ color: s.color }} />
            </div>
            <p className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.2 }} className="card">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {t('about.qualities')}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {(QUALITIES[lang] || QUALITIES.fr).map((q, i) => (
            <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }} className="tag-red">
              {q}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
