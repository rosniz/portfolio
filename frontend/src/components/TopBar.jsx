import { useEffect, useState } from 'react'
import { HiSun, HiMoon, HiMenu, HiDownload } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LanguageContext'
import { api, STATIC_DATA } from '../api/portfolio'

export default function TopBar({ onMenuOpen }) {
  const { theme, toggleTheme } = useTheme()
  const { lang, switchLang, t } = useLang()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [profile, setProfile] = useState(STATIC_DATA.profile)
  const isDark = theme === 'dark'

  useEffect(() => {
    api.getProfile().then(r => setProfile(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setScrollProgress(Math.min(progress, 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-20 h-14"
      style={{
        background: 'color-mix(in srgb, var(--bg-sidebar) 88%, transparent)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-150 pointer-events-none"
           style={{
             width: `${scrollProgress}%`,
             background: 'linear-gradient(to right, #3b82f6, #f43f5e)',
             marginLeft: '270px',
           }} />

      <div className="flex items-center justify-between h-full px-4 gap-2">

        {/* Mobile: hamburger + logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={onMenuOpen} className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            <HiMenu size={22} />
          </button>
          <span className="font-mono text-lg font-bold">
            <span className="text-blue-400">&lt;</span>
            <span className="gradient-text">RF</span>
            <span className="text-blue-400">/&gt;</span>
          </span>
        </div>

        {/* Desktop spacer (sidebar width) */}
        <div className="hidden lg:block w-[270px] shrink-0" />

        {/* Right controls */}
        <div className="flex items-center gap-2 ml-auto">

          {/* CV Download button */}
          <a
            href={profile.cv_url || '#'}
            download={!!profile.cv_url}
            target={profile.cv_url ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                       text-white transition-all hover:opacity-90 hover:-translate-y-px"
            style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                     boxShadow: '0 2px 10px rgba(37,99,235,0.3)' }}
          >
            <HiDownload size={14} />
            {t('nav.downloadCv')}
          </a>

          {/* Theme toggle */}
          <div className="flex items-center p-0.5 rounded-xl gap-0.5"
               style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
            <button onClick={() => !isDark && toggleTheme()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: isDark ? 'rgba(59,130,246,0.18)' : 'transparent',
                color: isDark ? '#60a5fa' : 'var(--text-muted)',
                border: isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
              }}>
              <HiMoon size={13} />
              <span className="hidden sm:inline">Dark</span>
            </button>
            <button onClick={() => isDark && toggleTheme()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: !isDark ? 'rgba(59,130,246,0.18)' : 'transparent',
                color: !isDark ? '#60a5fa' : 'var(--text-muted)',
                border: !isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
              }}>
              <HiSun size={13} />
              <span className="hidden sm:inline">Light</span>
            </button>
          </div>

          {/* Language toggle */}
          <div className="flex items-center p-0.5 rounded-xl gap-0.5"
               style={{ background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
            {['fr', 'en'].map((l) => (
              <button key={l} onClick={() => switchLang(l)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200"
                style={{
                  background: lang === l ? 'rgba(59,130,246,0.18)' : 'transparent',
                  color: lang === l ? '#60a5fa' : 'var(--text-muted)',
                  border: lang === l ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                }}>
                {l === 'fr' ? '🇫🇷' : '🇬🇧'}
                <span className="hidden sm:inline">{l.toUpperCase()}</span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </header>
  )
}
