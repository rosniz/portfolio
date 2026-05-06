import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiUser, HiLightningBolt, HiFolder, HiBriefcase,
  HiAcademicCap, HiBadgeCheck, HiMail, HiHome,
  HiLocationMarker, HiPhone, HiX, HiDownload
} from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useLang } from '../context/LanguageContext'
import { api, STATIC_DATA } from '../api/portfolio'
import profilePhoto from '../assets/profile.jpg'

function SidebarContent({ onClose }) {
  const [profile, setProfile] = useState(STATIC_DATA.profile)
  const [active, setActive] = useState('hero')
  const { lang, t } = useLang()

  const NAV_ITEMS = [
    { icon: HiHome,          label: t('nav.home'),           to: 'hero' },
    { icon: HiUser,          label: t('nav.about'),          to: 'about' },
    { icon: HiLightningBolt, label: t('nav.skills'),         to: 'skills' },
    { icon: HiFolder,        label: t('nav.projects'),       to: 'projects' },
    { icon: HiBriefcase,     label: t('nav.experience'),     to: 'experience' },
    { icon: HiAcademicCap,   label: t('nav.education'),      to: 'education' },
    { icon: HiBadgeCheck,    label: t('nav.certifications'), to: 'certifications' },
    { icon: HiMail,          label: t('nav.contact'),        to: 'contact' },
  ]

  useEffect(() => {
    api.getProfile().then(r => setProfile(r.data)).catch(() => {})
  }, [])

  return (
    <div className="flex flex-col h-full overflow-y-auto transition-colors duration-300"
         style={{ background: 'var(--bg-sidebar)' }}>

      {/* Close (mobile) */}
      {onClose && (
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={onClose}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            <HiX size={20} />
          </button>
        </div>
      )}

      {/* Profile */}
      <div className="px-6 pt-20 pb-5 text-center">
        <div className="relative inline-block mb-4">
          <div className="p-0.5 rounded-2xl"
               style={{ background: 'linear-gradient(135deg, #3b82f6, #f43f5e)' }}>
            <div className="w-24 h-24 rounded-[14px] overflow-hidden"
                 style={{ background: 'var(--bg-card)' }}>
              <img src={profile.photo_url || profilePhoto} alt={profile.name}
                   className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full
                           border-2 ring-2 ring-green-400/30"
                style={{ borderColor: 'var(--bg-sidebar)' }} />
        </div>

        <h2 className="font-bold text-[17px]" style={{ color: 'var(--text-primary)' }}>
          {profile.name}
        </h2>
        <p className="mt-1.5 text-[11px] font-mono leading-snug px-2"
           style={{ color: 'var(--text-muted)' }}>
          {profile.title?.split('|')[0]?.trim()}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-xs"
             style={{ color: 'var(--text-dimmed)' }}>
          <HiLocationMarker size={12} className="text-red-400" />
          {profile.location}
        </div>
        <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs
                        bg-green-400/10 border border-green-400/20 text-green-500">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          {t('nav.available')}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px mb-1" style={{ background: 'var(--border-subtle)' }} />

      {/* Nav */}
      <nav className="px-3 py-3 flex-1">
        <p className="text-[10px] font-mono uppercase tracking-widest px-3 mb-2"
           style={{ color: 'var(--text-dimmed)' }}>
          {lang === 'fr' ? 'Navigation' : 'Navigation'}
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.to
            return (
              <li key={item.to}>
                <Link to={item.to} smooth duration={500} offset={-20} spy
                      onSetActive={() => setActive(item.to)} onClick={onClose}
                      className={`nav-item ${isActive ? 'nav-item-active' : ''}`}>
                  <item.icon size={16} style={{ color: isActive ? '#60a5fa' : 'var(--text-dimmed)' }} />
                  <span>{item.label}</span>
                  {item.to === 'contact' && !isActive && (
                    <span className="ml-auto w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Divider */}
      <div className="mx-5 h-px" style={{ background: 'var(--border-subtle)' }} />

      {/* Divider */}
      <div className="mx-5 h-px" style={{ background: 'var(--border-subtle)' }} />

      {/* Contact */}
      <div className="px-5 py-3 space-y-2">
        <a href={`mailto:${profile.email}`}
           className="flex items-center gap-2 text-xs transition-colors hover:text-blue-400"
           style={{ color: 'var(--text-muted)' }}>
          <HiMail size={12} className="text-blue-500/60 shrink-0" />
          <span className="truncate">{profile.email}</span>
        </a>
        <a href={`tel:${profile.phone}`}
           className="flex items-center gap-2 text-xs transition-colors hover:text-blue-400"
           style={{ color: 'var(--text-muted)' }}>
          <HiPhone size={12} className="text-blue-500/60 shrink-0" />
          {profile.phone}
        </a>
      </div>

      {/* Social + CV */}
      <div className="px-4 pb-6 space-y-3">
        
        <a href={profile.cv_url || '#'} download={!!profile.cv_url}
           className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                      text-sm font-semibold text-white"
           style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    boxShadow: '0 4px 20px rgba(37,99,235,0.3)' }}>
          <HiDownload size={16} /> {t('nav.downloadCv')}
        </a>
      </div>
    </div>
  )
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[270px] z-30"
             style={{ borderRight: '1px solid var(--border)' }}>
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x: -270 }} animate={{ x: 0 }} exit={{ x: -270 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-[270px] z-30"
            style={{ borderRight: '1px solid var(--border)' }}>
            <SidebarContent onClose={onClose} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
