import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/metadata'
import Link from 'next/link'
import { Calculator, FileText, Clock, Link2, Timer } from 'lucide-react'

export const metadata: Metadata = {
  title: `About — ${siteName}`,
  description: 'Freelancer Toolkit is a free collection of essential tools for independent professionals and solopreneurs — built to save time and help you run a smarter freelance business.',
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: { title: `About — ${siteName}`, description: 'Free tools built for freelancers and solopreneurs.', url: `${siteUrl}/about`, siteName, type: 'website' },
  twitter: { card: 'summary_large_image', title: `About — ${siteName}`, description: 'Free tools built for freelancers.' },
  robots: { index: true, follow: true },
}

const tools = [
  { href: '/stripe-paypal-calculator', icon: Calculator, name: 'Payment Fee Calculator', desc: 'Never absorb payment processing fees — calculate exactly what to charge.' },
  { href: '/invoice-generator',        icon: FileText,   name: 'Invoice Generator',        desc: 'Professional PDF invoices in seconds, no watermarks.' },
  { href: '/hourly-rate-calculator',   icon: Clock,      name: 'Hourly Rate Calculator',   desc: 'Find your minimum viable rate and stop undercharging.' },
  { href: '/utm-builder',              icon: Link2,      name: 'UTM Builder',              desc: 'Build properly encoded tracking URLs for any campaign.' },
  { href: '/pomodoro-timer',           icon: Timer,      name: 'Pomodoro Timer',           desc: 'Stay focused with 25-minute work sessions and built-in breaks.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Freelancer Toolkit</h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-xl text-gray-600 leading-relaxed">
          Freelancer Toolkit is a free collection of essential online tools built specifically for independent professionals, solopreneurs, and small agency owners who want to spend less time on admin and more time doing great work.
        </p>

        <h2>Who This Toolkit Is For</h2>
        <p>
          Whether you&apos;re a freelance designer, developer, writer, consultant, or any other kind of independent professional — this toolkit addresses the practical, unglamorous side of running your own business. Every tool was built to solve a real problem that freelancers encounter regularly:
        </p>

        <ul>
          <li><strong>Payment fees eating into your profit</strong> — use the fee calculator before sending invoices.</li>
          <li><strong>Spending too long creating invoices</strong> — generate and print a professional PDF in under 2 minutes.</li>
          <li><strong>Undercharging clients</strong> — calculate your true minimum rate, including taxes and expenses.</li>
          <li><strong>Losing track of campaign performance</strong> — build properly encoded UTM links every time.</li>
          <li><strong>Struggling to focus while working from home</strong> — use the Pomodoro timer to protect your focus.</li>
        </ul>

        <h2>Our Philosophy</h2>
        <p>
          All tools on this site run entirely in your browser. No data is sent to any server. No account is required. No paywalls, no upsells, and no watermarks on your invoices. We believe the most important freelance tools should be freely accessible to everyone.
        </p>

        <h2>The Tools</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {tools.map(({ href, icon: Icon, name, desc }) => (
          <Link key={href} href={href} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group" aria-label={`Open ${name}`}>
            <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors">
              <Icon className="w-4 h-4 text-indigo-600" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
