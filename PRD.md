# SoftwareDealBoard — PRD
## Best Software Deals, Lifetime Offers & Free Trials Tracker

---

## 1. Overview

**SoftwareDealBoard** is a free, SEO-first aggregator of SaaS deals, lifetime license offers, and free trial opportunities. Users can browse curated deals sourced from AppSumo, Product Hunt, and vendor sites, filtered by category and sorted by expiry date. Countdown timers create urgency. Affiliate links may be added per deal (optional).

All deal data is maintained in a Google Sheet and consumed at build time as SSG pages. No backend required. Zero hosting cost.

---

## 2. Target Users

- Bootstrapped founders seeking affordable SaaS tools
- Startup operators tracking tool costs
- Tech enthusiasts who love lifetime deals
- Freelancers and indie hackers
- Product managers evaluating tools

---

## 3. Core Features

1. **Deal Feed** — Card grid of all active deals with countdown timers
2. **Expiring Soon Page** — Deals expiring within 7 days, sorted ascending
3. **Category Pages** — Deals by category (productivity, marketing, design, dev tools, etc.)
4. **Tool Detail Pages** — Full deal page with features, pricing, and CTA
5. **Deal Pages** — Specific deal/offer with terms, countdown, affiliate link
6. **Search** — Client-side fuzzy search across deal names and descriptions
7. **Countdown Timers** — Live JavaScript countdown to deal expiry
8. **Visitor Counter** — Today + total in footer
9. **i18n** — 8 languages
10. **Adsterra Ads** — Social Bar + Native Banner + Display Banner
11. **Google Sheets Webhook** — Log deal clicks, category filters, CTA interactions

---

## 4. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router, SSG) | Fast, SEO-perfect static pages |
| Styling | Tailwind CSS | Utility-first, responsive |
| Charts | None (simple badges/tags) | Overkill for this project |
| i18n | next-intl | App Router i18n |
| Data | Google Sheets CSV export | Free, curator-friendly |
| Countdown | Vanilla JS / `useEffect` hook | No external dep needed |
| Search | Fuse.js (client-side) | Zero-cost fuzzy search |
| Deploy | Vercel (free tier) | SSG hosting |
| Ads | Adsterra | Monetization |
| Webhook | Google Apps Script | Click/interaction logging |

---

## 5. Data Sources

### 5.1 Google Sheets (Single Source of Truth)
Create one Google Sheet with multiple tabs:

**Tab 1: `deals`**
| Column | Type | Example |
|---|---|---|
| slug | string | `notion-lifetime-2025` |
| tool_slug | string | `notion` |
| title | string | "Notion Lifetime License — 50% Off" |
| short_desc | string | "Full workspace, lifetime access" |
| category | string | `productivity` |
| deal_type | string | `lifetime` / `trial` / `discount` |
| original_price | number | 299 |
| deal_price | number | 99 |
| discount_pct | number | 67 |
| expires_at | ISO date | `2025-05-01` |
| affiliate_url | string | `https://...` |
| source | string | `AppSumo` |
| featured | boolean | true |
| active | boolean | true |
| created_at | ISO date | `2025-04-01` |

**Tab 2: `tools`**
| Column | Example |
|---|---|
| slug | `notion` |
| name | `Notion` |
| description | "All-in-one workspace..." |
| category | `productivity` |
| logo_url | `https://...` (or leave blank for SVG placeholder) |
| website_url | `https://notion.so` |
| pricing_model | `freemium` / `paid` / `open-source` |
| founded | `2016` |
| hq | `San Francisco, CA` |

**Tab 3: `categories`**
| Column | Example |
|---|---|
| slug | `productivity` |
| name | `Productivity` |
| description | "Tools for getting things done" |
| icon | `✅` |
| color | `#A8D5BA` |

