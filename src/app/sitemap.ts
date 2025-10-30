import { MetadataRoute } from 'next';

const siteUrl = 'https://nextanalytics.store';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/blog',
    '/careers',
    '/checkout?plan=basic',
    '/checkout?plan=professional',
    '/coming-soon',
    '/contact',
    '/lost-form',
    '/privacy',
    '/refund-policy',
    '/shipping-policy',
    '/social',
    '/terms',
  ];

  return staticPages.map((page) => ({
    url: `${siteUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '' ? 1 : 0.8,
  }));
}
