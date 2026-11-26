import type { Metadata } from 'next';
import Link from 'next/link';
import { HOA_STATUTES_2026 } from '@/data/hoa_statutes_2026';
import { HOA_CASES } from '@/data/cases';
import { HOA_GUIDES } from '@/data/guides';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import { JsonLd, datasetJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOAFig — U.S. HOA Fine Compliance, Special Assessment & Board Hearing Defense',
  description:
    'Audit HOA fines, late-fee stacking, special assessments, and solar/EV ARC denials against 2026 primary state statutes across all 50 states and D.C.',
  alternates: { canonical: '/' }
};

const CALCULATORS = [
  {
    href: '/calculators/hoa-fine-compliance/',
    tag: 'Primary Defense',
    title: 'HOA Fine Compliance & Statutory Cap Checker',
    desc: 'Cross-check fine amounts, daily accrual, late fees, notice/cure days, and independent fining committees against state law.'
  },
  {
    href: '/calculators/special-assessment-calculator/',
    tag: 'Reserve Audit',
    title: 'Special Assessment & Reserve Shortfall Estimator',
    desc: 'Calculate per-unit capital exposure, reserve percent-funded ratios, monthly dues spikes, and homeowner voting thresholds.'
  },
  {
    href: '/calculators/hoa-late-fee-auditor/',
    tag: 'Ledger Audit',
    title: 'HOA Late Fee & Payment Priority Auditor',
    desc: 'Detect illegal late-fee/interest stacking on fines and payment-waterfall violations where dues are misapplied to fines first.'
  },
  {
    href: '/calculators/arc-override-checker/',
    tag: 'Preemption',
    title: 'ARC Solar, EV Charger & FCC OTARD Override Checker',
    desc: 'Verify federal FCC OTARD (47 C.F.R. § 1.4000) and state Solar Access / Right-to-Charge statutory overrides.'
  }
];

const FEATURED_STATES = ['CA', 'FL', 'TX', 'CO', 'NV', 'AZ', 'NC', 'VA'];

