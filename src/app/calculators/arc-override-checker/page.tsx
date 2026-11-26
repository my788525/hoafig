import type { Metadata } from 'next';
import Link from 'next/link';
import ArcOverrideClient from './ArcOverrideClient';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Solar, EV & FCC OTARD Override Checker (2026)',
  description:
    'Check if federal FCC OTARD (47 C.F.R. § 1.4000) or state Solar Access and EV Right-to-Charge statutes override your HOA architectural denial.',
  alternates: { canonical: '/calculators/arc-override-checker/' }
};

const FAQS = [
  {
    q: 'Does FCC OTARD override HOA bans on Starlink and satellite dishes?',
    a: 'Yes. Under federal regulation 47 C.F.R. § 1.4000 (FCC OTARD), homeowners associations in all 50 states cannot ban, unreasonably delay, or impose unreasonable expense on satellite dishes or fixed-wireless antennas 1 meter or smaller—including Starlink—installed on exclusive-use property such as your roof, balcony, patio, or yard.'
  },
  {
    q: 'When can an HOA legally restrict rooftop solar panels?',
    a: 'In Solar Access states such as California (Civ. Code § 714), Florida (Stat. § 163.04), Texas (Prop. Code § 202.010), and Arizona (A.R.S. § 33-439 / § 33-1816), an HOA may only impose reasonable aesthetic restrictions that do not significantly increase system cost or decrease efficiency. Under California § 714, any condition adding more than $1,000 in cost or reducing efficiency by more than 10% is void.'
  },
  {
    q: 'What does a state EV Right-to-Charge statute allow?',
    a: 'State Right-to-Charge laws (including California Civ. Code § 4745, Florida Stat. § 718.113(8), Colorado § 38-33.3-106.8, and New York RPL § 339-ll) void HOA covenants that prohibit Level 1 or Level 2 EV charger installations in an owner’s garage or exclusive-use deeded parking space, subject to licensed installation and standard insurance.'
  },
  {
    q: 'What is "deemed approved" if an HOA ARC ignores my solar application?',
    a: 'Several states enforce automatic approval deadlines if the Architectural Review Committee fails to issue a written decision in time. For example, California Civil Code § 714(e)(2) deems a complete solar application approved if not denied in writing within 45 days.'
  },
  {
    q: 'Can the HOA fine me for installing a dish or solar array after citing federal or state preemption?',
    a: 'Enforcing a preempted CC&R clause exposes the association to statutory fee-shifting and attorney-fee liability. Serving a formal Certified Mail Statutory Preemption Notice documenting the exact federal or state code puts the board on legal notice before any fining hearing.'
  }
];

