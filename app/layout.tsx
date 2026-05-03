import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdsenseProvider from '@/components/AdsenseProvider'
import { siteUrl, siteName } from '@/lib/metadata'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: { default: `${siteName} — Free Tools for Freelancers`, template: `%s — ${siteName}` },
  description: 'Free online tools for freelancers and solopreneurs: invoice generator, Stripe fee calculator, hourly rate calculator, UTM builder, and Pomodoro timer.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    siteName,
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
  other: {
    'google-adsense-account': 'ca-pub-1872557624162625',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? ''
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased">
        <AdsenseProvider pubId={pubId}>
          <Header />
          <main>{children}</main>
          <Footer />
        </AdsenseProvider>
      </body>
    </html>
  )
}
