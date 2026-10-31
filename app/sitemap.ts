import type { MetadataRoute } from 'next';
import { projects, site } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/expertise', ...projects.map(p => `/work/${p.slug}`), '/GamingCareer'].map(path => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
