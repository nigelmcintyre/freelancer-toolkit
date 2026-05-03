import Link from 'next/link'
import { Wrench } from 'lucide-react'

export default function Footer() {
  return (
    <footer data-noprint className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-gray-900 mb-3">
              <Wrench className="w-4 h-4 text-indigo-600" aria-hidden="true" />
              <span>Freelancer Toolkit</span>
            </div>
            <p className="text-sm text-gray-500">
              Free online tools for freelancers and solopreneurs — invoice generator, fee calculators, UTM builder, and more.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Tools</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/stripe-paypal-calculator" className="hover:text-indigo-600">Payment Fee Calculator</Link></li>
              <li><Link href="/invoice-generator" className="hover:text-indigo-600">Invoice Generator</Link></li>
              <li><Link href="/hourly-rate-calculator" className="hover:text-indigo-600">Hourly Rate Calculator</Link></li>
              <li><Link href="/utm-builder" className="hover:text-indigo-600">UTM Builder</Link></li>
              <li><Link href="/pomodoro-timer" className="hover:text-indigo-600">Pomodoro Timer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-indigo-600">About</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-indigo-600">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-indigo-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Freelancer Toolkit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
