import { useReducedMotion } from '../hooks/useReducedMotion.ts'

export default function AvatarOrb() {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(79,168,128,0.25), rgba(74,143,217,0.12))',
          animation: reduced ? 'none' : 'pulse-ring 3s ease-in-out infinite',
        }}
      />
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #4fa880, #3d8a6a)',
          transformStyle: 'preserve-3d',
          animation: reduced ? 'none' : 'float-rotate 4s linear infinite',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-8 8-8s8 4 8 8" />
        </svg>
      </div>

      <style>{`
        @keyframes float-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.35); opacity: 0.15; }
        }
      `}</style>
    </div>
  )
}
