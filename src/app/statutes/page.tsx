import type { Metadata } from 'next';
import Link from 'next/link';
import { HOA_STATUTES_2026 } from '@/data/hoa_statutes_2026';
import { JsonLd, datasetJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '2026 Master 51-State HOA Statute & Fine Cap Matrix',
  description:
    'Side-by-side comparison of HOA fine caps, mandatory notice/cure days, independent committee rules, and solar/EV overrides across all 50 states and D.C.',
  alternates: { canonical: '/statutes/' }
};

export default function MasterStatutesPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={datasetJsonLd({
          name: '2026 Master 51-State HOA Statute & Fine Cap Matrix',
          description: 'Master reference table of all 51 U.S. jurisdictions HOA fining statutes, dollar caps, cure periods, and official .gov links.',
          url: '/statutes/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Statute Index', url: '/statutes/' }
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          2026 Master 51-State HOA Statute Matrix
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Complete statutory comparison table covering fine caps, independent committee requirements, notice/cure minimums, and solar/EV overrides.
        </p>
      </div>

      <div className="brief-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0f2747] text-white">
              <tr>
                <th className="p-3.5 font-bold">State</th>
                <th className="p-3.5 font-bold">Primary HOA Statute</th>
                <th className="p-3.5 font-bold">Fine Cap</th>
                <th className="p-3.5 font-bold">Notice / Cure</th>
                <th className="p-3.5 font-bold">Indep. Comm.</th>
                <th className="p-3.5 font-bold">Solar / EV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {HOA_STATUTES_2026.map((s) => (
                <tr key={s.abbr} className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-[#0f2747]">
                    <Link href={`/states/${s.slug}/`} className="underline">
                      {s.name} ({s.abbr})
                    </Link>
                  </td>
                  <td className="p-3.5 font-mono text-slate-700">
                    <a href={s.officialGovUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {s.primaryStatute.split('(')[0].trim()}
                    </a>
                  </td>
                  <td className="p-3.5 font-mono font-bold tabular-nums text-[#0f2747]">
                    {s.continuingFineCapUsd
                      ? `$${s.continuingFineCapUsd.toLocaleString()} max`
                      : s.perViolationCapUsd
                      ? `$${s.perViolationCapUsd.toLocaleString()} / viol.`
                      : 'Reasonable'}
                  </td>
                  <td className="p-3.5 tabular-nums">
                    {s.mandatoryNoticeDays}d / {s.mandatoryCureDays}d
                  </td>
                  <td className="p-3.5">
                    {s.independentCommitteeRequired ? (
                      <span className="text-[#059669] font-bold">Required</span>
                    ) : (
                      <span className="text-slate-500">Board/Panel</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {s.solarOverrideProtected ? 'Solar ✓' : 'Solar —'} · {s.evOverrideProtected ? 'EV ✓' : 'EV —'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
