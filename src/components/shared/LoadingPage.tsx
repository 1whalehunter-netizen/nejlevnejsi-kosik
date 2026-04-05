'use client'

import { useEffect, useState } from 'react'

const STEPS = [
  { id: 'lidl',     label: '🟡 Lidl',     msg: 'Načítám Lidl…' },
  { id: 'kaufland', label: '🔴 Kaufland', msg: 'Načítám Kaufland…' },
  { id: 'albert',   label: '🟢 Albert',   msg: 'Načítám Albert…' },
]

export default function LoadingPage() {
  const [active, setActive] = useState(0)
  const [msg, setMsg] = useState('Připravuji výsledky')

  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      if (i < STEPS.length) {
        setActive(i)
        setMsg(STEPS[i].msg)
        i++
      } else {
        setMsg('Počítám úspory…')
        clearInterval(iv)
      }
    }, 420)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--navy)',
    }}>
      <div style={{ textAlign: 'center', color: '#fff', padding: 32 }}>
        {/* Spinner */}
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          border: '3px solid rgba(255,255,255,.1)',
          borderTopColor: 'var(--lime)',
          animation: 'rot .7s linear infinite',
          margin: '0 auto 20px',
        }} />

        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
          Porovnávám ceny…
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>
          {msg}
        </div>

        {/* Store steps */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              style={{
                border: '1px solid',
                borderColor: i === active
                  ? 'rgba(163,230,53,.3)'
                  : i < active
                    ? 'transparent'
                    : 'rgba(255,255,255,.1)',
                borderRadius: 20, padding: '5px 12px',
                fontSize: 12, fontWeight: 600,
                color: i === active
                  ? 'var(--lime)'
                  : i < active
                    ? 'rgba(255,255,255,.2)'
                    : 'rgba(255,255,255,.35)',
                background: i === active ? 'rgba(163,230,53,.12)' : 'transparent',
                transition: 'all .3s',
              }}
            >
              {step.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
