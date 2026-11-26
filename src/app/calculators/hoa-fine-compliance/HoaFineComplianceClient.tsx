"use client";

import React, { useState, useMemo } from "react";
import { HOA_STATUTES_2026, STATUTES_BY_ABBR } from "@/data/hoa_statutes_2026";
import HearingBriefPanel from "@/components/HearingBriefPanel";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

interface Preset {
  label: string;
  stateAbbr: string;
  violationType: string;
  fineBilled: number;
  dailyRate: number;
  daysAccrued: number;
  lateFeeAndInterest: number;
  noticeDaysGiven: number;
  cureDaysGiven: number;
  independentCommitteeUsed: boolean;
  certifiedMailSent: boolean;
}

const PRESETS: Preset[] = [
  {
    label: "FL $2,400 Driveway Fine",
    stateAbbr: "FL",
    violationType: "Driveway Paver Border (Non-Safety)",
    fineBilled: 2400,
    dailyRate: 100,
    daysAccrued: 24,
    lateFeeAndInterest: 145,
    noticeDaysGiven: 7,
    cureDaysGiven: 7,
    independentCommitteeUsed: false,
    certifiedMailSent: false,
  },
  {
    label: "CA $350 Parking + Late Fee",
    stateAbbr: "CA",
    violationType: "Overnight Street Parking",
    fineBilled: 350,
    dailyRate: 0,
    daysAccrued: 1,
    lateFeeAndInterest: 85,
    noticeDaysGiven: 10,
    cureDaysGiven: 5,
    independentCommitteeUsed: true,
    certifiedMailSent: false,
  },
  {
    label: "TX $875 No Certified Mail",
    stateAbbr: "TX",
    violationType: "Lawn / Shrub Maintenance",
    fineBilled: 500,
    dailyRate: 50,
    daysAccrued: 10,
    lateFeeAndInterest: 375,
    noticeDaysGiven: 14,
    cureDaysGiven: 10,
    independentCommitteeUsed: true,
    certifiedMailSent: false,
  },
];

