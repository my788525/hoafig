import type { Metadata } from 'next';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '2026 HOA Statutory Changelog',
  description:
    'Track 2025–2026 legislative updates affecting U.S. HOA fines, reserve studies, EV charging rights, and homeowner notice protections.',
  alternates: { canonical: '/changelog/' }
};

const UPDATES = [
  {
    date: '2026-11-01',
    jurisdiction: 'All 51 Jurisdictions',
    note: 'Initial institutional release of HOAFig.com with 51-state statutory dataset, 4 compliance workbenches, 3 forensic case studies, and 6 defense guides.'
  },
  {
    date: '2026-01-01',
    jurisdiction: 'California (AB 130 / Civ. Code § 5850)',
    note: 'Updated California Davis-Stirling fine cap model to reflect $100 non-health/safety cap and prohibition on late fees/interest on monetary penalties.'
  },
  {
    date: '2025-07-01',
    jurisdiction: 'Florida (HB 1203 / Fla. Stat. § 720.305)',
    note: 'Incorporated mandatory 14-day written notice, 3-member independent fining committee firewall, and cure-before-fine compliance checks.'
  },
  {
    date: '2025-01-01',
    jurisdiction: 'Michigan (Homeowners’ Energy Policy Act)',
    note: 'Added Michigan statutory override protections for rooftop solar and EV charging stations.'
  }
];

export default function ChangelogPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: '2026 Changelog', url: '/changelog/' }
        ])}
      />
      <h1 className="text-3xl font-extrabold text-[#0f2747]">2026 Statutory Changelog</h1>
      <div className="brief-card divide-y divide-slate-200">
        {UPDATES.map((u, i) => (
          <div key={i} className="p-6 space-y-1">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-mono font-bold text-[#059669]">{u.date}</span>
              <span className="font-extrabold text-[#0f2747]">{u.jurisdiction}</span>
            </div>
            <p className="text-sm text-slate-700">{u.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
