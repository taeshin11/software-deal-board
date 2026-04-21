import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — SoftwareDealBoard',
  description: 'Read the SoftwareDealBoard privacy policy. Learn how we collect, use, and protect your information when you visit our software deals platform.',
  openGraph: {
    title: 'Privacy Policy — SoftwareDealBoard',
    description: 'How SoftwareDealBoard collects, uses, and protects your information.',
    type: 'website'
  }
};

const LAST_UPDATED = 'April 13, 2025';
const CONTACT_EMAIL = 'privacy@software-deal-board.vercel.app';
const SITE_NAME = 'SoftwareDealBoard';
const SITE_URL = 'https://software-deal-board.vercel.app';

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#052e16] mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section>
          <p>
            Welcome to {SITE_NAME} ("{SITE_NAME}", "we", "us", or "our"). We operate the website at{' '}
            <span className="font-medium text-[#052e16]">{SITE_URL}</span> (the "Site"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site. Please read this policy carefully. If you disagree with the terms of this privacy policy, please discontinue use of the Site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">1. Information We Collect</h2>
          <h3 className="font-semibold mb-2">Information Collected Automatically</h3>
          <p className="mb-3">
            When you visit the Site, we may automatically collect certain information about your device, including your web browser type, IP address, referring URLs, pages viewed, time and date of your visit, and other diagnostic data. This information is collected via standard server logs and analytics tools.
          </p>
          <h3 className="font-semibold mb-2">Cookies and Tracking Technologies</h3>
          <p>
            We may use cookies, web beacons, and similar tracking technologies to collect and store information about your interactions with the Site. Cookies are small data files placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent, though some features of the Site may not function properly without cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">2. How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Operate, maintain, and improve the Site</li>
            <li>Analyze usage trends and monitor Site performance</li>
            <li>Detect and prevent fraudulent or abusive activity</li>
            <li>Comply with legal obligations</li>
            <li>Display relevant advertising (including via Google AdSense)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">3. Advertising and Third-Party Services</h2>
          <p className="mb-3">
            We use Google AdSense to display advertisements on our Site. Google and its partners may use cookies and similar technologies to serve ads based on your prior visits to our Site and other websites. You can opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
              Google Ads Settings
            </a>
            .
          </p>
          <p>
            Some links on our Site may be affiliate links. If you click an affiliate link and make a purchase, we may receive a small commission at no additional cost to you. We only link to software products we believe are relevant and valuable to our users.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">4. Third-Party Websites</h2>
          <p>
            Our Site contains links to third-party websites, including software vendor sites and deal platforms. We are not responsible for the privacy practices of those websites and encourage you to read their privacy policies. This Privacy Policy applies only to information collected on our Site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">5. Analytics</h2>
          <p>
            We may use third-party analytics services (such as Vercel Analytics or Google Analytics) to help understand how visitors use our Site. These services may collect information sent by your browser as part of a web page request, including cookies and your IP address. Their use of this information is governed by their respective privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">6. Data Retention</h2>
          <p>
            We retain automatically collected data for a reasonable period consistent with our operational and analytical needs. We do not store personal information beyond what is necessary for the purposes outlined in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">7. Children's Privacy</h2>
          <p>
            Our Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">8. Your Rights</h2>
          <p className="mb-3">
            Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete information we hold about you. To exercise these rights, please contact us using the information below.
          </p>
          <p>
            If you are located in the European Economic Area (EEA), you may have additional rights under the General Data Protection Regulation (GDPR). If you are a California resident, you may have rights under the California Consumer Privacy Act (CCPA).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of the Site after any changes constitutes your acceptance of the new Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">10. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-700 underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
