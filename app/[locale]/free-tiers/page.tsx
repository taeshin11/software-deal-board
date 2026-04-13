import type { Metadata } from 'next';
import { getDealsByType } from '../../../lib/deals';
import { DealTable } from '../../../components/DealTable';

export const metadata: Metadata = {
  title: 'Free Software Tiers — Best Free Plans Forever',
  description: 'The best free software tiers available. Powerful tools with generous free plans — no credit card, no time limit.',
  openGraph: {
    title: 'Free Software Tiers',
    description: 'Great tools with generous free plans — no credit card needed, forever free.'
  }
};

export default async function FreetiersPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const deals = getDealsByType('free');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">✅</span>
          <h1 className="text-3xl font-extrabold text-[#052e16]">Free Forever Tiers</h1>
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
            {deals.length} deals
          </span>
        </div>
        <p className="text-gray-600">
          These tools offer genuinely useful free plans — no credit card, no time limit. Start for free, upgrade when you need more.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-sm text-green-800">
        <strong>💡 Free forever:</strong> These tools have permanent free tiers. They may have paid upgrades, but the core functionality is always free.
      </div>

      <DealTable deals={deals} locale={locale} showFilter={false} initialType="free" />
    </div>
  );
}
