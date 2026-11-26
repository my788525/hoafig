"use client";

import React, { useState, useMemo } from "react";
import { HOA_STATUTES_2026, STATUTES_BY_ABBR } from "@/data/hoa_statutes_2026";
import HearingBriefPanel from "@/components/HearingBriefPanel";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

type ProjectCategory = "solar" | "ev" | "otard";

const PRESETS: {
  label: string;
  stateAbbr: string;
  category: ProjectCategory;
  hoaAddedCostUsd: number;
  efficiencyLossPct: number;
  daysSinceSubmission: number;
  exclusiveUseArea: boolean;
}[] = [
  {
    label: "CA Rooftop Solar ($2,800 Reroute)",
    stateAbbr: "CA",
    category: "solar",
    hoaAddedCostUsd: 2800,
    efficiencyLossPct: 14,
    daysSinceSubmission: 48,
    exclusiveUseArea: true,
  },
  {
    label: "FL Level-2 EV Charger Denial",
    stateAbbr: "FL",
    category: "ev",
    hoaAddedCostUsd: 0,
    efficiencyLossPct: 0,
    daysSinceSubmission: 35,
    exclusiveUseArea: true,
  },
  {
    label: "TX Starlink / Dish (FCC OTARD)",
    stateAbbr: "TX",
    category: "otard",
    hoaAddedCostUsd: 0,
    efficiencyLossPct: 0,
    daysSinceSubmission: 15,
    exclusiveUseArea: true,
  },
];

