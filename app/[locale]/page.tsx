import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllDeals, getAllCategories, getExpiringDeals, getFeaturedDeals } from '../../lib/deals';
import { DealCard } from '../../components/DealCard';
import { CategoryGrid } from '../../components/CategoryGrid';
import { DealTable } from '../../components/DealTable';
import { ExpiryBadge } from '../../components/ExpiryBadge';

import { AdsterraNativeBanner } from '@/components/ads/AdsterraNativeBanner';
import { AdsterraDisplay } from '@/components/ads/AdsterraDisplay';

export const metadata: Metadata = {
  title: 'SoftwareDealBoard — Best Software Deals, Lifetime Offers & Free Trials',
  description: 'Find curated SaaS deals, lifetime licenses, free trials and discounts. Save money on the tools you love.',
  openGraph: {
    title: 'SoftwareDealBoard — Best Software Deals',
    description: 'Curated SaaS deals, lifetime offers, and free trials.',
    type: 'website'
  }
};

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allDeals = getAllDeals();
  const categories = getAllCategories();
  const expiring = getExpiringDeals(7);
  const featured = getFeaturedDeals(3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SoftwareDealBoard',
    url: 'https://software-deal-board.vercel.app',
    description: 'Best software deals, lifetime offers & free trials tracker',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://software-deal-board.vercel.app/${locale}/deals?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-emerald-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-green-700/50 border border-green-500/50 rounded-full px-4 py-1.5 text-sm font-medium text-green-200 mb-6">
            💸 {allDeals.length}+ Software Deals Tracked
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Best Software Deals —<br className="hidden sm:block" />
            <span className="text-green-300">Free & Lifetime</span>
          </h1>
          <p className="text-lg text-green-200 mb-8 max-w-2xl mx-auto">
            Curated SaaS deals, lifetime licenses, and free trials. Save money on the tools you love.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/deals`}
              className="px-6 py-3 bg-white text-green-800 font-bold rounded-xl hover:bg-green-50 transition-colors"
            >
              Browse All Deals →
            </Link>
            <Link
              href={`/${locale}/expiring-soon`}
              className="px-6 py-3 bg-red-500/20 border border-red-400/50 text-red-200 font-semibold rounded-xl hover:bg-red-500/30 transition-colors"
            >
              🔥 Expiring Soon
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">

        {/* Expiring Soon Alert */}
        {expiring.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#052e16] flex items-center gap-2">
                🔥 Expiring This Week
              </h2>
              <Link href={`/${locale}/expiring-soon`} className="text-sm text-green-600 hover:text-green-800 font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {expiring.slice(0, 3).map((deal) => (
                <DealCard key={deal.id} deal={deal} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Deals */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#052e16]">⭐ Featured Deals</h2>
            <Link href={`/${locale}/lifetime`} className="text-sm text-green-600 hover:text-green-800 font-medium">
              See lifetime deals →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((deal) => (
              <DealCard key={deal.id} deal={deal} locale={locale} />
            ))}
          </div>
        </section>

        {/* Quick links */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: `/${locale}/lifetime`, icon: '♾', label: 'Lifetime Deals', color: 'bg-purple-50 border-purple-200 text-purple-800' },
            { href: `/${locale}/free-trials`, icon: '🎁', label: 'Free Trials', color: 'bg-blue-50 border-blue-200 text-blue-800' },
            { href: `/${locale}/free-tiers`, icon: '✅', label: 'Free Tiers', color: 'bg-green-50 border-green-200 text-green-800' },
            { href: `/${locale}/expiring-soon`, icon: '🔥', label: 'Expiring Soon', color: 'bg-red-50 border-red-200 text-red-800' }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 p-4 rounded-xl border ${item.color} font-semibold text-sm hover:shadow-sm transition-all`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-xl font-bold text-[#052e16] mb-4">📂 Browse by Category</h2>
          <CategoryGrid categories={categories} locale={locale} />
        </section>

        {/* New this week */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#052e16]">🆕 All Deals</h2>
            <Link href={`/${locale}/deals`} className="text-sm text-green-600 hover:text-green-800 font-medium">
              View all {allDeals.length} →
            </Link>
          </div>
          <DealTable deals={allDeals.slice(0, 12)} locale={locale} showFilter={false} />
          <div className="mt-6 text-center">
            <Link
              href={`/${locale}/deals`}
              className="inline-block px-8 py-3 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
            >
              View All {allDeals.length} Deals →
            </Link>
          </div>
        </section>
      <AdsterraNativeBanner />
      <AdsterraDisplay />
      </div>
    </>
  );
}
