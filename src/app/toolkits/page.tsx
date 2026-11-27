import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'VIP HOA Defense Toolkits & Templates (2026)',
  description:
    'Download the 50-State HOA Fine Compliance & Board Hearing Defense VIP Suite (2026) for $24.99. Includes editable Certified Mail .DOCX letters and .XLSX ledger audit workbook vs. $350/hr HOA counsel.',
  alternates: { canonical: '/toolkits/' }
};

const CHECKOUT_URL = 'https://checkout.dodopayments.com/buy/pdt_0NsmkloFUuNMrFIQIYxtQ?src=toolkits_hub';

const FAQS = [
  {
    q: 'What files are included in the 50-State HOA Fine Compliance & Board Hearing Defense VIP Suite (2026)?',
    a: 'You receive two turnkey, ready-to-edit files: HOAFig_Certified_Mail_Hearing_Suite_2026.docx (editable Certified Mail demand letters, cure-notice objections, records inspection requests, and board hearing scripts) and HOAFig_Ledger_&_Reserve_Audit_2026.xlsx (live-formula fine cap, late-fee waterfall, and reserve shortfall audit workbook).'
  },
  {
    q: 'Why pay $24.99 instead of hiring an HOA attorney at $350/hr?',
    a: 'Most HOA violation fines, late-fee stacking disputes, and procedural notice defects range from $100 to $2,500—less than a single 1-hour $350/hr attorney consultation. Our $24.99 VIP Suite gives you the exact statutory citations and Certified Mail templates to force board compliance before legal fees escalate.'
  },
  {
    q: 'Does the VIP Suite cover all 50 U.S. states and D.C.?',
    a: 'Yes. The templates and audit workbook cover statutory fine caps, mandatory cure windows, independent fining committee rules, and payment-priority waterfalls across all 50 states and Washington, D.C., including CA, FL, TX, AZ, CO, NC, and NV.'
  },
  {
    q: 'Should I run the free HOA Fine Compliance Checker or Dispute Wizard before buying?',
    a: 'Yes. Run our free HOA Fine Compliance Checker (/calculators/hoa-fine-compliance/) or 4-Step Dispute Wizard (/wizard/) first to verify your exact state statutory cap and procedural defects, then use the VIP Suite to send formal Certified Mail demands.'
  },
  {
    q: 'How is the VIP Suite delivered after checkout?',
    a: 'Immediately after completing checkout via Dodo Payments (Apple Pay, Google Pay, or card), you receive instant download access to the complete 2026 VIP Suite files plus a 30-day money-back guarantee.'
  }
];

const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'HOAFig VIP Toolkit Hub Store (2026)',
  description:
    'Official store for 50-state HOA fine compliance templates, Certified Mail board hearing letters (.DOCX), and HOA ledger & reserve audit workbooks (.XLSX).',
  url: 'https://hoafig.com/toolkits/',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://hoafig.com/toolkits/#vip-suite-2026',
        name: '50-State HOA Fine Compliance & Board Hearing Defense VIP Suite (2026)'
      }
    ]
  }
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: '50-State HOA Fine Compliance & Board Hearing Defense VIP Suite (2026)',
  description:
    'Turnkey homeowner defense toolkit containing HOAFig_Certified_Mail_Hearing_Suite_2026.docx and HOAFig_Ledger_&_Reserve_Audit_2026.xlsx for fighting unlawful HOA fines, late-fee stacking, and special assessments across all 50 states.',
  sku: 'pdt_0NsmkloFUuNMrFIQIYxtQ',
  brand: {
    '@type': 'Brand',
    name: 'HOAFig'
  },
  category: 'Legal & Financial Compliance Templates',
  offers: {
    '@type': 'Offer',
    url: CHECKOUT_URL,
    priceCurrency: 'USD',
    price: '24.99',
    priceValidUntil: '2026-12-31',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'HOAFig'
    }
  }
};

