import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/metadata'

export const metadata: Metadata = {
  title: `Terms of Service — ${siteName}`,
  description: 'Terms of Service for Freelancer Toolkit. Read our terms before using our free online tools.',
  alternates: { canonical: `${siteUrl}/terms-of-service` },
  openGraph: { title: `Terms of Service — ${siteName}`, description: 'Terms of Service for Freelancer Toolkit.', url: `${siteUrl}/terms-of-service`, siteName, type: 'website' },
  robots: { index: true, follow: true },
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: May 2026</p>

      <div className="prose prose-slate max-w-none">
        <p>
          Please read these Terms of Service (&quot;Terms&quot;) carefully before using the Freelancer Toolkit website at <strong>freelance-toolkit.com</strong> (&quot;the Site&quot;). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          These Terms constitute a legally binding agreement between you and Freelancer Toolkit. We reserve the right to modify these Terms at any time. Your continued use of the Site after changes are posted constitutes acceptance of the updated Terms.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Freelancer Toolkit provides a collection of free, browser-based utility tools for freelancers and solopreneurs, including but not limited to: a payment fee calculator, invoice generator, hourly rate calculator, UTM builder, and Pomodoro timer. All tools run in your browser and do not require account registration.
        </p>

        <h2>3. Use of the Site</h2>
        <p>You agree to use the Site only for lawful purposes and in a manner that does not:</p>
        <ul>
          <li>Violate any applicable local, national, or international law or regulation</li>
          <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
          <li>Attempt to gain unauthorised access to the Site, its servers, or related systems</li>
          <li>Introduce viruses, trojans, or other malicious code</li>
          <li>Scrape or data-mine the Site for commercial purposes without written permission</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content on this Site, including but not limited to text, graphics, logos, and software, is the property of Freelancer Toolkit or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          The Site and all tools are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
        </p>
        <p>
          <strong>Financial calculations:</strong> The fee calculations, rate calculations, and other numerical outputs provided by tools on this Site are for informational purposes only. They are based on publicly available rates as of the last update and may not reflect current fees charged by payment processors. Always verify rates directly with your payment provider. Freelancer Toolkit is not responsible for any financial decisions made based on tool outputs.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Freelancer Toolkit shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site, even if we have been advised of the possibility of such damages. Our total liability to you for any claims arising from your use of the Site shall not exceed $0 (as the Site is provided free of charge).
        </p>

        <h2>7. Third-Party Links and Services</h2>
        <p>
          The Site may contain links to third-party websites. These links are provided for convenience only. We have no control over third-party sites and are not responsible for their content, privacy practices, or availability. Linking does not imply endorsement.
        </p>
        <p>
          The Site displays advertising served by Google AdSense. We are not responsible for the content of third-party advertisements.
        </p>

        <h2>8. Privacy</h2>
        <p>
          Your use of the Site is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference.
        </p>

        <h2>9. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the Site at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, third parties, or the interests of the Site.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Freelancer Toolkit is established, without regard to conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of courts in that jurisdiction.
        </p>

        <h2>11. Contact</h2>
        <p>
          If you have any questions about these Terms, please contact us at: <a href="mailto:hello@freelance-toolkit.com">hello@freelance-toolkit.com</a>
        </p>
      </div>
    </div>
  )
}
