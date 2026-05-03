import type { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, FileText, Clock, Link2, Timer, ArrowRight } from 'lucide-react'
import { siteUrl, siteName } from '@/lib/metadata'

export const metadata: Metadata = {
  title: `Free Freelancer Tools — Invoice Generator, Fee Calculator & More — ${siteName}`,
  description: 'Free online tools for freelancers: Stripe/PayPal fee calculator, PDF invoice generator, hourly rate calculator, UTM builder, and Pomodoro timer. No sign-up required.',
  alternates: { canonical: siteUrl },
  openGraph: {
    title: `Free Freelancer Tools — ${siteName}`,
    description: 'Free online tools for freelancers and solopreneurs. No sign-up, no fees.',
    url: siteUrl,
    siteName,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: `Free Freelancer Tools — ${siteName}`, description: 'Free online tools for freelancers and solopreneurs.' },
}

const tools = [
  {
    href: '/stripe-paypal-calculator',
    icon: Calculator,
    title: 'Payment Fee Calculator',
    description: 'Calculate exactly what to charge clients to cover Stripe (2.9% + $0.30) or PayPal (3.49% + $0.49) transaction fees. Never absorb fees again.',
    badge: 'Popular',
  },
  {
    href: '/invoice-generator',
    icon: FileText,
    title: 'Invoice Generator',
    description: 'Create professional PDF invoices in seconds. Add line items, tax, payment terms, and print directly from your browser — no account needed.',
    badge: 'Free PDF',
  },
  {
    href: '/hourly-rate-calculator',
    icon: Clock,
    title: 'Hourly Rate Calculator',
    description: 'Calculate your minimum freelance hourly rate based on your target salary, expenses, and billable hours. Never underprice your work again.',
    badge: null,
  },
  {
    href: '/utm-builder',
    icon: Link2,
    title: 'UTM Builder',
    description: 'Build properly encoded UTM tracking URLs for your marketing campaigns. Copy to clipboard instantly and keep a history of your last 5 URLs.',
    badge: null,
  },
  {
    href: '/pomodoro-timer',
    icon: Timer,
    title: 'Pomodoro Timer',
    description: 'Stay focused with the Pomodoro technique. 25-minute work sessions, short and long breaks, browser notifications, and audio chimes built in.',
    badge: null,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            100% Free — No Sign-up Required
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            The Freelancer &amp; Solopreneur Toolkit
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Five essential free tools to help you run your freelance business smarter — from invoicing and fee calculation to time management and campaign tracking.
          </p>
          <Link
            href="/invoice-generator"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            aria-label="Create your first invoice for free"
          >
            Create Your First Invoice <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">All Free Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(({ href, icon: Icon, title, description, badge }) => (
            <Link
              key={href}
              href={href}
              className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition-all"
              aria-label={`Open ${title}`}
            >
              {badge && (
                <span className="absolute top-4 right-4 bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                <Icon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm text-indigo-600 font-medium">
                Open Tool <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Built for Freelancers, by Freelancers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every tool in this kit solves a real problem freelancers face daily — from figuring out how much to charge so payment fees don&apos;t eat your profit, to staying productive with focused work sessions. All tools run entirely in your browser. No data is sent to any server.
          </p>
        </div>
      </section>
    </div>
  )
}