export default function ArcOverridePage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: 'HOA Solar, EV & FCC OTARD Override Checker',
          description: 'Verify federal and state statutory preemption over HOA architectural denials.',
          url: '/calculators/arc-override-checker/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' },
          { name: 'ARC Override Checker', url: '/calculators/arc-override-checker/' }
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/calculators/" className="hover:text-[#0f2747]">Calculators</Link>
          <span>/</span>
          <span className="text-[#0f2747]">ARC Statutory Override Checker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          ARC Solar, EV Charger &amp; FCC OTARD Override Checker
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Determine whether federal FCC OTARD preemption or state Solar Access / Right-to-Charge statutes void your HOA’s architectural denial or unreasonable placement conditions.
        </p>
      </div>

      <ArcOverrideClient />

      {/* Statutory Formula & Audit Table */}
      <section className="brief-card p-6 sm:p-8 space-y-5 no-print">
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9a7622]">
            Federal &amp; State Preemption Matrix
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
            FCC OTARD, Solar Access &amp; EV Right-to-Charge Override Thresholds
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            Under federal supremacy and state statutory public policy, recorded CC&amp;Rs cannot enforce bans or cost-prohibitive rerouting rules on protected clean-energy and communications equipment.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#0f2747]/15 text-[#0f2747] font-extrabold">
                <th className="py-2.5 pr-4">Protection Category</th>
                <th className="py-2.5 pr-4">Controlling Statute</th>
                <th className="py-2.5 pr-4">Hard Cost / Efficiency Cap</th>
                <th className="py-2.5">Deemed-Approved / Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">FCC OTARD (All 50 States)</td>
                <td className="py-3 pr-4">47 C.F.R. § 1.4000</td>
                <td className="py-3 pr-4">No unreasonable expense or delay</td>
                <td className="py-3">Dishes/antennas ≤1m on exclusive-use area</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">California Solar Access</td>
                <td className="py-3 pr-4">Cal. Civ. Code § 714</td>
                <td className="py-3 pr-4">&le; $1,000 added cost / &le; 10% loss</td>
                <td className="py-3">45-day automatic deemed approval</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">Florida / Texas Solar</td>
                <td className="py-3 pr-4">FL § 163.04 / TX Prop. Code § 202.010</td>
                <td className="py-3 pr-4">No impairment of system performance</td>
                <td className="py-3">South/east/west roof facing protected</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-[#0f2747]">EV Right-to-Charge</td>
                <td className="py-3 pr-4">CA § 4745 / CO § 38-33.3-106.8 / FL § 718.113</td>
                <td className="py-3 pr-4">Reasonable aesthetics only; no blanket ban</td>
                <td className="py-3">60-day review limit (CA) in deeded space</td>
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
            CA Rooftop Solar: $2,800 Rear-Roof Reroute + 14% Loss
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            An ARC demands that a homeowner move solar panels off a street-facing south roof to a shaded north slope, adding <strong>$2,800</strong> in conduit/racking labor and cutting kWh output by <strong>14%</strong>, after holding the file for <strong>48 days</strong>. Under <strong>Cal. Civ. Code § 714</strong>, the HOA violates all three statutory guardrails ($2,800 &gt; $1,000 cap, 14% &gt; 10% efficiency loss, and 48 &gt; 45 days), rendering the denial void as a matter of law.
          </p>
        </div>

        <div className="rounded-2xl bg-[#091a32] text-white p-6 space-y-3 border border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#e2c275]">
            Board Rebuttal Counter-Script
          </div>
          <h3 className="text-lg font-extrabold text-white">
            When Board Claims: &ldquo;Our CC&amp;Rs Ban Visible Panels / Dishes&rdquo;
          </h3>
          <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed border-l-2 border-[#c8a24a] pl-3 italic">
            &ldquo;Recorded CC&amp;R aesthetic bans are void and unenforceable to the extent they conflict with 47 C.F.R. § 1.4000 (FCC OTARD) or state Solar Access / Right-to-Charge statutes. Any attempt to impose fines or deny installation triggers statutory prevailing-party attorney fees.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Free vs Pro Comparison Block */}
      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <div>
          <h2 className="text-xl font-extrabold text-[#0f2747]">
            Free Preemption Check vs. Pro Statutory Override Kit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Protect a $2,800–$25,000 solar, EV, or Starlink installation with a $29.99 Certified Mail Preemption Packet—over 90x–800x ROI vs. forced rerouting or legal retainers.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-[#0f2747]/15 text-[#0f2747] font-extrabold">
                <th className="py-2.5 pr-4">Deliverable</th>
                <th className="py-2.5 pr-4">Free Override Checker</th>
                <th className="py-2.5 text-[#9a7622]">Pro Statutory Override Kit ($29.99)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="py-2.5 pr-4 font-semibold">51-State Solar, EV &amp; FCC OTARD Verdict</td>
                <td className="py-2.5 pr-4 text-emerald-700 font-semibold">Included</td>
                <td className="py-2.5 text-emerald-700 font-semibold">Included + Full Statutory Brief</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">Certified Mail Preemption Demand Letter (.DOCX)</td>
                <td className="py-2.5 pr-4 text-slate-400">Plain-text draft</td>
                <td className="py-2.5 font-bold text-[#0f2747]">Editable Word + Attorney-Fee Warning</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold">ARC Re-Submission &amp; Cost-Impact Audit Sheet</td>
                <td className="py-2.5 pr-4 text-slate-400">Not included</td>
                <td className="py-2.5 font-bold text-[#0f2747]">Contractor Quote Comparison Template</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bing High-Intent FAQs */}
      <section className="brief-card p-6 sm:p-8 space-y-4 no-print">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Frequently Asked Questions: Solar, EV &amp; FCC OTARD Overrides
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
