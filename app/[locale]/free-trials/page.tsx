import type { Metadata } from 'next';
import { getDealsByType } from '../../../lib/deals';
import { DealTable } from '../../../components/DealTable';

export const metadata: Metadata = {
  title: 'Free Software Trials — Try Before You Buy',
  description: 'The best free software trials. Try top SaaS tools before purchasing. Most require no credit card.',
  openGraph: {
    title: 'Free Software Trials',
    description: 'Try before you buy. No credit card required on most offers.'
  }
};

export default async function FreeTrialsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const deals = getDealsByType('trial');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🎁</span>
          <h1 className="text-3xl font-extrabold text-[#052e16]">Free Trials</h1>
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
            {deals.length} deals
          </span>
        </div>
        <p className="text-gray-600">
          Try the best software tools for free. Test them out before committing to a subscription.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-blue-800">
        <strong>💡 Tip:</strong> Most free trials don&apos;t require a credit card. Try the tool before you commit to a subscription!
      </div>

      <DealTable deals={deals} locale={locale} showFilter={false} initialType="trial" />
    </div>
  );
}
