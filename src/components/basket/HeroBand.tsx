export default function HeroBand() {
  return (
    <section style={{
      background: 'var(--navy)',
      padding: '28px var(--pad) 32px',
      textAlign: 'center',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(163,230,53,.12)',
        border: '1px solid rgba(163,230,53,.25)',
        borderRadius: 20, padding: '5px 13px',
        fontSize: 11, fontWeight: 700, color: 'var(--lime)',
        letterSpacing: '.04em', textTransform: 'uppercase',
        marginBottom: 16,
      }}>
        ⚡ Výsledek za 10 sekund &nbsp;·&nbsp; Bez registrace
      </div>

      <h1 style={{
        fontSize: 'clamp(24px, 6vw, 32px)',
        fontWeight: 800, color: '#fff',
        letterSpacing: '-.7px', lineHeight: 1.1,
        marginBottom: 12,
      }}>
        Ušetři až{' '}
        <em style={{ color: 'var(--lime)', fontStyle: 'normal' }}>1&nbsp;000&nbsp;Kč</em>
        <br />měsíčně na nákupu
      </h1>

      <p style={{
        fontSize: 14, fontWeight: 500, lineHeight: 1.65,
        color: 'rgba(255,255,255,.55)', marginBottom: 20,
        maxWidth: 340, marginLeft: 'auto', marginRight: 'auto',
      }}>
        Porovnáváme ceny v{' '}
        <strong style={{ color: 'rgba(255,255,255,.8)', fontWeight: 600 }}>
          Lidlu, Kauflandu a Albertu
        </strong>.
        <br />Aktualizováno tento týden.
      </p>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        {['🟢 Data aktuální', '🔒 Bez registrace', '🆓 Zdarma'].map(chip => (
          <div key={chip} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,.07)',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 20, padding: '4px 11px',
            fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.6)',
          }}>
            {chip}
          </div>
        ))}
      </div>
    </section>
  )
}
