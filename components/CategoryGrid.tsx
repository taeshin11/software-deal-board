import Link from 'next/link';
import type { Category } from '../lib/types';

export function CategoryGrid({ categories, locale }: { categories: Category[]; locale: string }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/${locale}/categories/${cat.slug}`}
          className="flex flex-col items-center gap-2 bg-white rounded-xl border border-green-100 p-4 hover:border-green-400 hover:shadow-sm transition-all text-center group"
        >
          <span className="text-3xl">{cat.icon}</span>
          <span className="text-sm font-semibold text-[#052e16] group-hover:text-[#16a34a] transition-colors">{cat.name}</span>
          <span className="text-xs text-gray-400">{cat.count} deals</span>
        </Link>
      ))}
    </div>
  );
}
