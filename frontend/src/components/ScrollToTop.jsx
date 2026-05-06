import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center
                     text-white shadow-lg transition-transform hover:scale-110 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #2563eb, #f43f5e)',
                   boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
          title="Retour en haut"
        >
          <HiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
