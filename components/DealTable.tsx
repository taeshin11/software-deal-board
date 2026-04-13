'use client';
import { useState } from 'react';
import type { Deal } from '../lib/types';
import { DealCard } from './DealCard';
import { DealTypeFilter } from './DealTypeFilter';
import { formatPrice, getSavingsPercent } from '../lib/deals';

interface Props {
  deals: Deal[];
  locale: string;
  showFilter?: boolean;
  initialType?: string;
}

export function DealTable({ deals, locale, showFilter = true, initialType = 'all' }: Props) {
  const [activeType, setActiveType] = useState(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filtered = deals
    .filter((d) => activeType === 'all' || d.dealType === activeType)
    .filter((d) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'savings') return getSavingsPercent(b) - getSavingsPercent(a);
      if (sortBy === 'expiring') {
        if (!a.expiresDate) return 1;
        if (!b.expiresDate) return -1;
        return new Date(a.expiresDate).getTime() - new Date(b.expiresDate).getTime();
      }
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="space-y-4">
      {showFilter && (
        <div className="flex flex-col sm:flex-row gap-3">
          <DealTypeFilter selected={activeType} onChange={setActiveType} />
          <div className="flex gap-2 ml-auto">
            <input
              type="search"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-green-400 w-40 sm:w-52"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-green-400 bg-white"
            >
              <option value="default">Default</option>
              <option value="savings">Biggest Savings</option>
              <option value="expiring">Expiring Soon</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500">{filtered.length} deals</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((deal) => (
          <DealCard key={deal.id} deal={deal} locale={locale} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400">
            No deals found. Try a different filter.
          </div>
        )}
      </div>
    </div>
  );
}
