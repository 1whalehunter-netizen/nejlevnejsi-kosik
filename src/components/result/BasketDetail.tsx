'use client'

import { useState } from 'react'
import { czNum } from '@/lib/compute'
import type { ComputedItem } from '@/types'

interface Props {
  storeName: string
  items: ComputedItem[]
  total: number
}

export default function BasketDetail({ storeName, items, total }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: open ? 'var(--r-lg) var(--r-lg) 0 0' : 'var(--r-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--sh-sm)',
    }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '13px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
          {open ? 'Skrýt obsah košíku' : 'Zobrazit obsah košíku'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--green-text)' }}>
            {czNum(total)} Kč
          </span>
          <span style={{
            fontSize: 10, color: 'var(--text4)',
            display: 'inline-block',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform .22s',
          }}>
            ▼
          </span>
        </div>
      </button>

      {/* Detail panel */}
      {open && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 16px',
                borderBottom: '1px solid var(--bg)',
              }}
            >
              <div style={{ fontSize: 16, width: 22, textAlign: 'center', flexShrink: 0 }}>
                {item.em}
              </div>
              <div style={{
                flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--text)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {item.name}
              </div>
              {item.qty > 1 && (
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text4)', flexShrink: 0 }}>
                  ×{item.qty}
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', flexShrink: 0 }}>
                {czNum(item.line)} Kč
              </div>
            </div>
          ))}

          {/* Total row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '11px 16px',
            background: 'var(--bg)',
            borderTop: '2px solid var(--border)',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>
              Celkem v {storeName}
            </span>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--green-text)', letterSpacing: '-.4px' }}>
              {czNum(total)} Kč
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
