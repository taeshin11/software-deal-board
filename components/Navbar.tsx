import Link from 'next/link';

interface NavbarProps {
  locale: string;
}

const LOCALES = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const LOCALE_LABELS: Record<string, string> = {
  en: 'EN', ko: 'KO', ja: 'JA', zh: 'ZH', es: 'ES', fr: 'FR', de: 'DE', pt: 'PT'
};

export function Navbar({ locale }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-green-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl">💸</span>
          <span className="font-extrabold text-[#052e16] text-lg">SoftwareDealBoard</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 overflow-x-auto flex-1">
          <Link href={`/${locale}/deals`} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-[#16a34a] hover:bg-green-50 rounded-lg transition-colors whitespace-nowrap">
            All Deals
          </Link>
          <Link href={`/${locale}/lifetime`} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-[#16a34a] hover:bg-green-50 rounded-lg transition-colors whitespace-nowrap">
            ♾ Lifetime
          </Link>
          <Link href={`/${locale}/free-trials`} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-[#16a34a] hover:bg-green-50 rounded-lg transition-colors whitespace-nowrap">
            🎁 Free Trials
          </Link>
          <Link href={`/${locale}/free-tiers`} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-[#16a34a] hover:bg-green-50 rounded-lg transition-colors whitespace-nowrap">
            ✅ Free Tiers
          </Link>
          <Link href={`/${locale}/expiring-soon`} className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap">
            🔥 Expiring Soon
          </Link>
        </div>

        {/* Locale switcher */}
        <div className="ml-auto flex-shrink-0">
          <select
            defaultValue={locale}
            onChange={(e) => {
              if (typeof window !== 'undefined') {
                window.location.href = `/${e.target.value}`;
              }
            }}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-600 focus:outline-none focus:border-green-400"
          >
            {LOCALES.map((l) => (
              <option key={l} value={l}>{LOCALE_LABELS[l]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-green-50 px-4 py-2 flex gap-2 overflow-x-auto">
        <Link href={`/${locale}/deals`} className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded-full whitespace-nowrap">All</Link>
        <Link href={`/${locale}/lifetime`} className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded-full whitespace-nowrap">Lifetime</Link>
        <Link href={`/${locale}/free-trials`} className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full whitespace-nowrap">Free Trials</Link>
        <Link href={`/${locale}/free-tiers`} className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full whitespace-nowrap">Free Tiers</Link>
        <Link href={`/${locale}/expiring-soon`} className="px-2 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-full whitespace-nowrap">🔥 Expiring</Link>
      </div>
    </nav>
  );
}
