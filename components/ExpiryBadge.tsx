import { isExpiringSoon } from '../lib/deals';
import type { Deal } from '../lib/types';

export function ExpiryBadge({ deal }: { deal: Deal }) {
  if (!deal.expiresDate) return null;
  const expiring = isExpiringSoon(deal, 7);
  if (!expiring) return null;

  const now = Date.now();
  const expires = new Date(deal.expiresDate).getTime();
  const daysLeft = Math.ceil((expires - now) / (1000 * 60 * 60 * 24));

  return (
    <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 border border-red-200 text-xs font-semibold px-2 py-0.5 rounded-full">
      🔥 {daysLeft <= 1 ? 'Last day!' : `${daysLeft}d left`}
    </span>
  );
}
