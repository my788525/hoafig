import type { Metadata } from 'next';
import Link from 'next/link';
import SelectiveEnforcementAnalyzer from '@/components/calculators/SelectiveEnforcementAnalyzer';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Violation Notice & Selective Enforcement Forensics Analyzer (2026)',
  description:
    'Score HOA violation notice voidability (0-100), audit independent fining committee compliance, document unpenalized neighbors, and export a hearing brief & .ics deadline.',
  alternates: { canonical: '/calculators/selective-enforcement-analyzer/' },
};

const FAQS = [
  {
    q: 'What is selective enforcement in an HOA?',
    a: 'Selective enforcement occurs when an HOA board or management company penalizes one homeowner for a rule or CC&R violation while knowingly ignoring identical, open violations by other homeowners in the same community.',
  },
  {
    q: 'How many unpenalized neighbors do I need to prove selective enforcement?',
    a: 'While even 1–2 comparators show disparate treatment, documenting 3 to 8+ unpenalized homes with timestamped photos and lot addresses creates strong evidentiary leverage for waiver, abandonment, or arbitrary-enforcement defenses.',
  },
  {
    q: 'Can an HOA fine be voided for procedural defects alone?',
    a: 'Yes. Across states like California, Florida, Texas, Colorado, and Nevada, failure to provide the statutory notice/cure window, certified mail where required, or an independent fining committee hearing can render the fine procedurally void.',
  },
];

export default function SelectiveEnforcementPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: 'HOA Violation Notice & Selective Enforcement Forensics Analyzer',
          description:
            'Audit HOA violation notices for procedural voidability, independent fining committee defects, and selective enforcement across 51 U.S. jurisdictions.',
          url: '/calculators/selective-enforcement-analyzer/',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' },
          { name: 'Selective Enforcement Analyzer', url: '/calculators/selective-enforcement-analyzer/' },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/calculators/" className="hover:text-[#0f2747]">Calculators</Link>
          <span>/</span>
          <span className="text-[#0f2747]">Selective Enforcement Analyzer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          HOA Violation Notice &amp; Selective Enforcement Forensics Analyzer
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Score your violation notice for procedural voidability (0–100), benchmark unpenalized neighbor comparators, generate a 5-point photo &amp; witness checklist, and export a printable Hearing Defense Brief plus calendar deadline.
        </p>
      </div>

      <SelectiveEnforcementAnalyzer />

      <section className="brief-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Frequently Asked Questions: HOA Selective Enforcement
        </h2>
        <div className="divide-y divide-slate-200">
          {FAQS.map((item) => (
            <div key={item.q} className="py-4 space-y-1.5">
              <h3 className="text-sm font-extrabold text-[#0f2747]">{item.q}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
