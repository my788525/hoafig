import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HOA_SCENARIOS_2026 } from '@/data/hoa_scenarios_2026';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

function fitTitle(text: string, maxLen = 51): string {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const idx = cut.lastIndexOf(' ');
  return idx > 20 ? cut.slice(0, idx) : cut;
}

export async function generateStaticParams() {
  return HOA_SCENARIOS_2026.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = HOA_SCENARIOS_2026.find((s) => s.slug === slug);
  if (!item) return {};
  return {
    title: fitTitle(item.title, 51),
    description: `${item.stateName} HOA statutory defense under ${item.statute}: ${item.keyDefense}`,
    alternates: { canonical: `/scenarios/${item.slug}/` }
  };
}

export default async function HoaScenarioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = HOA_SCENARIOS_2026.find((s) => s.slug === slug);
  if (!item) notFound();

  return (
    <div className="container-exec py-10 max-w-4xl space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'HOA Scenarios', url: '/scenarios/' },
            { name: item.stateAbbr, url: `/scenarios/${item.slug}/` }
          ]),
          faqJsonLd(item.faqs)
        ]}
      />

      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#9a7622] font-bold">
          {item.stateName} · {item.statute}
        </div>
        <h1 className="text-3xl font-extrabold text-[#0c2921] tracking-tight">{item.title}</h1>
        <p className="text-sm text-slate-600">
          Common Dispute: <strong className="text-[#0c2921]">{item.violationType}</strong> · Typical Exposure:{' '}
          <strong className="text-[#0c2921]">{item.typicalExposure}</strong>
        </p>
      </div>

      <div className="bg-[#09221c] text-white rounded-2xl p-6 space-y-3 shadow-lg">
        <div className="text-xs font-mono uppercase tracking-wider text-[#e2c275] font-bold">
          PRIMARY STATUTORY DEFENSE
        </div>
        <p className="text-sm text-emerald-50/90 leading-relaxed">{item.keyDefense}</p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Link href="/wizard/" className="px-4 py-2.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] text-[#09221c] font-extrabold text-xs">
            Launch 4-Step HOA Dispute Wizard →
          </Link>
          <Link href={`/states/${item.stateName.toLowerCase().replace(/\s+/g, '-')}/`} className="px-4 py-2.5 rounded-xl border border-white/20 text-xs font-bold text-white hover:bg-white/10">
            View Full {item.stateName} Statute Dossier →
          </Link>
        </div>
      </div>

      <section className="brief-card p-6 space-y-4">
        <h2 className="text-xl font-extrabold text-[#0c2921]">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {item.faqs.map((f) => (
            <details key={f.q} className="border border-slate-200 rounded-xl p-4">
              <summary className="font-bold text-sm text-[#0c2921] cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ToolPaywallDossier
        badge={`${item.stateAbbr} HOA Defense Kit`}
        title={`Download ${item.stateName} Board Hearing & Certified Demand Kit`}
        desc={`Unlock editable .DOCX Certified Mail demands and statutory objection templates citing ${item.statute}.`}
        features={[
          'Editable .DOCX Certified Mail Hearing Demand',
          `${item.statute} Statutory Objection Script`,
          'HOA Ledger & Fine Cap Audit (.XLSX)',
          '51-State Statutory Citation Matrix'
        ]}
      />
    </div>
  );
}
