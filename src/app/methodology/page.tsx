import type { Metadata } from 'next';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Statutory Audit Methodology & Data Verification',
  description:
    'How HOAFig verifies 51-state HOA fining caps, cure periods, independent committee mandates, and reserve assessment rules against primary .gov codes.',
  alternates: { canonical: '/methodology/' }
};

export default function MethodologyPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Methodology', url: '/methodology/' }
        ])}
      />
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Statutory Audit Methodology</h1>
      <div className="brief-card p-6 sm:p-8 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
        <p>
          Every statutory threshold, fine cap, cure window, and payment-priority rule on HOAFig.com is traced directly to enacted state statutes (e.g., California Davis-Stirling Act, Florida Chapters 718/720, Texas Property Code Chapter 209, Colorado CCIOA, Nevada NRS 116) and Federal FCC OTARD regulations (47 C.F.R. § 1.4000).
        </p>
        <h2 className="text-lg font-extrabold text-[#0f2747] pt-2">1. Four-Layer Compliance Engine</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Layer 1 — Quantitative Fine Caps:</strong> Evaluates per-violation, daily accrual, and aggregate caps.</li>
          <li><strong>Layer 2 — Procedural Due Process:</strong> Checks advance written notice, mandatory cure periods, certified mail mandates, and independent committee composition.</li>
          <li><strong>Layer 3 — Ledger &amp; Waterfall Integrity:</strong> Audits late-fee/interest compounding on disputed fines and assessment-first payment allocation.</li>
          <li><strong>Layer 4 — Federal &amp; State Preemption:</strong> Tests ARC denials against FCC OTARD and state Solar/EV Right-to-Charge laws.</li>
        </ul>
      </div>
    </div>
  );
}
