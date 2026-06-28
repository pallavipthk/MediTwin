import { useState } from 'react'
import AvatarOrb from './AvatarOrb.tsx'

const messages = [
  { role: 'assistant', text: 'Hello! I\'m your AI health coach. How are you feeling today?' },
  { role: 'user', text: 'I\'ve been feeling pretty tired lately, even after sleeping 8 hours.' },
  { role: 'assistant', text: 'That sounds like it could be related to sleep quality rather than quantity. Let me suggest a few things to improve your deep sleep cycles...' },
]

export default function AICoach() {
  const [input, setInput] = useState('')

  return (
    <div className="min-h-screen py-8 md:py-10 flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b" style={{ borderColor: 'var(--border-card)' }}>
          <AvatarOrb />
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>AI Health Coach</h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Always here to help</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 mb-6 overflow-y-auto min-h-[300px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 ${
                  m.role === 'user' ? 'text-white' : ''
                }`}
                style={{
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg, #4fa880, #3d8a6a)'
                    : 'var(--bg-card)',
                  border: m.role === 'user'
                    ? '1px solid rgba(79,168,128,0.3)'
                    : '1px solid var(--border-card)',
                  color: m.role === 'user' ? '#fff' : 'var(--text-primary)',
                }}
              >
                {m.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4fa880, #3d8a6a)' }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-8 8-8s8 4 8 8" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#4fa880' }}>Coach</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your health coach anything..."
            className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              color: 'var(--text-primary)',
            }}
          />
          <button
            className="px-5 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #4fa880, #3d8a6a)',
              boxShadow: '0 4px 16px rgba(79,168,128,0.3)',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
