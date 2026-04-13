import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: '%s | SoftwareDealBoard',
    default: 'SoftwareDealBoard — Best Software Deals, Lifetime Offers & Free Trials'
  },
  description: 'Find the best software deals, lifetime licenses, free trials and discounts. Curated SaaS deals for developers, founders, and freelancers.',
  metadataBase: new URL('https://software-deal-board.vercel.app')
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
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
