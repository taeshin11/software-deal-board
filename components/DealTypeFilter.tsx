'use client';

const TYPES = [
  { value: 'all', label: 'All Deals' },
  { value: 'lifetime', label: '♾ Lifetime' },
  { value: 'trial', label: '🎁 Free Trial' },
  { value: 'free', label: '✅ Free Tier' },
  { value: 'discount', label: '🏷 Discount' }
];

interface Props {
  selected: string;
  onChange: (type: string) => void;
}

export function DealTypeFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === t.value
              ? 'bg-[#16a34a] text-white border-[#16a34a]'
              : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
