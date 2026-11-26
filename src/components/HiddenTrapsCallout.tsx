import Link from 'next/link';

export default function HiddenTrapsCallout() {
  return (
    <section
      aria-label="Before You Pay or Reply to Your HOA: 3 Hidden Traps"
      className="brief-card border-2 border-amber-500/40 bg-amber-50/60 p-5 sm:p-6 space-y-4 no-print"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-600 text-white text-xs font-black shrink-0">
            !
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
              Homeowner Survival Alert
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0f2747] leading-snug">
              Before You Pay or Reply to Your HOA: 3 Hidden Traps
            </h3>
          </div>
        </div>
        <Link
          href="/pitfalls/"
          className="text-xs font-extrabold text-[#0f2747] hover:text-amber-800 underline shrink-0"
        >
          Read All 6 Real-Case Traps →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white/90 border border-amber-200/70 rounded-xl p-4 space-y-1.5">
          <div className="font-extrabold text-[#0f2747]">
            1. Never Withhold Monthly Dues
          </div>
          <p className="text-slate-600 leading-relaxed">
            Pausing regular dues in protest triggers liens and foreclosure waterfalls. Keep paying regular dues marked{' '}
            <strong className="text-[#0f2747]">&ldquo;Regular Assessment Only&rdquo;</strong> and dispute the fine separately.
          </p>
        </div>

        <div className="bg-white/90 border border-amber-200/70 rounded-xl p-4 space-y-1.5">
          <div className="font-extrabold text-[#0f2747]">
            2. Don&apos;t Rely on HOA Portal Chat
          </div>
          <p className="text-slate-600 leading-relaxed">
            Venting in the web portal rarely counts as a statutory hearing request. Send a formal written request via{' '}
            <strong className="text-[#0f2747]">USPS Certified Mail</strong> within your 10–30 day deadline.
          </p>
        </div>

        <div className="bg-white/90 border border-amber-200/70 rounded-xl p-4 space-y-1.5">
          <div className="font-extrabold text-[#0f2747]">
            3. Demand Ledger &amp; Committee Proof
          </div>
          <p className="text-slate-600 leading-relaxed">
            Check for illegal fine interest (<code className="font-mono text-[11px]">Cal. Civ. Code § 5850</code>), missing 3-member fining committees, or 3-year Reserve Studies before paying.
          </p>
        </div>
      </div>
    </section>
  );
}
