import { useState, lazy, Suspense, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen.tsx'
import Dashboard from './components/Dashboard.tsx'
import PageTransition from './components/PageTransition.tsx'

const WhatIfSimulator = lazy(() => import('./components/WhatIfSimulator.tsx'))
const AICoach = lazy(() => import('./components/AICoach.tsx'))

type Tab = 'welcome' | 'dashboard' | 'simulator' | 'coach'

const tabs: { key: Tab; label: string }[] = [
  { key: 'welcome', label: 'Home' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'simulator', label: 'Simulator' },
  { key: 'coach', label: 'AI Coach' },
]

const fallback = (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#4fa880] border-t-transparent rounded-full animate-spin" />
  </div>
)

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f0b429' }}>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4a8fd9' }}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('welcome')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('meditwin-theme')
    if (saved === 'light') {
      setDark(false)
      document.documentElement.classList.remove('dark')
    } else {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('meditwin-theme', next ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-body)' }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
        style={{
          background: 'var(--bg-nav)',
          borderColor: 'var(--border-card)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => setActiveTab('welcome')}
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-transform duration-200 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #4fa880, #4a8fd9)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="font-semibold text-sm hidden sm:inline" style={{ color: 'var(--text-primary)' }}>MediTwin</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="relative px-4 py-1.5 text-sm transition-colors duration-200 rounded-lg"
                style={{
                  color: activeTab === t.key ? 'var(--text-primary)' : 'var(--text-muted)',
                  background: activeTab === t.key ? 'var(--bg-card)' : 'transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle dark={dark} onToggle={toggleTheme} />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-4 pb-3 space-y-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setActiveTab(t.key); setMobileOpen(false) }}
                className="block w-full text-left px-4 py-2 rounded-lg text-sm transition-all"
                style={{
                  background: activeTab === t.key ? 'var(--bg-card)' : 'transparent',
                  color: activeTab === t.key ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-14">
        {activeTab === 'welcome' && (
          <PageTransition key="welcome">
            <WelcomeScreen onNavigate={() => setActiveTab('dashboard')} />
          </PageTransition>
        )}
        {activeTab === 'dashboard' && (
          <PageTransition key="dashboard">
            <Dashboard />
          </PageTransition>
        )}
        {activeTab === 'simulator' && (
          <Suspense fallback={fallback}>
            <PageTransition key="simulator">
              <WhatIfSimulator />
            </PageTransition>
          </Suspense>
        )}
        {activeTab === 'coach' && (
          <Suspense fallback={fallback}>
            <PageTransition key="coach">
              <AICoach />
            </PageTransition>
          </Suspense>
        )}
      </main>

      <footer
        className="border-t py-8 px-6 text-center text-sm"
        style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4fa880, #4a8fd9)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>MediTwin AI</span>
          </div>
          <p>Your AI-powered health twin. &copy; 2026</p>
        </div>
      </footer>
    </div>
  )
}
