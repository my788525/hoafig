import type { Metadata } from 'next';
import Link from 'next/link';
import { HOA_CASES } from '@/data/cases';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Real-Ledger HOA Fine Defense Case Studies (2026)',
  description:
    'Line-by-line ledger audits showing how Florida ($2,400), California ($350 + late fees), and Texas ($875) HOA fines were voided under state law.',
  alternates: { canonical: '/cases/' }
};

export default function CasesIndexPage() {
  return (
    <div className="container-exec py-10 space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Case Studies', url: '/cases/' }
        ])}
      />

      <div className="space-y-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          Forensic Ledger Audits
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          Real-Ledger HOA Statutory Defense Case Studies
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Forensic breakdowns of actual HOA violation ledgers audited against state statutory caps, independent committee rules, payment-waterfall protections, and certified-mail mandates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HOA_CASES.map((c) => (
          <Link
            key={c.slug}
            href={`/cases/${c.slug}/`}
            className="brief-card p-6 hover:border-[#0f2747] transition flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0f2747]/10 text-[#0f2747] font-bold">
                  {c.stateName}
                </span>
                <span className="font-mono font-bold text-[#059669]">{c.finalOutcome}</span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0f2747] leading-snug">{c.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{c.summary}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500">{c.statuteCited}</span>
              <span className="font-extrabold text-[#0f2747]">Read Audit →</span>
            </div>
          </Link>
        ))}
      </div>

      <section className="brief-card p-6 sm:p-8 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          What Forensic Ledger Audits Reveal About HOA Enforcement
        </h2>
        <p>
          When homeowners inspect a four-figure HOA balance sheet line by line, the underlying violation is rarely the largest component of the demand. Instead, inflated ledgers are typically built from three recurring statutory errors: (1) exceeding state per-violation or aggregate fine caps; (2) skipping mandatory procedural steps such as certified-mail notice, cure windows, or an independent 3-member fining committee hearing; and (3) stacking unauthorized late fees, interest, or collection charges onto contested fines.
        </p>
        <p>
          In each anonymized case study above, we walk through the exact ledger entries, the date-stamped notice timeline, the governing state statute (such as <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">Fla. Stat. § 720.305</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">Cal. Civ. Code § 5850</code>, and <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">Tex. Prop. Code § 209.006</code>), and the exact statutory objection that forced a zero-dollar write-off.
        </p>
        <p>
          To audit your own statement using the same forensic rules, open our{' '}
          <Link href="/calculators/hoa-late-fee-auditor/" className="text-[#0f2747] font-bold underline">
            Late Fee &amp; Payment Priority Auditor
          </Link>{' '}
          or{' '}
          <Link href="/calculators/hoa-fine-compliance/" className="text-[#0f2747] font-bold underline">
            HOA Fine Compliance Checker
          </Link>
          . All case studies are anonymized under our{' '}
          <Link href="/editorial-policy/" className="text-[#0f2747] font-bold underline">
            Editorial Policy
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
