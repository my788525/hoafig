import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Statutory Compliance Calculators & Auditors (2026)',
  description:
    'Six executive HOA compliance calculators for auditing violation fines, special assessments, late-fee stacking, selective enforcement, and solar/EV/OTARD ARC denials.',
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
    <div className="container-exec py-10 space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' }
        ])}
      />
      <div className="space-y-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          51-Jurisdiction Interactive Workbenches
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          HOA Compliance Calculators &amp; Auditors
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Select a statutory workbench below to audit your HOA notice, financial ledger, or architectural denial. Every calculator runs 100% locally in your browser with zero cloud upload and generates a printable Board Hearing Brief citing your exact 2026 state code.
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

      <section className="brief-card p-6 sm:p-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          How to Choose the Right HOA Compliance Workbench
        </h2>
        <p>
          Community association disputes rarely involve a single isolated issue. A routine exterior maintenance letter often escalates into daily accrued fines, compounded administrative late fees, and an improper payment-waterfall allocation that makes your regular monthly assessments appear delinquent. Using the right diagnostic tool prevents you from conceding leverage before your board hearing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <h3 className="font-extrabold text-[#0f2747]">1. Violation Fines &amp; Hearing Deadlines</h3>
            <p className="text-sm text-slate-600">
              Start with the <strong>HOA Fine Compliance &amp; Statutory Cap Checker</strong> if you received a monetary penalty or daily fine notice. It cross-checks per-violation caps, aggregate ceilings, mandatory advance notice days, cure windows, and independent fining committee rules. If your notice lacks specific covenant citations or neighbors have identical unpenalized conditions, pair it with the <strong>Selective Enforcement Analyzer</strong> to build a neighbor-comparator log and download an <code className="bg-slate-100 px-1 rounded text-xs">.ics</code> hearing deadline reminder.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-[#0f2747]">2. Ledgers, Late Fees, &amp; Special Assessments</h3>
            <p className="text-sm text-slate-600">
              Use the <strong>HOA Late Fee &amp; Payment Priority Auditor</strong> whenever your account statement shows interest, collection charges, or late fees stacked onto a disputed fine, or when your regular dues payment was diverted to pay off a contested penalty. For sudden capital calls—such as roof replacements, structural milestone inspections, or paving shortfalls—run the <strong>Special Assessment &amp; Reserve Shortfall Estimator</strong> to verify percent-funded ratios and statutory member-vote thresholds.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-[#0f2747]">3. Solar, EV Chargers, &amp; CC&amp;R Preemption</h3>
            <p className="text-sm text-slate-600">
              When an Architectural Review Committee (ARC) rejects rooftop solar panels, Level 2 EV charging stations, satellite dishes, fixed wireless antennas, drought-tolerant landscaping, or clotheslines, recorded CC&amp;Rs are frequently overridden by higher law. Run the <strong>ARC Solar, EV &amp; OTARD Override Checker</strong> or the <strong>CC&amp;R Preemption Checker</strong> to identify binding federal FCC regulations and state Right-to-Charge statutes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-[#0f2747]">4. Full-Dispute Guided Triage</h3>
            <p className="text-sm text-slate-600">
              Not sure which statute applies first? Launch our{' '}
              <Link href="/wizard/" className="text-[#0f2747] font-bold underline">
                HOA Dispute Triage Wizard
              </Link>{' '}
              to walk through your notice date, state code, and dispute branch in under three minutes, or review our{' '}
              <Link href="/methodology/" className="text-[#0f2747] font-bold underline">
                Statutory Audit Methodology
              </Link>{' '}
              to see how every calculation is verified against primary 2026 state codes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
