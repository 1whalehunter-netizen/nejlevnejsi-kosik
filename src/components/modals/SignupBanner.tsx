'use client'

import { useState } from 'react'

interface Props {
  onClose: () => void
}

export default function SignupBanner({ onClose }: Props) {
  const [email, setEmail]     = useState('')
  const [error, setError]     = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    const val = email.trim()
    if (!val || !val.includes('@')) {
      setError(true)
      setTimeout(() => setError(false), 1500)
      return
    }

    setLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: val }),
      })
      setSuccess(true)
      setTimeout(onClose, 3500)
    } catch {
      // fail silently — show success anyway
      setSuccess(true)
      setTimeout(onClose, 3500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0,
      left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 'var(--max)',
      background: 'var(--surface)',
      borderTop: '2px solid var(--border)',
      boxShadow: '0 -6px 32px rgba(0,0,0,.1)',
      padding: '18px var(--pad) 24px',
      zIndex: 200,
      animation: 'sheetUp .42s cubic-bezier(.34,1.56,.64,1)',
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 12, right: 14,
          background: 'var(--bg)', border: 'none', borderRadius: 6,
          width: 26, height: 26, fontSize: 14, color: 'var(--text3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        ✕
      </button>

      {!success ? (
        <>
          <div style={{
            display: 'inline-block',
            background: 'var(--navy)', color: 'var(--lime)',
            fontSize: 10, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase',
            padding: '3px 8px', borderRadius: 6, marginBottom: 8,
          }}>
            💡 Každý čtvrtek ráno
          </div>

          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-.3px', marginBottom: 4, paddingRight: 28 }}>
            Chceš vědět každý týden, kde nakoupit nejlevněji?
          </div>

          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text2)', lineHeight: 1.55, marginBottom: 13 }}>
            Pošleme ti výsledek každý čtvrtek.{' '}
            <strong style={{ color: 'var(--text)' }}>Ušetříš stovky až tisíce Kč měsíčně.</strong>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="tvuj@email.cz"
              style={{
                flex: 1,
                border: `1.5px solid ${error ? 'var(--danger)' : 'var(--border2)'}`,
                borderRadius: 'var(--r-sm)', padding: '11px 13px',
                fontSize: 14, color: 'var(--text)', background: 'var(--bg)',
                outline: 'none',
                transition: 'border-color .15s',
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: 'var(--navy)', color: '#fff',
                border: 'none', borderRadius: 'var(--r-sm)',
                padding: '11px 14px', fontSize: 13, fontWeight: 800,
                whiteSpace: 'nowrap', cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? '…' : 'Chci ušetřit každý týden'}
            </button>
          </div>

          <div style={{ fontSize: 11, color: 'var(--text4)', marginTop: 8 }}>
            🔒 Bez spamu. Odhlásíš se jedním klikem.
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 28 }}>🎉</div>
          <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>
            Super! Uvidíme se příští čtvrtek.
          </div>
          <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 2 }}>
            Pošleme ti nejlepší obchod pro tvůj košík.
          </div>
        </div>
      )}
    </div>
  )
}
