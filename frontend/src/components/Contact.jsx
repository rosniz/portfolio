import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { useLang } from '../context/LanguageContext'
import { api } from '../api/portfolio'

const INITIAL = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const { t } = useLang()

  const CONTACT_ITEMS = [
    { icon: HiMail,         label: t('contact.info.emailPro'),   value: 'rosnifombeu@visiontechsarl.com', href: 'mailto:rosnifombeu@visiontechsarl.com', color: '#3b82f6' },
    { icon: HiMail,         label: t('contact.info.emailPerso'), value: 'rosnifombeu9@gmail.com',          href: 'mailto:rosnifombeu9@gmail.com',          color: '#f43f5e' },
    { icon: HiPhone,        label: t('contact.info.phone'),      value: '+237 674 554 947',                href: 'tel:+237674554947',                      color: '#3b82f6' },
    { icon: HiLocationMarker,label: t('contact.info.location'),  value: 'Bafoussam, Cameroun',             href: null,                                     color: 'var(--text-muted)' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.sendContact(form)
      toast.success(t('contact.success'))
      setForm(INITIAL)
    } catch {
      toast.error(t('contact.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-wrap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="section-header">
        <h2 className="section-title">
          {t('contact.title')} <span className="gradient-text">{t('contact.titleAccent')}</span>
        </h2>
        <div className="section-divider" />
        <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>{t('contact.subtitle')}</p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Info */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} className="lg:col-span-2 space-y-3">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, color }) => (
            <div key={label} className="card flex items-center gap-4"
                 style={{ border: '1px solid var(--border)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                   style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-mono mb-0.5" style={{ color: 'var(--text-dimmed)' }}>{label}</p>
                {href ? (
                  <a href={href} className="text-sm font-medium hover:text-blue-400 transition-colors truncate block"
                     style={{ color: 'var(--text-primary)' }}>{value}</a>
                ) : (
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { icon: FaGithub,   label: 'GitHub',    href: 'https://github.com/rosniz' },
              { icon: FaLinkedin, label: 'LinkedIn',  href: 'https://linkedin.com/in/rosni-fombeu-111aab408' },
              { icon: FaWhatsapp, label: 'WhatsApp',  href: 'https://wa.me/237674554947' },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                 className="flex-1 card !p-3 flex flex-col items-center gap-1.5 text-xs font-medium
                            hover:text-blue-400 hover:border-blue-500/30 transition-all"
                 style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                <Icon size={17} /> {label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} onSubmit={handleSubmit}
          className="lg:col-span-3 card flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>
                {t('contact.form.name')} *
              </label>
              <input type="text" value={form.name} placeholder={t('contact.form.namePlaceholder')}
                     onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                     required className="form-input" />
            </div>
            <div>
              <label className="block text-[11px] font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>
                {t('contact.form.email')} *
              </label>
              <input type="email" value={form.email} placeholder={t('contact.form.emailPlaceholder')}
                     onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                     required className="form-input" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {t('contact.form.subject')} *
            </label>
            <input type="text" value={form.subject} placeholder={t('contact.form.subjectPlaceholder')}
                   onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                   required className="form-input" />
          </div>
          <div>
            <label className="block text-[11px] font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>
              {t('contact.form.message')} *
            </label>
            <textarea value={form.message} placeholder={t('contact.form.messagePlaceholder')}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      required rows={5} className="form-input resize-none" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary justify-center disabled:opacity-60">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t('contact.form.sending')}</>
            ) : (
              <><HiPaperAirplane size={17} className="rotate-90" /> {t('contact.form.send')}</>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
