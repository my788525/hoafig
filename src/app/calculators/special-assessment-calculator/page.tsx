import type { Metadata } from 'next';
import Link from 'next/link';
import SpecialAssessmentClient from './SpecialAssessmentClient';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Special Assessment Calculator (2026)',
  description:
    'Calculate per-unit HOA special assessment exposure, reserve study percent-funded ratio, monthly dues spike, and state homeowner-vote thresholds.',
  alternates: { canonical: '/calculators/special-assessment-calculator/' }
};

const FAQS = [
  {
    q: 'When does an HOA special assessment require a homeowner vote?',
    a: 'Thresholds depend on state law and your recorded CC&Rs. California Civil Code § 5605(b) requires a majority vote of a quorum of members for special assessments exceeding 5% of budgeted gross expenses, while UCIOA states (CO, WA, NV, CT) allow owners to veto budgets or special assessments at a ratification meeting.'
  },
  {
    q: 'What reserve percent-funded ratio triggers special assessment risk?',
    a: 'Reserve ratios below 30% are considered critically underfunded and frequently force boards to levy lump-sum special assessments for roofs, paving, or structural repairs. Healthy associations maintain 70%–100% funded reserves.'
  },
  {
    q: 'Can an HOA board pass a special assessment without competitive bids or a reserve study?',
    a: 'Many state statutes and governing documents require competitive bidding above set dollar thresholds and periodic reserve studies (e.g., Florida SIRS under § 718.112 / § 720.303 and California Civ. Code § 5550). Skipping mandatory reserve disclosures or open-meeting notice can make an assessment procedurally challengeable.'
  },
  {
    q: 'Can I demand an installment payment plan for a large HOA special assessment?',
    a: 'Yes, in several jurisdictions and under FHA/board hardship policies, owners can request a structured payment plan before delinquency interest or liens attach, and California Civ. Code § 5665 expressly entitles owners to request a written payment plan.'
  },
  {
    q: 'How do I inspect the HOA reserve study and contractor bids before paying?',
    a: 'Submit a written Statutory Records Inspection Demand via Certified Mail citing your state HOA records statute (such as Cal. Civ. Code § 5200, Fla. Stat. § 720.303(5), or Tex. Prop. Code § 209.005), which typically gives the association 5 to 10 business days to produce budgets, reserve studies, and vendor contracts.'
  },
  {
    q: 'What happens if the HOA board mislabels a capital improvement as an emergency assessment?',
    a: 'Emergency exceptions are narrowly construed—typically limited to court orders, extraordinary life-safety hazards, or unforeseen expenses that could not be reasonably foreseen. Cosmetic upgrades or deferred maintenance from years of underfunding rarely qualify as a legal emergency to bypass a homeowner vote.'
  }
];

