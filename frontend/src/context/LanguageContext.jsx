import { createContext, useContext, useState } from 'react'
import fr from '../locales/fr'
import en from '../locales/en'

const LanguageContext = createContext()

const TRANSLATIONS = { fr, en }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('rf-lang') || 'fr')

  const switchLang = (l) => {
    setLang(l)
    localStorage.setItem('rf-lang', l)
  }

  const t = (key) => {
    const keys = key.split('.')
    let val = TRANSLATIONS[lang]
    for (const k of keys) val = val?.[k]
    return val || key
  }

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
