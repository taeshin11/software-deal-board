export type DealType = 'lifetime' | 'trial' | 'free' | 'discount';

export interface Deal {
  id: string;
  name: string;
  slug: string;
  category: string;
  dealType: DealType;
  originalPrice: number;
  dealPrice: number;
  savings: number;
  expiresDate: string | null;
  dealUrl: string;
  description: string;
  rating: number;
  users: number;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  url: string;
  description: string;
  dealCount: number;
}
