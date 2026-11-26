import type { Metadata } from 'next';
import Link from 'next/link';
import LateFeeAuditorClient from './LateFeeAuditorClient';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Late Fee & Payment Priority Auditor (2026)',
  description:
    'Check whether your HOA illegally stacked late fees or interest onto fines, or misapplied your monthly dues payment to fines first under state payment-waterfall statutes.',
  alternates: { canonical: '/calculators/hoa-late-fee-auditor/' }
};

export default function LateFeeAuditorPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: 'HOA Late Fee & Payment Priority Auditor',
          description: 'Audit HOA ledger fee stacking and payment-priority waterfall compliance across 51 U.S. jurisdictions.',
          url: '/calculators/hoa-late-fee-auditor/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' },
          { name: 'Late Fee Auditor', url: '/calculators/hoa-late-fee-auditor/' }
        ])}
      />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/calculators/" className="hover:text-[#0f2747]">Calculators</Link>
          <span>/</span>
          <span className="text-[#0f2747]">Late Fee &amp; Payment Priority Auditor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          HOA Late Fee &amp; Payment Priority Auditor
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Verify whether your association illegally compounded late fees or interest onto disputed fines, or misapplied your regular monthly assessment payment toward fines first.
        </p>
      </div>

      <LateFeeAuditorClient />
    </div>
  );
}
