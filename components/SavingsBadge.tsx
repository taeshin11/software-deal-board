import { getSavingsPercent } from '../lib/deals';
import type { Deal } from '../lib/types';

export function SavingsBadge({ deal }: { deal: Deal }) {
  if (deal.dealType === 'free' && deal.dealPrice === 0 && deal.originalPrice === 0) return null;
  if (deal.savings === 0) return null;

  const pct = getSavingsPercent(deal);
  if (deal.dealType === 'free' || deal.dealType === 'trial') {
    return (
      <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        FREE
      </span>
    );
  }
  if (pct > 0) {
    return (
      <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        {pct}% OFF
      </span>
    );
  }
  return null;
}
