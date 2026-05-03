import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/metadata'
import { Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: `Contact — ${siteName}`,
  description: 'Get in touch with the Freelancer Toolkit team. We welcome feedback, bug reports, and tool suggestions.',
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: { title: `Contact — ${siteName}`, description: 'Get in touch with the Freelancer Toolkit team.', url: `${siteUrl}/contact`, siteName, type: 'website' },
  twitter: { card: 'summary_large_image', title: `Contact — ${siteName}`, description: 'Get in touch with the Freelancer Toolkit team.' },
  robots: { index: true, follow: true },
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>

      <div className="prose prose-slate max-w-none mb-10">
        <p>
          Have a question, found a bug, or want to suggest a new tool? We&apos;d love to hear from you. Freelancer Toolkit is built to serve independent professionals, and your feedback directly shapes what we build next.
        </p>

        <h2>What to reach out about</h2>
        <ul>
          <li>Bug reports or calculation errors</li>
          <li>Feature requests or new tool ideas</li>
          <li>General questions about the toolkit</li>
          <li>Business inquiries or partnerships</li>
          <li>Privacy or data questions</li>
        </ul>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 text-center">
        <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-7 h-7 text-indigo-600" aria-hidden="true" />
        </div>
        <p className="text-gray-600 mb-6">
          Send us an email and we&apos;ll get back to you as soon as possible — typically within 1–2 business days.
        </p>
        <a
          href="mailto:hello@freelance-toolkit.com"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          aria-label="Send email to hello@freelance-toolkit.com"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          hello@freelance-toolkit.com
        </a>
      </div>
    </div>
  )
}
