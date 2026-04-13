import type { Metadata } from 'next';
import { getDealsByType } from '../../../lib/deals';
import { DealTable } from '../../../components/DealTable';

export const metadata: Metadata = {
  title: 'Lifetime Software Deals — Pay Once, Use Forever',
  description: 'The best lifetime software deals. Pay once and use forever. Find lifetime licenses on AppSumo, StackSocial and direct from vendors.',
  openGraph: {
    title: 'Lifetime Software Deals',
    description: 'Pay once, use forever. The best lifetime software deals available now.'
  }
};

export default async function LifetimePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const deals = getDealsByType('lifetime');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">♾</span>
          <h1 className="text-3xl font-extrabold text-[#052e16]">Lifetime Deals</h1>
          <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
            {deals.length} deals
          </span>
        </div>
        <p className="text-gray-600">
          Pay once, use forever. These are the best lifetime software licenses available — no recurring subscriptions.
        </p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-8 text-sm text-purple-800">
        <strong>💡 What is a lifetime deal?</strong> A lifetime deal lets you pay a one-time fee instead of a monthly or annual subscription. You own the software license permanently.
      </div>

      <DealTable deals={deals} locale={locale} showFilter={false} initialType="lifetime" />
    </div>
  );
}
