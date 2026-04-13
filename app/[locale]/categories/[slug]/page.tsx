import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getDealsByCategory, getAllCategories } from '../../../../lib/deals';
import { DealTable } from '../../../../components/DealTable';

export async function generateStaticParams() {
  const categories = getAllCategories();
  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  return locales.flatMap((locale) =>
    categories.map((cat) => ({ locale, slug: cat.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} Software Deals — Best ${category.name} Tools`,
    description: `${category.description}. Find the best ${category.name.toLowerCase()} software deals, lifetime licenses, and free trials.`
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const deals = getDealsByCategory(slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} Software Deals`,
    description: category.description,
    numberOfItems: deals.length,
    itemListElement: deals.map((deal, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: deal.name,
      url: `https://software-deal-board.vercel.app/${locale}/deals/${deal.slug}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href={`/${locale}`} className="hover:text-green-700">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/deals`} className="hover:text-green-700">Deals</Link>
          <span>/</span>
          <span className="text-[#052e16] font-medium">{category.name}</span>
        </nav>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl font-extrabold text-[#052e16]">{category.name} Deals</h1>
            <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
              {deals.length} deals
            </span>
          </div>
          <p className="text-gray-600">{category.description}</p>
        </div>

        <DealTable deals={deals} locale={locale} showFilter={true} />
      </div>
    </>
  );
}
