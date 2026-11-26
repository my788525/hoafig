"use client";

import React, { useState, useMemo } from "react";
import { HOA_STATUTES_2026, STATUTES_BY_ABBR } from "@/data/hoa_statutes_2026";
import HearingBriefPanel from "@/components/HearingBriefPanel";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

const PRESETS = [
  {
    label: "FL Condo Milestone Roof ($2.4M)",
    stateAbbr: "FL",
    projectName: "Structural Roof & Balcony Concrete Restoration",
    totalProjectCost: 2400000,
    currentReserveBalance: 420000,
    recommendedReserveTarget: 2600000,
    totalUnits: 120,
    annualOperatingBudget: 960000,
    currentMonthlyDues: 665,
    boardApprovedOnly: true,
  },
  {
    label: "CA 5% Vote Threshold Test",
    stateAbbr: "CA",
    projectName: "Asphalt Repaving & Perimeter Gate",
    totalProjectCost: 480000,
    currentReserveBalance: 180000,
    recommendedReserveTarget: 650000,
    totalUnits: 160,
    annualOperatingBudget: 1200000,
    currentMonthlyDues: 425,
    boardApprovedOnly: true,
  },
  {
    label: "TX Townhome Siding Assessment",
    stateAbbr: "TX",
    projectName: "Exterior Stucco & Drainage Remediation",
    totalProjectCost: 850000,
    currentReserveBalance: 210000,
    recommendedReserveTarget: 900000,
    totalUnits: 85,
    annualOperatingBudget: 510000,
    currentMonthlyDues: 380,
    boardApprovedOnly: false,
  },
];

