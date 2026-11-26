import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Editorial Policy & Statutory Verification Standards',
  description:
    'How HOAFig.com researches, cites, audits, and updates 51-state HOA statutory data, case studies, and homeowner defense guides.',
  alternates: { canonical: '/editorial-policy/' }
};

export default function EditorialPolicyPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Editorial Policy', url: '/editorial-policy/' }
        ])}
      />
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          Editorial Governance
        </span>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">
          Editorial Policy &amp; Statutory Verification Standards
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          Effective Date: November 2026 · HOAFig Statutory Research Team
        </p>
      </div>

      <div className="brief-card p-6 sm:p-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">1. Primary-Source Statutory Citation Mandate</h2>
          <p>
            HOAFig.com maintains strict editorial standards designed to ensure that every statutory threshold, fine cap, cure window, and preemption rule published on the site is traceable to enacted primary law. Our researchers do not rely on secondary blog summaries or unverified forum posts when encoding calculator logic. Every jurisdiction entry in our 51-state matrix is anchored to official state legislature codes (such as Florida Statutes Chapters 718 and 720, the California Davis-Stirling Common Interest Development Act, Texas Property Code Chapter 209, Colorado CCIOA, and Nevada NRS Chapter 116) as well as codified federal regulations including 47 C.F.R. § 1.4000.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">2. Separation of Editorial Analysis &amp; Monetization</h2>
          <p>
            Our editorial content, statutory calculators, and state compliance ratings are produced independently of advertising and digital product sales. HOAFig.com displays Google AdSense advertisements and offers optional All-Access Matrix Pass defense kits to fund ongoing statutory research and keep our core calculators free for every U.S. homeowner. Advertisers do not influence how we score HOA violation notices, interpret statutory caps, or rank procedural defenses. All sponsored or commercial offerings are clearly labeled and separated from statutory analysis.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">3. Multi-Stage Review &amp; Legislative Monitoring</h2>
          <p>
            Before any new calculator formula, defense guide, or forensic case study is published, it undergoes a three-stage internal review:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Statutory Text Verification:</strong> Confirming exact section numbers, effective dates, and statutory exceptions (e.g., health-and-safety carve-outs versus standard covenant violations).
            </li>
            <li>
              <strong>Mathematical &amp; Edge-Case Auditing:</strong> Testing boundary conditions in our TypeScript engines—such as daily accrual caps, aggregate maximums, and payment-priority waterfalls—against real-world ledger scenarios.
            </li>
            <li>
              <strong>Plain-Language Clarity Review:</strong> Ensuring that complex statutory rules are explained clearly for homeowners preparing for a 5-to-15 minute board hearing without sacrificing legal precision.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">4. Corrections, Updates, &amp; Version Transparency</h2>
          <p>
            State HOA laws evolve rapidly. When a state legislature enacts a new statutory cap, amends mandatory cure periods, or expands solar and EV Right-to-Charge protections, we log the change in our{' '}
            <Link href="/changelog/" className="text-[#0f2747] font-bold underline">
              2026 Statutory Changelog
            </Link>{' '}
            and update the corresponding state dossier and calculator rules. If a reader, attorney, or board member identifies an error or newly enacted amendment, we investigate the primary legislative text within 72 hours and publish a dated correction. You can submit statutory updates anytime on our{' '}
            <Link href="/contact/" className="text-[#0f2747] font-bold underline">
              Contact &amp; Corrections
            </Link>{' '}
            page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">5. Case Study &amp; Anonymization Standards</h2>
          <p>
            Our{' '}
            <Link href="/cases/" className="text-[#0f2747] font-bold underline">
              Real-Ledger Case Studies
            </Link>{' '}
            illustrate how statutory caps, independent fining committee rules, and ledger waterfall protections operate in practice. All homeowner names, street addresses, parcel numbers, and association identifiers are redacted or anonymized to protect privacy while preserving exact dollar figures, notice timelines, and statutory citations.
          </p>
        </section>
      </div>
    </div>
  );
}
