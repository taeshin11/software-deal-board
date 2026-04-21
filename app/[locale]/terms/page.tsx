import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use — SoftwareDealBoard',
  description: 'Read the SoftwareDealBoard terms of use. Deal listings from public sources, not affiliated with vendors, deals subject to change, some links are affiliate links.',
  openGraph: {
    title: 'Terms of Use — SoftwareDealBoard',
    description: 'Terms and conditions for using SoftwareDealBoard.',
    type: 'website'
  }
};

const LAST_UPDATED = 'April 13, 2025';
const CONTACT_EMAIL = 'legal@software-deal-board.vercel.app';
const SITE_NAME = 'SoftwareDealBoard';
const SITE_URL = 'https://software-deal-board.vercel.app';

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#052e16] mb-2">Terms of Use</h1>
        <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section>
          <p>
            Please read these Terms of Use ("Terms") carefully before using the {SITE_NAME} website located at{' '}
            <span className="font-medium text-[#052e16]">{SITE_URL}</span> (the "Site"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">1. About the Site</h2>
          <p>
            {SITE_NAME} is an independent deal aggregator that curates and displays software deals, SaaS discounts, lifetime license offers, and promotional pricing information sourced from publicly available third-party platforms and vendor websites. The Site is intended to help users discover software deals for informational purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">2. Deal Listings from Public Sources</h2>
          <p className="mb-3">
            All deal listings displayed on this Site are sourced from publicly available information, including but not limited to deal platforms (such as AppSumo, StackSocial, PitchGround), software vendor websites, and other publicly accessible promotional pages.
          </p>
          <p>
            We do not create, originate, or negotiate these deals. We aggregate and present publicly available information to help users find relevant offers. The presence of a deal on this Site does not constitute an endorsement, recommendation, or guarantee of the deal or the associated software product.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">3. No Affiliation with Vendors</h2>
          <p className="mb-3">
            {SITE_NAME} is an independent platform and is not affiliated with, endorsed by, or officially connected to any software vendor, SaaS company, deal platform, or any other third party mentioned on this Site unless explicitly stated otherwise.
          </p>
          <p>
            All product names, logos, and trademarks mentioned on this Site are the property of their respective owners. Their presence on this Site does not imply any affiliation with or endorsement by those owners.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">4. Verify Terms Directly with Software Providers</h2>
          <div className="card bg-yellow-50 border-yellow-200 mb-3">
            <p className="font-semibold text-yellow-800">Important: Always verify deal terms directly with the software provider before purchasing.</p>
          </div>
          <p className="mb-3">
            Before making any purchase decision, you should independently verify all deal terms, pricing, features, refund policies, and eligibility requirements directly on the software vendor's official website or the deal platform hosting the offer. Deal conditions can change without notice.
          </p>
          <p>
            {SITE_NAME} is not responsible for inaccuracies in pricing, feature descriptions, deal availability, or any other information that may have changed since we last updated our listings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">5. Deals Subject to Change</h2>
          <p className="mb-3">
            All deals listed on this Site are subject to change or expiration at any time without notice. We make reasonable efforts to keep listings current and remove expired deals promptly, but we cannot guarantee that all listed deals are currently active or available.
          </p>
          <p>
            Pricing information displayed on this Site may not reflect the most current pricing from the vendor. Currency conversions, regional pricing differences, and promotional adjustments may result in pricing that differs from what is shown on this Site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">6. Affiliate Links</h2>
          <p className="mb-3">
            Some links on this Site may be affiliate links. This means if you click on a link and make a purchase, {SITE_NAME} may receive a commission or referral fee from the seller at no additional cost to you. Affiliate commissions help support the ongoing operation and maintenance of this Site.
          </p>
          <p>
            Our use of affiliate links does not influence how we select or present deals. We aim to list deals that are genuinely useful and relevant to our users regardless of whether an affiliate relationship exists. However, you should be aware that affiliate relationships may exist when you use links on this Site to make purchases.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">7. Disclaimer of Warranties</h2>
          <p>
            THE SITE AND ALL INFORMATION, CONTENT, AND DEALS DISPLAYED ON THE SITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. {SITE_NAME.toUpperCase()} DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SITE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">8. Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, {SITE_NAME.toUpperCase()} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE OR ANY DEAL LISTED ON THE SITE, INCLUDING BUT NOT LIMITED TO LOSS OF REVENUE, LOSS OF DATA, OR LOSS OF GOODWILL, EVEN IF {SITE_NAME.toUpperCase()} HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">9. Acceptable Use</h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Use the Site in any way that violates applicable laws or regulations</li>
            <li>Scrape, crawl, or extract data from the Site in bulk without permission</li>
            <li>Attempt to gain unauthorized access to any part of the Site</li>
            <li>Use the Site to transmit spam, malware, or other harmful content</li>
            <li>Reproduce or republish Site content for commercial purposes without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">10. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will update the "Last updated" date at the top of this page when changes are made. Your continued use of the Site after any changes constitutes your acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable law, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Site shall be resolved in a court of competent jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#052e16] mb-3">12. Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-700 underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
