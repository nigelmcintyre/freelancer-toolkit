import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/metadata'
import { webApplicationSchema, faqSchema } from '@/lib/structured-data'
import AdSlot from '@/components/AdSlot'
import InvoiceGeneratorTool from './InvoiceGeneratorTool'

const path = '/invoice-generator'
const title = 'Free Invoice Generator — Create & Print PDF Invoices Online'
const description = 'Free online invoice generator. Create professional PDF invoices with line items, tax, and payment terms. Print or save as PDF instantly — no sign-up, no watermarks.'

export const metadata: Metadata = {
  title: `${title} — ${siteName}`,
  description,
  alternates: { canonical: `${siteUrl}${path}` },
  openGraph: { title, description, url: `${siteUrl}${path}`, siteName, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

const faqs = [
  { q: 'How do I save an invoice as a PDF?', a: 'Click the "Print Invoice" button, then in the print dialog select "Save as PDF" as the destination. This works in Chrome, Firefox, Safari, and Edge.' },
  { q: 'Is there a watermark on invoices generated here?', a: 'No. Invoices generated with this free tool are completely watermark-free and professional.' },
  { q: 'Does the invoice number reset when I refresh?', a: 'Yes — invoice numbers are session-only and start at 1001 on each page load. Keep a record of the last invoice number you used.' },
  { q: 'Can I add tax to my invoice?', a: 'Yes. Enter a tax rate percentage in the Tax Rate field and the tool will automatically calculate the tax amount and add it to your total.' },
  { q: 'What information should I include on a freelance invoice?', a: 'Include your name/business name, contact details, client name and address, invoice number, invoice date, due date, itemized services with quantities and rates, subtotal, tax (if applicable), and total.' },
]

export default function InvoiceGeneratorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema('Free Invoice Generator', path, description)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <div className="text-center mb-4" data-noprint>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Free Invoice Generator</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Create professional invoices and print to PDF in seconds. No sign-up, no watermarks.</p>
      </div>

      <div className="flex justify-center my-4" data-noprint>
        <AdSlot variant="banner" />
      </div>

      <InvoiceGeneratorTool />

      <div className="flex justify-center my-8" data-noprint>
        <AdSlot variant="rectangle" />
      </div>

      <article data-noprint className="prose prose-slate max-w-3xl mx-auto mt-8" style={{ contentVisibility: 'auto' }}>
        <h2>Free Invoice Generator — Create Professional PDF Invoices</h2>
        <p>Sending professional invoices is essential for getting paid on time as a freelancer. This free invoice generator lets you create, preview, and print PDF invoices directly in your browser — no account required, no software to install, and absolutely no watermarks. Fill in your details, add line items, and hit print. Your invoice is ready in under two minutes.</p>

        <h2>How to Create a PDF Invoice</h2>
        <p>Fill in your name or business name, email, and address on the left side of the form. Add your client's name and address. The invoice number auto-increments from 1001 each session — make a note of the last number you used. Set the invoice date and due date, then add your line items with descriptions, quantities, and unit prices. Optionally add a tax rate percentage. Add any payment terms in the notes field (e.g. "Payment due within 30 days via bank transfer"). Click <strong>Print Invoice</strong> — the form disappears and only the clean invoice layout prints. In the print dialog, choose <em>Save as PDF</em> to get a file.</p>

        <h2>What Makes a Professional Invoice</h2>
        <p>A professional invoice includes clear identification of both parties (your details and your client's), a unique invoice number for reference, dates (issued and due), an itemized list of services or products rendered, the currency and total amount due, and your payment instructions. Omitting any of these can delay payment or create disputes. This tool prompts you for all essential fields.</p>

        <h2>Tips for Getting Paid Faster</h2>
        <p>Always include a specific due date — "Net 30" is standard but "Due by June 15" removes ambiguity. Add your preferred payment method and bank/account details in the notes field. Number your invoices sequentially to make it easy to reference in follow-up emails. Send your invoice as a PDF (not editable) to prevent modification. Follow up politely 3 days before the due date.</p>

        <h2>Common Invoicing Mistakes to Avoid</h2>
        <p>Don't use informal language or leave out your payment details — clients can't pay you if they don't know how. Never send the same invoice number twice. Avoid vague line item descriptions like "work done" — be specific (e.g. "Website homepage design — 8 hours @ $95/hr"). Don't forget to include your tax ID or VAT number if applicable in your jurisdiction.</p>

        <h2>Frequently Asked Questions</h2>
        {faqs.map(({ q, a }) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}

        <h2>Related Tools</h2>
        <p>Before you send your invoice, check our <a href="/stripe-paypal-calculator">Stripe &amp; PayPal fee calculator</a> to make sure you're charging enough to cover payment processing fees. Also use our <a href="/hourly-rate-calculator">freelance hourly rate calculator</a> to ensure your rates are sustainable.</p>
      </article>
    </div>
  )
}
