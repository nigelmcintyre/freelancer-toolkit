import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/metadata'
import { webApplicationSchema, faqSchema } from '@/lib/structured-data'
import AdSlot from '@/components/AdSlot'
import UTMBuilderTool from './UTMBuilderTool'

const path = '/utm-builder'
const title = 'Free UTM Builder — Generate UTM Tracking URLs'
const description = 'Free UTM URL builder. Generate properly encoded UTM tracking links for Google Analytics campaigns. Copy to clipboard, view history of last 5 URLs. No sign-up required.'

export const metadata: Metadata = {
  title: `${title} — ${siteName}`,
  description,
  alternates: { canonical: `${siteUrl}${path}` },
  openGraph: { title, description, url: `${siteUrl}${path}`, siteName, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

const faqs = [
  { q: 'What is a UTM parameter?', a: 'UTM parameters are tags added to URLs that tell Google Analytics where your traffic came from. The five parameters are: utm_source (who sent the traffic), utm_medium (the channel), utm_campaign (the campaign name), utm_term (paid keywords), and utm_content (distinguishes ads or links).' },
  { q: 'What should I put in utm_source?', a: 'Use the name of the platform or publisher sending traffic: "google", "facebook", "newsletter", "linkedin", "twitter". Use lowercase, no spaces.' },
  { q: 'What is utm_medium used for?', a: 'utm_medium describes the marketing channel: "cpc" (paid search), "email", "social", "organic", "referral", "banner". This maps to the Medium dimension in Google Analytics.' },
  { q: 'Do UTM parameters affect SEO?', a: 'UTM parameters do not directly affect SEO. Google treats the canonical URL (without UTMs) as the primary URL. However, avoid using UTMs on internal links as they can interfere with session attribution in Analytics.' },
  { q: 'Should I use UTM parameters on every link?', a: 'Use UTMs on all external links you control: email newsletters, social media posts, ads, and partner links. Do NOT add UTMs to internal links on your own website — this resets session data and distorts your Analytics reports.' },
]

export default function UTMBuilderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema('Free UTM Builder', path, description)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <div className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">UTM Builder</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Generate properly encoded UTM tracking URLs for any marketing campaign in seconds.</p>
      </div>

      <div className="flex justify-center my-4">
        <AdSlot variant="banner" />
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <UTMBuilderTool />
        </div>
        <aside className="hidden lg:block">
          <AdSlot variant="sidebar" />
        </aside>
      </div>

      <div className="flex justify-center my-8">
        <AdSlot variant="rectangle" />
      </div>

      <article data-noprint className="prose prose-slate max-w-3xl mx-auto mt-8" style={{ contentVisibility: 'auto' }}>
        <h2>Free UTM Builder — Track Every Campaign Click</h2>
        <p>UTM parameters are the backbone of campaign tracking in Google Analytics. Without them, traffic from your email newsletter, social posts, and paid ads all appear as "direct" or "referral" traffic, making it impossible to know which channels are driving results. This free UTM builder generates properly encoded tracking URLs instantly, handles special characters, and keeps a history of your last five URLs so you can copy them again without rebuilding.</p>

        <h2>How to Use the UTM Builder</h2>
        <p>Enter your base URL (e.g. <code>https://yourwebsite.com/landing-page</code>). Fill in the required fields: Source (the platform sending traffic), Medium (the channel type), and Campaign Name. Optionally add Term (for paid keywords) and Content (to differentiate between two links in the same email). The complete UTM URL is generated live as you type. Click <strong>Copy to Clipboard</strong> — a checkmark confirms it's copied. Click <strong>Clear All</strong> to start fresh. Your last 5 generated URLs appear in the history panel, each with its own copy button.</p>

        <h2>UTM Parameter Best Practices</h2>
        <p>Consistency is everything with UTM parameters. Decide on a naming convention before you start and document it. Use lowercase throughout — Google Analytics treats "Facebook" and "facebook" as different sources. Use hyphens instead of underscores in multi-word values (e.g. <code>spring-sale</code> not <code>spring_sale</code>). Never put personally identifiable information in UTM parameters — they appear in URLs and your Analytics data.</p>

        <h2>Tips for Freelancers Using UTMs</h2>
        <p>Use UTM parameters to track which content marketing efforts drive actual client inquiries. Tag links in your portfolio outreach emails, LinkedIn posts, and guest articles. Create a simple spreadsheet with your UTM naming convention and share it with any clients you manage campaigns for. A consistent taxonomy makes reports infinitely easier to read and act on.</p>

        <h2>Common UTM Mistakes to Avoid</h2>
        <p>Never add UTM parameters to your own internal links — this breaks session tracking and makes Google Analytics report inflated session counts. Don't use spaces in parameter values (this tool encodes them for you, but some copy-paste workflows strip encoding). Avoid generic campaign names like "campaign1" — use descriptive names you'll understand six months from now like "2024-q1-newsletter-promo".</p>

        <h2>Frequently Asked Questions</h2>
        {faqs.map(({ q, a }) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}

        <h2>Related Tools</h2>
        <p>Pair your UTM tracking with our <a href="/pomodoro-timer">Pomodoro timer</a> to stay focused while building out your campaign assets. And use our <a href="/invoice-generator">invoice generator</a> to bill clients for the campaign work you're tracking.</p>
      </article>
    </div>
  )
}
