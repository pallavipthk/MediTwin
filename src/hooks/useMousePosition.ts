import { useState, useEffect, useRef, type RefObject } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition<T extends HTMLElement = HTMLDivElement>(): {
  ref: RefObject<T | null>
  position: MousePosition
  centerX: number
  centerY: number
} {
  const ref = useRef<T | null>(null)
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [center, setCenter] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setPosition({ x, y })
      setCenter({
        x: x / rect.width - 0.5,
        y: y / rect.height - 0.5,
      })
    }

    const handleLeave = () => {
      setCenter({ x: 0, y: 0 })
    }

    el.addEventListener('mousemove', handleMouse)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouse)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return { ref, position, centerX: center.x, centerY: center.y }
}
