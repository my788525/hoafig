import type { Metadata } from 'next';
import Link from 'next/link';
import LateFeeAuditorClient from './LateFeeAuditorClient';
import StatutoryAuditStamp from '@/components/StatutoryAuditStamp';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Late Fee & Payment Priority Auditor (2026)',
  description:
    'Check whether your HOA illegally stacked late fees or interest onto fines, or misapplied your monthly dues payment to fines first under state payment-waterfall statutes.',
  alternates: { canonical: '/calculators/hoa-late-fee-auditor/' }
};

const FAQS = [
  {
    q: 'Can an HOA apply my monthly dues payment to fines first?',
    a: 'No, in major payment-waterfall states. California Civil Code § 5655(a) requires payments to be applied to regular assessments first before fees, late charges, or fines. Texas Property Code § 209.0063 mandates a strict waterfall that places fines dead last—after delinquent and current assessments, attorney fees, and collection costs.'
  },
  {
    q: 'Can an HOA charge late fees or interest on unpaid violation fines?',
    a: 'In many states, no. Late fees and statutory interest (such as 12% in California or 18% in Florida) are authorized only for delinquent regular or special assessments—not punitive violation fines. Compounding late fees onto a disputed fine is an unlawful ledger overcharge.'
  },
  {
    q: 'Can an HOA foreclose on my home because of unpaid fines or late fees?',
    a: 'Several states strictly prohibit non-judicial or judicial foreclosure for unpaid fines alone (e.g., California Civ. Code § 5725(b), Arizona A.R.S. § 33-1803, and Florida Stat. § 720.305(2) for fines under $1,000). Misapplying your dues payment to fines to create an artificial assessment delinquency is a prime defense against HOA collection liens.'
  },
  {
    q: 'What is the maximum HOA late fee allowed by state law?',
    a: 'Statutory caps vary by jurisdiction: California Civ. Code § 5650(b) caps late fees at the greater of $10 or 10% of the delinquent assessment; Arizona A.R.S. § 33-1803 caps late fees at the greater of $15 or 10%; and Florida Stat. § 720.3085(3)(a) caps administrative late fees at the greater of $25 or 5%.'
  },
  {
    q: 'How do I force an HOA management company to fix a misapplied ledger?',
    a: 'Send a Certified Mail Ledger Reconciliation & Payment-Waterfall Demand citing your state statute, enclosing proof of your check memo/ACH designation for regular assessments, and demanding immediate reversal of all derivative late fees, interest, and collection admin charges.'
  }
];

