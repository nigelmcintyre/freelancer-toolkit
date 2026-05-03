'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Wrench } from 'lucide-react'

const tools = [
  { href: '/stripe-paypal-calculator', label: 'Fee Calculator' },
  { href: '/invoice-generator',        label: 'Invoice Generator' },
  { href: '/hourly-rate-calculator',   label: 'Rate Calculator' },
  { href: '/utm-builder',              label: 'UTM Builder' },
  { href: '/pomodoro-timer',           label: 'Pomodoro Timer' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header data-noprint className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" style={{ maxHeight: 64 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900" aria-label="Freelancer Toolkit Home">
          <Wrench className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          <span>Freelancer Toolkit</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {tools.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col gap-3 pt-3" aria-label="Mobile navigation">
            {tools.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-gray-700 hover:text-indigo-600 py-1"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
