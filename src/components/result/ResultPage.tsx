'use client'

import { useState } from 'react'
import { czNum, weekLabel } from '@/lib/compute'
import type { ComparisonResult } from '@/types'
import CompareTable from './CompareTable'
import BasketDetail from './BasketDetail'

interface Props {
  comparison: ComparisonResult
  onBack: () => void
  onShare: () => void
}

export default function ResultPage({ comparison, onBack, onShare }: Props) {
  const { best, worst, weeklyDiff, monthlySaving, yearlySaving } = comparison
  const wkLabel = weekLabel()

  return (
    <>
      {/* Result top bar */}
      <header style={{
        background: 'var(--navy)',
        padding: '13px var(--pad)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>
          NejlevnějšíKošík<span style={{ color: 'var(--lime)' }}>.cz</span>
        </div>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,.1)', border: 'none',
            borderRadius: 6, padding: '6px 11px',
            fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.6)',
            cursor: 'pointer',
          }}
        >
          ← Upravit košík
        </button>
      </header>

      {/* Verdict band */}
      <div style={{ background: 'var(--navy2)', padding: '22px var(--pad) 48px' }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '.08em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,.3)',
          marginBottom: 12,
        }}>
          {wkLabel}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'var(--green)', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, marginTop: 4,
          }}>
            ✓
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.45)', marginBottom: 3 }}>
              Tento týden nakup v
            </div>
            <div style={{
              fontSize: 'clamp(30px, 8vw, 40px)',
              fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1,
            }}>
              <span style={{ color: 'var(--lime)' }}>{best.store.name.toUpperCase()}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.5)', marginTop: 7 }}>
              Jinde přeplatíš až{' '}
              <strong style={{ color: '#f87171', fontWeight: 800 }}>
                {czNum(weeklyDiff)} Kč
              </strong>{' '}
              týdně
            </div>
          </div>
        </div>
      </div>

      {/* Savings card — floats over verdict */}
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--r-xl)',
        margin: '-28px var(--pad) 0',
        position: 'relative', zIndex: 10,
        boxShadow: 'var(--sh-xl)',
        overflow: 'hidden',
      }}>
        {/* Yearly hero */}
        <div style={{
          background: 'var(--navy)',
          padding: '24px 24px 20px',
          textAlign: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 110%, rgba(163,230,53,.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '.09em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,.35)',
            marginBottom: 6, position: 'relative',
          }}>
            Za rok ušetříš
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{
              fontSize: 'clamp(52px, 13vw, 64px)',
              fontWeight: 800, color: 'var(--lime)',
              letterSpacing: '-3px', lineHeight: 1,
            }}>
              {czNum(yearlySaving)}
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--lime)', opacity: .75, letterSpacing: '-1px' }}>
              {' '}Kč
            </span>
          </div>
          <div style={{
            fontSize: 13, fontWeight: 500, lineHeight: 1.55,
            color: 'rgba(255,255,255,.45)', marginTop: 8, position: 'relative',
            maxWidth: 280, marginLeft: 'auto', marginRight: 'auto',
          }}>
            <strong style={{ color: 'rgba(255,255,255,.7)' }}>Každý rok</strong>{' '}
            necháš tolik peněz navíc v dražším obchodě. Zbytečně.
          </div>
        </div>

        {/* Monthly + weekly */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--border)' }}>
          {[
            { label: 'Za měsíc', val: `~${czNum(monthlySaving)}`, sub: 'Kč navíc' },
            { label: 'Za týden', val: czNum(weeklyDiff), sub: 'Kč zbytečně' },
          ].map((cell, i) => (
            <div
              key={cell.label}
              style={{
                padding: '14px 20px',
                display: 'flex', flexDirection: 'column', gap: 3,
                borderLeft: i === 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text4)' }}>
                {cell.label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.7px', lineHeight: 1.1 }}>
                {cell.val}
              </div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text4)' }}>
                {cell.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of result content */}
      <div style={{
        padding: '16px var(--pad) 120px',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* Urgency */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'var(--amber-bg)', border: '1px solid var(--amber-bd)',
          borderRadius: 'var(--r-sm)', padding: '9px 13px',
          fontSize: 12, fontWeight: 600, color: 'var(--amber)',
        }}>
          ⏰ <span>Platí tento týden — <strong>akce končí v neděli</strong></span>
        </div>

        {/* Compare table */}
        <CompareTable comparison={comparison} />

        {/* Basket detail accordion */}
        <BasketDetail
          storeName={best.store.name}
          items={best.items}
          total={best.total}
        />

        {/* Single share button */}
        <button
          onClick={onShare}
          style={{
            width: '100%',
            background: 'var(--navy)', color: '#fff',
            border: 'none', borderRadius: 'var(--r)',
            padding: 14,
            fontSize: 14, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            cursor: 'pointer',
            boxShadow: 'var(--sh-sm)',
          }}
        >
          📤 &nbsp;Sdílet výsledek
        </button>
      </div>
    </>
  )
}
