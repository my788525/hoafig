import type { Metadata } from 'next';
import Link from 'next/link';
import HoaDisputeWizard from '@/components/HoaDisputeWizard';
import StatutoryAuditStamp from '@/components/StatutoryAuditStamp';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '4-Step HOA Dispute & Hearing Wizard (2026)',
  description:
    'Guided 4-step HOA dispute wizard covering all 50 states and D.C. Audit violation fines, solar/EV/OTARD ARC denials, special assessments, and late-fee stacking.',
  alternates: { canonical: '/wizard/' }
};

const FAQS = [
  {
    q: 'How does the 4-Step HOA Dispute Wizard match my case to state law?',
    a: 'Select your state (50 states + D.C.) and dispute category in Step 1, enter your fine or assessment amount and notice days in Step 2, and flag procedural defects in Step 3. Step 4 computes your compliance score and generates a printable 《HOA Statutory Violation & Board Hearing Brief》.'
  },
  {
    q: 'Is the printable HOA Board Hearing Brief free to use?',
    a: 'Yes. You can print or save the 《HOA Statutory Violation & Board Hearing Brief》 as a PDF via your browser and copy the plain-text Violation Summary for free. Optional editable .DOCX Certified Mail demand kits are matched to your specific dispute branch.'
  },
  {
    q: 'Which digital defense kit matches my HOA dispute?',
    a: 'Violation fines and late-fee stacking match the $24.99 50-State HOA Fine Compliance & Board Hearing Defense VIP Suite; Solar, EV charger, and FCC OTARD denials match the $29.99 Statutory Override Kit; and special assessments or reserve hikes match the $39.99 Reserve Study Audit & Petition Pack.'
  },
  {
    q: 'What makes a Certified Mail HOA demand letter more effective than emailing the manager?',
    a: 'Property managers routinely ignore informal emails, whereas Certified Mail with Return Receipt creates a formal legal record, triggers statutory cure or records-inspection clocks, and signals to the board’s general counsel that you have documented exact statutory violations.'
  },
  {
    q: 'Can I use the wizard if my HOA claims CC&Rs override state law?',
    a: 'Yes. Across all 50 states and D.C., mandatory state due-process statutes, fine caps, payment-waterfall rules, and federal FCC OTARD preemption override conflicting CC&R provisions.'
  }
];

export default function WizardPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: '4-Step HOA Dispute & Board Hearing Strategy Wizard',
          description:
            'Guided 51-jurisdiction HOA dispute auditor for violation fines, solar/EV/OTARD ARC denials, special assessments, and late-fee stacking.',
          url: '/wizard/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'HOA Dispute Wizard', url: '/wizard/' }
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <div className="space-y-3 no-print">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0f2747]">HOA Dispute Wizard</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8a24a]/15 border border-[#c8a24a]/40 text-[#0f2747] text-[11px] font-bold uppercase tracking-wider">
          Flagship Guided Workbench · 51 Jurisdictions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          HOA Dispute &amp; Board Hearing Strategy Wizard
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Walk through 4 guided steps to audit your HOA fine, ARC denial, special assessment, or late-fee ledger against 2026 state statutes—and generate a free printable Board Hearing Brief.
        </p>
        <p className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 max-w-3xl">
          <strong className="text-[#0c2921]">Ballpark vs. Exact Audit:</strong> General state fine caps only give a rough ballpark—exact daily-accrual caps, cure-window defects, payment-waterfall violations, and ARC preemption must be calculated interactively on-site below.
        </p>
      </div>

      <StatutoryAuditStamp />

      <HoaDisputeWizard />

      {/* Free 1-Page Summary vs. Pro Board Hearing & Certified Demand Kit */}
      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9a7622]">
            Conversion &amp; Defense ROI Comparison
          </div>
          <h2 className="text-xl font-extrabold text-[#0f2747]">
            Free 1-Page Summary vs. Pro Board Hearing &amp; Certified Demand Kit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Audit your case for free in 60 seconds, then unlock editable .DOCX Certified Mail demand letters and board hearing scripts for a fraction of a single $300/hr HOA attorney consultation.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#0f2747]/15 text-[#0f2747] font-extrabold">
                <th className="py-2.5 pr-4">Feature / Deliverable</th>
                <th className="py-2.5 pr-4">Free 1-Page Summary</th>
                <th className="py-2.5 text-[#9a7622]">Pro Board Hearing &amp; Certified Demand Kit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold">51-Jurisdiction Statutory Compliance Score (0–100)</td>
                <td className="py-2.5 pr-4 text-emerald-700 font-semibold">Included</td>
                <td className="py-2.5 text-emerald-700 font-semibold">Included + Multi-Branch Citations</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Printable Browser Hearing Brief &amp; Plain-Text Summary</td>
                <td className="py-2.5 pr-4 text-emerald-700 font-semibold">Included</td>
                <td className="py-2.5 text-emerald-700 font-semibold">Included</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Editable Certified Mail Demand &amp; Cure-Notice Letters (.DOCX)</td>
                <td className="py-2.5 pr-4 text-slate-400">Not included</td>
                <td className="py-2.5 font-bold text-[#0f2747]">Included (Ready to Sign &amp; Mail)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Board Hearing Oral Argument Script &amp; Evidence Checklist</td>
                <td className="py-2.5 pr-4 text-slate-400">Not included</td>
                <td className="py-2.5 font-bold text-[#0f2747]">Included (.DOCX)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Statutory Records Inspection &amp; Payment-Waterfall Templates</td>
                <td className="py-2.5 pr-4 text-slate-400">Not included</td>
                <td className="py-2.5 font-bold text-[#0f2747]">Included (.DOCX)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="no-print">
        <ToolPaywallDossier
          badge="Flagship 50-State HOA Defense Kit"
          title="50-State HOA Fine Compliance & Board Hearing Defense VIP Suite"
          desc="Complete editable Word (.DOCX) Certified Mail demand letters, 51-state fine cap citations, and board hearing scripts tailored to your HOA dispute."
          price="$24.99"
          pid="pdt_0NsmkloFUuNMrFIQIYxtQ"
          docType="HOA Fine & Hearing Defense Suite"
          storageKey="hoa_dispute_wizard"
          features={[
            'Editable Certified Mail Demand & Cure-Notice Letters (.DOCX)',
            '51-State Statutory Fine Cap & Committee Citation Matrix',
            'Board Hearing Oral Argument & Evidence Checklist',
            'Payment-Waterfall & Late-Fee Dispute Ledger Template'
          ]}
        />
      </div>

      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <h2 className="text-xl font-extrabold text-[#0f2747]">Frequently Asked Questions</h2>
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
