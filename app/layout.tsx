import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoftwareDealBoard — Best Software Deals, Lifetime Offers & Free Trials",
  description: "Find the best software deals, lifetime licenses, free trials and discounts. Curated SaaS deals for developers, founders, and freelancers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#f0fdf4]">{children}</body>
    </html>
  );
}
