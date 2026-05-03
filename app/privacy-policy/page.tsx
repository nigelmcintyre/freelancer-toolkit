import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/metadata'

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteName}`,
  description: 'Privacy Policy for Freelancer Toolkit — how we collect, use, and protect your data, including Google AdSense, cookies, and GDPR compliance.',
  alternates: { canonical: `${siteUrl}/privacy-policy` },
  openGraph: { title: `Privacy Policy — ${siteName}`, description: 'Privacy Policy for Freelancer Toolkit.', url: `${siteUrl}/privacy-policy`, siteName, type: 'website' },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: May 2026</p>

      <div className="prose prose-slate max-w-none">
        <p>
          This Privacy Policy describes how Freelancer Toolkit (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operated at <strong>freelance-toolkit.com</strong>, collects, uses, and shares information when you visit our website. By using this site, you agree to the practices described in this policy.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>Information You Provide</h3>
        <p>
          All tools on this website run entirely in your browser. You do not create an account, and no form data (invoice details, calculator inputs, UTM parameters, etc.) is transmitted to or stored on our servers. Your inputs exist only in your browser session and are cleared when you close or refresh the page.
        </p>

        <h3>Information Collected Automatically</h3>
        <p>When you visit our site, certain information is collected automatically:</p>
        <ul>
          <li><strong>Log data:</strong> Your IP address, browser type, operating system, referring URLs, and pages visited, collected by our hosting provider and analytics services.</li>
          <li><strong>Cookies:</strong> Small text files placed on your device by us or third-party services (see Cookies section below).</li>
          <li><strong>Usage data:</strong> Pages viewed, time spent on pages, and links clicked — aggregated and anonymised through analytics services.</li>
        </ul>

        <h2>2. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies for the following purposes:
        </p>
        <ul>
          <li><strong>Analytics cookies:</strong> Used to understand how visitors interact with the site (e.g. Google Analytics). These help us improve the tools and content.</li>
          <li><strong>Advertising cookies:</strong> Google AdSense places cookies to serve relevant advertisements. Google uses these cookies to personalise ads based on your recent browsing activity.</li>
          <li><strong>Functional cookies:</strong> Used to remember preferences and maintain session state where applicable.</li>
        </ul>
        <p>
          You can control or disable cookies through your browser settings. Note that disabling cookies may affect site functionality.
        </p>

        <h2>3. Google AdSense and Advertising</h2>
        <p>
          This website uses Google AdSense, a service provided by Google LLC, to display advertisements. Google AdSense uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to this site and other sites on the internet.
        </p>
        <p>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the internet. You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
        </p>
        <p>
          For more information on how Google uses data, visit: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites that use our services</a>.
        </p>

        <h2>4. GDPR — EU/EEA Users (Consent Mode v2)</h2>
        <p>
          If you are located in the European Union, European Economic Area, or the United Kingdom, your rights under the General Data Protection Regulation (GDPR) and UK GDPR apply. The legal bases for processing your data include:
        </p>
        <ul>
          <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> For analytics and advertising cookies. You will be presented with a consent banner on your first visit. You may withdraw consent at any time.</li>
          <li><strong>Legitimate interests (Art. 6(1)(f) GDPR):</strong> For security, fraud prevention, and improving site functionality.</li>
        </ul>
        <p>
          We implement <strong>Google Consent Mode v2</strong>, which respects your consent preferences and adjusts data collection accordingly. When consent for analytics or advertising is not granted, Google operates in a cookieless, aggregated mode that does not use personalised data.
        </p>
        <p>Your rights under GDPR include:</p>
        <ul>
          <li>The right to access personal data we hold about you</li>
          <li>The right to rectification of inaccurate data</li>
          <li>The right to erasure (&quot;right to be forgotten&quot;)</li>
          <li>The right to restrict or object to processing</li>
          <li>The right to data portability</li>
          <li>The right to lodge a complaint with a supervisory authority</li>
        </ul>
        <p>To exercise your rights, contact us at <a href="mailto:hello@freelance-toolkit.com">hello@freelance-toolkit.com</a>.</p>

        <h2>5. California Residents (CCPA)</h2>
        <p>
          If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information. We do not sell personal information. To exercise your rights, contact <a href="mailto:hello@freelance-toolkit.com">hello@freelance-toolkit.com</a>.
        </p>

        <h2>6. Third-Party Services</h2>
        <p>Our site may use the following third-party services, each with their own privacy policies:</p>
        <ul>
          <li><strong>Google Analytics</strong> — website analytics (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
          <li><strong>Google AdSense</strong> — advertising (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
        </ul>

        <h2>7. Data Retention</h2>
        <p>
          We retain server log data for up to 90 days for security and debugging purposes. Analytics data is retained per Google&apos;s standard retention settings (default 26 months). As noted above, no user-entered tool data is ever stored on our servers.
        </p>

        <h2>8. Children&apos;s Privacy</h2>
        <p>
          This site is not directed to children under 13 (or 16 in the EU). We do not knowingly collect personal information from children. If you believe a child has provided personal information, please contact us immediately.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision. Continued use of the site after any changes constitutes acceptance of the revised policy.
        </p>

        <h2>10. Contact</h2>
        <p>
          For any privacy-related questions or to exercise your rights, contact us at: <a href="mailto:hello@freelance-toolkit.com">hello@freelance-toolkit.com</a>
        </p>
      </div>
    </div>
  )
}
