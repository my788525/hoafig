import React from 'react';

const BASE = 'https://hoafig.com';

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HOAFig',
    url: BASE,
    logo: `${BASE}/favicon.svg`,
    description:
      'Institutional-grade US HOA Fine Compliance, Special Assessment & Board Hearing Defense Platform covering all 50 states and D.C.'
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HOAFig',
    url: BASE,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE}/states/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function webApplicationJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    description: opts.description,
    url: `${BASE}${opts.url}`,
    applicationCategory: opts.category || 'Legal & Financial Compliance Utility',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export function datasetJsonLd(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: opts.name,
    description: opts.description,
    url: `${BASE}${opts.url}`,
    license: 'https://hoafig.com/terms/',
    creator: {
      '@type': 'Organization',
      name: 'HOAFig'
    },
    temporalCoverage: '2026',
    spatialCoverage: {
      '@type': 'Country',
      name: 'United States'
    }
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE}${item.url}`
    }))
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };
}
