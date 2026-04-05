'use client'

import { useState } from 'react'
import { czNum, weekLabel } from '@/lib/compute'
import type { ComparisonResult } from '@/types'

interface Props {
  comparison: ComparisonResult
  onClose: () => void
}

export default function ShareModal({ comparison, onClose }: Props) {
  const { best, worst, weeklyDiff, yearlySaving } = comparison
  const wkLabel = weekLabel()
  const [copyLabel, setCopyLabel]   = useState('📋 Kopírovat text')
  const [shareLabel, setShareLabel] = useState('📤 Sdílet')

  const shareText = [
    '🛒 NejlevnějšíKošík.cz',
    '',
    `Tento týden nakupuj v ${best.store.name}!`,
    `✅ Celkem: ${czNum(best.total)} Kč`,
    `💰 Týdenní úspora: ${czNum(weeklyDiff)} Kč oproti ${worst.store.name}`,
    `📅 Za rok ušetříš: ${czNum(yearlySaving)} Kč`,
    '',
    'nejlevnejsikosik.cz',
  ].join('\n')

  async function doCopy() {
    await navigator.clipboard.writeText(shareText)
    setCopyLabel('✅ Zkopírováno!')
    setTimeout(() => setCopyLabel('📋 Kopírovat text'), 2000)
  }

  async function doShare() {
    const shortText = `Tento týden nakupuj v ${best.store.name} — ušetříš ${czNum(weeklyDiff)} Kč! Za rok to je ${czNum(yearlySaving)} Kč. 🛒`
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'NejlevnějšíKošík.cz',
          text: shortText,
          url: 'https://nejlevnejsikosik.cz',
        })
      } catch {
        // User cancelled — no-op
      }
    } else {
      await navigator.clipboard.writeText(shortText + '\nnejlevnejsikosik.cz')
      setShareLabel('✅ Zkopírováno!')
      setTimeout(() => setShareLabel('📤 Sdílet'), 2000)
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,.55)', zIndex: 400,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--r-xl) var(--r-xl) 0 0',
          width: '100%', maxWidth: 'var(--max)',
          paddingBottom: 32,
          animation: 'sheetUp .28s cubic-bezier(.34,1.56,.64,1)',
        }}
      >
        {/* Handle */}
        <div style={{ width: 36, height: 4, background: 'var(--border2)', borderRadius: 2, margin: '12px auto 0' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 0' }}>
          <div style={{ fontSize: 16, fontWeight: 800 }}>Sdílet výsledek</div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg)', border: 'none', borderRadius: 6,
              width: 28, height: 28, fontSize: 15, color: 'var(--text3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Preview card */}
        <div style={{
          margin: '14px 16px',
          background: 'var(--navy2)',
          borderRadius: 'var(--r-lg)',
          padding: 20, overflow: 'hidden', position: 'relative',
        }}>
          <div style={{ position: 'absolute', bottom: -30, right: -30, width: 110, height: 110, background: 'rgba(163,230,53,.1)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.3)', marginBottom: 12 }}>
            NejlevnějšíKošík.cz
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', fontWeight: 600 }}>
            Tento týden nakup v
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 12, lineHeight: 1.1 }}>
            {best.store.name.toUpperCase()}
          </div>
          <div style={{
            display: 'inline-flex', flexDirection: 'column',
            background: 'var(--lime)', borderRadius: 'var(--r-sm)',
            padding: '10px 14px', marginBottom: 10,
          }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--navy)', opacity: .6, letterSpacing: '.07em', textTransform: 'uppercase' }}>
              Za rok ušetříš
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--navy)', letterSpacing: '-1px', lineHeight: 1.1 }}>
              {czNum(yearlySaving)} Kč
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.25)' }}>
            {wkLabel}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 16px' }}>
          {[
            { label: copyLabel, action: doCopy },
            { label: shareLabel, action: doShare },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={btn.action}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: 'var(--bg)', border: '1.5px solid var(--border)',
                borderRadius: 'var(--r)', padding: 12,
                fontSize: 13, fontWeight: 700, color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
