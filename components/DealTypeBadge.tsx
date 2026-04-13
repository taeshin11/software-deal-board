import type { DealType } from '../lib/types';

const config: Record<DealType, { label: string; className: string }> = {
  lifetime: { label: 'Lifetime Deal', className: 'bg-purple-100 text-purple-700 border border-purple-200' },
  trial: { label: 'Free Trial', className: 'bg-blue-100 text-blue-700 border border-blue-200' },
  free: { label: 'Free Tier', className: 'bg-green-100 text-green-700 border border-green-200' },
  discount: { label: 'Discount', className: 'bg-orange-100 text-orange-700 border border-orange-200' }
};

export function DealTypeBadge({ type }: { type: DealType }) {
  const { label, className } = config[type] ?? config.discount;
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}
