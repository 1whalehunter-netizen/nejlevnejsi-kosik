'use client'

import { findProductById, ALL_PRODUCTS } from '@/data/products'
import { czNum } from '@/lib/compute'
import type { BasketEntry } from '@/types'

interface Props {
  basket: BasketEntry[]
  onChangeQty: (id: string, delta: number) => void
  onRemove: (id: string) => void
  onAddClick: () => void
}

export default function BasketList({ basket, onChangeQty, onRemove, onAddClick }: Props) {
  const estimate = basket.reduce((sum, e) => {
    const p = findProductById(e.id)
    return p ? sum + Math.min(...p.p) * e.qty : sum
  }, 0)

  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        paddingTop: 20, paddingBottom: 10,
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '.07em',
          textTransform: 'uppercase', color: 'var(--text4)',
        }}>
          Nákupní košík
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text3)' }}>
          ~{czNum(estimate)} Kč
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {basket.map((entry, i) => {
          const p = findProductById(entry.id)
          if (!p) return null
          const lo = Math.min(...p.p)

          return (
            <div
              key={entry.id}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r)',
                padding: '10px 12px',
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: 'var(--sh-sm)',
                animation: 'popIn .2s ease both',
                animationDelay: `${Math.min(i, 10) * 0.025}s`,
              }}
            >
              <div style={{ fontSize: 20, width: 30, textAlign: 'center', flexShrink: 0, lineHeight: 1 }}>
                {p.em}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600, color: 'var(--text)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text4)', fontWeight: 500, marginTop: 1 }}>
                  od{' '}
                  <span style={{ color: 'var(--green-text)', fontWeight: 700 }}>
                    {lo.toFixed(2).replace('.', ',')} Kč
                  </span>
                  {p.sub ? ` · ${p.sub}` : ''}
                </div>
              </div>

              {/* Qty controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                <button
                  onClick={() => entry.qty === 1 ? onRemove(entry.id) : onChangeQty(entry.id, -1)}
                  style={{
                    width: 26, height: 26, borderRadius: 'var(--r-xs)',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    color: 'var(--text2)', fontSize: 15, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', lineHeight: 1,
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: 13, fontWeight: 800, width: 24, textAlign: 'center' }}>
                  {entry.qty}
                </span>
                <button
                  onClick={() => onChangeQty(entry.id, 1)}
                  style={{
                    width: 26, height: 26, borderRadius: 'var(--r-xs)',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    color: 'var(--text2)', fontSize: 15, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', lineHeight: 1,
                  }}
                >
                  +
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() => onRemove(entry.id)}
                title="Odebrat"
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--border2)', fontSize: 14,
                  width: 24, height: 24,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--r-xs)', flexShrink: 0, cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
          )
        })}

        {/* Add trigger */}
        <button
          onClick={onAddClick}
          style={{
            background: 'var(--surface)',
            border: '1.5px dashed var(--border2)',
            borderRadius: 'var(--r)',
            padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 9,
            cursor: 'pointer', marginTop: 6,
            width: '100%', textAlign: 'left',
          }}
        >
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: 'var(--bg2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, color: 'var(--text4)', flexShrink: 0,
          }}>
            +
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text4)' }}>
            Přidat položku…
          </span>
        </button>
      </div>
    </>
  )
}