export default function SpecialAssessmentPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: 'HOA Special Assessment & Reserve Shortfall Calculator',
          description: 'Estimate per-unit special assessments, reserve shortfalls, and state voting thresholds.',
          url: '/calculators/special-assessment-calculator/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' },
          { name: 'Special Assessment Calculator', url: '/calculators/special-assessment-calculator/' }
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/calculators/" className="hover:text-[#0f2747]">Calculators</Link>
          <span>/</span>
          <span className="text-[#0f2747]">Special Assessment Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          HOA Special Assessment &amp; Reserve Shortfall Estimator
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Audit your association’s reserve study shortfall, calculate your exact per-unit assessment and monthly dues impact, and verify whether state law requires a homeowner vote.
        </p>
      </div>

      <SpecialAssessmentClient />

      {/* Statutory Formula & Audit Table */}
      <section className="brief-card p-6 sm:p-8 space-y-5 no-print">
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9a7622]">
            Statutory Authority &amp; Reserve Math
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            Special Assessment Voting Thresholds &amp; Reserve Study Triggers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            Per-unit exposure is calculated as <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[#0f2747]">(Project Cost − Current Reserve Balance) ÷ Total Units</code>, while reserve health is measured by <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[#0f2747]">Reserve Balance ÷ Recommended Target × 100</code>. When boards bypass homeowner ratification or mandatory reserve disclosures, state law provides direct procedural remedies.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#0f2747]/15 text-[#0f2747] font-extrabold">
                <th className="py-2.5 pr-4">Jurisdiction / Rule</th>
                <th className="py-2.5 pr-4">Statutory Trigger</th>
                <th className="py-2.5 pr-4">Homeowner Vote / Veto Right</th>
                <th className="py-2.5">Reserve Study Mandate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">California (Civ. Code § 5605)</td>
                <td className="py-3 pr-4">&gt; 5% of budgeted gross expenses</td>
                <td className="py-3 pr-4">Mandatory majority vote of quorum</td>
                <td className="py-3">3-year visual inspection (§ 5550)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">Florida (Stat. § 718.112 / § 720.303)</td>
                <td className="py-3 pr-4">14-day mailed notice + line-item purpose</td>
                <td className="py-3 pr-4">No general vote unless CC&amp;Rs require; SIRS non-waivable</td>
                <td className="py-3">Mandatory SIRS every 10 yrs (3+ stories)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">Illinois (765 ILCS 605/18)</td>
                <td className="py-3 pr-4">&gt; 115% of prior-year assessments</td>
                <td className="py-3 pr-4">20% owner petition forces veto vote</td>
                <td className="py-3">Reasonable reserves required annually</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">UCIOA States (CO, WA, NV, CT)</td>
                <td className="py-3 pr-4">Any board-adopted budget / assessment</td>
                <td className="py-3 pr-4">Majority owner veto at ratification meeting</td>
                <td className="py-3">3–5 yr study &amp; funding plan (WA/NV/CO)</td>
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
            160-Unit HOA: $480,000 Paving Assessment vs. 5% Cap
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Suppose a 160-unit California association with a <strong>$1,200,000</strong> annual gross budget announces a <strong>$480,000</strong> paving project with <strong>$180,000</strong> in reserves. The net shortfall is <strong>$300,000</strong> (<strong>$1,875 per unit</strong>, or <strong>+$156/month</strong> over 12 months). Because $300,000 equals <strong>25%</strong> of the $1,200,000 annual budget—five times the 5% statutory ceiling ($60,000)—the board cannot levy the assessment by board resolution alone.
          </p>
        </div>

        <div className="rounded-2xl bg-[#091a32] text-white p-6 space-y-3 border border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#e2c275]">
            Board Rebuttal Counter-Script
          </div>
          <h3 className="text-lg font-extrabold text-white">
            When Board Claims: &ldquo;CC&amp;Rs Let Us Pass Any Assessment&rdquo;
          </h3>
          <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed border-l-2 border-[#c8a24a] pl-3 italic">
            &ldquo;Under controlling state law (e.g., Cal. Civ. Code § 5605(b) / 765 ILCS 605/18(a)(8)), statutory member-ratification and 5% budget ceilings supersede conflicting CC&amp;R clauses. Unless the board produces a certified emergency finding and all competitive bids under our statutory records inspection demand, this unvoted assessment is unenforceable.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Free vs Pro Comparison Block */}
      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-[#0f2747]">
              Free Compliance Check vs. Pro Reserve Audit &amp; Petition Pack
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Compare the free instant calculator against the $39.99 Certified Mail &amp; .DOCX Petition Pack—often a 40x–100x ROI against a $1,800–$15,000+ special assessment.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#0f2747]/15 text-[#0f2747] font-extrabold">
                <th className="py-2.5 pr-4">Deliverable</th>
                <th className="py-2.5 pr-4">Free Estimator</th>
                <th className="py-2.5 text-[#9a7622]">Pro Reserve &amp; Petition Pack ($39.99)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Per-Unit Shortfall &amp; Percent-Funded Math</td>
                <td className="py-2.5 pr-4 text-emerald-700 font-semibold">Included</td>
                <td className="py-2.5 text-emerald-700 font-semibold">Included + Multi-Year Workbook</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">51-State Vote Threshold &amp; Emergency Audit</td>
                <td className="py-2.5 pr-4 text-emerald-700 font-semibold">Included</td>
                <td className="py-2.5 text-emerald-700 font-semibold">Included + Statutory Citations</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Certified Mail Records &amp; Bid Inspection Demand (.DOCX)</td>
                <td className="py-2.5 pr-4 text-slate-400">Preview only</td>
                <td className="py-2.5 font-bold text-[#0f2747]">Editable Word + Certified Mail Log</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Homeowner Recall / Special Meeting Petition Templates</td>
                <td className="py-2.5 pr-4 text-slate-400">Not included</td>
                <td className="py-2.5 font-bold text-[#0f2747]">Signature Sheet + Notice Script</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bing High-Intent FAQs */}
      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Frequently Asked Questions: HOA Special Assessments &amp; Reserves
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
