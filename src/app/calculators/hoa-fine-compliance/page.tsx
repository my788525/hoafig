import type { Metadata } from 'next';
import Link from 'next/link';
import HoaFineComplianceClient from './HoaFineComplianceClient';
import StatutoryAuditStamp from '@/components/StatutoryAuditStamp';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Fine Compliance & Statutory Cap Checker (2026)',
  description:
    'Audit any HOA fine, daily penalty, late-fee stacking, or hearing notice against 2026 state statutory caps across all 50 states and D.C. Generate a printable Hearing Brief.',
  alternates: { canonical: '/calculators/hoa-fine-compliance/' }
};

const FAQS = [
  {
    q: 'Which states have hard statutory dollar caps on HOA fines?',
    a: 'California caps non-health/safety fines at $100 per violation (Cal. Civ. Code § 5850); Florida caps continuing fines at $100/day up to $1,000 aggregate (Fla. Stat. § 720.305); Nevada caps fines at $100/violation ($1,000 max); Colorado and Utah cap continuing fines at $500; North Carolina caps fines at $100/day; and Virginia caps fines at $50 single / $10 per day up to 90 days ($900).'
  },
  {
    q: 'What happens if an HOA skips the mandatory hearing or independent committee?',
    a: 'In states with mandatory pre-fine due process (such as Florida § 720.305(2)(b), Texas § 209.006, California § 5855, and Colorado § 38-33.3-209.5), skipping the required notice, cure window, or independent committee renders the fine procedurally void.'
  }
];

export default function HoaFineCompliancePage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: 'HOA Fine Compliance & Statutory Cap Checker',
          description: 'Interactive 51-jurisdiction HOA fine cap, notice window, and independent committee compliance auditor.',
          url: '/calculators/hoa-fine-compliance/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' },
          { name: 'HOA Fine Compliance Checker', url: '/calculators/hoa-fine-compliance/' }
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/calculators/" className="hover:text-[#0f2747]">Calculators</Link>
          <span>/</span>
          <span className="text-[#0f2747]">HOA Fine Compliance Checker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          HOA Fine Compliance &amp; Statutory Cap Checker
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Compare your HOA violation notice, daily fine accrual, late fees, and hearing notice against 2026 primary state statutes—and generate a printable Board Hearing Brief &amp; Certified Mail demand letter.
        </p>
      </div>

      <StatutoryAuditStamp />

      <HoaFineComplianceClient />

      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9a7622]">
            Worked Verification Math Example
          </div>
          <h2 className="text-xl font-extrabold text-[#0f2747]">
            Statutory Fine Cap &amp; Daily Accrual Audit Math
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-1.5">
            <div className="font-extrabold text-[#0f2747]">
              Example 1: California Non-Health/Safety Fine (Cal. Civ. Code § 5850)
            </div>
            <p>
              An HOA bills <strong>$250/week × 4 weeks = $1,000</strong> for an unapproved mailbox paint color. Under Cal. Civ. Code § 5850, non-health/safety fines are capped at <strong>$100 per violation</strong>.
            </p>
            <p className="font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
              $1,000 billed − $100 statutory cap = $900 unlawful overcharge (or $1,000 void if 10-day § 5855 hearing notice was skipped).
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-1.5">
            <div className="font-extrabold text-[#0f2747]">
              Example 2: Florida Continuing Violation (Fla. Stat. § 720.305(2))
            </div>
            <p>
              An HOA accrues <strong>$100/day × 18 days = $1,800</strong> for lawn edging. Florida § 720.305(2) caps continuing fines at <strong>$100/day up to $1,000 aggregate</strong> (unless governing documents expressly authorize more) and requires a <strong>14-day notice</strong> plus an <strong>independent 3-member committee</strong>.
            </p>
            <p className="font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
              $1,800 billed − $1,000 cap = $800 over-cap excess (100% void if independent committee was omitted).
            </p>
          </div>
        </div>
      </section>

      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <h2 className="text-xl font-extrabold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
