import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiArrowDown, HiMail } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { SiPython, SiDjango, SiReact, SiDocker } from 'react-icons/si'
import { useLang } from '../context/LanguageContext'

const FLOATING_TECH = [
  { icon: SiPython, label: 'Python',  color: '#3b82f6', top: '15%', left:  '5%', delay: 0   },
  { icon: SiDjango, label: 'Django',  color: '#10b981', top: '65%', left:  '3%', delay: 0.5 },
  { icon: SiReact,  label: 'React',   color: '#60a5fa', top: '20%', right: '4%', delay: 1   },
  { icon: SiDocker, label: 'Docker',  color: '#38bdf8', top: '70%', right: '3%', delay: 1.5 },
]

function TypingEffect({ roles }) {
  const [display, setDisplay] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = deleting ? 35 : 70
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, display.length + 1))
        if (display.length + 1 === current.length) setTimeout(() => setDeleting(true), 2200)
      } else {
        setDisplay(display.slice(0, -1))
        if (display.length === 0) {
          setDeleting(false)
          setRoleIndex((i) => (i + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [display, deleting, roleIndex, roles])

  return <span>{display}<span className="animate-pulse text-blue-400">|</span></span>
}

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="hero" className="relative min-h-screen flex items-center dot-grid overflow-hidden">
      <div className="absolute w-[600px] h-[600px] -top-32 -left-32 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }} />
      <div className="absolute w-[500px] h-[500px] bottom-0 right-0 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)' }} />

      {FLOATING_TECH.map(({ icon: Icon, label, color, top, left, right, delay }) => (
        <motion.div key={label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{ delay, duration: 0.5, y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay } }}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-sm z-10"
          style={{ top, left, right, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Icon size={15} style={{ color }} />
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{label}</span>
        </motion.div>
      ))}

      <div className="relative z-10 section-wrap w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium
                     bg-blue-500/10 border border-blue-500/25 text-blue-300">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {t('hero.badge')}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}>
          <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            {t('hero.greeting')}
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
            <span style={{ color: 'var(--text-primary)' }}>Rosni </span>
            <span className="gradient-text">Fombeu</span>
          </h1>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl font-mono mb-10 min-h-[2rem]"
          style={{ color: 'var(--text-secondary)' }}>
          <span className="text-blue-400">&gt; </span>
          <TypingEffect roles={t('hero.roles')} />
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }} className="flex flex-wrap gap-4 mb-10">
          {[
            { value: '4+', label: t('hero.stats.experience') },
            { value: '2',  label: t('hero.stats.projects') },
            { value: '8+', label: t('hero.stats.certifications') },
          ].map((s) => (
            <div key={s.label} className="px-5 py-3 rounded-xl text-center min-w-[100px]"
                 style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p className="text-2xl font-black gradient-text-blue">{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }} className="flex flex-wrap gap-4 mb-16">
          <Link to="projects" smooth duration={600} offset={-20}>
            <button className="btn-primary text-[15px] px-8 py-3.5">
              {t('hero.cta.projects')} <HiArrowDown size={16} />
            </button>
          </Link>
          <Link to="contact" smooth duration={600} offset={-20}>
            <button className="btn-outline text-[15px] px-8 py-3.5">
              <HiMail size={18} /> {t('hero.cta.contact')}
            </button>
          </Link>
          <a href="https://github.com/rosnifombeu" target="_blank" rel="noopener noreferrer"
             className="btn-outline text-[15px] px-5 py-3.5"
             style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
            <FaGithub size={18} />
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Link to="about" smooth duration={600} offset={-20} className="cursor-pointer">
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
              className="inline-flex flex-col items-center gap-1 transition-colors"
              style={{ color: 'var(--text-dimmed)' }}>
              <span className="text-[10px] font-mono tracking-widest uppercase">{t('hero.scroll')}</span>
              <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--text-dimmed), transparent)' }} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
