import type { MetadataRoute } from 'next';
import { HOA_STATUTES_2026 } from '@/data/hoa_statutes_2026';
import { HOA_CASES } from '@/data/cases';
import { HOA_GUIDES } from '@/data/guides';

export const dynamic = 'force-static';

const BASE = 'https://hoafig.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/calculators/',
    '/calculators/hoa-fine-compliance/',
    '/calculators/special-assessment-calculator/',
    '/calculators/hoa-late-fee-auditor/',
    '/calculators/arc-override-checker/',
    '/states/',
    '/cases/',
    '/guides/',
    '/statutes/',
    '/methodology/',
    '/changelog/',
    '/about/',
    '/contact/',
    '/privacy/',
    '/terms/'
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: BASE + (r || '/'),
    lastModified: '2026-11-01',
    changeFrequency: r === '' ? 'daily' : r.startsWith('/calculators/') ? 'weekly' : 'monthly',
    priority: r === '' ? 1.0 : r.startsWith('/calculators/') ? 0.9 : 0.8
  }));

  const stateRoutes: MetadataRoute.Sitemap = HOA_STATUTES_2026.map((s) => ({
    url: `${BASE}/states/${s.slug}/`,
    lastModified: '2026-11-01',
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  const caseRoutes: MetadataRoute.Sitemap = HOA_CASES.map((c) => ({
    url: `${BASE}/cases/${c.slug}/`,
    lastModified: '2026-11-01',
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const guideRoutes: MetadataRoute.Sitemap = HOA_GUIDES.map((g) => ({
    url: `${BASE}/guides/${g.slug}/`,
    lastModified: g.updated,
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  return [...routes, ...stateRoutes, ...caseRoutes, ...guideRoutes];
}
