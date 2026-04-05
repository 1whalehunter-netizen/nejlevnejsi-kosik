import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'NejlevnějšíKošík.cz — Ušetři až 1 000 Kč měsíčně na nákupu',
  description:
    'Porovnáváme ceny v Lidlu, Kauflandu a Albertu. Zjisti, kde nakoupíš svůj běžný nákup nejlevněji. Bez registrace, výsledek okamžitě.',
  keywords: ['ceny potravin', 'supermarket', 'lidl', 'kaufland', 'albert', 'srovnání cen', 'nákup'],
  openGraph: {
    title: 'NejlevnějšíKošík.cz',
    description: 'Ušetři až 1 000 Kč měsíčně. Porovnáváme ceny ve 3 supermarketech.',
    type: 'website',
    locale: 'cs_CZ',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#111827',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
