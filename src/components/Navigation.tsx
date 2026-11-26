'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const CALCULATOR_LINKS = [
  { href: '/calculators/hoa-fine-compliance/', label: 'Fine Compliance Checker' },
  { href: '/calculators/special-assessment-calculator/', label: 'Special Assessments' },
  { href: '/calculators/hoa-late-fee-auditor/', label: 'Late Fee Auditor' },
  { href: '/calculators/arc-override-checker/', label: 'ARC Overrides' },
  { href: '/calculators/selective-enforcement-analyzer/', label: 'Selective Enforcement' },
  { href: '/calculators/ccr-preemption-checker/', label: 'CC&R Preemption' }
];

const RESEARCH_LINKS = [
  { href: '/cases/', label: 'Case Studies' },
  { href: '/guides/', label: 'Defense Guides' },
  { href: '/statutes/', label: 'Statute Index' },
  { href: '/methodology/', label: 'Methodology' }
];

const MOBILE_PRIMARY_LINKS = [
  { href: '/wizard/', label: 'Dispute Wizard' },
  ...CALCULATOR_LINKS,
  { href: '/states/', label: '51 States' },
  { href: '/pitfalls/', label: 'Pitfalls & Traps' }
];

function HoaFigCrest() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 rounded-lg border border-[#c8a24a]/65 group-hover:border-[#c8a24a] transition"
    >
      <rect width="36" height="36" rx="8" fill="#0c2921" />
      <path
        d="M7 16.5L18 8L29 16.5"
        stroke="#c8a24a"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 16.5H26.5" stroke="#c8a24a" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="11.2" y="18.2" width="2.6" height="8" rx="0.6" fill="#c8a24a" />
      <rect x="16.7" y="18.2" width="2.6" height="8" rx="0.6" fill="#e2c275" />
      <rect x="22.2" y="18.2" width="2.6" height="8" rx="0.6" fill="#c8a24a" />
      <path d="M9 27.6H27" stroke="#c8a24a" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'calculators' | 'research' | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#19473a] bg-[#09221c] text-white shadow-sm no-print">
      <div className="container-exec h-[72px] flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => {
            setMobileOpen(false);
            setOpenDropdown(null);
          }}
          className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap"
        >
          <HoaFigCrest />
          <div className="shrink-0">
            <div className="text-lg font-extrabold tracking-tight text-white leading-none whitespace-nowrap">
              HOA<span className="text-[#c8a24a]">Fig</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-emerald-200/75 font-semibold mt-0.5 whitespace-nowrap">
              Statutory Defense
            </div>
          </div>
        </Link>

        <nav ref={navRef} className="hidden lg:flex items-center gap-6" aria-label="Primary Navigation">
          <Link
            href="/wizard/"
            className="whitespace-nowrap text-sm font-semibold text-slate-100 hover:text-[#e2c275] transition"
          >
            Dispute Wizard
          </Link>

          {/* Calculators Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('calculators')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => setOpenDropdown((prev) => (prev === 'calculators' ? null : 'calculators'))}
              aria-expanded={openDropdown === 'calculators'}
              className="whitespace-nowrap inline-flex items-center gap-1 text-sm font-semibold text-slate-100 hover:text-[#e2c275] transition cursor-pointer py-2"
            >
              <span>Calculators</span>
              <span className="text-[11px] text-[#c8a24a]">▾</span>
            </button>
            {openDropdown === 'calculators' && (
              <div className="absolute left-0 top-full pt-1 w-60 z-50">
                <div className="rounded-xl border border-[#19473a] bg-[#0c2921] shadow-2xl py-2">
                  {CALCULATOR_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-[#0f332a] hover:text-[#e2c275] transition whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/states/"
            className="whitespace-nowrap text-sm font-semibold text-slate-100 hover:text-[#e2c275] transition"
          >
            51 States
          </Link>

          <Link
            href="/pitfalls/"
            className="whitespace-nowrap text-sm font-semibold text-slate-100 hover:text-[#e2c275] transition"
          >
            Pitfalls &amp; Traps
          </Link>

          {/* Research Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('research')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => setOpenDropdown((prev) => (prev === 'research' ? null : 'research'))}
              aria-expanded={openDropdown === 'research'}
              className="whitespace-nowrap inline-flex items-center gap-1 text-sm font-semibold text-slate-100 hover:text-[#e2c275] transition cursor-pointer py-2"
            >
              <span>Research</span>
              <span className="text-[11px] text-[#c8a24a]">▾</span>
            </button>
            {openDropdown === 'research' && (
              <div className="absolute left-0 top-full pt-1 w-48 z-50">
                <div className="rounded-xl border border-[#19473a] bg-[#0c2921] shadow-2xl py-2">
                  {RESEARCH_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-[#0f332a] hover:text-[#e2c275] transition whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/wizard/"
            className="hidden lg:inline-flex items-center justify-center whitespace-nowrap shrink-0 px-4 py-2.5 rounded-lg bg-[#c8a24a] hover:bg-[#e2c275] text-[#09221c] text-xs font-extrabold tracking-tight transition shadow-sm"
          >
            Audit Fine →
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
        <div className="lg:hidden border-t border-[#19473a] bg-[#0c2921] shadow-xl">
          <nav className="container-exec py-4 flex flex-col">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#e2c275] pb-2">
              Workbenches &amp; Statutes
            </div>
            <div className="flex flex-col divide-y divide-white/10">
              {MOBILE_PRIMARY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-semibold text-slate-100 hover:text-[#e2c275] transition flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-emerald-400/70 text-xs">→</span>
                </Link>
              ))}
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/70 pt-5 pb-2">
              Research &amp; Reference
            </div>
            <div className="flex flex-col divide-y divide-white/10">
              {RESEARCH_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium text-slate-200 hover:text-white transition flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-emerald-400/70 text-xs">→</span>
                </Link>
              ))}
            </div>

            <div className="pt-5 pb-2">
              <Link
                href="/wizard/"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] text-[#09221c] text-sm font-extrabold tracking-tight transition shadow-md"
              >
                Audit Fine →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
