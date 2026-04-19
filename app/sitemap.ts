export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/app/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  return [
    {
      url: 'https://labelshaily.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...products.map((p) => ({
      url: `https://labelshaily.com/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
