import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Statutory Compliance Calculators & Auditors (2026)',
  description:
    'Four executive HOA compliance calculators for auditing violation fines, special assessments, late-fee stacking, and solar/EV/OTARD ARC denials.',
  alternates: { canonical: '/calculators/' }
};

const TOOLS = [
  {
    href: '/calculators/hoa-fine-compliance/',
    title: 'HOA Fine Compliance & Statutory Cap Checker',
    desc: 'Checks fine amount, daily accrual, late fees/interest, notice & cure days, and independent fining committee requirements against 51 state codes.',
    badge: 'Most Popular'
  },
  {
    href: '/calculators/special-assessment-calculator/',
    title: 'Special Assessment & Reserve Shortfall Estimator',
    desc: 'Computes per-unit special assessment exposure, reserve percent-funded ratio, monthly dues spike, and state member-vote triggers.',
    badge: 'Reserve Study'
  },
  {
    href: '/calculators/hoa-late-fee-auditor/',
    title: 'HOA Late Fee & Payment Priority Auditor',
    desc: 'Audits illegal fee/interest stacking on fines and payment-waterfall violations where dues are misapplied to fines first.',
    badge: 'Ledger Audit'
  },
  {
    href: '/calculators/arc-override-checker/',
    title: 'ARC Solar, EV Charger & FCC OTARD Override Checker',
    desc: 'Checks federal FCC OTARD (47 C.F.R. § 1.4000) and state Solar Access / EV Right-to-Charge preemption.',
    badge: 'Federal + State'
  },
  {
    href: '/calculators/selective-enforcement-analyzer/',
    title: 'HOA Violation Notice & Selective Enforcement Analyzer',
    desc: 'Scores procedural voidability (0–100), unpenalized neighbor comparators, and generates a 5-point evidentiary checklist & .ics deadline.',
    badge: 'Forensics'
  },
  {
    href: '/calculators/ccr-preemption-checker/',
    title: 'HOA CC&R vs. State & Federal Law Override Checker',
    desc: 'Checks FCC OTARD, U.S. Flag Act, Solar, EV, Xeriscaping, and Right-to-Dry preemption across all 51 jurisdictions.',
    badge: 'Preemption'
  }
];

export default function CalculatorsIndexPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' }
        ])}
      />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          HOA Compliance Calculators &amp; Auditors
        </h1>
        <p className="text-slate-600 max-w-2xl text-sm sm:text-base">
          Select a statutory workbench below. All calculations run 100% in-browser with printable Board Hearing Briefs and Certified Mail templates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="brief-card p-6 hover:border-[#0f2747] transition flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0f2747]/10 text-[#0f2747]">
                {t.badge}
              </span>
              <h2 className="text-xl font-extrabold text-[#0f2747]">{t.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{t.desc}</p>
            </div>
            <div className="text-xs font-extrabold text-[#059669]">Open Workbench →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
