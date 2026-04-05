'use client'

import { useState, useCallback } from 'react'
import { DEFAULT_BASKET } from '@/data/products'
import { computeComparison } from '@/lib/compute'
import type { BasketEntry, ComparisonResult } from '@/types'

import TopBar      from './shared/TopBar'
import HeroBand    from './basket/HeroBand'
import BasketList  from './basket/BasketList'
import StoresBlock from './basket/StoresBlock'
import CtaBlock    from './basket/CtaBlock'
import LoadingPage from './shared/LoadingPage'
import ResultPage  from './result/ResultPage'
import AddSheet    from './modals/AddSheet'
import SignupBanner from './modals/SignupBanner'
import ShareModal  from './modals/ShareModal'

type View = 'basket' | 'loading' | 'result'

export default function App() {
  const [view, setView]             = useState<View>('basket')
  const [basket, setBasket]         = useState<BasketEntry[]>(DEFAULT_BASKET)
  const [comparison, setComparison] = useState<ComparisonResult | null>(null)
  const [addOpen, setAddOpen]       = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [shareOpen, setShareOpen]   = useState(false)

  // ─── Basket mutations ────────────────────────────────────
  const changeQty = useCallback((id: string, delta: number) => {
    setBasket(prev =>
      prev.map(e => e.id === id ? { ...e, qty: Math.max(1, e.qty + delta) } : e)
    )
  }, [])

  const removeItem = useCallback((id: string) => {
    setBasket(prev => prev.filter(e => e.id !== id))
  }, [])

  const addItem = useCallback((id: string) => {
    setBasket(prev => {
      const ex = prev.find(e => e.id === id)
      if (ex) return prev.map(e => e.id === id ? { ...e, qty: e.qty + 1 } : e)
      return [...prev, { id, qty: 1 }]
    })
  }, [])

  const basketIds = new Set(basket.map(e => e.id))

  // ─── Compare flow ────────────────────────────────────────
  const startCompare = useCallback(async () => {
    if (!basket.length) return
    setView('loading')

    // Simulate per-store loading delay (UX polish)
    await new Promise(r => setTimeout(r, 1800))

    const result = computeComparison(basket)
    setComparison(result)
    setView('result')

    // Show signup banner after 2.1s on result screen
    setTimeout(() => setSignupOpen(true), 2100)
  }, [basket])

  const goBack = useCallback(() => {
    setSignupOpen(false)
    setView('basket')
  }, [])

  // ─── Render ──────────────────────────────────────────────
  if (view === 'loading') {
    return (
      <div className="app-wrap">
        <LoadingPage />
      </div>
    )
  }

  if (view === 'result' && comparison) {
    return (
      <div className="app-wrap">
        <ResultPage
          comparison={comparison}
          onBack={goBack}
          onShare={() => setShareOpen(true)}
        />
        {signupOpen && (
          <SignupBanner onClose={() => setSignupOpen(false)} />
        )}
        {shareOpen && (
          <ShareModal
            comparison={comparison}
            onClose={() => setShareOpen(false)}
          />
        )}
      </div>
    )
  }

  // Default: basket view
  return (
    <div className="app-wrap">
      <TopBar />
      <HeroBand />

      <div className="basket-body padded">
        <BasketList
          basket={basket}
          onChangeQty={changeQty}
          onRemove={removeItem}
          onAddClick={() => setAddOpen(true)}
        />
        <StoresBlock />
        <CtaBlock onCompare={startCompare} disabled={basket.length === 0} />
      </div>

      {addOpen && (
        <AddSheet
          basketIds={basketIds}
          onAdd={addItem}
          onClose={() => setAddOpen(false)}
        />
      )}
    </div>
  )
}
