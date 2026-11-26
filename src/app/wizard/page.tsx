import type { Metadata } from 'next';
import Link from 'next/link';
import HoaDisputeWizard from '@/components/HoaDisputeWizard';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '4-Step HOA Dispute & Board Hearing Strategy Wizard (2026)',
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
      </div>

      <HoaDisputeWizard />

      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <h2 className="text-xl font-extrabold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
