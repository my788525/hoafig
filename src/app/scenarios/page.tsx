import type { Metadata } from 'next';
import Link from 'next/link';
import { HOA_SCENARIOS_2026 } from '@/data/hoa_scenarios_2026';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Top State HOA Violation Defense Playbooks',
  description:
    'State-specific HOA violation defense playbooks for Florida, California, Texas, Arizona, Nevada, and Colorado.',
  alternates: { canonical: '/scenarios/' }
};

export default function HoaScenariosPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'HOA Scenarios', url: '/scenarios/' }
        ])}
      />
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#9a7622] font-bold">
          SUPER-STATE HOA DEFENSE PLAYBOOKS
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0c2921] tracking-tight">
          High-Frequency State HOA Violation Defense Playbooks
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Targeted statutory defenses for the six highest-volume HOA enforcement states: Florida, California, Texas, Arizona, Nevada, and Colorado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {HOA_SCENARIOS_2026.map((s) => (
          <Link
            key={s.slug}
            href={`/scenarios/${s.slug}/`}
            className="brief-card p-6 hover:border-[#0c2921] transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0c2921]/10 text-[#0c2921] text-[11px] font-bold uppercase">
                {s.stateAbbr} · {s.statute}
              </span>
              <h2 className="text-lg font-extrabold text-[#0c2921]">{s.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{s.keyDefense}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs font-bold">
              <span className="text-slate-700">Exposure: {s.typicalExposure}</span>
              <span className="text-[#059669]">Open Playbook →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
