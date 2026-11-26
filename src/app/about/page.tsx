import type { Metadata } from 'next';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About HOAFig — Homeowner Statutory Defense Platform',
  description: 'About HOAFig.com, our 51-state statutory research standards, and privacy-first in-browser compliance architecture.',
  alternates: { canonical: '/about/' }
};

export default function AboutPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about/' }
        ])}
      />
      <h1 className="text-3xl font-extrabold text-[#0f2747]">About HOAFig.com</h1>
      <div className="brief-card p-6 sm:p-8 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
        <p>
          HOAFig.com was built to give U.S. homeowners institutional-grade statutory clarity when facing HOA violation fines, special assessments, improper late-fee stacking, or architectural review denials.
        </p>
        <p>
          All calculations and Hearing Brief compilations execute 100% inside your browser. Your violation amounts, dues ledgers, and property details are never uploaded to our servers.
        </p>
      </div>
    </div>
  );
}
