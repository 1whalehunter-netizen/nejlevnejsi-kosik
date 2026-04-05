'use client'

import { useEffect, useRef } from 'react'
import { czNum } from '@/lib/compute'
import type { ComparisonResult } from '@/types'

const RANKS = ['🥇', '🥈', '🥉']

interface Props {
  comparison: ComparisonResult
}

export default function CompareTable({ comparison }: Props) {
  const { results, best } = comparison
  const fillRefs = useRef<(HTMLDivElement | null)[]>([])

  // Animate bars after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      results.forEach((r, i) => {
        const barW = Math.round((best.total / r.total) * 100)
        const el = fillRefs.current[i]
        if (el) {
          setTimeout(() => { el.style.width = barW + '%' }, 80)
        }
      })
    })
    return () => cancelAnimationFrame(id)
  }, [results, best.total])

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--sh-sm)',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text4)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
          Srovnání obchodů
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: 'var(--green-text)' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green-lt)', display: 'inline-block' }} />
          Aktualizováno tento týden
        </div>
      </div>

      {/* Rows */}
      {results.map((r, i) => {
        const diff = Math.round(r.total - best.total)
        const isWinner = i === 0

        return (
          <div
            key={r.store.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 11,
              padding: '12px 16px',
              borderBottom: i < results.length - 1 ? '1px solid var(--bg)' : 'none',
              background: isWinner ? 'var(--green-bg)' : 'transparent',
            }}
          >
            <div style={{ fontSize: 16, width: 20, textAlign: 'center', flexShrink: 0 }}>
              {RANKS[i]}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                  {r.store.name}
                </span>
                {isWinner && (
                  <span style={{
                    fontSize: 10, fontWeight: 800, letterSpacing: '.05em',
                    background: 'var(--green)', color: '#fff',
                    padding: '2px 7px', borderRadius: 20,
                  }}>
                    NEJLEVNĚJŠÍ
                  </span>
                )}
              </div>
              {/* Progress bar */}
              <div style={{ height: 4, background: 'var(--bg2)', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  ref={el => { fillRefs.current[i] = el }}
                  style={{
                    height: '100%', borderRadius: 2,
                    background: isWinner ? 'var(--green)' : 'var(--border2)',
                    width: '0%',
                    transition: 'width .7s cubic-bezier(.34,1.56,.64,1)',
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.4px' }}>
                {czNum(r.total)} Kč
              </div>
              <div style={{
                fontSize: 12, fontWeight: 600, marginTop: 2,
                color: isWinner ? 'var(--green-text)' : 'var(--danger)',
              }}>
                {isWinner ? '✓ ušetříš nejvíc' : `+${czNum(diff)} Kč navíc`}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
