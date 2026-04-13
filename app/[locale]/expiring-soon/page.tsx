import type { Metadata } from 'next';
import { getExpiringDeals } from '../../../lib/deals';
import { DealCard } from '../../../components/DealCard';

export const metadata: Metadata = {
  title: 'Expiring Software Deals — Last Chance Offers',
  description: 'Software deals expiring within 7 days. Act fast before these limited-time offers are gone!',
  openGraph: {
    title: 'Expiring Software Deals',
    description: 'Last chance! These software deals expire within 7 days.'
  }
};

export default async function ExpiringSoonPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const deals = getExpiringDeals(7);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Expiring Software Deals',
    description: 'Software deals expiring within 7 days',
    numberOfItems: deals.length,
    itemListElement: deals.map((deal, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: deal.name,
      url: `https://software-deal-board.vercel.app/${locale}/deals/${deal.slug}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🔥</span>
            <h1 className="text-3xl font-extrabold text-[#052e16]">Expiring Soon</h1>
            {deals.length > 0 && (
              <span className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full animate-pulse">
                {deals.length} deals ending soon!
              </span>
            )}
          </div>
          <p className="text-gray-600">
            These deals expire within the next 7 days. Act fast before they&apos;re gone!
          </p>
        </div>

        {deals.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-[#052e16] mb-2">No deals expiring this week!</h2>
            <p className="text-gray-500">Check back soon — new deals are added regularly.</p>
          </div>
        ) : (
          <>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-sm text-red-800">
              <strong>⚠️ Act fast!</strong> These deals expire soon. Click &quot;Get Deal&quot; to claim them before they&apos;re gone.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} locale={locale} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
