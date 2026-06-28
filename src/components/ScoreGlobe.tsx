import { useReducedMotion } from '../hooks/useReducedMotion.ts'

export default function ScoreGlobe() {
  const reduced = useReducedMotion()

  const particleCount = 8
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    angle: (i / particleCount) * Math.PI * 2,
    delay: i * 0.4,
  }))

  return (
    <div className="relative w-32 h-32 md:w-36 md:h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <defs>
          <radialGradient id="globe-glow" cx="35%" cy="35%">
            <stop offset="0%" stopColor="rgba(79,168,128,0.25)" />
            <stop offset="50%" stopColor="rgba(74,143,217,0.12)" />
            <stop offset="100%" stopColor="rgba(8,12,22,0)" />
          </radialGradient>
          <radialGradient id="globe-surface-d" cx="40%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="60%" stopColor="rgba(79,168,128,0.06)" />
            <stop offset="100%" stopColor="rgba(8,12,22,0.25)" />
          </radialGradient>
          <radialGradient id="globe-surface-l" cx="40%" cy="30%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.04)" />
            <stop offset="60%" stopColor="rgba(79,168,128,0.06)" />
            <stop offset="100%" stopColor="rgba(8,12,22,0.04)" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-subtle)" strokeWidth="4" />

        <circle
          cx="60" cy="60" r="52" fill="none"
          stroke="url(#globe-surface-d)" strokeWidth="4"
          strokeDasharray={`${(78 / 100) * 327} 327`}
          strokeLinecap="round"
          className="dark:block hidden"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(79,168,128,0.25))',
            transition: 'stroke-dasharray 1s ease',
          }}
        />
        <circle
          cx="60" cy="60" r="52" fill="none"
          stroke="url(#globe-surface-l)" strokeWidth="4"
          strokeDasharray={`${(78 / 100) * 327} 327`}
          strokeLinecap="round"
          className="dark:hidden block"
          style={{
            filter: 'drop-shadow(0 0 4px rgba(79,168,128,0.15))',
            transition: 'stroke-dasharray 1s ease',
          }}
        />

        <circle
          cx="60" cy="60" r="52"
          fill="url(#globe-surface-d)"
          className="dark:block hidden"
          stroke="var(--border-subtle)" strokeWidth="1"
        />
        <circle
          cx="60" cy="60" r="52"
          fill="url(#globe-surface-l)"
          className="dark:hidden block"
          stroke="var(--border-subtle)" strokeWidth="1"
        />

        <ellipse
          cx="60" cy="60" rx="52" ry="8"
          fill="none" stroke="var(--border-subtle)" strokeWidth="1"
          transform="rotate(-20 60 60)"
        />
        <ellipse
          cx="60" cy="60" rx="52" ry="6"
          fill="none" stroke="var(--border-subtle)" strokeWidth="1"
          transform="rotate(40 60 60)"
        />

        <circle
          cx="40" cy="40" r="20" fill="url(#globe-glow)"
          opacity={0.4}
        />

        <circle
          cx="60" cy="60" r="54" fill="none"
          stroke="rgba(79,168,128,0.15)" strokeWidth="2"
          filter="url(#glow-filter)"
          style={{
            animation: reduced ? 'none' : 'pulse-glow 3s ease-in-out infinite',
          }}
        />

        <text x="60" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="22" fontWeight="bold">
          78
        </text>
        <text x="60" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="8">
          Overall
        </text>
      </svg>

      {!reduced && (
        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '400px' }}>
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full top-1/2 left-1/2 -mt-0.5 -ml-0.5"
              style={{
                background: i % 2 === 0 ? '#4fa880' : '#4a8fd9',
                boxShadow: `0 0 4px ${i % 2 === 0 ? '#4fa880' : '#4a8fd9'}`,
                animation: `orbit-particle 6s linear infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
        @keyframes orbit-particle {
          from { transform: rotate(0deg) translateX(76px); }
          to { transform: rotate(360deg) translateX(76px); }
        }
      `}</style>
    </div>
  )
}
