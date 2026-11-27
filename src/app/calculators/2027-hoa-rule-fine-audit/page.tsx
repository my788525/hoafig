import type { Metadata } from 'next';
import Hoa2027RuleAuditCalc from '@/components/calculators/Hoa2027RuleAuditCalc';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import { JsonLd, breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '2027 HOA $100 Cap & 21-Day Rule Audit',
  description:
    'Audit HOA fines and rule changes against Minnesota HF 1268 / SF 1750 (effective Jan 1, 2027), California Civ. Code § 5850, and Florida § 720.305.',
  alternates: { canonical: '/calculators/2027-hoa-rule-fine-audit/' }
};

const FAQS = [
  {
    q: 'What does Minnesota HF 1268 / SF 1750 change for HOAs on January 1, 2027?',
    a: 'Effective January 1, 2027, Minnesota caps standard HOA rule-violation fines at $100, mandates a 21-day advance notice and homeowner comment period for rule changes, tightens board conflict-of-interest rules, and lowers thresholds to terminate single-family HOAs.'
  },
  {
    q: 'Can an HOA enforce a new rule passed without the statutory notice window?',
    a: 'No. Where state law mandates advance notice and homeowner comment periods (such as 21 days under MN HF 1268), rules adopted without proper notice are procedurally defective and unenforceable.'
  }
];

export default function Hoa2027RuleAuditPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: '2027 HOA Rule & Fine Audit', url: '/calculators/2027-hoa-rule-fine-audit/' }
          ]),
          webApplicationJsonLd({
            name: '2027 HOA $100 Fine Cap & 21-Day Rule-Change Audit',
            description: 'Audit 2027 HOA fine caps and rule-change notice periods.',
            url: '/calculators/2027-hoa-rule-fine-audit/'
          }),
          faqJsonLd(FAQS)
        ]}
      />

      <div className="space-y-2 border-b border-slate-200 pb-6 no-print">
        <div className="text-xs font-mono uppercase tracking-widest text-[#9a7622] font-bold">
          2027 HOA REFORM TRACKER · EFFECTIVE JAN 1, 2027
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0c2921] tracking-tight">
          2027 HOA $100 Fine Cap &amp; 21-Day Rule-Change Audit
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Verify HOA fines and new board rules against 2027 statutory reforms (including Minnesota HF 1268 / SF 1750, California Civ. Code § 5850, and Florida § 720.305).
        </p>
      </div>

      <Hoa2027RuleAuditCalc />

      <section className="brief-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-extrabold text-[#0c2921]">2027 HOA Reform FAQs</h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="border border-slate-200 rounded-xl p-4">
              <summary className="font-bold text-sm text-[#0c2921] cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ToolPaywallDossier
        badge="2027 HOA Hearing Defense VIP Suite"
        title="Download Certified Mail Hearing & Records Demand Kit"
        desc="Unlock editable .DOCX Certified Mail hearing demands, board conflict-of-interest objections, and 51-state fine cap citations."
        features={[
          'Editable .DOCX Certified Mail Demand Letters',
          'Board Conflict & Notice-Defect Templates',
          'HOA Ledger & Reserve Audit Workbook (.XLSX)',
          '51-State Statutory Citation Matrix'
        ]}
      />
    </div>
  );
}
