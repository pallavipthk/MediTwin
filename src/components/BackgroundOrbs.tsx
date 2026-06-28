import { useRef, useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

export default function BackgroundOrbs() {
  const reduced = useReducedMotion()
  const orbsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const handleMouse = (e: MouseEvent) => {
      if (!orbsRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      orbsRef.current.style.setProperty('--px', `${x * 15}px`)
      orbsRef.current.style.setProperty('--py', `${y * 15}px`)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [reduced])

  return (
    <div
      ref={orbsRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(79,168,128,0.15) 0%, transparent 70%)',
          transform: reduced ? 'none' : 'translate(var(--px, 0), calc(var(--py, 0) * -1))',
          transition: 'transform 0.1s ease-out',
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(74,143,217,0.12) 0%, transparent 70%)',
          transform: reduced ? 'none' : 'translate(calc(var(--px, 0) * -1), var(--py, 0))',
          transition: 'transform 0.1s ease-out',
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--orb-white) 0%, transparent 70%)',
          transform: reduced ? 'none' : 'translate(calc(var(--px, 0) * 0.5), calc(var(--py, 0) * 0.5))',
          transition: 'transform 0.15s ease-out',
        }}
      />
    </div>
  )
}