### 5.2 CSV Export URLs
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}
```
Fetch at build time; revalidate every 6 hours via ISR.

### 5.3 No External APIs Required
All data is manually curated. This keeps the site 100% free and curator-controlled.

---

## 6. Page Structure

### 6.1 `/` — Homepage
- Hero: "Best Software Deals — Free & Lifetime Offers"
- Featured deals strip (top 3 featured=true deals, large cards)
- All active deals grid (sorted by `expires_at` ascending)
- Category filter tabs (horizontal scroll on mobile)
- Client-side search input (Fuse.js)
- Adsterra Social Bar + Native Banner
- "Expiring This Week" callout strip with red countdown badges

### 6.2 `/tools/[slug]` — Tool Detail Page
- Tool name, logo, category, pricing model, description
- All deals for this tool (current + archived)
- Tool website CTA button
- Related tools in same category
- Schema.org: `SoftwareApplication`
- hreflang all 8 locales

### 6.3 `/categories/[type]` — Category Page
- Category name, description, icon
- All active deals in this category
- Sort options: Newest | Expiring Soon | Biggest Discount
- Deal count badge
- Schema.org: `ItemList`
- SEO target: "[category] software deals" queries

### 6.4 `/deals/[slug]` — Deal Detail Page
- Full deal title, description, terms
- Live countdown timer (JS)
- Deal price vs original price, discount badge
- Affiliate link CTA ("Get This Deal →") — logs to webhook on click
- Tool summary card linking to `/tools/[slug]`
- Deal source attribution (AppSumo, Product Hunt, etc.)
- "Similar Deals" grid
- Schema.org: `Offer` with `validThrough`

### 6.5 `/expiring-soon` — Expiring Soon Page
- Deals expiring within 7 days
- Sorted by `expires_at` ascending
- Red urgency badges: "2 days left", "5 hours left"
- Each card has countdown timer
- Schema.org: `ItemList`

### 6.6 `/sitemap.xml` — Generated
- All deal slugs, tool slugs, category slugs
- `expiring-soon` page
- All i18n variants

---

## 7. UI/UX Design

### 7.1 Color Palette (Soft Pastels)
```
Background:    #FFF8F0  (warm cream)
Card:          #FFFFFF  with shadow-sm border border-orange-50
Accent:        #E8956D  (warm coral/peach)
Deal badge:    #6BAF8D  (mint green — "Active")
Expiring:      #D4716A  (soft rose — "Expiring Soon")
Lifetime:      #8B7EC8  (lavender — "Lifetime Deal")
Trial:         #6C9EBF  (sky blue — "Free Trial")
Text:          #2D3748
Footer BG:     #FEF0E4
```

### 7.2 Typography
- Font: `Nunito` via next/font — friendly, readable
- Headings: `font-extrabold`
- Price displays: `font-mono text-2xl`

### 7.3 Key Components
- `<DealCard>` — logo, title, discount badge, price, category tag, countdown, CTA
- `<CountdownTimer>` — live countdown to `expires_at`; turns red at <48h
- `<DealTypeBadge>` — "Lifetime", "Free Trial", "Discount" — each with distinct color
- `<DiscountBadge>` — "67% OFF" pill in accent color
- `<PriceDisplay>` — strikethrough original + deal price
- `<CategoryTab>` — horizontal scrollable tab bar with icon + name
- `<SearchBar>` — client-side Fuse.js input with instant results
- `<AdPlaceholder>` — marked Adsterra div
- `<NavBar>` — Logo | Categories | Expiring Soon | [Search] | [Lang]
- `<Footer>` — visitor counter, copyright, disclaimer

### 7.4 Countdown Timer Logic
```typescript
// CountdownTimer.tsx
'use client';
import { useEffect, useState } from 'react';

function getTimeLeft(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return { d, h, m };
}

export function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [left, setLeft] = useState(getTimeLeft(expiresAt));
  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft(expiresAt)), 60000);
    return () => clearInterval(id);
  }, [expiresAt]);
  if (!left) return <span className="text-gray-400">Expired</span>;
  const urgent = left.d < 2;
  return (
    <span className={urgent ? 'text-rose-500 font-bold' : 'text-gray-600'}>
      {left.d > 0 ? `${left.d}d ` : ''}{left.h}h {left.m}m left
    </span>
  );
}
```

### 7.5 Mobile-First
- Deal cards: 1 column mobile → 2-col md → 3-col lg → 4-col xl
- Category tabs: horizontal scroll with `overflow-x-auto`
- CTA buttons: full-width on mobile
- Countdown: compact format on mobile (`2d 5h`)

---

## 8. SEO Requirements

### 8.1 Target Keywords (Programmatic)
- `/deals/[slug]` → "[Tool Name] lifetime deal", "[Tool Name] discount 2025"
- `/categories/[type]` → "[category] software deals", "best [category] tools free"
- `/tools/[slug]` → "[Tool Name] pricing", "[Tool Name] review"
- `/expiring-soon` → "expiring software deals", "last chance SaaS deals"

### 8.2 Metadata
```typescript
// /deals/[slug]
{
  title: `${deal.title} — SoftwareDealBoard`,
  description: `${deal.short_desc}. Save ${deal.discount_pct}% — expires ${formatDate(deal.expires_at)}.`,
  openGraph: {
    title: deal.title,
    description: deal.short_desc,
    type: 'website'
  }
}
```

### 8.3 Schema.org
- Deal pages: `Offer` with `price`, `priceCurrency`, `validThrough`, `seller`
- Tool pages: `SoftwareApplication` with `applicationCategory`, `offers`
- Category pages: `ItemList` of `ListItem`
- Homepage: `WebSite` + `SearchAction`

### 8.4 Sitemap
- `next-sitemap` generates all routes
- `changefreq: hourly` for `/expiring-soon`
- `changefreq: daily` for homepage
- `changefreq: weekly` for tool/category pages
- Priority: deals 0.9, homepage 1.0, categories 0.8, tools 0.7

---

## 9. i18n

### 9.1 Locales
`en`, `ko`, `ja`, `zh`, `es`, `fr`, `de`, `pt`

### 9.2 Keys (sample)
```json
{
  "nav.categories": "Categories",
  "nav.expiring": "Expiring Soon",
  "hero.title": "Best Software Deals — Free & Lifetime",
  "hero.subtitle": "Curated SaaS deals, lifetime offers, and free trials.",
  "deal.get_deal": "Get This Deal",
  "deal.expires": "Expires",
  "deal.lifetime": "Lifetime Deal",
  "deal.trial": "Free Trial",
  "deal.discount": "Discount",
  "deal.off": "OFF",
  "deal.original_price": "Original",
  "deal.deal_price": "Deal Price",
  "deal.days_left": "{d} days left",
  "deal.expired": "Expired",
  "category.all": "All Deals",
  "search.placeholder": "Search deals...",
  "expiring.title": "Expiring This Week",
  "footer.visitors_today": "Today: {count}",
  "footer.visitors_total": "Total: {count}",
  "footer.disclaimer": "Prices subject to change. Verify on vendor site."
}
```

---

## 10. Ads (Adsterra)

```html
<!-- Social Bar -->
<div id="adsterra-social-bar" class="fixed bottom-0 left-0 right-0 z-50">
  <!-- Adsterra Social Bar Code -->