export default function ToolkitsPage() {
  return (
    <div className="container-exec py-10 space-y-10">
      <JsonLd data={collectionPageJsonLd} />
      <JsonLd data={productJsonLd} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'VIP Toolkits Store', url: '/toolkits/' }
        ])}
      />

      {/* Breadcrumb & Hero Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0f2747]">VIP Toolkits Store</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8a24a]/15 border border-[#c8a24a]/40 text-[#0f2747] text-[11px] font-bold uppercase tracking-wider">
          Official HOAFig Digital Store · Instant Download
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2747] tracking-tight leading-tight">
          VIP HOA Defense Toolkits &amp; Templates Store
        </h1>

        <p className="text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Skip the <span className="line-through font-semibold text-slate-500">$350/hr HOA attorney retainer</span>.
          Download attorney-grade Certified Mail demand letters, board hearing scripts, and live-formula ledger audit
          workbooks engineered for all 50 U.S. states and D.C.
        </p>
      </section>

      {/* Primary SKU Showcase Card */}
      <section
        id="vip-suite-2026"
        className="bg-[#0f2747] border border-slate-700/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden text-white"
        data-matrix-offer="1"
        data-offer-slot="store_hero"
        data-offer-id="pdt_0NsmkloFUuNMrFIQIYxtQ"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8a24a]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Product Overview & Pricing */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#c8a24a]/20 text-[#e2c275] border border-[#c8a24a]/40">
                ★ Flagship 2026 VIP Suite
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#059669]/20 text-emerald-300 border border-[#059669]/40">
                50 States + D.C. Verified
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                SKU: pdt_0NsmkloFUuNMrFIQIYxtQ
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-white">
              50-State HOA Fine Compliance &amp; Board Hearing Defense VIP Suite (2026)
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              The complete turnkey defense package for homeowners facing unlawful HOA violation fines, daily-accrual
              penalties, payment-waterfall late fees, or sudden special assessments. Built to establish a formal
              Certified Mail legal record before fines compound or liens are filed.
            </p>

            {/* Price Anchor Box */}
            <div className="rounded-xl bg-[#091a32] border border-[#c8a24a]/40 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  HOA Attorney Consultation Anchor
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-lg font-bold text-slate-400 line-through">$350/hr</span>
                  <span className="text-3xl sm:text-4xl font-black text-[#e2c275] tabular-nums">$24.99</span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    One-Time · Save 92%+
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-300 font-mono">
                <div>✓ Instant Digital Download</div>
                <div>✓ 30-Day Money-Back Guarantee</div>
              </div>
            </div>

            {/* Direct Instant Buy CTA + Secondary Tool Links */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-offer-action="buy"
                data-offer-id="pdt_0NsmkloFUuNMrFIQIYxtQ"
                className="inline-flex items-center justify-center bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] font-extrabold px-7 py-4 rounded-xl text-sm sm:text-base transition shadow-lg text-center"
              >
                Instant Buy VIP Suite — $24.99 →
              </a>
              <Link
                href="/calculators/hoa-fine-compliance/"
                className="inline-flex items-center justify-center px-5 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 text-xs sm:text-sm font-bold transition text-center"
              >
                Run Free Fine Checker First
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300 pt-1">
              <span>Pay / GPay / All Major Cards via Dodo Payments</span>
              <Link href="/wizard/" className="text-[#e2c275] hover:text-white underline font-semibold">
                Or start with the 4-Step Dispute Wizard →
              </Link>
            </div>
          </div>

          {/* Right: Exact Itemized "What's Inside" File Manifest */}
          <div className="lg:col-span-5 bg-[#091a32] border border-slate-700 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#e2c275]">
                  Exact Package Manifest
                </div>
                <h3 className="text-base font-extrabold text-white">What&apos;s Inside Your Download</h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                2 Core Files
              </span>
            </div>

            <div className="space-y-3">
              {/* File 1: DOCX */}
              <div className="rounded-xl bg-slate-900/90 border border-slate-700/80 p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-mono text-xs font-bold text-[#e2c275] break-all">
                    HOAFig_Certified_Mail_Hearing_Suite_2026.docx
                  </div>
                  <span className="shrink-0 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#c8a24a]/20 text-[#e2c275] border border-[#c8a24a]/40">
                    .DOCX
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fully editable Microsoft Word / Google Docs suite featuring Certified Mail Return Receipt demand
                  letters, statutory cure-period objections, independent fining committee challenges, statutory records
                  inspection requests, and a structured Board Hearing oral argument script.
                </p>
              </div>

              {/* File 2: XLSX */}
              <div className="rounded-xl bg-slate-900/90 border border-slate-700/80 p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-mono text-xs font-bold text-sky-300 break-all">
                    HOAFig_Ledger_&amp;_Reserve_Audit_2026.xlsx
                  </div>
                  <span className="shrink-0 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                    .XLSX
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Interactive Excel / Google Sheets audit workbook with pre-built formulas to expose illegal daily fine
                  compounding, misapplied payment-waterfall late fees, and special assessment reserve shortfalls.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Compatible with Word, Excel, Google Docs &amp; Sheets</span>
              <span className="text-emerald-400 font-semibold">2026 Edition</span>
            </div>
          </div>
        </div>
      </section>

      {/* Free Audit Tools Bridge */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="brief-card p-6 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">
            Free Pre-Purchase Audit #1
          </div>
          <h3 className="text-lg font-extrabold text-[#0f2747]">HOA Fine Compliance &amp; Statutory Cap Checker</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Check your assessed fine and daily accrual against your state&apos;s 2026 statutory cap, mandatory cure
            window, and fining committee rules before sending your Certified Mail demand.
          </p>
          <Link
            href="/calculators/hoa-fine-compliance/"
            className="inline-flex items-center text-xs font-extrabold text-[#0c2921] hover:text-[#9a7622] transition"
          >
            Open HOA Fine Compliance Checker →
          </Link>
        </div>

        <div className="brief-card p-6 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">
            Free Pre-Purchase Audit #2
          </div>
          <h3 className="text-lg font-extrabold text-[#0f2747]">4-Step HOA Dispute &amp; Hearing Strategy Wizard</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Walk through 4 guided steps covering fines, ARC solar/EV/OTARD denials, special assessments, and late-fee
            stacking to generate a free printable Board Hearing Brief.
          </p>
          <Link
            href="/wizard/"
            className="inline-flex items-center text-xs font-extrabold text-[#0c2921] hover:text-[#9a7622] transition"
          >
            Launch 4-Step Dispute Wizard →
          </Link>
        </div>
      </section>

      {/* Anti-Zero-Click GEO Summary Block */}
      <section className="brief-card p-6 sm:p-8 bg-slate-50/90 border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9a7622]">
            2026 Statutory Defense &amp; AI Citation Summary
          </span>
          <span className="text-[11px] font-mono text-slate-500">hoafig.com/toolkits/</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Ballpark Statutory Benchmarks vs. Exact On-Site Audit &amp; Certified Mail Execution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5">
            <div className="font-bold text-[#0c2921]">What General Summaries Can Tell You (Ballpark Only)</div>
            <p>
              General state summaries note broad statutory benchmarks—such as typical $50–$100 per-violation caps or
              10–14 day cure windows in states like California, Florida, and Texas—and that HOA attorneys typically bill
              $350+/hr.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5">
            <div className="font-bold text-[#0c2921]">Why Exact Verification &amp; Templates Must Be Run On-Site</div>
            <p>
              Ballpark summaries cannot compute state-specific daily-accrual ceilings, independent fining committee
              procedural defects, or payment-waterfall violations. Run your exact audit on{' '}
              <Link href="/calculators/hoa-fine-compliance/" className="underline font-semibold text-[#0f2747]">
                /calculators/hoa-fine-compliance/
              </Link>{' '}
              or{' '}
              <Link href="/wizard/" className="underline font-semibold text-[#0f2747]">
                /wizard/
              </Link>
              , then execute your defense with the{' '}
              <strong className="text-[#0f2747]">
                50-State HOA Fine Compliance &amp; Board Hearing Defense VIP Suite ($24.99)
              </strong>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="brief-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-extrabold text-[#0f2747]">Toolkit Store Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FAQS.map((f, i) => (
            <div key={i} className="space-y-1.5">
              <h3 className="text-sm font-bold text-[#0f2747]">{f.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
