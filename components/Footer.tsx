import Link from 'next/link';

interface FooterProps {
  locale: string;
  visitorsToday?: number;
  visitorsTotal?: number;
}

export function Footer({ locale, visitorsToday = 0, visitorsTotal = 0 }: FooterProps) {
  return (
    <footer className="bg-[#052e16] text-green-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💸</span>
              <span className="font-extrabold text-white text-lg">SoftwareDealBoard</span>
            </div>
            <p className="text-sm text-green-300">Curating the best software deals since 2025. Find lifetime deals, free trials, and discounted SaaS tools.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Browse Deals</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/lifetime`} className="hover:text-white transition-colors">Lifetime Deals</Link></li>
              <li><Link href={`/${locale}/free-trials`} className="hover:text-white transition-colors">Free Trials</Link></li>
              <li><Link href={`/${locale}/free-tiers`} className="hover:text-white transition-colors">Free Tiers</Link></li>
              <li><Link href={`/${locale}/expiring-soon`} className="hover:text-white transition-colors">🔥 Expiring Soon</Link></li>
              <li><Link href={`/${locale}/deals`} className="hover:text-white transition-colors">All Deals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/categories/design`} className="hover:text-white transition-colors">Design</Link></li>
              <li><Link href={`/${locale}/categories/development`} className="hover:text-white transition-colors">Development</Link></li>
              <li><Link href={`/${locale}/categories/productivity`} className="hover:text-white transition-colors">Productivity</Link></li>
              <li><Link href={`/${locale}/categories/marketing`} className="hover:text-white transition-colors">Marketing</Link></li>
              <li><Link href={`/${locale}/categories/ai-ml`} className="hover:text-white transition-colors">AI/ML</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-green-400">
            © {new Date().getFullYear()} SoftwareDealBoard. All rights reserved.
          </p>
          {(visitorsToday > 0 || visitorsTotal > 0) && (
            <p className="text-xs text-green-400">
              Today: {visitorsToday.toLocaleString()} · Total: {visitorsTotal.toLocaleString()} visitors
            </p>
          )}
          <p className="text-xs text-green-500 text-center">
            Prices subject to change. Some links are affiliate links. Verify on vendor site before purchasing.
          </p>
        </div>
      </div>
    </footer>
  );
}
