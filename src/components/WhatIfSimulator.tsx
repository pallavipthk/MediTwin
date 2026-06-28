import { useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import FlipCard from './FlipCard.tsx'

const scenarios = [
  { icon: '🚬', title: 'Quit Smoking', desc: 'Eliminate tobacco entirely + reduced cardiovascular risk markers' },
  { icon: '🥗', title: 'Mediterranean Diet', desc: 'Adopt a full Mediterranean eating pattern for 90 days' },
  { icon: '🏃', title: 'Daily Running', desc: '30 min moderate running, 5 days per week' },
  { icon: '😴', title: 'Sleep Optimization', desc: '7-8 hours consistent sleep schedule with no screens before bed' },
  { icon: '🧘', title: 'Stress Reduction', desc: 'Daily meditation + breathing exercises, 15 min/day' },
  { icon: '💧', title: 'Hydration Goal', desc: '3L water daily, no sugary drinks' },
  { icon: '🏋️', title: 'Strength Training', desc: '3x/week full-body resistance training' },
  { icon: '🍷', title: 'Reduce Alcohol', desc: 'Max 2 units/week, down from current 10+' },
  { icon: '🧠', title: 'Brain Training', desc: 'Daily cognitive exercises + learning new skills' },
]

const mockResult = {
  age: 28,
  bmi: 21.8,
  cardio: 30,
  metabolic: 'A',
  lifespan: '+4.2 yrs',
}

export default function WhatIfSimulator() {
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (title: string) => {
    setSelected(title)
    setShowResult(false)
    setTimeout(() => setShowResult(true), 100)
  }

  return (
    <div className="min-h-screen py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>What-If Simulator</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Select a lifestyle change to see how it affects your health</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {scenarios.map((s) => (
            <FlipCard
              key={s.title}
              icon={s.icon}
              title={s.title}
              description={s.desc}
              isSelected={selected === s.title}
              onSelect={() => handleSelect(s.title)}
            />
          ))}
        </div>

        {selected && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" style={{ perspective: '800px' }}>
            <div
              className="rounded-xl p-6"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                transformStyle: 'preserve-3d',
                animation: showResult && !reduced ? 'slide-in-left 0.5s ease-out' : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text-muted)' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Current State</span>
              </div>
              <div className="space-y-3">
                <Row label="Biological Age" value="34 yrs" />
                <Row label="BMI" value="27.2" />
                <Row label="Cardiovascular Age" value="40 yrs" />
                <Row label="Metabolic Health" value="B+" />
                <Row label="Estimated Lifespan" value="78.3 yrs" />
              </div>
            </div>

            <div
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(79,168,128,0.06), rgba(74,143,217,0.04))',
                border: '1px solid rgba(79,168,128,0.2)',
                transformStyle: 'preserve-3d',
                animation: showResult && !reduced ? 'slide-in-right 0.5s ease-out' : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4fa880]" />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#4fa880' }}>After: {selected}</span>
              </div>
              <div className="space-y-3">
                <Row label="Biological Age" value={`${mockResult.age} yrs`} accent />
                <Row label="BMI" value={String(mockResult.bmi)} accent />
                <Row label="Cardiovascular Age" value={`${mockResult.cardio} yrs`} accent />
                <Row label="Metabolic Health" value={mockResult.metabolic} accent />
                <Row label="Estimated Lifespan" value={mockResult.lifespan} accent />
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in-left {
          0% { transform: perspective(800px) rotateY(12deg) translateX(-20px); opacity: 0; }
          100% { transform: perspective(800px) rotateY(0deg) translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          0% { transform: perspective(800px) rotateY(-12deg) translateX(20px); opacity: 0; }
          100% { transform: perspective(800px) rotateY(0deg) translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border-subtle)' }}>
      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className={`text-sm font-semibold ${accent ? 'text-[#4fa880]' : ''}`} style={{ color: accent ? undefined : 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  )
}
