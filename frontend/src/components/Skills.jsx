import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  SiPython, SiDjango, SiReact, SiJavascript, SiHtml5,
  SiGit, SiPostman, SiWordpress, SiJupyter, SiDocker,
  SiMysql, SiSwagger, SiOpenai, SiNetlify
} from 'react-icons/si'
import { FaBrain, FaChartBar, FaCode, FaServer, FaGraduationCap, FaMobileAlt, FaRobot } from 'react-icons/fa'
import { useLang } from '../context/LanguageContext'
import { api, STATIC_DATA } from '../api/portfolio'

const TECH_STACK = [
  { icon: SiPython,      name: 'Python',        color: '#3b82f6', level: 95 },
  { icon: SiDjango,      name: 'Django',         color: '#10b981', level: 92 },
  { icon: SiReact,       name: 'React',          color: '#60a5fa', level: 88 },
  { icon: FaMobileAlt,   name: 'React Native',   color: '#a78bfa', level: 82 },
  { icon: SiOpenai,      name: 'ChatGPT',        color: '#10b981', level: 96 },
  { icon: FaRobot,       name: 'Claude AI',      color: '#f97316', level: 97 },
  { icon: FaBrain,       name: 'Prompt Eng.',    color: '#f43f5e', level: 98 },
  { icon: SiJavascript,  name: 'JavaScript',     color: '#fbbf24', level: 85 },
  { icon: SiGit,         name: 'Git/GitHub',     color: '#f43f5e', level: 90 },
  { icon: SiNetlify,     name: 'Netlify',        color: '#38bdf8', level: 85 },
  { icon: SiJupyter,     name: 'Jupyter',        color: '#f97316', level: 88 },
  { icon: FaGraduationCap, name: 'TCF Trainer',  color: '#a78bfa', level: 95 },
]

const CATEGORY_ICONS = {
  code: FaCode, brain: FaBrain, chart: FaChartBar,
  book: FaGraduationCap, server: FaServer,
}

function TechCard({ tech, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.05 }}
      className="tech-card">
      <div className="p-3 rounded-xl"
           style={{ background: `${tech.color}18`, border: `1px solid ${tech.color}30` }}>
        <tech.icon size={26} style={{ color: tech.color }} />
      </div>
      <span className="text-xs font-medium text-center" style={{ color: 'var(--text-secondary)' }}>
        {tech.name}
      </span>
      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-input)' }}>
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${tech.level}%` }}
          viewport={{ once: true }} transition={{ duration: 1, delay: index * 0.05 + 0.2 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${tech.color}99, ${tech.color})` }} />
      </div>
      <span className="text-[10px] font-mono" style={{ color: tech.color }}>{tech.level}%</span>
    </motion.div>
  )
}

function SkillBar({ name, level, index }) {
  return (
    <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{name}</span>
        <span className="text-xs font-mono text-blue-400">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-input)' }}>
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${level}%` }}
          viewport={{ once: true }} transition={{ duration: 1, delay: index * 0.04 + 0.2 }}
          className="h-full rounded-full"
          style={{ background: level >= 88
            ? 'linear-gradient(to right, #2563eb, #60a5fa)'
            : 'linear-gradient(to right, #374151, #6b7280)' }} />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [categories, setCategories] = useState(STATIC_DATA.skills)
  const [active, setActive] = useState(0)
  const { t } = useLang()

  useEffect(() => {
    api.getSkills().then(r => { if (Array.isArray(r.data) && r.data.length) setCategories(r.data) }).catch(() => {})
  }, [])

  const current = categories[active]
  const CatIcon = CATEGORY_ICONS[current?.icon] || FaCode

  return (
    <section id="skills" className="section-wrap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="section-header">
        <h2 className="section-title">
          {t('skills.title')} <span className="gradient-text">{t('skills.titleAccent')}</span>
        </h2>
        <div className="section-divider" />
        <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>{t('skills.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-14">
        {TECH_STACK.map((tech, i) => <TechCard key={tech.name} tech={tech} index={i} />)}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-widest mb-4"
             style={{ color: 'var(--text-dimmed)' }}>{t('skills.byCategory')}</p>
          {categories.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat.icon] || FaCode
            const isActive = active === i
            return (
              <button key={cat.id} onClick={() => setActive(i)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(59,130,246,0.12)' : 'var(--bg-input)',
                  border: `1px solid ${isActive ? 'rgba(59,130,246,0.4)' : 'var(--border)'}`,
                  color: isActive ? '#60a5fa' : 'var(--text-muted)',
                }}>
                <Icon size={14} />
                <span className="text-sm font-medium flex-1">{cat.name}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded"
                      style={{ background: 'var(--bg-input)', color: 'var(--text-dimmed)' }}>
                  {cat.skills?.length}
                </span>
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-2 card">
          <div className="flex items-center gap-3 mb-6 pb-4"
               style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="p-2.5 rounded-xl"
                 style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}>
              <CatIcon size={17} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>{current?.name}</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {current?.skills?.length} {t('skills.skills')}
              </p>
            </div>
          </div>
          {current?.skills?.map((s, i) => (
            <SkillBar key={s.id} name={s.name} level={s.level} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
