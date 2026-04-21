import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About SoftwareDealBoard — Curated Software Deals for Developers & Businesses',
  description: 'Learn about SoftwareDealBoard: we curate the best software deals, lifetime licenses, and SaaS discounts for developers, designers, and small businesses.',
  openGraph: {
    title: 'About SoftwareDealBoard',
    description: 'We curate the best software deals, lifetime licenses, and SaaS discounts for developers, designers, and small businesses.',
    type: 'website'
  }
};

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

      {/* Hero */}
      <section className="text-center">
        <div className="inline-block bg-green-100 border border-green-300 rounded-full px-4 py-1.5 text-sm font-medium text-green-700 mb-4">
          💸 About Us
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] mb-4">
          About SoftwareDealBoard
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We track and curate the best software deals, lifetime licenses, and SaaS discounts — so you never miss a great offer on the tools you use every day.
        </p>
      </section>

      {/* Mission */}
      <section className="card">
        <h2 className="text-xl font-bold text-[#052e16] mb-3">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Software is expensive. Subscriptions add up. SoftwareDealBoard exists to help developers, designers, founders, and small business owners save money on the tools they rely on — without wasting hours hunting across the internet for promo codes and discount pages.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We aggregate deals from trusted sources, highlight limited-time offers, and surface lifetime license opportunities so you can buy once and own forever. Our deal board is updated daily with new offers, and expired deals are removed promptly so you always see accurate pricing.
        </p>
      </section>

      {/* What We Cover */}
      <section>
        <h2 className="text-xl font-bold text-[#052e16] mb-4">What We Cover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: '💻',
              title: 'IDEs & Developer Tools',
              desc: 'Code editors, debugging tools, version control clients, API testing apps, and developer productivity software.'
            },
            {
              icon: '🎨',
              title: 'Design Tools',
              desc: 'UI/UX design suites, icon packs, font bundles, image editors, prototyping tools, and asset creation apps.'
            },
            {
              icon: '📋',
              title: 'Project Management',
              desc: 'Task managers, kanban boards, team wikis, time trackers, and collaboration platforms for teams of all sizes.'
            },
            {
              icon: '⚡',
              title: 'Productivity Apps',
              desc: 'Note-taking tools, automation platforms, email clients, calendar apps, and focus tools to help you do more.'
            },
            {
              icon: '📈',
              title: 'Marketing & SEO',
              desc: 'Email marketing platforms, SEO tools, analytics dashboards, social media schedulers, and CRM software.'
            },
            {
              icon: '🤖',
              title: 'AI & ML Tools',
              desc: 'AI writing assistants, image generation tools, code completion tools, chatbot platforms, and data analysis apps.'
            },
            {
              icon: '🔒',
              title: 'Security & Privacy',
              desc: 'Password managers, VPN services, backup solutions, endpoint security, and privacy-focused communication tools.'
            },
            {
              icon: '☁️',
              title: 'Cloud & Infrastructure',
              desc: 'Hosting credits, database platforms, serverless tools, monitoring services, and DevOps automation software.'
            }
          ].map((item) => (
            <div key={item.title} className="card flex gap-3">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-[#052e16] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Types of Deals */}
      <section className="card">
        <h2 className="text-xl font-bold text-[#052e16] mb-4">Types of Deals We Track</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="font-bold text-purple-700 w-36 flex-shrink-0">Lifetime Deals</span>
            <span>Pay once and use the software forever. No recurring subscription fees. Popular on platforms like AppSumo, StackSocial, and PitchGround.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-blue-700 w-36 flex-shrink-0">Free Trials</span>
            <span>Try premium software before you buy — no credit card required or full-featured trial periods from 7 to 90 days.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-green-700 w-36 flex-shrink-0">Free Tiers</span>
            <span>Permanently free plans offered by SaaS products — great for solo developers and small projects.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-red-700 w-36 flex-shrink-0">Limited Discounts</span>
            <span>Time-limited coupon codes, seasonal sales (Black Friday, Cyber Monday, product anniversaries), and launch discounts.</span>
          </li>
        </ul>
      </section>

      {/* Why Trust Us */}
      <section className="card bg-green-50 border-green-200">
        <h2 className="text-xl font-bold text-[#052e16] mb-3">Why Trust SoftwareDealBoard?</h2>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> Deals sourced from publicly available, verified deal platforms</li>
          <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> Expired deals removed promptly to avoid outdated listings</li>
          <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> No fake discounts — we only list deals we can verify exist</li>
          <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> Transparent about affiliate relationships (see our Terms)</li>
          <li className="flex items-start gap-2"><span className="text-green-600 font-bold">✓</span> Updated daily with fresh offers from across the web</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-xl font-bold text-[#052e16] mb-3">Start Saving Today</h2>
        <p className="text-gray-600 mb-6">Browse our full deal board and find your next great software purchase.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/${locale}/deals`}
            className="px-6 py-3 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
          >
            Browse All Deals →
          </Link>
          <Link
            href={`/${locale}/lifetime`}
            className="px-6 py-3 bg-purple-100 text-purple-800 font-bold rounded-xl hover:bg-purple-200 transition-colors"
          >
            Lifetime Deals
          </Link>
          <Link
            href={`/${locale}/how-to-use`}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            How It Works
          </Link>
        </div>
      </section>

    </div>
  );
}
