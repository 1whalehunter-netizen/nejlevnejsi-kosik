'use client'

import { useState, useEffect, useRef } from 'react'
import { PRODUCT_CATEGORIES, ALL_PRODUCTS } from '@/data/products'
import type { Product } from '@/types'

interface Props {
  basketIds: Set<string>
  onAdd: (id: string) => void
  onClose: () => void
}

export default function AddSheet({ basketIds, onAdd, onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 120)
    return () => clearTimeout(t)
  }, [])

  // Filter products by search query
  const filtered: Product[] = query.length >= 2
    ? ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.sub && p.sub.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 12)
    : []

  const handleAdd = (id: string) => {
    onAdd(id)
    setTimeout(onClose, 250)
  }

  const ProdRow = ({ p }: { p: Product }) => {
    const lo = Math.min(...p.p)
    const added = basketIds.has(p.id)
    return (
      <div
        onClick={() => handleAdd(p.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 16px', cursor: 'pointer',
          borderBottom: '1px solid var(--bg)',
        }}
      >
        <div style={{ fontSize: 19, width: 28, textAlign: 'center', flexShrink: 0 }}>{p.em}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{p.name}</div>
          {p.sub && <div style={{ fontSize: 11, color: 'var(--text4)', marginTop: 1 }}>{p.sub}</div>}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-text)', flexShrink: 0 }}>
          od {lo.toFixed(2).replace('.', ',')} Kč
        </div>
        <div style={{ fontSize: 18, lineHeight: 1, color: added ? 'var(--green)' : 'var(--border2)', flexShrink: 0 }}>
          {added ? '✓' : '+'}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,.5)', zIndex: 300,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}
      >
        {/* Sheet — stop propagation so clicks inside don't close */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--r-xl) var(--r-xl) 0 0',
            width: '100%', maxWidth: 'var(--max)',
            maxHeight: '78vh', display: 'flex', flexDirection: 'column',
            animation: 'sheetUp .28s cubic-bezier(.34,1.56,.64,1)',
          }}
        >
          {/* Handle */}
          <div style={{ width: 36, height: 4, background: 'var(--border2)', borderRadius: 2, margin: '12px auto 0', flexShrink: 0 }} />

          {/* Search */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Hledat produkt…"
              style={{
                width: '100%',
                background: 'var(--bg)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--r-sm)',
                padding: '10px 14px',
                fontSize: 14, color: 'var(--text)',
                outline: 'none',
              }}
            />
          </div>

          {/* Body */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {query.length >= 2 ? (
              filtered.length > 0
                ? filtered.map(p => <ProdRow key={p.id} p={p} />)
                : <div style={{ padding: '20px 16px', textAlign: 'center', color: 'var(--text4)', fontSize: 13 }}>Produkt nenalezen</div>
            ) : (
              Object.values(PRODUCT_CATEGORIES).map(cat => (
                <div key={cat.label}>
                  <div style={{
                    fontSize: 11, fontWeight: 800, letterSpacing: '.07em',
                    textTransform: 'uppercase', color: 'var(--text4)',
                    padding: '12px 16px 6px',
                  }}>
                    {cat.label}
                  </div>
                  {cat.items.map(p => <ProdRow key={p.id} p={p} />)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
