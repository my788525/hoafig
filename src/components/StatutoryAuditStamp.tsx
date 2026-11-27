import Link from 'next/link';

export default function StatutoryAuditStamp() {
  return (
    <div className="no-print rounded-xl border border-emerald-900/15 bg-emerald-50/70 px-4 py-2.5 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="inline-flex items-center gap-1.5 font-extrabold text-[#0c2921]">
          <svg
            className="w-4 h-4 text-emerald-700 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Statutory Audit Stamp:
        </span>
        <span>
          Verified against State HOA/Condo Acts (e.g.{' '}
          <a
            href="https://leginfo.legislature.ca.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-emerald-700/50 font-semibold text-[#0f2747] hover:text-[#9a7622]"
          >
            CA Davis-Stirling §5850
          </a>
          ,{' '}
          <a
            href="https://www.leg.state.fl.us/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-emerald-700/50 font-semibold text-[#0f2747] hover:text-[#9a7622]"
          >
            FL §720.305
          </a>
          ,{' '}
          <a
            href="https://statutes.capitol.texas.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-emerald-700/50 font-semibold text-[#0f2747] hover:text-[#9a7622]"
          >
            TX §209.006
          </a>
          ) · <strong className="text-[#0c2921]">Audited Nov 2026</strong>
        </span>
      </div>
      <div className="flex items-center gap-3 text-[11px] font-semibold">
        <Link href="/methodology/" className="text-[#0f2747] hover:underline">
          Audit Methodology
        </Link>
        <span className="text-slate-300">·</span>
        <Link href="/editorial-policy/" className="text-[#0f2747] hover:underline">
          Editorial Policy
        </Link>
      </div>
    </div>
  );
}
