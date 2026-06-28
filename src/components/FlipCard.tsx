import { type ReactNode, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

interface FlipCardProps {
  icon: ReactNode
  title: string
  description: string
  isSelected?: boolean
  onSelect?: () => void
}

export default function FlipCard({ icon, title, description, isSelected, onSelect }: FlipCardProps) {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl p-5 cursor-pointer select-none"
      style={{
        background: isSelected ? 'linear-gradient(135deg, rgba(79,168,128,0.12), rgba(74,143,217,0.08))' : 'var(--bg-card)',
        border: isSelected ? '1px solid rgba(79,168,128,0.3)' : '1px solid var(--border-card)',
        transformStyle: 'preserve-3d',
        transform: reduced ? 'none' : `perspective(500px) rotateY(${hovered ? (isSelected ? 3 : 6) : 0}deg)`,
        boxShadow: hovered ? 'var(--shadow-elevated)' : 'var(--shadow-card)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out, background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="text-2xl mb-3"
          style={{
            transform: reduced ? 'none' : `translateZ(${hovered ? 12 : 0}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {icon}
        </div>
        <h3
          className="font-semibold mb-1.5 text-sm"
          style={{
            color: 'var(--text-primary)',
            transform: reduced ? 'none' : `translateZ(${hovered ? 8 : 0}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {title}
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            transform: reduced ? 'none' : `translateZ(${hovered ? 4 : 0}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {description}
        </p>
      </div>

      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#4fa880' }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  )
}
