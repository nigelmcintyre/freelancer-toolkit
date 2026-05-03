import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/metadata'
import { webApplicationSchema, faqSchema } from '@/lib/structured-data'
import AdSlot from '@/components/AdSlot'
import StripePaypalCalculatorTool from './StripePaypalCalculatorTool'

const path = '/stripe-paypal-calculator'
const title = 'Stripe & PayPal Fee Calculator — Calculate Payment Gateway Fees'
const description = 'Free Stripe fee calculator and PayPal fee calculator. Enter your invoice amount and instantly see fees for both gateways, or calculate what to charge to receive a specific amount.'

export const metadata: Metadata = {
  title: `${title} — ${siteName}`,
  description,
  alternates: { canonical: `${siteUrl}${path}` },
  openGraph: { title, description, url: `${siteUrl}${path}`, siteName, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

const faqs = [
  { q: 'What is Stripe\'s transaction fee?', a: 'Stripe charges 2.9% + $0.30 per successful card transaction for standard domestic cards in the US.' },
  { q: 'What is PayPal\'s transaction fee?', a: 'PayPal charges 3.49% + $0.49 per transaction for standard payments in the US as of 2024.' },
  { q: 'How do I calculate what to charge so I receive a specific amount after Stripe fees?', a: 'Use the formula: charge = (desired_amount + 0.30) / (1 - 0.029). Our calculator does this automatically when you toggle to "What to charge" mode.' },
  { q: 'Is Stripe or PayPal cheaper for freelancers?', a: 'Stripe is generally cheaper for most invoice amounts. For a $500 invoice, Stripe costs $14.80 vs PayPal\'s $17.94. The difference grows with invoice size.' },
  { q: 'Can I pass payment processing fees to my clients?', a: 'Yes, in most jurisdictions you can pass fees to clients, but check your local laws. Simply use the "What to charge" mode to calculate the gross-up amount.' },
]

export default function StripePaypalCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema('Stripe & PayPal Fee Calculator', path, description)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <div className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Stripe &amp; PayPal Fee Calculator</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Instantly calculate payment gateway fees — or find out what to charge so you receive exactly what you need.</p>
      </div>

      <div className="flex justify-center my-4">
        <AdSlot variant="banner" />
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <StripePaypalCalculatorTool />
        </div>
        <aside className="hidden lg:block">
          <AdSlot variant="sidebar" />
        </aside>
      </div>

      <div className="flex justify-center my-8">
        <AdSlot variant="rectangle" />
      </div>

      <article data-noprint className="prose prose-slate max-w-3xl mx-auto mt-8" style={{ contentVisibility: 'auto' }}>
        <h2>Stripe Fee Calculator — What You Need to Know</h2>
        <p>Payment processing fees can quietly erode your freelance income. If you invoice a client for $1,000 and they pay via Stripe, you'll only receive $970.70 after the 2.9% + $0.30 fee is deducted. Over a year, those losses add up significantly. This Stripe fee calculator lets you see your net amount instantly, or gross up your invoice so you receive exactly what you intended.</p>

        <h2>How to Use This Fee Calculator</h2>
        <p>Enter your desired amount in the input field. Toggle between two modes: <strong>"What I'll receive"</strong> calculates the net amount you'll pocket after fees are deducted from the amount entered. <strong>"What to charge"</strong> works in reverse — enter what you want to receive and the tool calculates the gross invoice amount you should send your client so that after fees are deducted you end up with your target amount. Results update in real time as you type. The card grid shows Stripe fees, PayPal fees, and the difference between the two gateways side by side.</p>

        <h2>Stripe vs PayPal Fees Explained</h2>
        <p>Stripe uses a flat rate of <strong>2.9% + $0.30</strong> per transaction. PayPal's standard rate is <strong>3.49% + $0.49</strong>. While both are percentage-based, the fixed component means the fee percentage is disproportionately high on very small invoices. For a $10 transaction, Stripe's fee is $0.59 (5.9%) vs PayPal's $0.84 (8.4%). At $1,000, Stripe costs $29.30 (2.93%) vs PayPal's $35.39 (3.54%). Stripe is the cheaper option at virtually every price point.</p>

        <h2>Tips for Freelancers on Payment Fees</h2>
        <p>Always decide up front whether your quoted rates are inclusive or exclusive of payment processing fees — and put it in your contract. For recurring clients, consider ACH/bank transfers via Stripe, which costs only 0.8% (capped at $5), dramatically lower than card rates. For international clients, be aware that cross-border fees and currency conversion surcharges apply on top of the base rate shown here.</p>

        <h2>Common Mistakes to Avoid</h2>
        <p>Don't assume your client pays the fee — by default, the fee is deducted from the amount you receive, not added on top. Never quote a client $1,000 meaning to keep $1,000 without accounting for fees. Also avoid using the wrong rate: if you have Stripe Billing or volume discounts, your actual rate may differ from the standard 2.9% + $0.30 shown here. Check your Stripe Dashboard for your negotiated rate if you process high volumes.</p>

        <h2>Frequently Asked Questions</h2>
        {faqs.map(({ q, a }) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}

        <h2>Related Tools</h2>
        <p>Also try our <a href="/invoice-generator">free invoice generator</a> to create professional PDF invoices, and our <a href="/hourly-rate-calculator">freelance hourly rate calculator</a> to make sure you're charging enough to meet your income goals.</p>
      </article>
    </div>
  )
}