export default function HomePage() {
  const spotlightStates = HOA_STATUTES_2026.filter((s) => FEATURED_STATES.includes(s.abbr));

  return (
    <div className="space-y-14 pb-10">
      <JsonLd
        data={datasetJsonLd({
          name: '2026 U.S. 51-Jurisdiction HOA Statutory Fine Cap & Compliance Dataset',
          description: 'Verified statutory fine caps, cure/hearing periods, independent committee mandates, and solar/EV overrides across all 50 states and D.C.',
          url: '/statutes/'
        })}
      />

      {/* Executive Hero */}
      <section className="bg-[#0f2747] text-white border-b border-slate-800">
        <div className="container-exec py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c8a24a]/15 border border-[#c8a24a]/40 text-[#e2c275] text-[11px] font-bold uppercase tracking-wider leading-snug">
              51 U.S. Jurisdictions · 2026 Primary Code Verified
            </div>
            <h1 className="mt-6 text-[28px] sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Audit Any HOA Fine, Special Assessment, or ARC Denial Against State Law.
            </h1>
            <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              An institutional-grade statutory compliance workbench for U.S. homeowners. Verify fine caps, mandatory cure windows, independent fining committees, and generate a printable{' '}
              <strong className="text-white">Board Hearing Brief &amp; Certified Mail Demand</strong> in 60 seconds.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4">
              <Link
                href="/wizard/"
                className="px-6 py-3.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] font-extrabold text-sm text-center transition shadow-lg"
              >
                Start 4-Step Dispute Wizard →
              </Link>
              <Link
                href="/calculators/hoa-fine-compliance/"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm text-center transition"
              >
                Run Fine Compliance Audit
              </Link>
              <Link
                href="/states/"
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-semibold text-sm text-center transition"
              >
                Browse 51 State Statutes
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 mt-2 lg:mt-0 bg-[#091a32] border border-slate-700/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#e2c275] font-bold">
                2026 STATUTORY BENCHMARKS
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 shrink-0">Live Verified</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 py-2 border-b border-slate-800/80">
                <span className="text-slate-300">California (Cal. Civ. Code § 5850)</span>
                <span className="text-emerald-400 font-bold tabular-nums shrink-0">$100 Cap · 0% Interest</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 py-2 border-b border-slate-800/80">
                <span className="text-slate-300">Florida (Fla. Stat. § 720.305)</span>
                <span className="text-emerald-400 font-bold tabular-nums shrink-0">$1,000 Cap · 3-Member Comm.</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 py-2 border-b border-slate-800/80">
                <span className="text-slate-300">Texas (Tex. Prop. Code § 209.006)</span>
                <span className="text-emerald-400 font-bold tabular-nums shrink-0">Cert. Mail · 30d Hearing</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 py-2 border-b border-slate-800/80">
                <span className="text-slate-300">Colorado (C.R.S. § 38-33.3-209.5)</span>
                <span className="text-emerald-400 font-bold tabular-nums shrink-0">$500 Cap · Two 30d Cures</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 py-2">
                <span className="text-slate-300">Nevada (NRS § 116.31031)</span>
                <span className="text-emerald-400 font-bold tabular-nums shrink-0">$100 / $1,000 · 14d Cure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Executive Calculators */}
      <section className="container-exec space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2747]">
              Executive HOA Compliance Workbenches
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              100% client-side computation with printable Hearing Briefs and Certified Mail templates.
            </p>
          </div>
          <Link href="/calculators/" className="text-xs font-bold text-[#0f2747] underline">
            View All Calculators →
          </Link>
        </div>

        <Link
          href="/wizard/"
          className="brief-card p-5 sm:p-6 border-2 border-[#c8a24a]/60 bg-gradient-to-r from-[#0f2747] to-[#1a3b68] text-white hover:border-[#c8a24a] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#c8a24a] text-[#091a32]">
              Flagship 4-Step Guided Flow
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              HOA Dispute &amp; Board Hearing Strategy Wizard
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
              Not sure where to start? Answer 4 quick steps on your state, financial exposure, and procedural defects to generate a free printable Board Hearing Brief.
            </p>
          </div>
          <span className="px-5 py-3 rounded-xl bg-[#c8a24a] text-[#091a32] font-extrabold text-xs shrink-0 text-center">
            Launch Wizard →
          </span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {CALCULATORS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="brief-card p-5 sm:p-6 hover:border-[#0f2747] transition group flex flex-col justify-between gap-4 min-w-0"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
                  {c.tag}
                </span>
                <h3 className="text-lg font-extrabold text-[#0f2747] group-hover:text-[#1a3b68]">
                  {c.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
              <div className="text-xs font-extrabold text-[#059669]">
                Launch Workbench →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Inline Offer at ~35-40% Scroll Depth (Right After Core Tool Showcase) */}
      <div className="container-exec">
        <ToolPaywallDossier
          badge="All-Access Matrix Pass"
          title="Unlock the Complete 2026 HOA Hearing Defense & Ledger Audit Suite"
          desc="Download editable Word (.DOCX) Certified Mail demand letters, 51-state fine cap citations, and reserve study audit workbooks."
          features={[
            'Editable Certified Mail Demand Letters',
            '51-State Statutory Citation Matrix',
            'Reserve & Ledger Audit Excel Workbook',
            'Printable Unwatermarked Hearing Briefs'
          ]}
        />
      </div>

      {/* State Spotlight */}
      <section className="container-exec space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f2747]">
              51-Jurisdiction Statutory Fine Cap Directory
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Primary `.gov` statutory citations, cure periods, and solar/EV override rules.
            </p>
          </div>
          <Link href="/states/" className="text-xs font-bold text-[#0f2747] underline">
            All 50 States + D.C. →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spotlightStates.map((s) => (
            <Link
              key={s.abbr}
              href={`/states/${s.slug}/`}
              className="brief-card p-4 hover:border-[#0f2747] transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#0f2747]">{s.name}</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {s.abbr}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-600 truncate">{s.primaryStatute}</div>
              <div className="text-xs text-[#059669] font-bold tabular-nums">
                {s.continuingFineCapUsd
                  ? `$${s.continuingFineCapUsd.toLocaleString()} Cap`
                  : s.perViolationCapUsd
                  ? `$${s.perViolationCapUsd.toLocaleString()} / Violation`
                  : `${s.mandatoryNoticeDays}d Notice`}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Real-Ledger Case Studies */}
      <section className="container-exec space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f2747]">Real-Ledger Case Studies</h2>
            <p className="text-sm text-slate-600 mt-1">
              Line-by-line statutory audits showing how unlawful HOA fines and fee stacking were voided.
            </p>
          </div>
          <Link href="/cases/" className="text-xs font-bold text-[#0f2747] underline">
            All Case Studies →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOA_CASES.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}/`}
              className="brief-card p-5 hover:border-[#0f2747] transition space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0f2747]">{c.stateName}</span>
                <span className="font-mono font-bold text-[#059669] tabular-nums">{c.finalOutcome}</span>
              </div>
              <h3 className="text-base font-extrabold text-[#0f2747] leading-snug">{c.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3">{c.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Defense Guides */}
      <section className="container-exec space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f2747]">Homeowner Statutory Defense Guides</h2>
            <p className="text-sm text-slate-600 mt-1">
              Deep-dive playbooks with Direct Answer tables and primary legal citations.
            </p>
          </div>
          <Link href="/guides/" className="text-xs font-bold text-[#0f2747] underline">
            All 6 Guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOA_GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}/`}
              className="brief-card p-5 hover:border-[#0f2747] transition space-y-2"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#c8a24a]">
                {g.category}
              </div>
              <h3 className="text-base font-extrabold text-[#0f2747]">{g.shortTitle}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
