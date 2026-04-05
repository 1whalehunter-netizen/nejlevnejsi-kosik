# NejlevnějšíKošík.cz

Srovnávač cen potravin v Lidlu, Kauflandu a Albertu. Bez registrace, výsledek okamžitě.

## Rychlý start (lokálně)

### Požadavky

- Node.js 18.17 nebo novější
- npm, yarn nebo pnpm

### 1. Nainstaluj závislosti

```bash
npm install
```

### 2. Spusť vývojový server

```bash
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000).

### 3. Build pro produkci

```bash
npm run build
npm start
```

---

## Struktura projektu

```
nejlevnejsi-kosik/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, Inter font, metadata
│   │   ├── page.tsx            # Vstupní stránka
│   │   ├── globals.css         # Design tokens + base styles
│   │   └── api/
│   │       └── subscribe/
│   │           └── route.ts    # POST /api/subscribe — email capture
│   │
│   ├── components/
│   │   ├── App.tsx             # Hlavní klient, veškerý state
│   │   ├── basket/
│   │   │   ├── HeroBand.tsx    # Hero sekce s headlinem
│   │   │   ├── BasketList.tsx  # Seznam položek košíku
│   │   │   ├── StoresBlock.tsx # Přehled obchodů + "brzy"
│   │   │   └── CtaBlock.tsx    # Urgency + CTA tlačítko
│   │   ├── result/
│   │   │   ├── ResultPage.tsx  # Výsledková stránka
│   │   │   ├── CompareTable.tsx # Tabulka srovnání obchodů
│   │   │   └── BasketDetail.tsx # Accordion s obsahem košíku
│   │   ├── shared/
│   │   │   ├── TopBar.tsx      # Horní lišta s logem
│   │   │   └── LoadingPage.tsx # Loading animace
│   │   └── modals/
│   │       ├── AddSheet.tsx    # Bottom sheet pro přidání položky
│   │       ├── SignupBanner.tsx # Bannner pro odběr emailů
│   │       └── ShareModal.tsx  # Modal pro sdílení výsledku
│   │
│   ├── data/
│   │   └── products.ts         # Produkty, obchody, výchozí košík
│   │
│   ├── lib/
│   │   └── compute.ts          # Výpočetní engine + helpers
│   │
│   └── types/
│       └── index.ts            # TypeScript typy
│
├── public/
│   └── robots.txt
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── postcss.config.js
```

---

## Nasazení na Vercel

### Metoda A — přes GitHub (doporučeno)

1. **Pushni projekt na GitHub**

   ```bash
   git init
   git add .
   git commit -m "init: NejlevnějšíKošík.cz"
   git remote add origin https://github.com/TVOJE_JMENO/nejlevnejsi-kosik.git
   git push -u origin main
   ```

2. **Přihlas se na [vercel.com](https://vercel.com)**

3. **Klikni "Add New → Project"**

4. **Vyber svůj GitHub repozitář**

5. **Nastavení projektu** (Vercel je detekuje automaticky):
   - Framework: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

6. **Klikni "Deploy"** — hotovo za ~60 sekund

### Metoda B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Přidání odběru emailů (volitelné)

Otevři `src/app/api/subscribe/route.ts` a napoj na svého poskytovatele.

### Příklad s Resend

```bash
npm install resend
```

```ts
// src/app/api/subscribe/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// v POST handleru:
await resend.contacts.create({
  email,
  audienceId: process.env.RESEND_AUDIENCE_ID!,
})
```

Přidej proměnné prostředí do Vercelu:
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`

### Příklad s Mailchimp

```bash
npm install @mailchimp/mailchimp_marketing
```

```ts
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({ apiKey: process.env.MAILCHIMP_API_KEY, server: 'us1' })

await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
  email_address: email,
  status: 'subscribed',
})
```

---

## Aktualizace cen

Všechny ceny jsou v `src/data/products.ts` v poli `p: [lidl, kaufland, albert]`.

Každý týden aktualizuj toto pole a pushni změnu — Vercel nasadí automaticky.

---

## Přidání dalšího obchodu

1. Přidej obchod do pole `STORES` v `src/data/products.ts`
2. Přidej cenu do každého produktu (nový prvek v `p` poli)
3. Uprav typ `Product` v `src/types/index.ts` (trojice → čtveřice)
4. Uprav `computeComparison` v `src/lib/compute.ts`
