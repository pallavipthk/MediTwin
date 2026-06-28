import { type ReactNode, useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  if (reduced) return <>{children}</>

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.35s ease-out, transform 0.35s ease-out',
      }}
    >
      {children}
    </div>
  )
}
