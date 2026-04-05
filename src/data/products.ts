import type { ProductCategory, Store } from '@/types'

// ─── Stores ──────────────────────────────────────────────────
export const STORES: Store[] = [
  { id: 'lidl',     name: 'Lidl',     color: '#F9C200' },
  { id: 'kaufland', name: 'Kaufland', color: '#E10019' },
  { id: 'albert',   name: 'Albert',   color: '#00A650' },
]

// ─── Products by category ─────────────────────────────────────
// prices tuple: [lidl, kaufland, albert] — realistic CZ 2025/26
export const PRODUCT_CATEGORIES: Record<string, ProductCategory> = {
  frequent: {
    label: '⭐ Nejčastější',
    items: [
      { id: 'mleko',    em: '🥛', name: 'Plnotučné mléko 1 l',        sub: '3,5% tuku',             p: [25.90, 27.90, 31.90] },
      { id: 'chleb',    em: '🍞', name: 'Chléb Šumava 750 g',         sub: null,                    p: [35.90, 39.90, 44.90] },
      { id: 'vejce',    em: '🥚', name: 'Vejce M 10 ks',              sub: 'volný výběh',           p: [62.90, 67.90, 74.90] },
      { id: 'maslo',    em: '🧈', name: 'Máslo 250 g',                sub: '82% tuku',              p: [54.90, 59.90, 64.90] },
      { id: 'voda',     em: '💧', name: 'Minerálka neperlivá 1,5 l',  sub: 'Rajec / Dobrá voda',   p: [15.90, 17.90, 19.90] },
    ],
  },
  zaklad: {
    label: '🧺 Základ',
    items: [
      { id: 'jogurt',   em: '🥄', name: 'Bílý jogurt 150 g',          sub: 'Danone / vlastní',      p: [13.90, 15.90, 17.90] },
      { id: 'syr',      em: '🧀', name: 'Gouda plátky 200 g',         sub: '~45% tuku',             p: [44.90, 49.90, 54.90] },
      { id: 'rohlik',   em: '🥖', name: 'Rohlík',                     sub: 'cena za kus',           p: [ 3.90,  4.50,  4.90] },
      { id: 'smetana',  em: '🫙', name: 'Smetana ke šlehání 250 ml',  sub: '33% tuku',              p: [24.90, 27.90, 31.90] },
      { id: 'tvaroh',   em: '🍦', name: 'Měkký tvaroh 250 g',         sub: null,                    p: [22.90, 25.90, 28.90] },
    ],
  },
  maso: {
    label: '🥩 Maso',
    items: [
      { id: 'kure',     em: '🍗', name: 'Kuřecí prsa 1 kg',           sub: 'bez kosti, chlazené',   p: [164.90, 179.90, 199.90] },
      { id: 'sunka',    em: '🥩', name: 'Šunka Pražská 100 g',        sub: 'chlazená',              p: [ 29.90,  34.90,  39.90] },
      { id: 'mlete',    em: '🫕', name: 'Mleté vepřové 500 g',        sub: null,                    p: [ 59.90,  67.90,  74.90] },
      { id: 'salami',   em: '🍖', name: 'Salám Poličan 100 g',        sub: null,                    p: [ 22.90,  25.90,  28.90] },
      { id: 'ryba',     em: '🐟', name: 'Losos filet 300 g',          sub: 'chlazený',              p: [ 89.90,  99.90, 109.90] },
    ],
  },
  zelenina: {
    label: '🥦 Zelenina & ovoce',
    items: [
      { id: 'brambory', em: '🥔', name: 'Brambory váhové 2 kg',       sub: 'konzumní',              p: [44.90, 52.90, 59.90] },
      { id: 'cibule',   em: '🧅', name: 'Cibule žlutá 1 kg',         sub: null,                    p: [22.90, 27.90, 31.90] },
      { id: 'paprika',  em: '🫑', name: 'Paprika 1 kg',               sub: 'čerstvá',               p: [54.90, 62.90, 74.90] },
      { id: 'jablka',   em: '🍎', name: 'Jablka Golden 1 kg',         sub: 'čerstvá',               p: [34.90, 39.90, 44.90] },
      { id: 'rajcata',  em: '🍅', name: 'Rajčata kulatá 500 g',       sub: null,                    p: [27.90, 31.90, 36.90] },
      { id: 'okurka',   em: '🥒', name: 'Okurka salátová',            sub: '1 ks',                  p: [14.90, 17.90, 19.90] },
      { id: 'mrkev',    em: '🥕', name: 'Mrkev 1 kg',                 sub: null,                    p: [19.90, 23.90, 27.90] },
      { id: 'banany',   em: '🍌', name: 'Banány 1 kg',                sub: null,                    p: [24.90, 27.90, 31.90] },
    ],
  },
  trvanl: {
    label: '🥫 Trvanlivé',
    items: [
      { id: 'ryze',     em: '🍚', name: 'Rýže dlouhozrnná 1 kg',      sub: null,                    p: [44.90, 51.90, 57.90] },
      { id: 'teston',   em: '🍝', name: 'Těstoviny 500 g',            sub: 'Barilla / vlastní',     p: [27.90, 32.90, 37.90] },
      { id: 'olej',     em: '🫗', name: 'Slunečnicový olej 1 l',      sub: 'Helios',                p: [54.90, 61.90, 67.90] },
      { id: 'ketchup',  em: '🍶', name: 'Ketchup 500 g',              sub: 'Heinz',                 p: [44.90, 49.90, 54.90] },
      { id: 'tp',       em: '🧻', name: 'Toaletní papír 8 ks',        sub: '3vrstvý',               p: [74.90, 82.90, 89.90] },
      { id: 'vlocky',   em: '🥣', name: 'Ovesné vločky 500 g',        sub: null,                    p: [24.90, 27.90, 31.90] },
      { id: 'tunac',    em: '🥫', name: 'Tuňák v oleji 185 g',        sub: null,                    p: [29.90, 34.90, 38.90] },
    ],
  },
}

// ─── Flat list for search ─────────────────────────────────────
export const ALL_PRODUCTS = Object.values(PRODUCT_CATEGORIES).flatMap(c => c.items)

export function findProductById(id: string) {
  return ALL_PRODUCTS.find(p => p.id === id) ?? null
}

// ─── Default basket ───────────────────────────────────────────
// Realistic weekly grocery shop for 1–2 people, ~1 000–2 000 Kč
export const DEFAULT_BASKET = [
  { id: 'mleko',    qty: 5 },
  { id: 'jogurt',   qty: 6 },
  { id: 'syr',      qty: 1 },
  { id: 'maslo',    qty: 1 },
  { id: 'chleb',    qty: 1 },
  { id: 'rohlik',   qty: 10 },
  { id: 'kure',     qty: 1 },
  { id: 'sunka',    qty: 2 },
  { id: 'vejce',    qty: 1 },
  { id: 'brambory', qty: 1 },
  { id: 'cibule',   qty: 1 },
  { id: 'paprika',  qty: 1 },
  { id: 'jablka',   qty: 1 },
  { id: 'ryze',     qty: 1 },
  { id: 'teston',   qty: 1 },
  { id: 'voda',     qty: 6 },
]