export default function ArcOverrideClient() {
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [category, setCategory] = useState<ProjectCategory>("solar");
  const [hoaAddedCostUsd, setHoaAddedCostUsd] = useState(2800);
  const [efficiencyLossPct, setEfficiencyLossPct] = useState(14);
  const [daysSinceSubmission, setDaysSinceSubmission] = useState(48);
  const [exclusiveUseArea, setExclusiveUseArea] = useState(true);

  const jurisdiction = STATUTES_BY_ABBR[stateAbbr] || STATUTES_BY_ABBR["CA"];

  const result = useMemo(() => {
    if (category === "otard") {
      return {
        protected: exclusiveUseArea,
        verdict: exclusiveUseArea
          ? "FEDERAL PREEMPTION PROTECTED (FCC OTARD)"
          : "COMMON ELEMENT — NOT COVERED BY OTARD",
        statute: "47 C.F.R. § 1.4000 (Federal Communications Commission OTARD Rule)",
        explanation: exclusiveUseArea
          ? "Under Federal FCC OTARD (47 C.F.R. § 1.4000), HOA restrictions that ban, delay, or impose unreasonable expense on antennas/dishes ≤1 meter (including Starlink & fixed wireless) on exclusive-use property are federally preempted in all 50 states."
          : "FCC OTARD only covers exclusive-use areas (your roof, balcony, patio, or yard), not shared common-area roofs.",
      };
    }

    if (category === "solar") {
      const protectedState = jurisdiction.solarOverrideProtected;
      const caThresholdTriggered =
        stateAbbr === "CA" && (hoaAddedCostUsd > 1000 || efficiencyLossPct > 10 || daysSinceSubmission >= 45);
      return {
        protected: protectedState,
        verdict: protectedState
          ? caThresholdTriggered
            ? "STATUTORY OVERRIDE + DEEMED APPROVED (CA § 714)"
            : `STATE SOLAR ACCESS OVERRIDE ACTIVE (${jurisdiction.abbr})`
          : "NO STATE SOLAR OVERRIDE — CHECK CC&Rs",
        statute: jurisdiction.solarOverrideStatute,
        explanation: protectedState
          ? `${jurisdiction.name} law overrides HOA covenants that prohibit or unreasonably restrict rooftop solar (${jurisdiction.solarOverrideStatute}).`
          : `${jurisdiction.name} does not have a statewide statutory HOA solar override; review your recorded CC&Rs and local municipal ordinances.`,
      };
    }

    // EV Charger
    const evProtected = jurisdiction.evOverrideProtected;
    return {
      protected: evProtected,
      verdict: evProtected
        ? `RIGHT-TO-CHARGE OVERRIDE ACTIVE (${jurisdiction.abbr})`
        : "NO STATEWIDE EV STATUTE — CHECK CC&Rs",
      statute: jurisdiction.evOverrideStatute,
      explanation: evProtected
        ? `${jurisdiction.name} Right-to-Charge law prohibits the HOA from banning Level 1/2 EV charger installation in your exclusive-use garage or assigned parking (${jurisdiction.evOverrideStatute}).`
        : `${jurisdiction.name} does not currently have a statewide HOA EV Right-to-Charge override; check municipal building codes and CC&R electrical rules.`,
    };
  }, [category, exclusiveUseArea, jurisdiction, stateAbbr, hoaAddedCostUsd, efficiencyLossPct, daysSinceSubmission]);

  const letterText = `VIA CERTIFIED MAIL & EMAIL
Date: ${new Date().toISOString().slice(0, 10)}
To: Architectural Review Committee (ARC) & Board of Directors
Re: Notice of Statutory Override & Deemed Approval — ${category.toUpperCase()} Installation

Dear Architectural Review Committee:

On [Submission Date] (${daysSinceSubmission} days ago), I submitted a complete architectural application for a ${
    category === "solar"
      ? "rooftop solar energy system"
      : category === "ev"
      ? "Level 2 EV charging station"
      : "1-meter or smaller communications antenna (FCC OTARD)"
  } located within my exclusive-use property area.

CONTROLLING STATUTORY AUTHORITY:
- ${result.statute}
- Finding: ${result.verdict}
${category === "solar" ? `- Requested HOA modifications would add $${hoaAddedCostUsd.toLocaleString()} in cost and reduce output by ${efficiencyLossPct}%.` : ""}

Under controlling ${category === "otard" ? "federal" : jurisdiction.name} law, any association restriction or denial that prohibits or unreasonably impairs this installation is void and unenforceable. Please confirm architectural clearance within 10 business days.

Sincerely,
[Homeowner Name]
[Property Address / Lot #]`;

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
              setCategory(p.category);
              setHoaAddedCostUsd(p.hoaAddedCostUsd);
              setEfficiencyLossPct(p.efficiencyLossPct);
              setDaysSinceSubmission(p.daysSinceSubmission);
              setExclusiveUseArea(p.exclusiveUseArea);
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
            <h2 className="text-base font-extrabold text-[#0f2747]">1. ARC Installation Inputs</h2>
            <p className="text-xs text-slate-500">Test federal FCC OTARD and state solar/EV preemption.</p>
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
            <label className="block text-xs font-bold text-slate-700 mb-1">Installation Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProjectCategory)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-[#0f2747]"
            >
              <option value="solar">Rooftop Solar Energy System</option>
              <option value="ev">EV Charging Station (Level 1 / Level 2)</option>
              <option value="otard">Satellite Dish / Starlink / Fixed Wireless (≤1m)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">HOA-Added Cost ($)</label>
              <input
                type="number"
                min={0}
                value={hoaAddedCostUsd}
                onChange={(e) => setHoaAddedCostUsd(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Efficiency Loss (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={efficiencyLossPct}
                onChange={(e) => setEfficiencyLossPct(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Days Since ARC Application</label>
            <input
              type="number"
              min={0}
              value={daysSinceSubmission}
              onChange={(e) => setDaysSinceSubmission(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
            />
          </div>

          <label className="flex items-center gap-2 text-xs cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={exclusiveUseArea}
              onChange={(e) => setExclusiveUseArea(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span className="font-medium text-slate-700">
              Located Within Owner’s Exclusive-Use Roof / Garage / Yard
            </span>
          </label>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="brief-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  STATUTORY OVERRIDE DETERMINATION
                </div>
                <div className="text-2xl font-extrabold text-[#0f2747] mt-0.5">{result.verdict}</div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                  result.protected
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                {result.protected ? "HOA Ban Void" : "CC&Rs Control"}
              </span>
            </div>

            <p className="text-sm text-slate-700 mt-4 leading-relaxed">{result.explanation}</p>
            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <strong>Controlling Citation:</strong> {result.statute}
            </div>
          </div>

          <HearingBriefPanel
            briefTitle={`ARC Statutory Override Brief — ${category.toUpperCase()}`}
            jurisdictionName={jurisdiction.name}
            statuteCitation={result.statute}
            officialGovUrl={jurisdiction.officialGovUrl}
            summaryRows={[
              { label: "Override Status", value: result.verdict, highlight: result.protected ? "ok" : "warn" },
              { label: "Days Pending ARC Review", value: `${daysSinceSubmission} days` },
              { label: "HOA-Imposed Cost / Efficiency Loss", value: `$${hoaAddedCostUsd.toLocaleString()} / ${efficiencyLossPct}%` },
            ]}
            letterText={letterText}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="ARC Override Kit"
        title="Download Solar, EV & FCC OTARD Statutory Override Packet"
        desc="Includes Certified Mail ARC Override Demand (.DOCX), Deemed-Approval Notice, and state-by-state preemption citations."
        storageKey="arc_override"
        features={[
          "ARC Statutory Override Notice (.DOCX)",
          "FCC OTARD 47 C.F.R. § 1.4000 Brief",
          "Solar & EV Deemed-Approval Templates",
          "51-State Override Citation Table",
        ]}
      />
    </div>
  );
}
