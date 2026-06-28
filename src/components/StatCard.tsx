import { useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import { useMousePosition } from '../hooks/useMousePosition.ts'
import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string
  unit?: string
  status?: 'good' | 'warning' | 'critical'
  icon: ReactNode
  gradient: string
}

export default function StatCard({ title, value, unit, status, icon, gradient }: StatCardProps) {
  const reduced = useReducedMotion()
  const { ref, centerX, centerY } = useMousePosition<HTMLDivElement>()
  const [shine, setShine] = useState(false)

  const statusColor =
    status === 'good' ? '#4fa880' : status === 'warning' ? '#f0b429' : '#e84c4c'

  return (
    <div
      ref={ref}
      onMouseEnter={() => !reduced && setShine(true)}
      onAnimationEnd={() => setShine(false)}
      className="relative rounded-xl p-5 overflow-hidden cursor-default transition-all duration-300 ease-out"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        transformStyle: 'preserve-3d',
        transform: reduced
          ? 'none'
          : `perspective(600px) translateY(${centerY ? -6 * Math.abs(centerY) : 0}px) rotateX(${-centerY * 5}deg) rotateY(${centerX * 5}deg)`,
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${gradient} 0%, transparent 100%)`,
          opacity: centerX !== 0 || centerY !== 0 ? 0.4 : 0,
          pointerEvents: 'none',
        }}
      />

      {shine && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
            animation: 'stat-shine 0.5s ease-in-out forwards',
          }}
        />
      )}

      <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
            style={{ background: 'var(--bg-inset)' }}
          >
            {icon}
          </div>
          {status && (
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColor, boxShadow: `0 0 6px ${statusColor}` }}
            />
          )}
        </div>

        <div className="text-2xl font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
          {value}
          {unit && <span className="text-xs font-normal ml-1" style={{ color: 'var(--text-muted)' }}>{unit}</span>}
        </div>

        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{title}</div>
      </div>

      <style>{`
        @keyframes stat-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}
