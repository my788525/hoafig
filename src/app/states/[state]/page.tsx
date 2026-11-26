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
      </div>

      {/* Key Defense Takeaway */}
      <div className="p-5 rounded-2xl bg-[#0f2747] text-white space-y-1.5">
        <div className="text-xs font-mono uppercase tracking-wider text-[#e2c275] font-bold">
          EXECUTIVE DEFENSE TAKEAWAY ({s.abbr})
        </div>
        <p className="text-sm sm:text-base font-medium leading-relaxed">{s.keyDefenseTakeaway}</p>
      </div>

      {/* Statutory Matrix Table */}
      <div className="brief-card overflow-hidden">
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
  );
}
