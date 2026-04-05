export default function TopBar() {
  return (
    <header style={{
      background: 'var(--navy)',
      padding: '13px var(--pad)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: '-.3px', lineHeight: 1 }}>
          NejlevnějšíKošík<span style={{ color: 'var(--lime)' }}>.cz</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,.35)', display: 'block', marginTop: 1 }}>
          by Košíkáč
        </span>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'var(--green-bg)', border: '1px solid var(--green-bd)',
        borderRadius: 20, padding: '4px 10px',
        fontSize: 11, fontWeight: 700, color: 'var(--green-text)',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--green-lt)', flexShrink: 0,
          animation: 'blink 2s ease-in-out infinite',
          display: 'inline-block',
        }} />
        Data aktuální
      </div>
    </header>
  )
}
