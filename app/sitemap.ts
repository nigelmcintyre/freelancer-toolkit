import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages = [
    { url: '',                         priority: 1.0,  changeFrequency: 'weekly'  as const },
    { url: '/stripe-paypal-calculator', priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: '/invoice-generator',        priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: '/hourly-rate-calculator',   priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: '/utm-builder',              priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: '/pomodoro-timer',           priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: '/about',                    priority: 0.5,  changeFrequency: 'yearly'  as const },
    { url: '/contact',                  priority: 0.5,  changeFrequency: 'yearly'  as const },
    { url: '/privacy-policy',           priority: 0.3,  changeFrequency: 'yearly'  as const },
    { url: '/terms-of-service',         priority: 0.3,  changeFrequency: 'yearly'  as const },
  ]

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${siteUrl}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
