import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-main)' }}>
      {/* Fixed sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm"
             onClick={() => setSidebarOpen(false)} />
      )}

      {/* Fixed top bar (theme + lang toggles) */}
      <TopBar onMenuOpen={() => setSidebarOpen(true)} />

      {/* Main content — offset for sidebar + topbar */}
      <div className="flex-1 lg:ml-[270px] flex flex-col pt-14">
        <main className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>

      <ScrollToTop />
      <ToastContainer position="bottom-right" theme="colored"
        toastStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(59,130,246,0.3)',
                      color: 'var(--text-primary)' }} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Layout />
      </LanguageProvider>
    </ThemeProvider>
  )
}
