# Freelancer Toolkit

A free, open-source hub of essential web tools for freelancers and solopreneurs — built with Next.js 14, Tailwind CSS, and deployed via Docker on a Digital Ocean droplet.

**Live site:** [freelance-toolkit.com](https://freelance-toolkit.com)

---

## Tools Included

| Tool | Route | Description |
|------|-------|-------------|
| Payment Fee Calculator | `/stripe-paypal-calculator` | Calculate Stripe (2.9% + $0.30) and PayPal (3.49% + $0.49) fees, or gross-up an invoice to receive a specific net amount |
| Invoice Generator | `/invoice-generator` | Create professional PDF invoices with line items, tax, and payment terms — prints via `window.print()`, no watermarks |
| Hourly Rate Calculator | `/hourly-rate-calculator` | Find your minimum freelance rate from salary, expenses, weeks off, and billable hours — shareable via URL query params |
| UTM Builder | `/utm-builder` | Generate properly encoded UTM tracking URLs with clipboard copy and 5-URL history |
| Pomodoro Timer | `/pomodoro-timer` | 25/5/15 minute focus timer with Web Audio API chimes, browser notifications, and live tab title countdown |

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3 + `@tailwindcss/typography`
- **Icons:** Lucide React
- **Fonts:** `next/font/google` (Inter)
- **PDF:** Browser `window.print()` with `@media print` stylesheet
- **Deployment:** Docker (standalone output) → Digital Ocean droplet → Nginx reverse proxy → Cloudflare DNS

---

## Project Structure

```
/app
  layout.tsx                        ← Root layout (Server Component)
  page.tsx                          ← Home / landing page
  sitemap.ts                        ← Auto-generated sitemap.xml
  robots.ts                         ← robots.txt with Mediapartners-Google rule
  /stripe-paypal-calculator/
    page.tsx                        ← Server Component (metadata, JSON-LD)
    StripePaypalCalculatorTool.tsx  ← 'use client' interactive tool
  /invoice-generator/
    page.tsx
    InvoiceGeneratorTool.tsx
  /hourly-rate-calculator/
    page.tsx
    HourlyRateTool.tsx
  /utm-builder/
    page.tsx
    UTMBuilderTool.tsx
  /pomodoro-timer/
    page.tsx
    PomodoroTimerTool.tsx
  /about /contact /privacy-policy /terms-of-service

/components
  AdsenseProvider.tsx   ← 'use client' wrapper that loads AdSense <Script>
  AdSlot.tsx            ← 3 variants: banner (728×90), rectangle (300×250), sidebar (160×600)
  Header.tsx            ← Sticky nav with mobile hamburger
  Footer.tsx

/lib
  metadata.ts           ← exports siteUrl from NEXT_PUBLIC_SITE_URL env var
  structured-data.ts    ← WebApplication + FAQPage JSON-LD helpers

/public
  ads.txt               ← Google AdSense publisher verification
```

---

## Getting Started (Local Dev)

### Prerequisites
- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/freelancer-toolkit.git
cd freelancer-toolkit

cp .env.example .env.local
# Edit .env.local with your values

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (no trailing slash) | `https://freelance-toolkit.com` |
| `NEXT_PUBLIC_ADSENSE_PUB_ID` | Google AdSense publisher ID | `ca-pub-XXXXXXXXXXXXXXXX` |

When `NEXT_PUBLIC_ADSENSE_PUB_ID` is not set, `AdSlot` renders a dashed placeholder box instead of a live ad unit.

---

## Production Deployment (Docker + Nginx)

### 1. Build and start the container

```bash
# On the server at /opt/toolkit
docker compose up -d --build
```

The app binds to `127.0.0.1:3000` only — Nginx proxies public traffic.

### 2. Nginx config

```nginx
server {
    listen 80;
    server_name freelance-toolkit.com www.freelance-toolkit.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/toolkit /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d freelance-toolkit.com -d www.freelance-toolkit.com
```

### 3. Cloudflare DNS

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| `A` | `@` | `<droplet-ip>` | Proxied (orange cloud) |
| `CNAME` | `www` | `freelance-toolkit.com` | Proxied |

---

## SEO & AdSense

- Every page exports Next.js `metadata` with canonical URL, OG tags, and Twitter card
- Tool pages inject two JSON-LD scripts: `WebApplication` + `FAQPage` schema
- `public/ads.txt` is served at `/ads.txt` for AdSense publisher verification
- `robots.ts` includes the `Mediapartners-Google` allow rule
- `data-noprint` on all `<AdSlot>`, `<Header>`, `<Footer>`, and SEO articles — hidden in `@media print`
- `GDPR / Consent Mode v2` covered in Privacy Policy

### Replacing ad placeholders

Once AdSense approves your site:

1. Update `NEXT_PUBLIC_ADSENSE_PUB_ID` in `.env.local` and `docker-compose.yml`
2. Replace `REPLACE_SLOT_ID` in each `<AdSlot slotId="...">` call with your real slot IDs
3. Update `public/ads.txt` with your real publisher ID
4. Rebuild: `docker compose up -d --build`

---

## License

MIT
