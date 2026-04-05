'use client'

interface Props {
  onCompare: () => void
  disabled: boolean
}

export default function CtaBlock({ onCompare, disabled }: Props) {
  return (
    <div style={{ marginTop: 16 }}>
      {/* Urgency */}
      <div style={{
        background: 'var(--amber-bg)', border: '1px solid var(--amber-bd)',
        borderRadius: 'var(--r-sm)', padding: '9px 13px',
        display: 'flex', alignItems: 'center', gap: 7,
        marginBottom: 14,
        fontSize: 12, fontWeight: 600, color: 'var(--amber)',
      }}>
        ⏰ <span>Ceny platí tento týden — akce v obchodech <strong>končí v neděli</strong></span>
      </div>

      {/* CTA button */}
      <button
        onClick={onCompare}
        disabled={disabled}
        style={{
          width: '100%',
          background: disabled ? 'var(--border2)' : 'var(--green)',
          color: disabled ? 'var(--text4)' : '#fff',
          border: 'none',
          borderRadius: 'var(--r-lg)',
          padding: '16px 24px',
          fontSize: 16, fontWeight: 800, letterSpacing: '-.2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: disabled ? 'none' : '0 4px 18px rgba(22,163,74,.3)',
          transition: 'all .15s',
        }}
      >
        Zjistit kde ušetřím →
      </button>

      <p style={{
        textAlign: 'center', fontSize: 12, color: 'var(--text4)',
        fontWeight: 500, marginTop: 8,
      }}>
        Porovnáme 3 obchody · bez registrace · okamžitý výsledek
      </p>
    </div>
  )
}
