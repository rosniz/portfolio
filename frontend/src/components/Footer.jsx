import { Link } from 'react-scroll'
import { FaHeart, FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  const NAV = [
    { label: t('nav.home'),           to: 'hero' },
    { label: t('nav.about'),          to: 'about' },
    { label: t('nav.skills'),         to: 'skills' },
    { label: t('nav.projects'),       to: 'projects' },
    { label: t('nav.experience'),     to: 'experience' },
    { label: t('nav.education'),      to: 'education' },
    { label: t('nav.contact'),        to: 'contact' },
  ]

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-sidebar)' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="font-mono text-2xl font-black">
              <span className="text-blue-400">&lt;</span>
              <span className="gradient-text">RF</span>
              <span className="text-blue-400">/&gt;</span>
            </span>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>{t('footer.subtitle')}</p>
            <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-dimmed)' }}>Bafoussam, Cameroun</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2">
              {NAV.map(link => (
                <li key={link.to}>
                  <Link to={link.to} smooth duration={500} offset={-20}
                    className="text-xs cursor-pointer transition-colors hover:text-blue-400"
                    style={{ color: 'var(--text-muted)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('footer.contact')}
            </h4>
            <div className="space-y-3">
              {[
                { icon: HiMail,    href: 'mailto:rosnifombeu@visiontechsarl.com', label: 'rosnifombeu@visiontechsarl.com' },
                { icon: FaGithub,   href: 'https://github.com/rosniz',                           label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://linkedin.com/in/rosni-fombeu-111aab408', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-xs transition-colors hover:text-blue-400"
                   style={{ color: 'var(--text-muted)' }}>
                  <Icon size={13} /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
             style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs font-mono" style={{ color: 'var(--text-dimmed)' }}>
            © {new Date().getFullYear()} Rosni Fombeu — {t('footer.rights')}
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-dimmed)' }}>
            {t('footer.madeWith')} <FaHeart className="text-red-500/60" size={10} /> Django REST + React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
