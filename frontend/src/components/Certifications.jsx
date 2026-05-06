import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCertificate } from 'react-icons/fa'
import { HiCheckCircle } from 'react-icons/hi'
import { useLang } from '../context/LanguageContext'
import { api, STATIC_DATA } from '../api/portfolio'

export default function Certifications() {
  const [certifications, setCertifications] = useState(STATIC_DATA.certifications)
  const { t } = useLang()

  useEffect(() => {
    api.getCertifications().then(r => { if (Array.isArray(r.data) && r.data.length) setCertifications(r.data) }).catch(() => {})
  }, [])

  return (
    <section id="certifications" className="section-wrap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="section-header">
        <h2 className="section-title">
          {t('certifications.title')} <span className="gradient-text">{t('certifications.titleAccent')}</span>
        </h2>
        <div className="section-divider" />
        <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>{t('certifications.subtitle')}</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {certifications.map((cert, i) => (
          <motion.div key={cert.id} initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="group relative overflow-hidden rounded-2xl p-5 cursor-default"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)',
                     transition: 'all 0.3s ease', boxShadow: 'var(--shadow-card)' }}
            whileHover={{ y: -4, borderColor: i % 2 === 0 ? 'rgba(59,130,246,0.4)' : 'rgba(244,63,94,0.4)' }}>
            <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity"
                 style={{ background: i % 2 === 0
                   ? 'radial-gradient(circle at top right, rgba(59,130,246,0.12), transparent 70%)'
                   : 'radial-gradient(circle at top right, rgba(244,63,94,0.1), transparent 70%)' }} />
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <FaCertificate size={26} style={{
                  color: i % 2 === 0 ? 'rgba(59,130,246,0.5)' : 'rgba(244,63,94,0.5)',
                  transition: 'color 0.3s'
                }} />
                <HiCheckCircle size={16} className="text-green-500/40 group-hover:text-green-400 transition-colors" />
              </div>
              <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-white transition-colors"
                  style={{ color: 'var(--text-primary)' }}>
                {cert.title}
              </h3>
              <p className="text-[11px] font-mono"
                 style={{ color: i % 2 === 0 ? 'rgba(96,165,250,0.6)' : 'rgba(251,113,133,0.6)' }}>
                {cert.issuer}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
