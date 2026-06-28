import { useMousePosition } from '../hooks/useMousePosition.ts'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import ScoreGlobe from './ScoreGlobe.tsx'
import StatCard from './StatCard.tsx'

const stats = [
  { title: 'BMI', value: '22.4', unit: 'kg/m²', status: 'good' as const, icon: '⚖️', gradient: '#4fa880' },
  { title: 'Biological Age', value: '28', unit: 'yrs', status: 'good' as const, icon: '🎂', gradient: '#4a8fd9' },
  { title: 'Cardiovascular Age', value: '32', unit: 'yrs', status: 'warning' as const, icon: '❤️', gradient: '#f0b429' },
  { title: 'Metabolic Health', value: 'A-', status: 'good' as const, icon: '⚡', gradient: '#4fa880' },
]

export default function Dashboard() {
  const reduced = useReducedMotion()
  const { ref, centerX, centerY } = useMousePosition<HTMLDivElement>()

  return (
    <div className="min-h-screen py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Your real-time health overview</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4fa880]" />
            Last updated: today
          </div>
        </div>

        <div
          ref={ref}
          className="relative rounded-2xl p-6 md:p-8 mb-8 overflow-hidden transition-all duration-300 ease-out"
          style={{
            background: 'linear-gradient(135deg, rgba(79,168,128,0.06), rgba(74,143,217,0.06))',
            border: '1px solid var(--border-card)',
            transformStyle: 'preserve-3d',
            transform: reduced
              ? 'none'
              : `perspective(800px) rotateX(${-centerY * 3}deg) rotateY(${centerX * 3}deg)`,
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(79,168,128,0.12), transparent)',
              transform: reduced ? 'none' : `translate(${centerX * 12}px, ${centerY * 12}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1" style={{ transformStyle: 'preserve-3d' }}>
              <div className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: '#4fa880' }}>
                Welcome back, Alex
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)', transform: 'translateZ(20px)' }}>
                Your Health Score
              </h2>
              <p className="text-sm max-w-md leading-relaxed" style={{ color: 'var(--text-secondary)', transform: 'translateZ(10px)' }}>
                Your overall health score has improved 3.2% this month. Keep up the great work!
              </p>
              <div className="flex gap-5 mt-6" style={{ transform: 'translateZ(15px)' }}>
                <div className="px-4 py-3 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
                  <div className="text-xl font-bold" style={{ color: '#4fa880' }}>+3.2%</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>This month</div>
                </div>
                <div className="px-4 py-3 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
                  <div className="text-xl font-bold" style={{ color: '#4a8fd9' }}>12</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Day streak</div>
                </div>
              </div>
            </div>

            <div className="shrink-0" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}>
              <ScoreGlobe />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Key Metrics</h3>
            <button className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors" style={{ color: '#4fa880', background: 'rgba(79,168,128,0.1)' }}>
              View all &rarr;
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
