import type { Metadata } from 'next';
import Link from 'next/link';
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
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          51-State Compliance Engine
        </span>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Statutory Audit Methodology</h1>
      </div>

      <div className="brief-card p-6 sm:p-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
        <p>
          Every statutory threshold, fine cap, cure window, and payment-priority rule on HOAFig.com is traced directly to enacted state statutes—including the California Davis-Stirling Act (Cal. Civ. Code § 5850 et seq.), Florida Chapters 718 and 720, Texas Property Code Chapter 209, Colorado Common Interest Ownership Act (CCIOA), and Nevada NRS Chapter 116—as well as Federal FCC OTARD regulations (47 C.F.R. § 1.4000). Rather than relying on generalized averages, our engine evaluates homeowner disputes against the exact procedural sequence required by law.
        </p>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">1. Four-Layer Compliance Engine</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Layer 1 — Quantitative Fine Caps:</strong> Evaluates per-violation fines, daily accrual rates, and aggregate statutory caps (for example, $100 per violation / $1,000 aggregate cap in Florida unless governing documents expressly provide otherwise, or $100 non-health/safety caps in California under AB 130).
            </li>
            <li>
              <strong>Layer 2 — Procedural Due Process:</strong> Checks advance written notice, mandatory cure periods, certified-mail delivery mandates (such as Tex. Prop. Code § 209.006), and independent fining committee firewalls prohibiting board members or management-affiliated persons from sitting on the fining panel.
            </li>
            <li>
              <strong>Layer 3 — Ledger &amp; Waterfall Integrity:</strong> Audits late-fee and interest compounding on disputed fines and flags payment-waterfall violations where an association misapplies regular monthly assessment payments toward contested violation fines to manufacture artificial delinquency.
            </li>
            <li>
              <strong>Layer 4 — Federal &amp; State Preemption:</strong> Tests Architectural Review Committee (ARC) denials against federal FCC OTARD satellite/antenna protections, the Freedom to Display the American Flag Act, and state Solar Access, EV Right-to-Charge, Xeriscaping, and Right-to-Dry statutes.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">2. Reserve Shortfall &amp; Special Assessment Modeling</h2>
          <p>
            Our Special Assessment &amp; Reserve Estimator calculates per-unit cost exposure using unit-share or equal-allocation formulas, compares current reserve balances against fully funded study targets to derive the Percent-Funded Ratio, and tests whether a proposed assessment or dues increase triggers mandatory homeowner-vote thresholds under state law (such as California&apos;s 5% special assessment and 20% regular assessment caps under Cal. Civ. Code § 5605).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">3. Voidability Scoring &amp; Evidentiary Checklists</h2>
          <p>
            In our Selective Enforcement and Dispute Wizard tools, procedural defects are weighted on a 0–100 voidability scale. Missing statutory notice elements, denied cure windows, conflicted fining committees, and documented unpenalized neighbor comparators are combined into a structured Board Hearing Brief ready for certified-mail submission. For full verification rules, see our{' '}
            <Link href="/editorial-policy/" className="text-[#0f2747] font-bold underline">
              Editorial Policy
            </Link>{' '}
            and{' '}
            <Link href="/statutes/" className="text-[#0f2747] font-bold underline">
              2026 Master Statute Matrix
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
