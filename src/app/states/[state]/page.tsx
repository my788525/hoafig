import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HOA_STATUTES_2026, STATUTES_BY_SLUG } from '@/data/hoa_statutes_2026';
import { JsonLd, datasetJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export function generateStaticParams() {
  return HOA_STATUTES_2026.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = STATUTES_BY_SLUG[state];
  if (!s) return {};
  return {
    title: `${s.name} HOA Fine Caps, Hearing Rights & Statutes (2026)`,
    description: `${s.name} (${s.abbr}) HOA fine compliance rules under ${s.primaryStatute}. View fine caps, ${s.mandatoryNoticeDays}-day notice / ${s.mandatoryCureDays}-day cure windows, and solar/EV overrides.`,
    alternates: { canonical: `/states/${s.slug}/` }
  };
}

export default async function StateStatutePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = STATUTES_BY_SLUG[state];
  if (!s) notFound();

  const faqs = [
    {
      q: `What is the HOA fine cap in ${s.name}?`,
      a: s.capSummary
    },
    {
      q: `How many days notice and cure time must a ${s.name} HOA give before fining?`,
      a: `${s.name} requires at least ${s.mandatoryNoticeDays} days notice and a ${s.mandatoryCureDays}-day cure window. ${s.hearingRight}`
    },
    {
      q: `Can a ${s.name} HOA ban rooftop solar panels or EV chargers?`,
      a: `Solar: ${s.solarOverrideStatute} EV Chargers: ${s.evOverrideStatute}`
    }
  ];

  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={datasetJsonLd({
          name: `${s.name} (${s.abbr}) HOA Statutory Compliance Profile (2026)`,
          description: s.capSummary,
          url: `/states/${s.slug}/`
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: '51 State Laws', url: '/states/' },
          { name: s.name, url: `/states/${s.slug}/` }
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/states/" className="hover:text-[#0f2747]">51 State Laws</Link>
          <span>/</span>
          <span className="text-[#0f2747]">{s.name}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
            {s.name} ({s.abbr}) HOA Fine &amp; Compliance Statutes
          </h1>
          <Link
            href="/calculators/hoa-fine-compliance/"
            className="px-4 py-2.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] text-xs font-extrabold transition"
          >
            Audit {s.abbr} Fine Now →
          </Link>
        </div>

        <p className="text-sm text-slate-600">
          Primary Code:{' '}
          <a
            href={s.officialGovUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0f2747] underline font-semibold"
          >
            {s.primaryStatute}
          </a>{' '}
          · Condo Code: {s.condoStatute}
        </p>
        {/* Quick-Jump Anchor Pills */}
        <nav aria-label="Quick navigation" className="flex flex-wrap gap-2 pt-1">
          <a href="#direct-answer" className="px-3 py-1 rounded-full text-xs font-bold bg-[#0f2747] text-white hover:bg-[#1a3b68] transition">
            Direct Statutory Answer
          </a>
          <a href="#benchmark-table" className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-[#0f2747] hover:bg-slate-200 transition">
            Benchmark Table
          </a>
          <a href="#defense-kit" className="px-3 py-1 rounded-full text-xs font-bold bg-[#c8a24a]/20 text-[#0f2747] border border-[#c8a24a]/40 hover:bg-[#c8a24a]/30 transition">
            {s.abbr} Defense Kit
          </a>
          <a href="#compliance-matrix" className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-[#0f2747] hover:bg-slate-200 transition">
            Full Compliance Matrix
          </a>
          <a href="#faq" className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-[#0f2747] hover:bg-slate-200 transition">
            FAQs
          </a>
        </nav>
      </div>

      {/* Above-the-Fold Direct Statutory Answer Box */}
      <div id="direct-answer" className="p-5 sm:p-6 rounded-2xl bg-[#0f2747] text-white space-y-2 scroll-mt-20">
        <div className="text-xs font-mono uppercase tracking-wider text-[#e2c275] font-bold">
          DIRECT STATUTORY ANSWER · {s.name.toUpperCase()} ({s.abbr})
        </div>
        <p className="text-sm sm:text-base font-medium leading-relaxed">{s.keyDefenseTakeaway}</p>
      </div>

      {/* HTML Benchmark Table */}
      <div id="benchmark-table" className="brief-card overflow-hidden scroll-mt-20">
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 font-extrabold text-[#0f2747] text-sm">
          {s.name} ({s.abbr}) vs. U.S. HOA Statutory Benchmarks (2026)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-3.5 font-bold">Compliance Factor</th>
                <th className="p-3.5 font-bold">{s.name} Controlling Rule</th>
                <th className="p-3.5 font-bold">Primary Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3.5 font-bold text-[#0f2747]">Fine Cap Limit</td>
                <td className="p-3.5 text-slate-700">{s.capSummary}</td>
                <td className="p-3.5 font-mono text-xs text-[#059669] font-semibold">{s.primaryStatute}</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#0f2747]">Notice &amp; Cure Window</td>
                <td className="p-3.5 text-slate-700 tabular-nums">{s.mandatoryNoticeDays}d notice · {s.mandatoryCureDays}d cure</td>
                <td className="p-3.5 font-mono text-xs text-[#059669] font-semibold">
                  {s.certifiedMailRequired ? 'Certified Mail Mandatory' : 'Written Notice'}
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-[#0f2747]">Hearing Committee</td>
                <td className="p-3.5 text-slate-700">{s.independentCommitteeRequired ? 'Independent Non-Board Committee' : 'Board / Hearing Panel'}</td>
                <td className="p-3.5 font-mono text-xs text-[#059669] font-semibold">{s.recordsInspectionDays}d Records Deadline</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline Offer at ~35-40% Scroll Depth */}
      <div id="defense-kit" className="scroll-mt-20">
        <ToolPaywallDossier
          badge={`${s.abbr} Defense Suite`}
          title={`Download ${s.name} HOA Hearing Brief & Certified Mail Templates`}
          desc={`Includes ${s.name}-specific statutory citations, editable Word (.DOCX) hearing & records demand letters, and ledger audit workbook.`}
          features={[
            `${s.name} Statutory Demand Letters (.DOCX)`,
            'Board Hearing Brief & Exhibit Log',
            'Ledger & Late-Fee Audit Workbook',
            '51-State Master Citation Reference'
          ]}
        />
      </div>

      {/* Statutory Matrix Table */}
      <div id="compliance-matrix" className="brief-card overflow-hidden scroll-mt-20">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 font-extrabold text-[#0f2747] text-sm">
          2026 {s.name} Statutory Compliance Matrix
        </div>
        <div className="divide-y divide-slate-200 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2">
            <span className="font-bold text-slate-600">Statutory Fine Cap</span>
            <span className="md:col-span-2 text-[#0f2747] font-semibold">{s.capSummary}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2">
            <span className="font-bold text-slate-600">Notice &amp; Cure Windows</span>
            <span className="md:col-span-2 tabular-nums">
              <strong>{s.mandatoryNoticeDays} days</strong> advance notice ·{' '}
              <strong>{s.mandatoryCureDays} days</strong> cure period · Certified Mail:{' '}
              <strong>{s.certifiedMailRequired ? 'Mandatory' : 'Check CC&Rs'}</strong>
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2">
            <span className="font-bold text-slate-600">Hearing &amp; Committee Rule</span>
            <span className="md:col-span-2">{s.hearingRight}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2">
            <span className="font-bold text-slate-600">Payment Priority &amp; Late Fees</span>
            <span className="md:col-span-2">{s.paymentPriorityRule}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2">
            <span className="font-bold text-slate-600">Solar Access Override</span>
            <span className="md:col-span-2">{s.solarOverrideStatute}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2">
            <span className="font-bold text-slate-600">EV Charger Override</span>
            <span className="md:col-span-2">{s.evOverrideStatute}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2">
            <span className="font-bold text-slate-600">Special Assessment Threshold</span>
            <span className="md:col-span-2">{s.specialAssessmentVoteThreshold}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2">
            <span className="font-bold text-slate-600">Records Production Deadline</span>
            <span className="md:col-span-2 tabular-nums">
              <strong>{s.recordsInspectionDays} business days</strong> from written request
            </span>
          </div>
        </div>
      </div>

      {/* Visible FAQ Section for GEO & Bing */}
      <section id="faq" className="brief-card p-6 sm:p-8 space-y-4 scroll-mt-20">
        <h2 className="text-xl font-extrabold text-[#0f2747]">{s.name} HOA Statutory FAQs</h2>
        <div className="divide-y divide-slate-200">
          {faqs.map((f, i) => (
            <div key={i} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
              <h3 className="text-sm sm:text-base font-bold text-[#0f2747]">{f.q}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
