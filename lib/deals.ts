import type { Deal, Category, Provider } from './types';
import dealsData from '../data/deals-fallback.json';
import categoriesData from '../data/categories-fallback.json';
import providersData from '../data/providers-fallback.json';

export function getAllDeals(): Deal[] {
  return dealsData as Deal[];
}

export function getDealBySlug(slug: string): Deal | undefined {
  return dealsData.find((d) => d.slug === slug) as Deal | undefined;
}

export function getDealsByCategory(category: string): Deal[] {
  return (dealsData as Deal[]).filter(
    (d) => d.category.toLowerCase() === category.toLowerCase() ||
           d.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === category.toLowerCase() ||
           d.category.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-') === category.toLowerCase()
  );
}

export function getDealsByType(type: string): Deal[] {
  return (dealsData as Deal[]).filter((d) => d.dealType === type);
}

export function getExpiringDeals(days = 7): Deal[] {
  const now = Date.now();
  const cutoff = now + days * 24 * 60 * 60 * 1000;
  return (dealsData as Deal[])
    .filter((d) => d.expiresDate !== null && new Date(d.expiresDate).getTime() > now && new Date(d.expiresDate).getTime() <= cutoff)
    .sort((a, b) => new Date(a.expiresDate!).getTime() - new Date(b.expiresDate!).getTime());
}

export function getFeaturedDeals(count = 3): Deal[] {
  return (dealsData as Deal[])
    .filter((d) => d.dealType === 'lifetime' || d.savings > 100)
    .slice(0, count);
}

export function getAllCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.slug === slug);
}

export function getAllProviders(): Provider[] {
  return providersData as Provider[];
}

export function getSavingsPercent(deal: Deal): number {
  if (deal.originalPrice === 0) return 0;
  return Math.round((deal.savings / deal.originalPrice) * 100);
}

export function isExpiringSoon(deal: Deal, days = 7): boolean {
  if (!deal.expiresDate) return false;
  const now = Date.now();
  const expires = new Date(deal.expiresDate).getTime();
  return expires > now && expires <= now + days * 24 * 60 * 60 * 1000;
}

export function formatPrice(price: number): string {
  if (price === 0) return 'Free';
  return `$${price.toFixed(2).replace('.00', '')}`;
}

export function formatUsers(users: number): string {
  if (users >= 1000000) return `${(users / 1000000).toFixed(1)}M+`;
  if (users >= 1000) return `${(users / 1000).toFixed(0)}K+`;
  return users.toString();
}
