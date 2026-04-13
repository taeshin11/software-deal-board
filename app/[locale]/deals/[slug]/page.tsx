import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDealBySlug, getAllDeals, formatPrice, getSavingsPercent, formatUsers, isExpiringSoon } from '../../../../lib/deals';
import { DealTypeBadge } from '../../../../components/DealTypeBadge';
import { SavingsBadge } from '../../../../components/SavingsBadge';
import { ExpiryBadge } from '../../../../components/ExpiryBadge';
import { CountdownTimer } from '../../../../components/CountdownTimer';
import { DealCard } from '../../../../components/DealCard';

export async function generateStaticParams() {
  const deals = getAllDeals();
  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  return locales.flatMap((locale) =>
    deals.map((deal) => ({ locale, slug: deal.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deal = getDealBySlug(slug);
  if (!deal) return { title: 'Deal Not Found' };

  const pct = getSavingsPercent(deal);
  return {
    title: `${deal.name} Deal — ${pct > 0 ? `${pct}% Off` : deal.dealType === 'free' ? 'Free' : 'Special Offer'}`,
    description: `${deal.description} ${pct > 0 ? `Save ${pct}%.` : ''} ${deal.expiresDate ? `Expires ${deal.expiresDate}.` : 'Ongoing deal.'}`,
    openGraph: {
      title: `${deal.name} — ${deal.dealType === 'lifetime' ? 'Lifetime Deal' : deal.dealType === 'trial' ? 'Free Trial' : 'Deal'}`,
      description: deal.description,
      type: 'website'
    }
  };
}

export default async function DealDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) notFound();

  const allDeals = getAllDeals();
  const related = allDeals.filter((d) => d.category === deal.category && d.slug !== deal.slug).slice(0, 3);
  const pct = getSavingsPercent(deal);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.name,
    description: deal.description,
    category: deal.category,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: deal.rating,
      reviewCount: Math.floor(deal.users / 100)
    },
    offers: {
      '@type': 'Offer',
      price: deal.dealPrice,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: deal.dealUrl,
      seller: { '@type': 'Organization', name: 'SoftwareDealBoard' },
      ...(deal.expiresDate ? { validThrough: deal.expiresDate } : {})
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href={`/${locale}`} className="hover:text-green-700">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/deals`} className="hover:text-green-700">Deals</Link>
          <span>/</span>
          <span className="text-[#052e16] font-medium">{deal.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <DealTypeBadge type={deal.dealType} />
                <ExpiryBadge deal={deal} />
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{deal.category}</span>
              </div>

              <h1 className="text-2xl font-extrabold text-[#052e16] mb-3">{deal.name}</h1>
              <p className="text-gray-600 leading-relaxed">{deal.description}</p>

              <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                <span>⭐ {deal.rating}/5.0</span>
                <span>👥 {formatUsers(deal.users)} users</span>
              </div>
            </div>

            {/* Deal details */}
            <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
              <h2 className="font-bold text-[#052e16] mb-4">Deal Details</h2>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">Deal Type</dt>
                  <dd className="font-semibold text-[#052e16] capitalize">{deal.dealType}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Category</dt>
                  <dd className="font-semibold text-[#052e16]">{deal.category}</dd>
                </div>
                {deal.originalPrice > 0 && (
                  <div>
                    <dt className="text-gray-500">Original Price</dt>
                    <dd className="font-semibold text-gray-400 line-through">{formatPrice(deal.originalPrice)}/mo</dd>
                  </div>
                )}
                <div>
                  <dt className="text-gray-500">Deal Price</dt>
                  <dd className="font-semibold text-green-600 text-lg">{deal.dealPrice === 0 ? 'Free' : formatPrice(deal.dealPrice)}</dd>
                </div>
                {pct > 0 && (
                  <div>
                    <dt className="text-gray-500">Savings</dt>
                    <dd className="font-bold text-red-600">{pct}% OFF (${deal.savings})</dd>
                  </div>
                )}
                <div>
                  <dt className="text-gray-500">Expiry</dt>
                  <dd className="font-semibold text-[#052e16]">
                    {deal.expiresDate ? new Date(deal.expiresDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No expiry'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-6 sticky top-24">
              {/* Price display */}
              <div className="text-center mb-4">
                {deal.dealPrice === 0 ? (
                  <div className="text-4xl font-mono font-bold text-green-600">FREE</div>
                ) : (
                  <>
                    <div className="text-4xl font-mono font-bold text-[#052e16]">{formatPrice(deal.dealPrice)}</div>
                    {deal.originalPrice > 0 && deal.originalPrice !== deal.dealPrice && (
                      <div className="text-sm text-gray-400 line-through">{formatPrice(deal.originalPrice)}</div>
                    )}
                  </>
                )}
                {pct > 0 && (
                  <div className="mt-1">
                    <SavingsBadge deal={deal} />
                  </div>
                )}
              </div>

              {/* Countdown */}
              {deal.expiresDate && (
                <div className="text-center mb-4 p-3 bg-red-50 rounded-xl">
                  <CountdownTimer expiresAt={deal.expiresDate} />
                </div>
              )}

              {/* CTA */}
              <a
                href={deal.dealUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 px-6 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-green-700 transition-colors text-lg"
              >
                Get This Deal →
              </a>

              <p className="text-xs text-gray-400 text-center mt-3">
                Opens on the vendor&apos;s website. Prices may vary.
              </p>
            </div>
          </div>
        </div>

        {/* Related deals */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#052e16] mb-4">Similar {deal.category} Deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((d) => (
                <DealCard key={d.id} deal={d} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
