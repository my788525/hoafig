import type { Metadata } from 'next';
import Link from 'next/link';
import { PITFALLS_2026, PITFALLS_FAQS } from '@/data/pitfalls_2026';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Pitfalls & Survival Playbook (2026)',
  description:
    '6 real-case HOA traps that cost homeowners thousands—from withholding monthly dues and portal chat waivers to illegal fine interest and 1990s CC&R bluffs—and the exact statutory survival moves.',
  alternates: { canonical: '/pitfalls/' }
};

export default function PitfallsPage() {
  const firstHalf = PITFALLS_2026.slice(0, 3);
  const secondHalf = PITFALLS_2026.slice(3);

  return (
    <div className="pb-14 space-y-12">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Pitfalls & Survival Playbook', url: '/pitfalls/' }
          ]),
          faqJsonLd(PITFALLS_FAQS)
        ]}
      />

      {/* Hero */}
      <section className="bg-[#0f2747] text-white border-b border-slate-800">
        <div className="container-exec py-12 sm:py-16 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
            Real-Case Homeowner Defense · 2026 Edition
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl">
            Real-World HOA Pitfalls, Black Holes &amp; Survival Playbook
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Most homeowners lose unfair HOA disputes not because they broke a rule, but because they step into procedural traps—withholding monthly dues, replying in web portals, or paying illegal fines without demanding statutory records. Here are the 6 costly black holes and the exact survival move for each.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/wizard/"
              className="px-5 py-3 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] font-extrabold text-xs sm:text-sm transition shadow-md"
            >
              Launch 4-Step Dispute Wizard →
            </Link>
            <Link
              href="/calculators/hoa-fine-compliance/"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm transition"
            >
              Audit My HOA Fine
            </Link>
          </div>
        </div>
      </section>

      {/* Vignettes 1-3 */}
      <section className="container-exec space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[#0f2747]">
            Traps 01–03: Payment, Notice &amp; Ledger Black Holes
          </h2>
          <p className="text-sm text-slate-600">
            Immediate procedural mistakes that turn a small disputed fine into a lien or waived defense.
          </p>
        </div>

        <div className="space-y-6">
          {firstHalf.map((item) => (
            <article key={item.id} id={item.id} className="brief-card p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#0f2747] text-[#e2c275] font-mono font-extrabold text-sm flex items-center justify-center shrink-0">
                    {item.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      {item.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f2747] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-bold">
                  {item.exposureExample}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    Real-World Case Scenario
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item.scenario}</p>
                </div>

                <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-4 space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700">
                    The Hidden Black Hole
                  </div>
                  <p className="text-slate-800 leading-relaxed">{item.blackHole}</p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                    Exact Survival Move
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">{item.survivalMove}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="font-mono text-slate-600">
                  <span className="font-bold text-[#0f2747]">Applicable Statute:</span> {item.statute}
                </div>
                <Link
                  href={item.relatedToolHref}
                  className="font-extrabold text-[#059669] hover:text-[#0f2747] transition"
                >
                  {item.relatedToolLabel} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Inline Offer at ~35-40% Scroll Depth */}
      <div className="container-exec">
        <ToolPaywallDossier
          badge="2026 Homeowner Defense Kit"
          title="Stop Stepping Into HOA Traps: Download Certified Mail & Audit Templates"
          desc="Get editable Word (.DOCX) Certified Mail Hearing & Records Demands, Selective Enforcement Exhibit Logs, and the 51-State Statute Matrix so your response is legally bulletproof."
          price="$24.99"
          pid="pdt_0NsmkloFUuNMrFIQIYxtQ"
          docType="Certified Mail & Defense Packet"
          features={[
            'Editable Certified Mail Hearing Request (.DOCX)',
            '3-Year Reserve & Vendor Bid Demand Letter',
            'Selective Enforcement Photo Exhibit Log',
            '51-State Statutory Citation Matrix (2026)'
          ]}
        />
      </div>

      {/* Vignettes 4-6 */}
      <section className="container-exec space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[#0f2747]">
            Traps 04–06: Evidence, Preemption &amp; Special Assessment Traps
          </h2>
          <p className="text-sm text-slate-600">
            How boards bluff homeowners out of valid selective-enforcement, solar/Starlink, and reserve-audit rights.
          </p>
        </div>

        <div className="space-y-6">
          {secondHalf.map((item) => (
            <article key={item.id} id={item.id} className="brief-card p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#0f2747] text-[#e2c275] font-mono font-extrabold text-sm flex items-center justify-center shrink-0">
                    {item.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      {item.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f2747] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono font-bold">
                  {item.exposureExample}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    Real-World Case Scenario
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item.scenario}</p>
                </div>

                <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-4 space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700">
                    The Hidden Black Hole
                  </div>
                  <p className="text-slate-800 leading-relaxed">{item.blackHole}</p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                    Exact Survival Move
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">{item.survivalMove}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="font-mono text-slate-600">
                  <span className="font-bold text-[#0f2747]">Applicable Statute:</span> {item.statute}
                </div>
                <Link
                  href={item.relatedToolHref}
                  className="font-extrabold text-[#059669] hover:text-[#0f2747] transition"
                >
                  {item.relatedToolLabel} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-exec space-y-5">
        <h2 className="text-2xl font-extrabold text-[#0f2747]">
          Frequently Asked HOA Trap &amp; Survival Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PITFALLS_FAQS.map((faq, i) => (
            <div key={i} className="brief-card p-5 space-y-2">
              <h3 className="text-sm font-extrabold text-[#0f2747]">{faq.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
