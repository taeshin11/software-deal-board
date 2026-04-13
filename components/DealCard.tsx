import Link from 'next/link';
import type { Deal } from '../lib/types';
import { DealTypeBadge } from './DealTypeBadge';
import { SavingsBadge } from './SavingsBadge';
import { ExpiryBadge } from './ExpiryBadge';
import { CountdownTimer } from './CountdownTimer';
import { formatPrice, formatUsers, getSavingsPercent } from '../lib/deals';

export function DealCard({ deal, locale }: { deal: Deal; locale: string }) {
  const pct = getSavingsPercent(deal);

  return (
    <div className="bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1 mb-2">
            <DealTypeBadge type={deal.dealType} />
            <ExpiryBadge deal={deal} />
          </div>
          <h3 className="font-bold text-[#052e16] text-base leading-tight truncate">{deal.name}</h3>
          <p className="text-xs text-green-700 mt-0.5">{deal.category}</p>
        </div>
        <SavingsBadge deal={deal} />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <p className="text-sm text-gray-600 line-clamp-2 flex-1">{deal.description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          {deal.dealType === 'free' || deal.dealType === 'trial' ? (
            <span className="text-2xl font-mono font-bold text-green-600">Free</span>
          ) : (
            <>
              <span className="text-2xl font-mono font-bold text-[#16a34a]">{formatPrice(deal.dealPrice)}</span>
              {deal.originalPrice > 0 && deal.originalPrice !== deal.dealPrice && (
                <span className="text-sm font-mono text-gray-400 line-through">{formatPrice(deal.originalPrice)}</span>
              )}
              {pct > 0 && (
                <span className="text-xs text-green-600 font-semibold">({pct}% off)</span>
              )}
            </>
          )}
        </div>

        {/* Countdown or expiry info */}
        {deal.expiresDate && (
          <div>
            <CountdownTimer expiresAt={deal.expiresDate} />
          </div>
        )}
        {!deal.expiresDate && (
          <span className="text-xs text-gray-400">No expiry date</span>
        )}

        {/* Users & Rating */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>⭐ {deal.rating}</span>
          <span>👥 {formatUsers(deal.users)}</span>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-4 pt-0 flex gap-2">
        <Link
          href={`/${locale}/deals/${deal.slug}`}
          className="flex-1 text-center py-2 px-3 rounded-xl border border-green-200 text-green-700 text-sm font-medium hover:bg-green-50 transition-colors"
        >
          Details
        </Link>
        <a
          href={deal.dealUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-3 rounded-xl bg-[#16a34a] text-white text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          Get Deal →
        </a>
      </div>
    </div>
  );
}
