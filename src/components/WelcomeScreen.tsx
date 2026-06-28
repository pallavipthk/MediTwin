import { Suspense, lazy } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import BackgroundOrbs from './BackgroundOrbs.tsx'

const DnaHelix = lazy(() => import('./DnaHelix.tsx'))

export default function WelcomeScreen({ onNavigate }: { onNavigate?: () => void }) {
  const reduced = useReducedMotion()

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <BackgroundOrbs />

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(79,168,128,0.15), rgba(74,143,217,0.15))',
                  border: '1px solid var(--border-card)',
                  color: '#4fa880',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4fa880]" />
                AI-Powered Health Twin
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                Your Personal{' '}
                <span className="bg-gradient-to-r from-[#4fa880] to-[#4a8fd9] bg-clip-text text-transparent inline-block">
                  MediTwin
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl max-w-xl mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                A digital twin of your health powered by AI. Simulate lifestyle changes,
                track biomarkers, and get personalized coaching for a longer, healthier life.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={onNavigate}
                  className="px-8 py-3.5 rounded-xl text-white font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #4fa880, #3d8a6a)',
                    boxShadow: '0 4px 24px rgba(79,168,128,0.3)',
                  }}
                >
                  Get Started Free
                </button>
                <button
                  className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300"
                  style={{
                    border: '1px solid var(--border-card)',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-card)',
                  }}
                >
                  Watch Demo
                </button>
              </div>

              <div className="flex gap-8 sm:gap-12 mt-12 justify-center lg:justify-start">
                {[
                  { value: '10K+', label: 'Active Users' },
                  { value: '95%', label: 'Accuracy Rate' },
                  { value: '24/7', label: 'AI Support' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
                    <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative h-[350px] md:h-[480px] w-full lg:w-auto hidden md:block">
              {reduced ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ background: 'conic-gradient(from 0deg, #4fa880, #4a8fd9, #4fa880)' }}
                    />
                    <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-body)' }}>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#4fa880] to-[#4a8fd9] bg-clip-text text-transparent">
                        MT
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-[#4fa880] border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <DnaHelix />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
