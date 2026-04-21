import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import type { Metadata } from 'next';
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = 'https://software-deal-board.vercel.app';
const LOCALES = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | SoftwareDealBoard',
    default: 'Best Software Deals & SaaS Discounts | SoftwareDealBoard'
  },
  description: 'Find the best software deals, lifetime licenses, and SaaS discounts for developers and businesses. Updated daily with new offers.',
  keywords: [
    'software deals',
    'SaaS discount',
    'lifetime software license',
    'developer tools deals',
    'software coupon',
    'AppSumo deals',
    'software promo code',
    'cheap software'
  ],
  openGraph: {
    type: 'website',
    siteName: 'SoftwareDealBoard',
    title: 'Best Software Deals & SaaS Discounts | SoftwareDealBoard',
    description: 'Find the best software deals, lifetime licenses, and SaaS discounts for developers and businesses. Updated daily with new offers.',
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'SoftwareDealBoard — Best Software Deals & SaaS Discounts'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Software Deals & SaaS Discounts | SoftwareDealBoard',
    description: 'Find the best software deals, lifetime licenses, and SaaS discounts for developers and businesses. Updated daily with new offers.',
    images: [`${BASE_URL}/og-image.png`]
  },
  alternates: {
    canonical: BASE_URL,
    languages: Object.fromEntries(
      LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}`])
    )
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021'
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar locale={locale} />
      <main className="flex-1">
        {children}
      </main>
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="SoftwareDealBoard" />
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
