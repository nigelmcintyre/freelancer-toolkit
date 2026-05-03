import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/metadata'
import { webApplicationSchema, faqSchema } from '@/lib/structured-data'
import AdSlot from '@/components/AdSlot'
import HourlyRateTool from './HourlyRateTool'

const path = '/hourly-rate-calculator'
const title = 'Freelance Hourly Rate Calculator — Find Your Minimum Rate'
const description = 'Calculate your minimum freelance hourly rate based on your target annual salary, business expenses, weeks off, and billable hours. Stop undercharging for your work.'

export const metadata: Metadata = {
  title: `${title} — ${siteName}`,
  description,
  alternates: { canonical: `${siteUrl}${path}` },
  openGraph: { title, description, url: `${siteUrl}${path}`, siteName, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

const faqs = [
  { q: 'How do I calculate my freelance hourly rate?', a: 'Add your target annual salary to your annual business expenses, then divide by your total billable hours per year. Billable hours = billable hours per week × (52 − weeks off). Add a 20% buffer for slower periods.' },
  { q: 'How many billable hours should a freelancer work per week?', a: 'Most freelancers realistically bill 25–30 hours per week. The remaining time goes to admin, marketing, networking, and professional development. Assuming 40 billable hours is a common mistake.' },
  { q: 'Should I add a buffer to my hourly rate?', a: 'Yes. A 20% buffer accounts for unpaid gaps between projects, scope creep, and slow-paying clients. Toggle the buffer on in this calculator to see the recommended rate.' },
  { q: 'What expenses should freelancers include in their rate calculation?', a: 'Include software subscriptions, equipment, health insurance, self-employment taxes (~15.3% in the US), professional development, accounting/legal fees, and marketing costs.' },
  { q: 'How often should I raise my freelance rates?', a: 'Review your rate at least annually. Increase for inflation, improved skills, higher demand, and rising business costs. Most experienced freelancers raise rates 5–15% per year.' },
]

export default function HourlyRateCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema('Freelance Hourly Rate Calculator', path, description)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <div className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Freelance Hourly Rate Calculator</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Find your minimum viable rate — and never undercharge again.</p>
      </div>

      <div className="flex justify-center my-4">
        <AdSlot variant="banner" />
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <HourlyRateTool faqs={faqs} />
        </div>
        <aside className="hidden lg:block">
          <AdSlot variant="sidebar" />
        </aside>
      </div>

      <div className="flex justify-center my-8">
        <AdSlot variant="rectangle" />
      </div>

      <article data-noprint className="prose prose-slate max-w-3xl mx-auto mt-8" style={{ contentVisibility: 'auto' }}>
        <h2>How to Calculate Your Freelance Hourly Rate</h2>
        <p>Setting your freelance hourly rate is one of the most important — and most misunderstood — decisions you'll make as an independent professional. Charge too little and you'll burn out trying to make ends meet. Charge too much without justification and you'll lose opportunities. The right approach is to start from your financial reality: what do you actually need to earn, and how many hours can you realistically bill?</p>

        <h2>How to Use This Rate Calculator</h2>
        <p>Enter your target annual take-home salary — the amount you want to actually put in your bank account. Add your monthly business expenses (software, equipment, insurance, taxes, etc.) and the calculator annualises them. Adjust weeks off per year (default 4) and billable hours per week (default 30). Your minimum rate appears instantly. Toggle "Add 20% buffer" to build in a safety margin for slow months. Share your inputs with a client or colleague using the shareable URL button — it encodes your inputs as query parameters so anyone with the link sees the same calculation.</p>

        <h2>Why 30 Billable Hours, Not 40</h2>
        <p>Many new freelancers assume they can bill 40 hours per week, but this is rarely realistic. Non-billable work — responding to emails, writing proposals, chasing invoices, marketing yourself, professional development, and admin — typically consumes 10–15 hours per week. Using 30 billable hours as your baseline gives a more honest picture of your earning capacity and prevents the trap of "theoretical full-time equivalent" pricing.</p>

        <h2>Tips for Negotiating Your Rate</h2>
        <p>Knowing your minimum rate gives you a floor — never go below it. But your actual rate should be higher, based on your expertise, niche, and the value you deliver to clients. If a client pushes back on your rate, offer to reduce scope rather than reduce your rate. Consider value-based pricing for high-impact projects — a landing page that converts 30% better for a SaaS company is worth far more than an hourly rate implies.</p>

        <h2>Common Rate Calculation Mistakes</h2>
        <p>Not accounting for self-employment taxes is the biggest mistake US freelancers make — you owe both the employer and employee portions of Social Security and Medicare (15.3% total) on top of income tax. Forgetting annual equipment replacement costs, not budgeting for health insurance, and ignoring slow periods are other common oversights. This calculator includes a buffer toggle specifically to address the "not every week is fully booked" reality.</p>

        <h2>Frequently Asked Questions</h2>
        {faqs.map(({ q, a }) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}

        <h2>Related Tools</h2>
        <p>Once you've set your rate, use our <a href="/invoice-generator">free invoice generator</a> to bill clients professionally. And check our <a href="/stripe-paypal-calculator">Stripe &amp; PayPal fee calculator</a> to make sure payment processing fees don't eat into your carefully calculated rate.</p>
      </article>
    </div>
  )
}
