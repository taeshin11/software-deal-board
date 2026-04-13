import type { Metadata } from 'next';
import { getAllDeals } from '../../../lib/deals';
import { DealTable } from '../../../components/DealTable';

export const metadata: Metadata = {
  title: 'All Software Deals — Lifetime, Free Trials & Discounts',
  description: 'Browse all software deals: lifetime licenses, free trials, free tiers, and discounts. Find the best SaaS deals available now.',
  openGraph: {
    title: 'All Software Deals',
    description: 'Browse all software deals: lifetime licenses, free trials, free tiers, and discounts.'
  }
};

export default async function DealsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const deals = getAllDeals();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#052e16] mb-2">All Software Deals</h1>
        <p className="text-gray-600">Browse {deals.length} curated deals — lifetime licenses, free trials, free tiers, and discounts.</p>
      </div>

      <DealTable deals={deals} locale={locale} showFilter={true} />
    </div>
  );
}