</div>

<!-- Native Banner (below hero) -->
<div id="adsterra-native-banner" class="w-full my-6 min-h-[90px] bg-orange-50 rounded-xl flex items-center justify-center text-gray-400 text-xs">
  <!-- Adsterra Native Banner -->
</div>

<!-- Display Banner (sidebar 300x250) -->
<div id="adsterra-display-banner" class="w-[300px] h-[250px] bg-orange-50 rounded-xl flex items-center justify-center text-gray-400 text-xs mx-auto my-4">
  <!-- Adsterra 300x250 Banner -->
</div>
```

---

## 11. Google Sheets Webhook

### 11.1 Events to Log
- Deal CTA clicked (`event_type: deal_click`, `value: deal_slug`)
- Category tab selected (`event_type: category_filter`, `value: category`)
- Search query entered (`event_type: search`, `value: query_text`)
- Tool page visited (`event_type: tool_view`, `value: tool_slug`)
- Expiring Soon page visited

### 11.2 Webhook Call
```typescript
// On deal CTA click:
logEvent('deal_click', { value: deal.slug, affiliate_url: deal.affiliate_url });
```

### 11.3 Apps Script
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date().toISOString(), d.event_type, d.value, d.page, d.locale, d.ua]);
  return ContentService.createTextOutput('ok');
}
```

---

## 12. Visitor Counter

- Vercel KV: `visitors:total`, `visitors:YYYY-MM-DD`
- Edge middleware increments on page requests
- Footer: `"Today: N · Total: N"`

---

## 13. Milestones & Git Strategy

### Milestone 0 — Repo Init
```bash
cd C:\MakingApps\260413\software-deal-board
npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir --import-alias "@/*" --yes
gh repo create taeshin11/software-deal-board --public --source=. --push
```

### Milestone 1 — Scaffold
- Install: `next-intl next-sitemap @vercel/kv fuse.js`
- Folder structure, message stubs, `.env.local`
- `feature_list.json`, `claude-progress.txt`, `init.sh`
- Commit + push: "scaffold: project init"

### Milestone 2 — Data Layer
- `src/lib/sheets.ts` — fetch & parse all 3 Google Sheets tabs
- TypeScript types: `Deal`, `Tool`, `Category`
- Filter helpers: active deals only, sort by expiry
- Commit + push

### Milestone 3 — Homepage
- Layout, NavBar, Footer with visitor counter
- Deal card grid with category tabs
- Fuse.js search
- Adsterra placeholders
- Commit + push

### Milestone 4 — Deal & Tool Pages
- `/deals/[slug]` with countdown, CTA, affiliate link, webhook
- `/tools/[slug]` with all deals for tool
- Schema.org Offer + SoftwareApplication
- Commit + push

### Milestone 5 — Category & Expiring Pages
- `/categories/[type]` with sort options
- `/expiring-soon` with urgency styling
- Commit + push

### Milestone 6 — SEO, i18n, Sitemap
- All 8 locale files complete
- next-sitemap config
- All metadata and schema.org
- hreflang on all pages
- Commit + push

### Milestone 7 — Deploy
```bash
npx vercel --prod
```
- Commit + push: "deploy: Vercel production"

---

## 14. File Structure

