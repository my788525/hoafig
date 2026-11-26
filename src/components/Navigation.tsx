'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/wizard/', label: 'Dispute Wizard' },
  { href: '/calculators/hoa-fine-compliance/', label: 'Fine Checker' },
  { href: '/calculators/special-assessment-calculator/', label: 'Special Assessments' },
  { href: '/calculators/hoa-late-fee-auditor/', label: 'Late Fee Auditor' },
  { href: '/calculators/arc-override-checker/', label: 'ARC Overrides' },
  { href: '/states/', label: '51 State Laws' },
  { href: '/cases/', label: 'Case Studies' },
  { href: '/guides/', label: 'Defense Guides' }
];

const UTILITY_LINKS = [
  { href: '/statutes/', label: 'Statute Index' },
  { href: '/methodology/', label: 'Methodology' },
  { href: '/changelog/', label: '2026 Changelog' }
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#0f2747] text-white shadow-sm no-print">
      {/* Desktop Top Utility Bar */}
      <div className="hidden lg:block bg-[#091a32] border-b border-white/10 text-[11px] text-slate-300">
        <div className="container-exec py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#e2c275]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              2026 STATUTORY EDITION
            </span>
            <span className="text-slate-400">|</span>
            <span>50 States + D.C. · Primary Code Verified</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            {UTILITY_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white transition">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="container-exec h-16 lg:h-auto lg:py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 group shrink-0"
        >
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
            className="hidden lg:inline-flex px-3.5 py-2 rounded-lg bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] text-xs font-extrabold tracking-tight transition shadow-sm"
          >
            Audit My Fine →
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white transition"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Slide-Down Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#091a32] shadow-xl">
          <nav className="container-exec py-4 flex flex-col">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#e2c275] pb-2">
              Workbenches &amp; Statutes
            </div>
            <div className="flex flex-col divide-y divide-white/10">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-semibold text-slate-100 hover:text-[#e2c275] transition flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-slate-500 text-xs">→</span>
                </Link>
              ))}
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pt-5 pb-2">
              Reference &amp; Index
            </div>
            <div className="flex flex-col divide-y divide-white/10">
              {UTILITY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium text-slate-300 hover:text-white transition flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-slate-500 text-xs">→</span>
                </Link>
              ))}
            </div>

            <div className="pt-5 pb-2">
              <Link
                href="/calculators/hoa-fine-compliance/"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] text-sm font-extrabold tracking-tight transition shadow-md"
              >
                Audit My Fine →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
