import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Use SoftwareDealBoard — FAQ & Guide',
  description: 'Learn how to find software deals, understand lifetime licenses vs subscriptions, get deal alerts, and make the most of SoftwareDealBoard.',
  openGraph: {
    title: 'How to Use SoftwareDealBoard — FAQ',
    description: 'Everything you need to know about finding and using software deals on SoftwareDealBoard.',
    type: 'website'
  }
};

const faqs = [
  {
    q: 'How do I find deals for my tool?',
    a: 'Use the search bar at the top of the Deals page to search by software name, category, or keyword. You can also browse by category — for example, visit the Development or Design category pages to see deals filtered by type. The "All Deals" table also supports real-time filtering.'
  },
  {
    q: 'What is a lifetime license vs a subscription?',
    a: 'A subscription requires ongoing monthly or annual payments to keep using the software. A lifetime license (also called a "LTD" — Lifetime Deal) means you pay once and get permanent access to the software, usually for a specific version tier. Lifetime deals are popular because they eliminate recurring costs, though they may not include all future major versions. Look for our "Lifetime" badge to identify these deals.'
  },
  {
    q: 'Are these deals verified?',
    a: 'We source deals from publicly available platforms including AppSumo, StackSocial, PitchGround, and directly from software vendors. We do our best to verify each deal is active before listing it, and we remove expired deals promptly. However, we recommend always clicking through to the vendor\'s site to confirm current pricing before purchasing, as deals can change without notice.'
  },
  {
    q: 'How do I get deal alerts?',
    a: 'Check back daily as our deal board is updated frequently with new offers. Bookmark the "Expiring Soon" page to catch deals before they end. You can also check the "New Deals" section on the homepage for the latest additions. For the most time-sensitive deals, visiting regularly or setting a browser bookmark is the best approach.'
  },
  {
    q: 'What is a Black Friday software deal?',
    a: 'Black Friday (the Friday after US Thanksgiving in late November) and Cyber Monday are the biggest sale periods for software. Most SaaS companies offer their steepest discounts of the year — often 40–80% off subscriptions or heavily discounted lifetime deals. We track these events closely and surface them under "Expiring Soon" and with special filters during the sale period. Mark your calendar for late November each year.'
  },
  {
    q: 'What is AppSumo?',
    a: 'AppSumo is one of the most popular deal platforms for SaaS products and digital tools. They partner with software companies to offer deeply discounted lifetime deals — typically priced at a one-time fee instead of a recurring subscription. AppSumo deals are time-limited and often sell out. Many of the lifetime deals you\'ll find on SoftwareDealBoard are sourced from or inspired by AppSumo listings.'
  },
  {
    q: 'Are these deals region-locked?',
    a: 'Some deals are only available in specific countries due to payment restrictions, tax laws, or vendor policies. Pricing in USD, EUR, or other currencies may differ. If you find a deal is unavailable in your region, check the vendor\'s website directly — they sometimes have regional pricing options not reflected on deal platforms. We note regional restrictions where we are aware of them, but always verify on the vendor\'s site.'
  },
  {
    q: 'What if a deal has expired?',
    a: 'Expired deals are removed from our active listings as quickly as possible. If you click a deal and find it has ended, please note that some vendors continue to honor the pricing for a short time after the official end date — it\'s worth checking directly. For expired lifetime deals, you may still find the software at its regular pricing. Use the "Expiring Soon" page to catch deals before they close.'
  },
  {
    q: 'How do I know if a lifetime deal is worth it?',
    a: 'A lifetime deal is generally worth it if: (1) you plan to use the software long-term, (2) the one-time price is less than 12–18 months of subscription cost, (3) the company is established and financially stable, and (4) the feature tier covers your needs. Be cautious with very new startups offering lifetime deals — there\'s always some risk the product may be discontinued. Research the company, read user reviews, and check if they offer a refund window before committing.'
  },
  {
    q: 'What software categories do you cover?',
    a: 'We cover a wide range of categories including: Development tools (IDEs, APIs, databases), Design (UI kits, image editors, prototyping), Productivity (note-taking, task managers, automation), Marketing (email, SEO, CRM, analytics), AI & ML tools, Project Management, Security & Privacy, and Cloud & Infrastructure. Browse the Categories page to explore all available categories and their current deals.'
  }
];

export default async function HowToUsePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

        {/* Hero */}
        <section className="text-center">
          <div className="inline-block bg-blue-100 border border-blue-300 rounded-full px-4 py-1.5 text-sm font-medium text-blue-700 mb-4">
            📖 Guide & FAQ
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] mb-4">
            How to Use SoftwareDealBoard
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know to find, evaluate, and grab the best software deals.
          </p>
        </section>

        {/* Quick Start */}
        <section className="card">
          <h2 className="text-xl font-bold text-[#052e16] mb-4">Quick Start Guide</h2>
          <ol className="space-y-4">
            {[
              { step: '1', title: 'Browse or Search', desc: 'Visit the Deals page and search for a specific tool, or browse by category to discover new software.' },
              { step: '2', title: 'Filter by Deal Type', desc: 'Use filters to narrow down to lifetime deals, free trials, free tiers, or limited-time discounts.' },
              { step: '3', title: 'Check Expiry', desc: 'Pay attention to the expiry badge — some deals end in days. Visit "Expiring Soon" for the most urgent deals.' },
              { step: '4', title: 'Verify & Buy', desc: 'Click "Get Deal" to go to the vendor\'s site. Always confirm current pricing and terms before purchasing.' }
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-[#16a34a] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-[#052e16]">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-[#052e16] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <h3 className="font-bold text-[#052e16] mb-2">{faq.q}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="text-gray-600 mb-4">Ready to find your next great software deal?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/deals`}
              className="px-6 py-3 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
            >
              Browse All Deals →
            </Link>
            <Link
              href={`/${locale}/expiring-soon`}
              className="px-6 py-3 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors"
            >
              🔥 Expiring Soon
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
