import type { MetadataRoute } from 'next';
import { getAllDeals, getAllCategories } from '../lib/deals';

const BASE_URL = 'https://software-deal-board.vercel.app';
const LOCALES = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export default function sitemap(): MetadataRoute.Sitemap {
  const deals = getAllDeals();
  const categories = getAllCategories();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages per locale
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0
    });
    entries.push({
      url: `${BASE_URL}/${locale}/deals`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9
    });
    entries.push({
      url: `${BASE_URL}/${locale}/lifetime`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9
    });
    entries.push({
      url: `${BASE_URL}/${locale}/free-trials`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9
    });
    entries.push({
      url: `${BASE_URL}/${locale}/free-tiers`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9
    });
    entries.push({
      url: `${BASE_URL}/${locale}/expiring-soon`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.95
    });
    entries.push({
      url: `${BASE_URL}/${locale}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    });
    entries.push({
      url: `${BASE_URL}/${locale}/how-to-use`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    });
    entries.push({
      url: `${BASE_URL}/${locale}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    });
    entries.push({
      url: `${BASE_URL}/${locale}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    });

    // Deal pages
    for (const deal of deals) {
      entries.push({
        url: `${BASE_URL}/${locale}/deals/${deal.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8
      });
    }

    // Category pages
    for (const cat of categories) {
      entries.push({
        url: `${BASE_URL}/${locale}/categories/${cat.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8
      });
    }
  }

  return entries;
}
