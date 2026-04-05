import { STORES } from '@/data/products'

export default function StoresBlock() {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r)',
      padding: '13px 14px',
      marginTop: 10,
      boxShadow: 'var(--sh-sm)',
    }}>
      {/* Active stores row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        flexWrap: 'wrap', fontSize: 13, fontWeight: 500,
      }}>
        <span style={{ color: 'var(--text3)', whiteSpace: 'nowrap' }}>
          Porovnáváme:
        </span>
        {STORES.map(store => (
          <div key={store.id} style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 20, padding: '3px 9px',
            fontSize: 12, fontWeight: 700, color: 'var(--text2)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: store.color, display: 'inline-block', flexShrink: 0,
            }} />
            {store.name}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />

      {/* Coming soon row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text3)', fontWeight: 500 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.05em',
          textTransform: 'uppercase', color: 'var(--amber)',
          background: 'var(--amber-bg)', border: '1px solid var(--amber-bd)',
          padding: '2px 7px', borderRadius: 4,
        }}>
          Brzy
        </span>
        <span>Přidáme také Penny a Billu</span>
      </div>
    </div>
  )
}
