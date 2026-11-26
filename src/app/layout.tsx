import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Source_Serif_4 } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { JsonLd, organizationJsonLd, webSiteJsonLd } from '@/components/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif'
});

const siteUrl = 'https://hoafig.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HOAFig — U.S. HOA Fine Compliance, Special Assessment & Hearing Defense',
    template: '%s | HOAFig'
  },
  description:
    'Audit HOA fines, daily penalties, late-fee stacking, special assessments, and solar/EV ARC denials against 2026 state statutory caps across all 50 U.S. states and D.C. Generate printable board hearing briefs and certified-mail records demands.',
  keywords: [
    'HOA fine calculator',
    'fight HOA fine',
    'HOA fine statutory cap',
    'HOA special assessment calculator',
    'HOA late fee auditor',
    'HOA solar override law',
    'HOA EV charger right to charge',
    'Fla. Stat. 720.305',
    'Cal. Civ. Code 5850',
    'Tex. Prop. Code 209.006'
  ],
  authors: [{ name: 'HOAFig Statutory Research Team' }],
  creator: 'HOAFig',
  publisher: 'HOAFig',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }]
  },
  other: {
    'theme-color': '#0f2747'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'HOAFig'
  },
  twitter: {
    card: 'summary_large_image'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <head>
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (window.top !== window.self) { try { window.top.location = window.self.location; } catch (e) { window.location.href = "https://hoafig.com/"; } }`
          }}
        />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM RAG Stream" />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Script src="https://mail.lianu.com/matrix-analytics.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
