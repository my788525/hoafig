'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export interface ToolkitStateOption {
  abbr: string;
  name: string;
  primaryStatute: string;
  capSummary: string;
}

interface ToolkitHeroControlsProps {
  checkoutUrl: string;
  states: ToolkitStateOption[];
}

export default function ToolkitHeroControls({ checkoutUrl, states }: ToolkitHeroControlsProps) {
  const [selectedState, setSelectedState] = useState<string>('California');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState<'docx' | 'xlsx'>('docx');

  useEffect(() => {
    if (!isPreviewOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPreviewOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPreviewOpen]);

  const matchedState = states.find((s) => s.name === selectedState);

  return (
    <div className="space-y-4">
      {/* 1-Second State/Scenario Confirm Selector */}
      <div className="rounded-xl bg-[#091a32]/90 border border-slate-700/90 p-3.5 sm:p-4 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <label
            htmlFor="toolkit-state-select"
            className="text-xs font-bold uppercase tracking-wider text-slate-300 shrink-0"
          >
            Confirm Your State Coverage:
          </label>
          <select
            id="toolkit-state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full sm:w-64 rounded-lg bg-slate-900 border border-slate-600 text-white text-xs sm:text-sm font-semibold px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c8a24a] focus:border-[#c8a24a]"
          >
            {states.map((st) => (
              <option key={st.abbr} value={st.name}>
                {st.name} ({st.abbr})
              </option>
            ))}
            <option value="Other US State">Other US State</option>
          </select>
        </div>
        <div
          aria-live="polite"
          className="text-xs sm:text-sm font-semibold text-emerald-300 flex items-start gap-2 leading-snug"
        >
          <span>
            ✓ Includes {selectedState} HOA fine cap, selective-enforcement log &amp; certified-mail hearing templates
          </span>
        </div>
        {matchedState && (
          <div className="text-[11px] text-slate-400 font-mono truncate" title={matchedState.primaryStatute}>
            Statute indexed: {matchedState.primaryStatute}
          </div>
        )}
      </div>

      {/* Primary Instant Buy CTA + Preview Sample Button + Free Checker */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-offer-action="buy"
          data-offer-id="pdt_0NsmkloFUuNMrFIQIYxtQ"
          className="inline-flex items-center justify-center bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] font-extrabold px-7 py-4 rounded-xl text-sm sm:text-base transition shadow-lg text-center"
        >
          Instant Buy VIP Suite — $24.99 →
        </a>
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="inline-flex items-center justify-center px-5 py-4 rounded-xl bg-slate-800/95 hover:bg-slate-700 text-[#e2c275] border border-[#c8a24a]/50 text-xs sm:text-sm font-bold transition text-center cursor-pointer"
        >
          Preview Sample Page (.DOCX / .XLSX)
        </button>
        <Link
          href="/calculators/hoa-fine-compliance/"
          className="inline-flex items-center justify-center px-4 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition text-center"
        >
          Run Free Fine Checker
        </Link>
      </div>

      {/* 3 Zero-Risk Badges */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-emerald-300 bg-[#091a32]/70 border border-emerald-500/25 rounded-xl px-4 py-2.5">
        <span>✓ Instant ZIP Download (.DOCX + .XLSX)</span>
        <span className="hidden sm:inline text-slate-600">·</span>
        <span>✓ One-Time Payment (No Subscription)</span>
        <span className="hidden sm:inline text-slate-600">·</span>
        <span>✓ Updated for 2026–2027 Statutes</span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300">
        <span>Pay / GPay / All Major Cards via Dodo Payments</span>
        <Link href="/wizard/" className="text-[#e2c275] hover:text-white underline font-semibold">
          Or start with the 4-Step Dispute Wizard →
        </Link>
      </div>

      {/* Sample Preview Modal */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-preview-title"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#091a32] border border-slate-700 text-white shadow-2xl p-5 sm:p-7 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#e2c275]">
                  Redacted VIP Suite Sample Excerpts
                </div>
                <h3 id="sample-preview-title" className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  Inside the 2026 VIP Defense Suite
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                aria-label="Close sample preview"
                className="rounded-lg px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* File Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPreviewTab('docx')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition cursor-pointer border ${
                  previewTab === 'docx'
                    ? 'bg-[#c8a24a] text-[#091a32] border-[#c8a24a]'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                HOAFig_Certified_Mail_Hearing_Suite_2026.docx
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('xlsx')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition cursor-pointer border ${
                  previewTab === 'xlsx'
                    ? 'bg-sky-400 text-[#091a32] border-sky-400'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                HOAFig_Ledger_&amp;_Reserve_Audit_2026.xlsx
              </button>
            </div>

            {previewTab === 'docx' ? (
              <div className="rounded-xl bg-white text-slate-800 p-5 sm:p-6 font-serif text-xs sm:text-sm space-y-3 border border-slate-300 shadow-inner">
                <div className="flex flex-wrap justify-between gap-2 border-b border-slate-200 pb-2 font-sans text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Template 01 · Certified Mail Demand &amp; Hearing Objection</span>
                  <span>USPS Certified Mail # [REDACTED]</span>
                </div>
                <div className="space-y-1 text-slate-700">
                  <div>
                    <strong>TO:</strong> Board of Directors &amp; Registered Agent, [HOA ASSOCIATION NAME — REDACTED]
                  </div>
                  <div>
                    <strong>FROM:</strong> [HOMEOWNER NAME — REDACTED], Lot/Unit #[REDACTED]
                  </div>
                  <div>
                    <strong>RE:</strong> Formal Notice of Statutory Non-Compliance, Demand for Fine Rescission &amp;
                    Request for Independent Hearing ({selectedState})
                  </div>
                </div>
                <p className="leading-relaxed">
                  Dear Members of the Board: Please take formal notice that the violation fine assessed on{' '}
                  <span className="bg-slate-200 px-1 rounded font-mono text-xs">[DATE — REDACTED]</span> in the amount
                  of <span className="bg-slate-200 px-1 rounded font-mono text-xs">[$X,XXX.00]</span> exceeds
                  applicable statutory caps and mandatory cure-period protections under{' '}
                  <span className="font-semibold text-[#0f2747]">
                    {matchedState ? matchedState.primaryStatute : '[STATE STATUTE CITATION]'}
                  </span>
                  .
                </p>
                <div className="bg-slate-50 border-l-4 border-[#0f2747] p-3 space-y-1 text-xs">
                  <div className="font-sans font-bold text-[#0f2747]">
                    Section 2. Selective-Enforcement &amp; Records Demand
                  </div>
                  <p className="text-slate-600">
                    Pursuant to statutory records inspection rights, Homeowner demands copies of all violation logs,
                    architectural approvals, and fining-committee minutes for comparable lots within{' '}
                    <span className="bg-slate-200 px-1 rounded font-mono">[10 BUSINESS DAYS]</span>...
                  </p>
                </div>
                <div className="text-[11px] font-sans text-slate-500 italic pt-1">
                  [Excerpt truncated — Full .DOCX includes 6 editable letters, cure-notice checklist &amp; 5-minute
                  Board Hearing oral script.]
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-900 border border-slate-700 p-4 sm:p-5 space-y-3 text-xs">
                <div className="flex flex-wrap justify-between gap-2 border-b border-slate-800 pb-2 font-mono text-[11px] text-sky-300">
                  <span>Sheet 1: Fine_Cap_&_Payment_Waterfall_Audit</span>
                  <span>Live Formula Preview</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-mono text-[11px] sm:text-xs">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400">
                        <th className="py-2 pr-3">Ledger Line Item</th>
                        <th className="py-2 pr-3">HOA Billed</th>
                        <th className="py-2 pr-3">Statutory Cap</th>
                        <th className="py-2">Overcharge / Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr>
                        <td className="py-2 pr-3">Daily Fine Accrual (30 days @ $100/d)</td>
                        <td className="py-2 pr-3 text-rose-300">$3,000.00</td>
                        <td className="py-2 pr-3 text-emerald-300">$1,000.00</td>
                        <td className="py-2 font-bold text-amber-300">+$2,000.00 ILLEGAL CAP</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-3">Late Fee Stacked on Unpaid Fine</td>
                        <td className="py-2 pr-3 text-rose-300">$150.00</td>
                        <td className="py-2 pr-3 text-emerald-300">$0.00</td>
                        <td className="py-2 font-bold text-amber-300">+$150.00 WATERFALL</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-3">Pre-Hearing Notice Defect (0-day cure)</td>
                        <td className="py-2 pr-3 text-rose-300">[REDACTED]</td>
                        <td className="py-2 pr-3 text-emerald-300">14-Day Cure</td>
                        <td className="py-2 font-bold text-amber-300">VOIDABLE PROCEDURAL</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-[11px] text-slate-400 italic">
                  [Excerpt truncated — Full .XLSX includes 50-state cap lookup table, reserve shortfall calculator &amp;
                  selective-enforcement evidence log.]
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-300">
                Includes both <span className="font-mono text-[#e2c275]">.DOCX</span> &amp;{' '}
                <span className="font-mono text-sky-300">.XLSX</span> for{' '}
                <strong className="text-white">{selectedState}</strong>
              </div>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-offer-action="buy"
                data-offer-id="pdt_0NsmkloFUuNMrFIQIYxtQ"
                className="inline-flex items-center justify-center bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-lg text-center"
              >
                Download Full VIP Suite — $24.99 →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
