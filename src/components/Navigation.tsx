import Link from 'next/link';

const NAV_LINKS = [
  { href: '/calculators/hoa-fine-compliance/', label: 'Fine Checker' },
  { href: '/calculators/special-assessment-calculator/', label: 'Special Assessments' },
  { href: '/calculators/hoa-late-fee-auditor/', label: 'Late Fee Auditor' },
  { href: '/calculators/arc-override-checker/', label: 'ARC Overrides' },
  { href: '/states/', label: '51 State Laws' },
  { href: '/cases/', label: 'Case Studies' },
  { href: '/guides/', label: 'Defense Guides' }
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#0f2747] text-white shadow-sm no-print">
      <div className="bg-[#091a32] border-b border-white/10 text-[11px] text-slate-300">
        <div className="container-exec py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#e2c275]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              2026 STATUTORY EDITION
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline">50 States + D.C. · Primary Code Verified</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Link href="/statutes/" className="hover:text-white transition">Statute Index</Link>
            <Link href="/methodology/" className="hover:text-white transition">Methodology</Link>
            <Link href="/changelog/" className="hover:text-white transition">2026 Changelog</Link>
          </div>
        </div>
      </div>

      <div className="container-exec py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#1a3b68] border border-[#c8a24a]/60 flex items-center justify-center font-black text-white text-base tracking-tight group-hover:border-[#c8a24a] transition">
            H
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-white leading-none">
              HOA<span className="text-[#c8a24a]">Fig</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold mt-0.5">
              Statutory Defense Workbench
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/calculators/hoa-fine-compliance/"
            className="px-3.5 py-2 rounded-lg bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] text-xs font-extrabold tracking-tight transition shadow-sm"
          >
            Audit My Fine →
          </Link>
        </div>
      </div>

      {/* Mobile / Tablet Quick Bar */}
      <div className="lg:hidden border-t border-white/10 bg-[#091a32]/80 overflow-x-auto">
        <div className="container-exec py-2 flex items-center gap-3 text-xs whitespace-nowrap">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-200 hover:text-[#e2c275] font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
