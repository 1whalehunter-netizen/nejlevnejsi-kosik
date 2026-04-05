import { STORES, findProductById } from '@/data/products'
import type { BasketEntry, ComparisonResult, ComputedItem, StoreResult } from '@/types'

/**
 * Core comparison engine.
 * Takes a basket of {id, qty} entries and returns sorted store results.
 */
export function computeComparison(basket: BasketEntry[]): ComparisonResult {
  const storeResults: StoreResult[] = STORES.map((store, si) => {
    let total = 0
    const items: ComputedItem[] = []

    for (const entry of basket) {
      const product = findProductById(entry.id)
      if (!product) continue
      const price = product.p[si]
      const line = price * entry.qty
      total += line
      items.push({ ...product, qty: entry.qty, price, line })
    }

    return { store, total, items }
  })

  // Sort cheapest first
  storeResults.sort((a, b) => a.total - b.total)

  const best  = storeResults[0]
  const worst = storeResults[storeResults.length - 1]
  const weeklyDiff    = Math.round(worst.total - best.total)
  const monthlySaving = Math.round(weeklyDiff * 4)
  const yearlySaving  = Math.round(weeklyDiff * 52)

  return { results: storeResults, best, worst, weeklyDiff, monthlySaving, yearlySaving }
}

/**
 * Format a number in Czech locale (space as thousands separator).
 * e.g. 13572 → "13 572"
 */
export function czNum(n: number): string {
  return Math.round(n).toLocaleString('cs-CZ')
}

/**
 * Return ISO week number for a date.
 */
export function getWeekNum(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
}

/**
 * Format current date as Czech week string.
 * e.g. "Týden 28 · 8. července 2025"
 */
export function weekLabel(d: Date = new Date()): string {
  const wk  = getWeekNum(d)
  const day = d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })
  return `Týden ${wk} · ${day}`
}