export default function LateFeeAuditorPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: 'HOA Late Fee & Payment Priority Auditor',
          description: 'Audit HOA ledger fee stacking and payment-priority waterfall compliance across 51 U.S. jurisdictions.',
          url: '/calculators/hoa-late-fee-auditor/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' },
          { name: 'Late Fee Auditor', url: '/calculators/hoa-late-fee-auditor/' }
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/calculators/" className="hover:text-[#0f2747]">Calculators</Link>
          <span>/</span>
          <span className="text-[#0f2747]">Late Fee &amp; Payment Priority Auditor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          HOA Late Fee &amp; Payment Priority Auditor
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Verify whether your association illegally compounded late fees or interest onto disputed fines, or misapplied your regular monthly assessment payment toward fines first.
        </p>
      </div>

      <StatutoryAuditStamp />

      <LateFeeAuditorClient />

      {/* Statutory Formula & Audit Table */}
      <section className="brief-card p-6 sm:p-8 space-y-5 no-print">
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9a7622]">
            Statutory Payment-Waterfall &amp; Fee Caps
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            State Late-Fee Ceilings, Interest Caps &amp; Payment Priority Rules
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            HOA management software often defaults to applying incoming homeowner payments to the oldest line item—such as a disputed fine—creating an artificial dues delinquency that triggers cascading late fees and collection charges.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#0f2747]/15 text-[#0f2747] font-extrabold">
                <th className="py-2.5 pr-4">State &amp; Statute</th>
                <th className="py-2.5 pr-4">Late Fee Cap</th>
                <th className="py-2.5 pr-4">Interest Cap</th>
                <th className="py-2.5">Payment Priority Waterfall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">California (Civ. Code §§ 5650, 5655)</td>
                <td className="py-3 pr-4">Greater of $10 or 10%</td>
                <td className="py-3 pr-4">12% APR (assessments only)</td>
                <td className="py-3">Regular assessments first; fines cannot trigger liens</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">Texas (Prop. Code § 209.0063)</td>
                <td className="py-3 pr-4">Reasonable / CC&amp;R limit</td>
                <td className="py-3 pr-4">No interest on disputed fines</td>
                <td className="py-3">Delinquent dues &rarr; current dues &rarr; fees &rarr; fines last</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">Florida (Stat. § 720.3085(3))</td>
                <td className="py-3 pr-4">Greater of $25 or 5%</td>
                <td className="py-3 pr-4">18% APR (unless CC&amp;R lower)</td>
                <td className="py-3">Interest &rarr; late fees &rarr; costs &rarr; delinquent dues</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">Arizona (A.R.S. § 33-1803)</td>
                <td className="py-3 pr-4">Greater of $15 or 10%</td>
                <td className="py-3 pr-4">No foreclosure on fines/fees</td>
                <td className="py-3">Assessments prioritized over penalties</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Real-Case Math Walkthrough & Board Rebuttal Script */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 no-print">
        <div className="brief-card p-6 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9a7622]">
            Real-Case Math Walkthrough
          </div>
          <h3 className="text-lg font-extrabold text-[#0f2747]">
            How a $300 Dues Payment Turns Into $270 in Illegal Fees
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A Texas homeowner owes <strong>$300</strong> in monthly dues while disputing a <strong>$400</strong> fine. They pay <strong>$300</strong> on time, but the HOA posts it to the $400 fine first—leaving &ldquo;$300 unpaid dues&rdquo; and tacking on a <strong>$50 late fee</strong>, <strong>$25 interest</strong>, and a <strong>$195 collection admin fee</strong>. Under <strong>Tex. Prop. Code § 209.0063</strong>, all <strong>$270</strong> in derivative charges are strikeable.
          </p>
        </div>

        <div className="rounded-2xl bg-[#091a32] text-white p-6 space-y-3 border border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#e2c275]">
            Board Rebuttal Counter-Script
          </div>
          <h3 className="text-lg font-extrabold text-white">
            When Management Claims: &ldquo;Our Accounting Software Applies Oldest First&rdquo;
          </h3>
          <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed border-l-2 border-[#c8a24a] pl-3 italic">
            &ldquo;Software defaults do not override state payment-waterfall statutes (Cal. Civ. Code § 5655(a) / Tex. Prop. Code § 209.0063). My $300 remittance satisfied regular assessments in full; please reverse all derivative late fees, interest, and collection admin charges within 10 business days.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Free vs Pro Comparison Block */}
      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <div>
          <h2 className="text-xl font-extrabold text-[#0f2747]">
            Free Ledger Audit vs. Pro Hearing &amp; Certified Demand Kit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Stop $250–$2,500+ in compounding late fees and collection charges with a $24.99 Certified Mail Ledger Reconciliation Kit—typically 10x–80x ROI on your first letter.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#0f2747]/15 text-[#0f2747] font-extrabold">
                <th className="py-2.5 pr-4">Deliverable</th>
                <th className="py-2.5 pr-4">Free Ledger Auditor</th>
                <th className="py-2.5 text-[#9a7622]">Pro Hearing &amp; Demand Kit ($24.99)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Strikeable Charge &amp; Waterfall Calculation</td>
                <td className="py-2.5 pr-4 text-emerald-700 font-semibold">Included</td>
                <td className="py-2.5 text-emerald-700 font-semibold">Included + Line-Item Ledger Sheet</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Certified Mail Ledger Correction Letter (.DOCX)</td>
                <td className="py-2.5 pr-4 text-slate-400">Plain-text draft</td>
                <td className="py-2.5 font-bold text-[#0f2747]">Editable Word + FDCPA/State Notice</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Board Hearing Oral Script &amp; Lien-Stop Checklist</td>
                <td className="py-2.5 pr-4 text-slate-400">Not included</td>
                <td className="py-2.5 font-bold text-[#0f2747]">Included (.DOCX)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bing High-Intent FAQs */}
      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Frequently Asked Questions: HOA Late Fees &amp; Payment Priority
        </h2>
        <div className="divide-y divide-slate-200">
          {FAQS.map((item) => (
            <div key={item.q} className="py-4 space-y-1.5">
              <h3 className="text-sm font-extrabold text-[#0f2747]">{item.q}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
