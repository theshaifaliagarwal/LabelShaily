import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://labelshaily.com'),
  title: {
    default: 'LabelShaily — Handcrafted Candles',
    template: '%s | LabelShaily',
  },
  description: 'Shop premium handcrafted candles made from natural soy, coconut & beeswax with curated fragrances. Hand-poured in small batches. Free delivery across India.',
  keywords: [
    'handcrafted candles', 'scented candles India', 'soy wax candles', 'natural candles',
    'luxury candles online', 'aromatic candles', 'candle gift set', 'LabelShaily',
    'gel wax candles', 'beeswax candles', 'home fragrance India',
  ],
  openGraph: {
    siteName: 'LabelShaily',
    type: 'website',
    locale: 'en_IN',
    url: 'https://labelshaily.com',
    title: 'LabelShaily — Handcrafted Candles',
    description: 'Premium handcrafted candles made from natural soy, coconut & beeswax. Shop online from LabelShaily.',
    images: [{ url: '/logo.jpeg', width: 400, height: 400, alt: 'LabelShaily — Handcrafted Candles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LabelShaily — Handcrafted Candles',
    description: 'Premium handcrafted candles made from natural soy, coconut & beeswax. Shop online.',
    images: ['/logo.jpeg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/jpeg" href="/logo.jpeg" />
        <link rel="shortcut icon" type="image/jpeg" href="/logo.jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
