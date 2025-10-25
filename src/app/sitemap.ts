import { MetadataRoute } from 'next';

const siteUrl = 'https://nextanalytics.store';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/careers',
    '/contact',
    '/privacy',
    '/refund-policy',
    '/terms',
    '/social',
    '/coming-soon',
    '/checkout?plan=basic',
    '/checkout?plan=professional',
  ];

  return staticPages.map((page) => ({
    url: `${siteUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '' ? 1 : 0.8,
  }));
}
