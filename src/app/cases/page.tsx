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
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Case Studies', url: '/cases/' }
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          Real-Ledger HOA Statutory Defense Case Studies
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Forensic breakdowns of actual HOA violation ledgers audited against state statutory caps, independent committee rules, and certified-mail mandates.
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
    </div>
  );
}
