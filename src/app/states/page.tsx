import type { Metadata } from 'next';
import Link from 'next/link';
import { HOA_STATUTES_2026 } from '@/data/hoa_statutes_2026';
import { JsonLd, datasetJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '51-State HOA Fine Caps & Statutes (2026)',
  description:
    'Complete 2026 directory of U.S. HOA and condominium fining statutes across all 50 states and D.C., including fine caps, hearing rights, and official .gov code links.',
  alternates: { canonical: '/states/' }
};

export default function StatesIndexPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={datasetJsonLd({
          name: '51-State HOA & Condominium Statutory Compliance Directory (2026)',
          description: 'State-by-state HOA fine caps, notice/cure windows, independent committee rules, and solar/EV override statutes.',
          url: '/states/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: '51 State Laws', url: '/states/' }
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          51-Jurisdiction HOA Statutory Compliance Directory
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Select your state below to view verified 2026 HOA/Condo fining statutes, dollar caps, mandatory cure and hearing windows, solar/EV overrides, and official legislature links.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {HOA_STATUTES_2026.map((s) => (
          <Link
            key={s.abbr}
            href={`/states/${s.slug}/`}
            className="brief-card p-5 hover:border-[#0f2747] transition space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#0f2747]">{s.name}</h2>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-xs font-mono font-bold text-slate-700">
                {s.abbr}
              </span>
            </div>
            <div className="text-xs font-mono text-slate-600 truncate">{s.primaryStatute}</div>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold">
              <span className="px-2 py-0.5 rounded bg-[#0f2747]/10 text-[#0f2747] tabular-nums">
                {s.continuingFineCapUsd
                  ? `Cap: $${s.continuingFineCapUsd.toLocaleString()}`
                  : s.perViolationCapUsd
                  ? `Cap: $${s.perViolationCapUsd.toLocaleString()}`
                  : 'Reasonable Cap'}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#059669] tabular-nums">
                {s.mandatoryNoticeDays}d Notice · {s.mandatoryCureDays}d Cure
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