```
software-deal-board/
├── init.sh
├── feature_list.json
├── claude-progress.txt
├── research_history/
├── public/
│   └── robots.txt
├── messages/
│   ├── en.json  ko.json  ja.json  zh.json
│   ├── es.json  fr.json  de.json  pt.json
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── tools/[slug]/page.tsx
│   │   │   ├── categories/[type]/page.tsx
│   │   │   ├── deals/[slug]/page.tsx
│   │   │   └── expiring-soon/page.tsx
│   │   ├── api/visitors/route.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── DealCard.tsx
│   │   ├── CountdownTimer.tsx
│   │   ├── DealTypeBadge.tsx
│   │   ├── DiscountBadge.tsx
│   │   ├── PriceDisplay.tsx
│   │   ├── CategoryTab.tsx
│   │   ├── SearchBar.tsx
│   │   ├── AdPlaceholder.tsx
│   │   ├── NavBar.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── sheets.ts
│   │   ├── types.ts
│   │   ├── webhook.ts
│   │   └── visitors.ts
│   └── middleware.ts
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
└── package.json
```

---

## 15. Harness Spec

### `feature_list.json`
```json
{
  "project": "software-deal-board",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "Google Sheets data fetcher", "status": "pending" },
    { "id": "F02", "name": "Deal card grid with countdown", "status": "pending" },
    { "id": "F03", "name": "Client-side Fuse.js search", "status": "pending" },
    { "id": "F04", "name": "Category tab filter", "status": "pending" },
    { "id": "F05", "name": "Deal detail pages", "status": "pending" },
    { "id": "F06", "name": "Tool detail pages", "status": "pending" },
    { "id": "F07", "name": "Category pages", "status": "pending" },
    { "id": "F08", "name": "Expiring Soon page", "status": "pending" },
    { "id": "F09", "name": "Affiliate link CTA + webhook", "status": "pending" },
    { "id": "F10", "name": "i18n (8 locales)", "status": "pending" },
    { "id": "F11", "name": "Adsterra placeholders", "status": "pending" },
    { "id": "F12", "name": "Visitor counter (KV)", "status": "pending" },
    { "id": "F13", "name": "SEO metadata + sitemap", "status": "pending" },
    { "id": "F14", "name": "Schema.org Offer + SoftwareApplication", "status": "pending" },
    { "id": "F15", "name": "Vercel deployment", "status": "pending" }
  ]
}
```

### `init.sh`
```bash
#!/bin/bash
set -e
echo "=== SoftwareDealBoard Init ==="
npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir --import-alias "@/*" --yes
npm install next-intl next-sitemap @vercel/kv fuse.js
mkdir -p messages research_history public src/components src/lib
cat > .env.local << 'EOF'
GOOGLE_SHEETS_ID=your_sheet_id_here
GOOGLE_SHEETS_DEALS_GID=0
GOOGLE_SHEETS_TOOLS_GID=1
GOOGLE_SHEETS_CATEGORIES_GID=2
NEXT_PUBLIC_WEBHOOK_URL=your_apps_script_url_here
KV_REST_API_URL=your_vercel_kv_url_here
KV_REST_API_TOKEN=your_vercel_kv_token_here
EOF
git init
git add .
git commit -m "scaffold: initial project setup"
gh repo create taeshin11/software-deal-board --public --source=. --push
echo "=== Init complete ==="
```

---

## 16. Environment Variables

| Variable | Source |
|---|---|
| `GOOGLE_SHEETS_ID` | Google Sheets URL |
| `GOOGLE_SHEETS_*_GID` | Tab GID |
| `NEXT_PUBLIC_WEBHOOK_URL` | Google Apps Script Web App URL |
| `KV_REST_API_URL` | Vercel KV |
| `KV_REST_API_TOKEN` | Vercel KV |

---

## 17. Quality Checklist

- [ ] Countdown timers update every minute without full re-render
- [ ] Expired deals show "Expired" badge, not negative countdown
- [ ] Search returns results within 100ms (Fuse.js client-side)
- [ ] All affiliate links open in `_blank` with `rel="noopener noreferrer"`
- [ ] All 8 locales complete, no missing keys
- [ ] Schema.org Offer `validThrough` matches `expires_at`
- [ ] Sitemap `lastmod` reflects deal update date
- [ ] Mobile layout: no overflow, 1-col cards, full-width CTAs
- [ ] Adsterra divs present on homepage, deal pages, category pages
- [ ] Webhook fires on deal CTA click without blocking navigation
- [ ] Lighthouse SEO > 95, Performance > 85

---

## 18. Notes

- **Affiliate**: Affiliate links are optional per deal. Log all clicks via webhook.
- **Expired deal handling**: Keep expired deals on the site (historical SEO value) but mark them clearly and remove from active filters
- **Data freshness**: Rebuild daily via Vercel cron or manual `vercel --prod` redeploy
- **No backend needed**: Pure SSG, zero operational cost
- **Legal**: Always attribute data source; do not imply endorsement by vendors