export default function HoaFineComplianceClient() {
  const [mode, setMode] = useState<"quick" | "pro">("quick");
  const [stateAbbr, setStateAbbr] = useState("FL");
  const [violationType, setViolationType] = useState("Driveway Paver Border (Non-Safety)");
  const [fineBilled, setFineBilled] = useState(2400);
  const [dailyRate, setDailyRate] = useState(100);
  const [daysAccrued, setDaysAccrued] = useState(24);
  const [lateFeeAndInterest, setLateFeeAndInterest] = useState(145);
  const [noticeDaysGiven, setNoticeDaysGiven] = useState(7);
  const [cureDaysGiven, setCureDaysGiven] = useState(7);
  const [independentCommitteeUsed, setIndependentCommitteeUsed] = useState(false);
  const [certifiedMailSent, setCertifiedMailSent] = useState(false);
  const [similarViolationsUnfined, setSimilarViolationsUnfined] = useState(true);
  const [ccrFineScheduleMissing, setCcrFineScheduleMissing] = useState(false);

  const applyPreset = (p: Preset) => {
    setStateAbbr(p.stateAbbr);
    setViolationType(p.violationType);
    setFineBilled(p.fineBilled);
    setDailyRate(p.dailyRate);
    setDaysAccrued(p.daysAccrued);
    setLateFeeAndInterest(p.lateFeeAndInterest);
    setNoticeDaysGiven(p.noticeDaysGiven);
    setCureDaysGiven(p.cureDaysGiven);
    setIndependentCommitteeUsed(p.independentCommitteeUsed);
    setCertifiedMailSent(p.certifiedMailSent);
  };

  const jurisdiction = STATUTES_BY_ABBR[stateAbbr] || STATUTES_BY_ABBR["FL"];

  const audit = useMemo(() => {
    const defects: string[] = [];
    let maxLawfulFine = fineBilled;

    // 1. Per-violation or aggregate cap check
    if (jurisdiction.continuingFineCapUsd !== null && fineBilled > jurisdiction.continuingFineCapUsd) {
      defects.push(
        `Billed fine ($${fineBilled.toLocaleString()}) exceeds ${jurisdiction.name} statutory continuing-fine cap of $${jurisdiction.continuingFineCapUsd.toLocaleString()} (${jurisdiction.primaryStatute}).`
      );
      maxLawfulFine = Math.min(maxLawfulFine, jurisdiction.continuingFineCapUsd);
    } else if (
      jurisdiction.perViolationCapUsd !== null &&
      daysAccrued <= 1 &&
      fineBilled > jurisdiction.perViolationCapUsd
    ) {
      defects.push(
        `Single-violation fine ($${fineBilled.toLocaleString()}) exceeds ${jurisdiction.name} statutory cap of $${jurisdiction.perViolationCapUsd.toLocaleString()} (${jurisdiction.primaryStatute}).`
      );
      maxLawfulFine = Math.min(maxLawfulFine, jurisdiction.perViolationCapUsd);
    }

    // 2. Daily accrual cap check (Pro)
    if (mode === "pro" && jurisdiction.dailyAccrualCapUsd !== null && dailyRate > jurisdiction.dailyAccrualCapUsd) {
      defects.push(
        `Daily accrual rate ($${dailyRate}/day) exceeds statutory limit of $${jurisdiction.dailyAccrualCapUsd}/day.`
      );
    }

    // 3. Late fee / interest stacking on fines (Pro)
    if (mode === "pro" && lateFeeAndInterest > 0 && !jurisdiction.lateFeesOnFinesAllowed) {
      defects.push(
        `Illegal fee/interest stacking: $${lateFeeAndInterest.toLocaleString()} in late fees or interest cannot be assessed on disputed fines in ${jurisdiction.name}.`
      );
    }

    // 4. Independent committee requirement (Pro)
    if (mode === "pro" && jurisdiction.independentCommitteeRequired && !independentCommitteeUsed) {
      defects.push(
        `Per se void: ${jurisdiction.name} requires an independent 3-member non-board fining committee / impartial decision-maker (${jurisdiction.primaryStatute}).`
      );
      maxLawfulFine = 0;
    }

    // 5. Mandatory notice window
    if (noticeDaysGiven < jurisdiction.mandatoryNoticeDays) {
      defects.push(
        `Insufficient hearing notice: ${noticeDaysGiven} days given vs. ${jurisdiction.mandatoryNoticeDays}-day statutory minimum.`
      );
      maxLawfulFine = 0;
    }

    // 6. Mandatory cure window
    if (cureDaysGiven < jurisdiction.mandatoryCureDays) {
      defects.push(
        `Truncated cure period: ${cureDaysGiven} days given vs. ${jurisdiction.mandatoryCureDays}-day statutory cure window.`
      );
      maxLawfulFine = 0;
    }

    // 7. Certified mail requirement (Pro)
    if (mode === "pro" && jurisdiction.certifiedMailRequired && !certifiedMailSent) {
      defects.push(
        `Defective service: ${jurisdiction.name} mandates Certified Mail / verified mail notice prior to fining (${jurisdiction.primaryStatute}).`
      );
      maxLawfulFine = 0;
    }

    // 8. Selective enforcement & CC&R authorization (Pro)
    if (mode === "pro" && similarViolationsUnfined) {
      defects.push(
        `Selective / arbitrary enforcement defense: Unfined comparable lots create a prima facie defense against arbitrary board enforcement.`
      );
    }
    if (mode === "pro" && ccrFineScheduleMissing) {
      defects.push(
        `CC&R / Fine Schedule defect: Fines are unenforceable unless authorized by a duly adopted and published fine schedule.`
      );
      maxLawfulFine = 0;
    }

    const effectiveLateFees = mode === "pro" ? lateFeeAndInterest : 0;
    const totalBilled = fineBilled + effectiveLateFees;
    const unlawfulExcess = Math.max(0, totalBilled - maxLawfulFine);
    const defenseScore = Math.min(
      100,
      Math.max(
        15,
        defects.length * 18 +
          (unlawfulExcess > 0 ? 20 : 0) +
          (mode === "pro" && similarViolationsUnfined ? 14 : 0) +
          (mode === "pro" && ccrFineScheduleMissing ? 16 : 0)
      )
    );
    const status =
      defects.length === 0
        ? "COMPLIANT"
        : maxLawfulFine === 0
        ? "PROCEDURALLY VOID ($0 LAWFUL)"
        : "EXCEEDS STATUTORY CAP";

    return {
      defects,
      totalBilled,
      maxLawfulFine,
      unlawfulExcess,
      defenseScore,
      status,
    };
  }, [
    mode,
    jurisdiction,
    fineBilled,
    dailyRate,
    daysAccrued,
    lateFeeAndInterest,
    noticeDaysGiven,
    cureDaysGiven,
    independentCommitteeUsed,
    certifiedMailSent,
    similarViolationsUnfined,
    ccrFineScheduleMissing,
  ]);

  const letterText = `VIA CERTIFIED MAIL & EMAIL
Date: ${new Date().toISOString().slice(0, 10)}
To: Board of Directors & Community Association Manager
Re: Formal Statutory Objection, Hearing Demand & Records Request — ${violationType}

Dear Board of Directors:

I am writing regarding the ${violationType} notice and ledger assessment totaling $${audit.totalBilled.toLocaleString()} ($${fineBilled.toLocaleString()} fine + $${lateFeeAndInterest.toLocaleString()} fees/interest).

Pursuant to ${jurisdiction.primaryStatute}, this assessment fails mandatory statutory compliance on the following grounds:
${audit.defects.length > 0 ? audit.defects.map((d, i) => `${i + 1}. ${d}`).join("\n") : "1. Requesting formal verification of recorded fine schedule, notice timestamps, and hearing minutes."}

DEMAND FOR RELIEF & OFFICIAL RECORDS:
1. Immediately suspend and void the non-compliant fine/fee balance ($${audit.unlawfulExcess.toLocaleString()} unlawful excess) pending a formal statutory hearing.
2. Confirm that my regular monthly assessments are applied strictly to assessments first and remain in good standing.
3. Produce within ${jurisdiction.recordsInspectionDays} business days: (a) the recorded fine schedule, (b) proof of statutory service/notice, and (c) the appointment resolution and minutes of the fining committee/board.

Please confirm receipt and provide written notice of hearing or ledger adjustment.

Sincerely,
[Homeowner Name]
[Property Address / Lot #]`;

  return (
    <div className="space-y-8">
      {/* Preset Bar */}
      <div className="flex flex-wrap items-center gap-2 no-print">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
          One-Click Scenarios:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-[#0f2747] hover:bg-slate-50 text-[#0f2747] transition cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 2-Column Precision Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="lg:col-span-5 brief-card p-6 space-y-4 no-print">
          <div className="border-b border-slate-200 pb-3 space-y-3">
            <div>
              <h2 className="text-base font-extrabold text-[#0f2747]">1. Violation &amp; Ledger Inputs</h2>
              <p className="text-xs text-slate-500">All checks run 100% locally in your browser.</p>
            </div>
            {/* Segmented Mode Toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setMode("quick")}
                className={`py-2 px-3 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  mode === "quick"
                    ? "bg-[#0f2747] text-white shadow-sm"
                    : "text-slate-600 hover:text-[#0f2747]"
                }`}
              >
                Quick Check (30s)
              </button>
              <button
                type="button"
                onClick={() => setMode("pro")}
                className={`py-2 px-3 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  mode === "pro"
                    ? "bg-[#0f2747] text-white shadow-sm"
                    : "text-slate-600 hover:text-[#0f2747]"
                }`}
              >
                Forensic Pro Audit
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">State / Jurisdiction (51 Codes)</label>
            <select
              value={stateAbbr}
              onChange={(e) => setStateAbbr(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-[#0f2747]"
            >
              {HOA_STATUTES_2026.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name} ({s.abbr}) — {s.primaryStatute.split("(")[0].trim()}
                </option>
              ))}
            </select>
          </div>

          {mode === "quick" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Fine Billed ($)</label>
                <input
                  type="number"
                  min={0}
                  value={fineBilled}
                  onChange={(e) => setFineBilled(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cure / Hearing Notice Days Given (Days)
                </label>
                <input
                  type="number"
                  min={0}
                  value={noticeDaysGiven}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 0;
                    setNoticeDaysGiven(v);
                    setCureDaysGiven(v);
                  }}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums font-semibold"
                />
              </div>

              <button
                type="button"
                onClick={() => setMode("pro")}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#0f2747] transition cursor-pointer"
              >
                Switch to Forensic Pro Audit (Daily Rate, Late Fees, Committee &amp; Selective Enforcement) →
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alleged Violation Description</label>
                <input
                  type="text"
                  value={violationType}
                  onChange={(e) => setViolationType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Fine Billed ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={fineBilled}
                    onChange={(e) => setFineBilled(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Late Fees / Interest ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={lateFeeAndInterest}
                    onChange={(e) => setLateFeeAndInterest(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Daily Fine Rate ($/day)</label>
                  <input
                    type="number"
                    min={0}
                    value={dailyRate}
                    onChange={(e) => setDailyRate(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Days Accrued</label>
                  <input
                    type="number"
                    min={1}
                    value={daysAccrued}
                    onChange={(e) => setDaysAccrued(Number(e.target.value) || 1)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hearing Notice (Days)</label>
                  <input
                    type="number"
                    min={0}
                    value={noticeDaysGiven}
                    onChange={(e) => setNoticeDaysGiven(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cure Window (Days)</label>
                  <input
                    type="number"
                    min={0}
                    value={cureDaysGiven}
                    onChange={(e) => setCureDaysGiven(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={independentCommitteeUsed}
                    onChange={(e) => setIndependentCommitteeUsed(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <span className="font-medium text-slate-700">
                    Approved by Independent Non-Board Fining Committee
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={certifiedMailSent}
                    onChange={(e) => setCertifiedMailSent(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <span className="font-medium text-slate-700">
                    Delivered via Certified / Verified Mail
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={similarViolationsUnfined}
                    onChange={(e) => setSimilarViolationsUnfined(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <span className="font-medium text-slate-700">
                    Comparable Lots Unfined (Selective Enforcement)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ccrFineScheduleMissing}
                    onChange={(e) => setCcrFineScheduleMissing(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  <span className="font-medium text-slate-700">
                    No Recorded CC&amp;R Fine Schedule Provided
                  </span>
                </label>
              </div>
            </>
          )}
        </div>

        {/* Right: Live Statutory Audit */}
        <div className="lg:col-span-7 space-y-6">
          <div className="brief-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  STATUTORY COMPLIANCE VERDICT · {jurisdiction.name.toUpperCase()}
                </div>
                <div className="text-2xl font-extrabold text-[#0f2747] mt-0.5">{audit.status}</div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                  audit.defects.length > 0
                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}
              >
                {audit.defects.length} Statutory Defect{audit.defects.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold">HOA Total Billed</div>
                <div className="text-2xl font-extrabold text-[#0f2747] tabular-nums mt-1">
                  ${audit.totalBilled.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-xs text-emerald-800 font-semibold">Max Lawful Exposure</div>
                <div className="text-2xl font-extrabold text-[#059669] tabular-nums mt-1">
                  ${audit.maxLawfulFine.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
                <div className="text-xs text-amber-900 font-semibold">Unlawful Overcharge</div>
                <div className="text-2xl font-extrabold text-amber-800 tabular-nums mt-1">
                  ${audit.unlawfulExcess.toLocaleString()}
                </div>
              </div>
            </div>

            {audit.defects.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Identified Statutory &amp; Procedural Violations
                </div>
                <ul className="space-y-2">
                  {audit.defects.map((d, i) => (
                    <li
                      key={i}
                      className="text-sm text-rose-950 bg-rose-50 border border-rose-200 rounded-lg px-3.5 py-2.5"
                    >
                      <strong className="mr-1.5">#{i + 1}:</strong>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
                No facial statutory cap or notice-window defect detected based on inputs. Review your recorded CC&amp;Rs for fine-schedule authorization and selective-enforcement parity.
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1">
              <div>
                <strong>Governing Code:</strong>{" "}
                <a
                  href={jurisdiction.officialGovUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0f2747] underline font-semibold"
                >
                  {jurisdiction.primaryStatute}
                </a>
              </div>
              <div>
                <strong>Cap Rule:</strong> {jurisdiction.capSummary}
              </div>
            </div>
          </div>

          <HearingBriefPanel
            briefTitle={`${jurisdiction.name} HOA Fine Audit — ${violationType}`}
            jurisdictionName={jurisdiction.name}
            statuteCitation={jurisdiction.primaryStatute}
            officialGovUrl={jurisdiction.officialGovUrl}
            summaryRows={[
              { label: "Total HOA Billed (Fine + Fees)", value: `$${audit.totalBilled.toLocaleString()}` },
              {
                label: "Maximum Lawful Exposure Under State Law",
                value: `$${audit.maxLawfulFine.toLocaleString()}`,
                highlight: audit.maxLawfulFine === 0 ? "ok" : "warn",
              },
              {
                label: "Unlawful / Disputable Overcharge",
                value: `$${audit.unlawfulExcess.toLocaleString()}`,
                highlight: audit.unlawfulExcess > 0 ? "danger" : "ok",
              },
              {
                label: "Independent Fining Committee Required",
                value: jurisdiction.independentCommitteeRequired ? "Yes (Mandatory)" : "Board / Panel",
              },
              {
                label: "Statutory Notice / Cure Minimums",
                value: `${jurisdiction.mandatoryNoticeDays}d notice / ${jurisdiction.mandatoryCureDays}d cure`,
              },
              ...(mode === "pro"
                ? [
                    {
                      label: "Selective Enforcement & CC&R Defense Score",
                      value: `${audit.defenseScore} / 100`,
                      highlight: (audit.defenseScore >= 70 ? "ok" : "warn") as "ok" | "warn",
                    },
                  ]
                : []),
            ]}
            letterText={letterText}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="VIP Hearing Defense Kit"
        title="Download Certified Board Hearing Brief & Records Demand (.DOCX / .PDF)"
        desc="Export an unwatermarked, board-ready statutory defense packet with editable Certified Mail templates, 51-state citation matrix, and ledger audit workbook."
        dynamicAmount={audit.unlawfulExcess > 0 ? `$${audit.unlawfulExcess.toLocaleString()} Disputed` : undefined}
        storageKey="hoa_fine_compliance"
        sampleLines={[
          { label: "Jurisdiction", value: `${jurisdiction.name} (${jurisdiction.abbr})` },
          { label: "Statutory Defects", value: `${audit.defects.length} Found` },
          { label: "Records Deadline", value: `${jurisdiction.recordsInspectionDays} Bus. Days` },
        ]}
        features={[
          "Editable Word (.DOCX) Certified Mail Demand",
          "Board Hearing Script & Exhibit Log",
          "51-State Statutory Cap Citation Matrix",
          "Reserve & Ledger Audit Spreadsheet",
        ]}
      />
    </div>
  );
}
