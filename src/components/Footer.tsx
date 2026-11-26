import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#09221c] text-emerald-50/80 border-t border-[#19473a] mt-16 no-print">
      <div className="container-exec py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
          <div className="text-lg font-extrabold text-white">
            HOA<span className="text-[#c8a24a]">Fig</span>.com
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Institutional-grade U.S. HOA fine compliance, special assessment reserve auditing, and board hearing defense platform. Verified against 2026 state statutory codes across all 51 jurisdictions.
          </p>
          <p className="text-[11px] text-slate-500">
            Educational &amp; statutory compliance reference only; not a law firm or substitute for licensed legal counsel.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#e2c275]">Executive Calculators</h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/calculators/hoa-fine-compliance/" className="hover:text-white transition">HOA Fine Compliance Checker</Link></li>
            <li><Link href="/calculators/special-assessment-calculator/" className="hover:text-white transition">Special Assessment &amp; Reserve Estimator</Link></li>
            <li><Link href="/calculators/hoa-late-fee-auditor/" className="hover:text-white transition">Late Fee &amp; Payment Priority Auditor</Link></li>
            <li><Link href="/calculators/arc-override-checker/" className="hover:text-white transition">ARC Solar, EV &amp; OTARD Override Checker</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#e2c275]">Statutory Authority</h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/states/" className="hover:text-white transition">51-State HOA Statute Directory</Link></li>
            <li><Link href="/statutes/" className="hover:text-white transition">2026 Master Statute Matrix</Link></li>
            <li><Link href="/cases/" className="hover:text-white transition">Real-Ledger Case Studies</Link></li>
            <li><Link href="/guides/" className="hover:text-white transition">Homeowner Defense Guides</Link></li>
            <li><Link href="/pitfalls/" className="hover:text-white transition">HOA Pitfalls &amp; Traps Playbook</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#e2c275]">Governance &amp; Legal</h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/methodology/" className="hover:text-white transition">Audit Methodology</Link></li>
            <li><Link href="/editorial-policy/" className="hover:text-white transition">Editorial Policy</Link></li>
            <li><Link href="/changelog/" className="hover:text-white transition">2026 Statutory Changelog</Link></li>
            <li><Link href="/about/" className="hover:text-white transition">About HOAFig</Link></li>
            <li><Link href="/contact/" className="hover:text-white transition">Contact &amp; Corrections</Link></li>
            <li><Link href="/privacy/" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:text-white transition">Terms of Use</Link></li>
            <li><Link href="/disclaimer/" className="hover:text-white transition">Legal Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-exec py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>© 2026 HOAFig.com · U.S. Homeowner Statutory Defense Platform</span>
          <span>100% In-Browser Computation · Zero Cloud Upload of Personal Notices</span>
        </div>
      </div>
    </footer>
  );
}
