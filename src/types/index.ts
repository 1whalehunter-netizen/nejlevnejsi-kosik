// ─── Product & Store ─────────────────────────────────────────
export interface Product {
  id: string
  em: string        // emoji
  name: string
  sub: string | null
  p: [number, number, number]  // prices: [lidl, kaufland, albert]
}

export interface ProductCategory {
  label: string
  items: Product[]
}

export interface Store {
  id: string
  name: string
  color: string
}

// ─── Basket ──────────────────────────────────────────────────
export interface BasketEntry {
  id: string
  qty: number
}

// ─── Comparison Results ───────────────────────────────────────
export interface ComputedItem extends Product {
  qty: number
  price: number  // unit price in this store
  line: number   // qty × price
}

export interface StoreResult {
  store: Store
  total: number
  items: ComputedItem[]
}

export interface ComparisonResult {
  results: StoreResult[]   // sorted cheapest first
  best: StoreResult
  worst: StoreResult
  weeklyDiff: number       // worst.total - best.total
  monthlySaving: number    // weeklyDiff × 4
  yearlySaving: number     // weeklyDiff × 52
}