export default function SpecialAssessmentClient() {
  const [stateAbbr, setStateAbbr] = useState("FL");
  const [projectName, setProjectName] = useState("Structural Roof & Balcony Concrete Restoration");
  const [totalProjectCost, setTotalProjectCost] = useState(2400000);
  const [currentReserveBalance, setCurrentReserveBalance] = useState(420000);
  const [recommendedReserveTarget, setRecommendedReserveTarget] = useState(2600000);
  const [totalUnits, setTotalUnits] = useState(120);
  const [annualOperatingBudget, setAnnualOperatingBudget] = useState(960000);
  const [currentMonthlyDues, setCurrentMonthlyDues] = useState(665);
  const [boardApprovedOnly, setBoardApprovedOnly] = useState(true);

  const jurisdiction = STATUTES_BY_ABBR[stateAbbr] || STATUTES_BY_ABBR["FL"];

  const calc = useMemo(() => {
    const reserveShortfall = Math.max(0, totalProjectCost - currentReserveBalance);
    const units = Math.max(1, totalUnits);
    const perUnitAssessment = Math.round(reserveShortfall / units);
    const percentFunded =
      recommendedReserveTarget > 0
        ? Math.round((currentReserveBalance / recommendedReserveTarget) * 100)
        : 0;
    const pctOfAnnualBudget =
      annualOperatingBudget > 0
        ? (reserveShortfall / annualOperatingBudget) * 100
        : 0;
    const monthlyEquivalent12m = Math.round(perUnitAssessment / 12);
    const newMonthlyTotal = currentMonthlyDues + monthlyEquivalent12m;
    const duesSpikePct =
      currentMonthlyDues > 0 ? Math.round((monthlyEquivalent12m / currentMonthlyDues) * 100) : 0;

    const voteTriggerNote =
      stateAbbr === "CA" && pctOfAnnualBudget > 5 && boardApprovedOnly
        ? "ALERT: Exceeds Cal. Civ. Code § 5605(b) 5% gross-budget threshold — majority member vote required unless strict emergency."
        : stateAbbr === "IL" && pctOfAnnualBudget > 15 && boardApprovedOnly
        ? "ALERT: May trigger 765 ILCS 605/18(a)(8) unit-owner petition right to call a veto vote."
        : `${jurisdiction.specialAssessmentVoteThreshold}`;

    return {
      reserveShortfall,
      perUnitAssessment,
      percentFunded,
      pctOfAnnualBudget,
      monthlyEquivalent12m,
      newMonthlyTotal,
      duesSpikePct,
      voteTriggerNote,
    };
  }, [
    totalProjectCost,
    currentReserveBalance,
    recommendedReserveTarget,
    totalUnits,
    annualOperatingBudget,
    currentMonthlyDues,
    stateAbbr,
    boardApprovedOnly,
    jurisdiction,
  ]);

  const letterText = `VIA CERTIFIED MAIL & EMAIL
Date: ${new Date().toISOString().slice(0, 10)}
To: Board of Directors & Association Treasurer
Re: Special Assessment & Reserve Study Audit Request — ${projectName}

Dear Board of Directors:

Regarding the proposed $${calc.perUnitAssessment.toLocaleString()}/unit special assessment (total shortfall $${calc.reserveShortfall.toLocaleString()} across ${totalUnits} units), please produce the following official records within ${jurisdiction.recordsInspectionDays} business days pursuant to ${jurisdiction.primaryStatute}:

1. The most recent Reserve Study showing current funding (${calc.percentFunded}% funded vs. $${recommendedReserveTarget.toLocaleString()} target).
2. At least three (3) competitive contractor bids and scope specifications for "${projectName}".
3. Board resolution and member vote tally confirming compliance with: ${jurisdiction.specialAssessmentVoteThreshold}.
4. Amortization/loan options evaluated to mitigate the ${calc.duesSpikePct}% effective monthly dues spike ($${calc.monthlyEquivalent12m}/mo over 12 months).

Sincerely,
[Homeowner Name]
[Property Address / Unit #]`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 no-print">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
          One-Click Scenarios:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setStateAbbr(p.stateAbbr);
              setProjectName(p.projectName);
              setTotalProjectCost(p.totalProjectCost);
              setCurrentReserveBalance(p.currentReserveBalance);
              setRecommendedReserveTarget(p.recommendedReserveTarget);
              setTotalUnits(p.totalUnits);
              setAnnualOperatingBudget(p.annualOperatingBudget);
              setCurrentMonthlyDues(p.currentMonthlyDues);
              setBoardApprovedOnly(p.boardApprovedOnly);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-[#0f2747] text-[#0f2747] transition cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 brief-card p-6 space-y-4 no-print">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-base font-extrabold text-[#0f2747]">1. Reserve &amp; Project Inputs</h2>
            <p className="text-xs text-slate-500">Estimate per-unit exposure and member vote triggers.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">State / Jurisdiction</label>
            <select
              value={stateAbbr}
              onChange={(e) => setStateAbbr(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-[#0f2747]"
            >
              {HOA_STATUTES_2026.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name} ({s.abbr})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Capital Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Total Project Cost ($)</label>
              <input
                type="number"
                min={0}
                value={totalProjectCost}
                onChange={(e) => setTotalProjectCost(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Reserves ($)</label>
              <input
                type="number"
                min={0}
                value={currentReserveBalance}
                onChange={(e) => setCurrentReserveBalance(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reserve Target ($)</label>
              <input
                type="number"
                min={0}
                value={recommendedReserveTarget}
                onChange={(e) => setRecommendedReserveTarget(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Total Units / Lots</label>
              <input
                type="number"
                min={1}
                value={totalUnits}
                onChange={(e) => setTotalUnits(Number(e.target.value) || 1)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Annual HOA Budget ($)</label>
              <input
                type="number"
                min={0}
                value={annualOperatingBudget}
                onChange={(e) => setAnnualOperatingBudget(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Monthly Dues ($)</label>
              <input
                type="number"
                min={0}
                value={currentMonthlyDues}
                onChange={(e) => setCurrentMonthlyDues(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={boardApprovedOnly}
              onChange={(e) => setBoardApprovedOnly(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span className="font-medium text-slate-700">
              Board Attempting Passage Without Homeowner Vote
            </span>
          </label>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="brief-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  RESERVE &amp; SPECIAL ASSESSMENT AUDIT
                </div>
                <div className="text-2xl font-extrabold text-[#0f2747] tabular-nums mt-0.5">
                  ${calc.perUnitAssessment.toLocaleString()} / Unit Exposure
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                  calc.percentFunded < 30
                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : calc.percentFunded < 70
                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}
              >
                {calc.percentFunded}% Reserve Funded
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold">Net Reserve Shortfall</div>
                <div className="text-2xl font-extrabold text-[#0f2747] tabular-nums mt-1">
                  ${calc.reserveShortfall.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
                <div className="text-xs text-amber-900 font-semibold">12-Mo Monthly Equivalent</div>
                <div className="text-2xl font-extrabold text-amber-800 tabular-nums mt-1">
                  +${calc.monthlyEquivalent12m.toLocaleString()}/mo
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-semibold">Effective Monthly Dues</div>
                <div className="text-2xl font-extrabold text-[#0f2747] tabular-nums mt-1">
                  ${calc.newMonthlyTotal.toLocaleString()} (+{calc.duesSpikePct}%)
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0f2747]/5 border border-[#0f2747]/20 text-sm text-[#0f2747]">
              <strong>Voting &amp; Ratification Check ({jurisdiction.abbr}):</strong> {calc.voteTriggerNote}
            </div>
          </div>

          <HearingBriefPanel
            briefTitle={`Special Assessment Audit — ${projectName}`}
            jurisdictionName={jurisdiction.name}
            statuteCitation={jurisdiction.primaryStatute}
            officialGovUrl={jurisdiction.officialGovUrl}
            summaryRows={[
              { label: "Total Capital Cost", value: `$${totalProjectCost.toLocaleString()}` },
              { label: "Current Reserve Balance", value: `$${currentReserveBalance.toLocaleString()} (${calc.percentFunded}% funded)` },
              { label: "Net Shortfall", value: `$${calc.reserveShortfall.toLocaleString()}`, highlight: "warn" },
              { label: "Per-Unit Special Assessment", value: `$${calc.perUnitAssessment.toLocaleString()}`, highlight: "danger" },
              { label: "Assessment as % of Annual Budget", value: `${calc.pctOfAnnualBudget.toFixed(1)}%` },
            ]}
            letterText={letterText}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="Special Assessment Defense Kit"
        title="Download Reserve Audit Workbook & Owner Petition Templates"
        desc="Get the live Excel reserve-funding sensitivity model, competitive bid demand letter, and statutory owner-veto petition templates."
        dynamicAmount={`$${calc.perUnitAssessment.toLocaleString()}/Unit`}
        storageKey="special_assessment"
        sampleLines={[
          { label: "Reserve Funded", value: `${calc.percentFunded}%` },
          { label: "Dues Spike", value: `+${calc.duesSpikePct}%` },
        ]}
        features={[
          "5-Tab Reserve & Assessment Excel Model",
          "Member Veto Petition Template",
          "Reserve Study & Bid Demand Letter",
          "51-State Voting Threshold Reference",
        ]}
      />
    </div>
  );
}
