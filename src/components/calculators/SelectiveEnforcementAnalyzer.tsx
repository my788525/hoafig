"use client";

import React, { useState, useMemo } from "react";
import { HOA_STATUTES_2026, STATUTES_BY_ABBR } from "@/data/hoa_statutes_2026";
import HearingBriefPanel from "@/components/HearingBriefPanel";
import IcsDeadlineButton from "@/components/IcsDeadlineButton";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

type ViolationType =
  | "Parking / Commercial Vehicle / RV"
  | "Exterior Paint / Landscaping"
  | "Fence / Structure"
  | "Trash Bin / Holiday Decor"
  | "Short-Term Rental";

const VIOLATION_TYPES: ViolationType[] = [
  "Parking / Commercial Vehicle / RV",
  "Exterior Paint / Landscaping",
  "Fence / Structure",
  "Trash Bin / Holiday Decor",
  "Short-Term Rental",
];

const PRESETS: {
  label: string;
  stateAbbr: string;
  violationType: ViolationType;
  noticeDaysGiven: number;
  independentCommitteeUsed: boolean;
  unpenalizedNeighbors: number;
  fineAmountUsd: number;
}[] = [
  {
    label: "FL Commercial Truck (12 Unpenalized Neighbors)",
    stateAbbr: "FL",
    violationType: "Parking / Commercial Vehicle / RV",
    noticeDaysGiven: 7,
    independentCommitteeUsed: false,
    unpenalizedNeighbors: 12,
    fineAmountUsd: 500,
  },
  {
    label: "CA Exterior Paint (0-Day Notice, 8 Neighbors)",
    stateAbbr: "CA",
    violationType: "Exterior Paint / Landscaping",
    noticeDaysGiven: 0,
    independentCommitteeUsed: false,
    unpenalizedNeighbors: 8,
    fineAmountUsd: 250,
  },
  {
    label: "TX Fence / Structure (No Certified Mail, 5 Neighbors)",
    stateAbbr: "TX",
    violationType: "Fence / Structure",
    noticeDaysGiven: 10,
    independentCommitteeUsed: false,
    unpenalizedNeighbors: 5,
    fineAmountUsd: 300,
  },
];

function getPhotoChecklist(violationType: ViolationType, unpenalizedNeighbors: number): {
  title: string;
  detail: string;
}[] {
  const neighborTarget = Math.max(3, unpenalizedNeighbors);
  const specificItem =
    violationType === "Parking / Commercial Vehicle / RV"
      ? "Photograph street-facing driveways, guest spots, and commercial/oversized vehicles with visible lot numbers or street signs."
      : violationType === "Exterior Paint / Landscaping"
      ? "Capture wide-angle front-elevation photos of comparable homes with identical trim colors, xeriscaping, or unapproved turf/shrubs."
      : violationType === "Fence / Structure"
      ? "Document comparable fences, sheds, pergolas, or patio covers visible from common-area streets or sidewalks."
      : violationType === "Trash Bin / Holiday Decor"
      ? "Take time-stamped photos across 3 consecutive non-collection days showing visible bins or seasonal displays on neighboring lots."
      : "Archive public short-term rental listings (Airbnb/VRBO) or HOA-approved rental registry entries for comparable units.";

  return [
    {
      title: "1. Timestamped Comparator Photos (Same-Day Sweep)",
      detail: `Capture EXIF-dated photos of at least ${neighborTarget} comparable lots exhibiting the exact same condition without enforcement.`,
    },
    {
      title: "2. Violation-Specific Visual Evidence",
      detail: specificItem,
    },
    {
      title: "3. Parcel / Lot Cross-Reference Map",
      detail: "Plot your lot and each unpenalized comparator lot on a printed plat or satellite map with street addresses for the hearing record.",
    },
    {
      title: "4. Written Neighbor & Witness Affidavits",
      detail: "Obtain 2+ signed statements from neighbors confirming how long the condition has existed openly without HOA violation notices.",
    },
    {
      title: "5. Statutory Records Demand (Enforcement Logs & Minutes)",
      detail: "Demand 24 months of ARC approvals, violation logs, and fining-committee minutes to establish arbitrary or discriminatory enforcement.",
    },
  ];
}

export default function SelectiveEnforcementAnalyzer() {
  const [stateAbbr, setStateAbbr] = useState("FL");
  const [violationType, setViolationType] = useState<ViolationType>("Parking / Commercial Vehicle / RV");
  const [noticeDaysGiven, setNoticeDaysGiven] = useState(7);
  const [independentCommitteeUsed, setIndependentCommitteeUsed] = useState(false);
  const [unpenalizedNeighbors, setUnpenalizedNeighbors] = useState(12);
  const [fineAmountUsd, setFineAmountUsd] = useState(500);

  const jurisdiction = STATUTES_BY_ABBR[stateAbbr] || STATUTES_BY_ABBR["FL"];

  const audit = useMemo(() => {
    let voidabilityScore = 0;
    const defects: string[] = [];

    // 1. Notice & Cure Window check
    const requiredWindow = Math.max(jurisdiction.mandatoryNoticeDays, jurisdiction.mandatoryCureDays);
    if (noticeDaysGiven < requiredWindow) {
      const gap = requiredWindow - noticeDaysGiven;
      const pts = noticeDaysGiven === 0 ? 35 : Math.min(35, 18 + Math.round(gap * 1.2));
      voidabilityScore += pts;
      defects.push(
        `Shortened Notice/Cure Window: HOA gave ${noticeDaysGiven} days, below ${jurisdiction.name}'s ${requiredWindow}-day statutory benchmark (${jurisdiction.mandatoryNoticeDays}d notice / ${jurisdiction.mandatoryCureDays}d cure).`
      );
    }

    // 2. Independent Fining Committee check
    if (!independentCommitteeUsed) {
      if (jurisdiction.independentCommitteeRequired) {
        voidabilityScore += 30;
        defects.push(
          `Missing Independent Fining Committee: ${jurisdiction.name} mandates an independent committee (non-board/non-related members) before a fine can be levied.`
        );
      } else {
        voidabilityScore += 12;
        defects.push(
          `Unilateral Board Fining: No independent fining committee convened. Due-process hearing rights under ${jurisdiction.primaryStatute} support challenging biased board-only penalties.`
        );
      }
    }

    // 3. Selective Enforcement / Waiver / Abandonment
    let evidentiaryStrength: "Strong" | "Moderate" | "Baseline" = "Baseline";
    if (unpenalizedNeighbors >= 8) {
      voidabilityScore += 30;
      evidentiaryStrength = "Strong";
      defects.push(
        `High Selective Enforcement Pattern (${unpenalizedNeighbors} unpenalized homes): Open, widespread non-enforcement across ${unpenalizedNeighbors} comparable lots supports waiver, abandonment, and arbitrary-enforcement defenses.`
      );
    } else if (unpenalizedNeighbors >= 3) {
      voidabilityScore += 20;
      evidentiaryStrength = "Moderate";
      defects.push(
        `Documented Disparate Treatment (${unpenalizedNeighbors} unpenalized homes): At least ${unpenalizedNeighbors} comparable properties exhibit the same condition without fines.`
      );
    } else if (unpenalizedNeighbors >= 1) {
      voidabilityScore += 8;
      evidentiaryStrength = "Baseline";
      defects.push(
        `Initial Comparator Evidence (${unpenalizedNeighbors} unpenalized home${unpenalizedNeighbors > 1 ? "s" : ""}): Expand your neighborhood photo sweep to 3–5+ comparators before the board hearing.`
      );
    }

    // 4. Statutory Fine Cap check
    const cap = jurisdiction.perViolationCapUsd;
    if (cap !== null && fineAmountUsd > cap) {
      voidabilityScore += 15;
      defects.push(
        `Fine Exceeds Statutory Cap: $${fineAmountUsd.toLocaleString()} exceeds ${jurisdiction.name}'s $${cap.toLocaleString()} per-violation statutory cap.`
      );
    }

    // 5. Certified Mail check
    if (jurisdiction.certifiedMailRequired) {
      voidabilityScore += 5;
      defects.push(
        `Certified Mail Mandate: ${jurisdiction.name} requires certified mail / statutory delivery proof before fining or fee-shifting.`
      );
    }

    voidabilityScore = Math.min(100, Math.max(0, voidabilityScore));

    const voidabilityTier =
      voidabilityScore >= 70
        ? "HIGH PROCEDURAL VOIDABILITY"
        : voidabilityScore >= 40
        ? "MODERATE VOIDABILITY — STRONG HEARING LEVERAGE"
        : "LOW PROCEDURAL DEFECTS — FOCUS ON EQUITABLE WAIVER";

    const recommendedDeadlineDays = Math.max(7, jurisdiction.mandatoryCureDays || 14);

    return {
      voidabilityScore,
      voidabilityTier,
      evidentiaryStrength,
      defects,
      requiredWindow,
      recommendedDeadlineDays,
    };
  }, [jurisdiction, noticeDaysGiven, independentCommitteeUsed, unpenalizedNeighbors, fineAmountUsd]);

  const checklist = useMemo(
    () => getPhotoChecklist(violationType, unpenalizedNeighbors),
    [violationType, unpenalizedNeighbors]
  );

  const letterText = `VIA CERTIFIED MAIL & EMAIL
Date: ${new Date().toISOString().slice(0, 10)}
To: Board of Directors & Architectural / Fining Committee
Re: Formal Objection to Violation Notice, Selective Enforcement Defense & Records Demand

Dear Board of Directors:

I am in receipt of the Association's violation notice regarding "${violationType}" (disputed fine: $${fineAmountUsd.toLocaleString()}). Please enter this letter into the official hearing record.

1. PROCEDURAL & STATUTORY DEFECTS (${jurisdiction.name}):
- Controlling Statute: ${jurisdiction.primaryStatute}
- Notice/Cure Window Provided: ${noticeDaysGiven} days (State benchmark: ${audit.requiredWindow} days).
- Independent Fining Committee: ${independentCommitteeUsed ? "Provided" : "NOT provided / Board acted unilaterally"}.
- Procedural Voidability Score: ${audit.voidabilityScore}/100 (${audit.voidabilityTier}).

2. SELECTIVE ENFORCEMENT & WAIVER DEFENSE:
At least ${unpenalizedNeighbors} comparable properties within the community currently maintain the exact same "${violationType}" condition openly without enforcement or penalty. Under established HOA governance law, arbitrary or selective enforcement against a single lot renders the restriction unenforceable and void.

3. STATUTORY RECORDS INSPECTION DEMAND:
Pursuant to ${jurisdiction.name} law (statutory inspection window: ${jurisdiction.recordsInspectionDays} days), please produce all violation logs, fining committee minutes, and ARC approvals for "${violationType}" over the past 24 months, and confirm cancellation of the proposed fine in writing.

Sincerely,
[Homeowner Name]
[Property Address / Lot #]`;

  return (
    <div className="space-y-8">
      {/* One-Click Scenarios */}
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
              setViolationType(p.violationType);
              setNoticeDaysGiven(p.noticeDaysGiven);
              setIndependentCommitteeUsed(p.independentCommitteeUsed);
              setUnpenalizedNeighbors(p.unpenalizedNeighbors);
              setFineAmountUsd(p.fineAmountUsd);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-[#0f2747] text-[#0f2747] transition cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Inputs + Live Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 brief-card p-6 space-y-5 no-print">
          <h2 className="text-lg font-extrabold text-[#0f2747] border-b border-slate-200 pb-3">
            1. Violation &amp; Forensics Inputs
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              State / Jurisdiction (51 Codes)
            </label>
            <select
              value={stateAbbr}
              onChange={(e) => setStateAbbr(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-[#0f2747] bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
            >
              {HOA_STATUTES_2026.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name} ({s.abbr})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Violation Type
            </label>
            <select
              value={violationType}
              onChange={(e) => setViolationType(e.target.value as ViolationType)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-[#0f2747] bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
            >
              {VIOLATION_TYPES.map((vt) => (
                <option key={vt} value={vt}>
                  {vt}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Notice / Cure Days Given
              </label>
              <input
                type="number"
                min={0}
                max={120}
                value={noticeDaysGiven}
                onChange={(e) => setNoticeDaysGiven(Math.max(0, Number(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-bold tabular-nums text-[#0f2747]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Proposed Fine ($)
              </label>
              <input
                type="number"
                min={0}
                max={50000}
                step={25}
                value={fineAmountUsd}
                onChange={(e) => setFineAmountUsd(Math.max(0, Number(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-bold tabular-nums text-[#0f2747]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Unpenalized Neighbor Count
            </label>
            <input
              type="number"
              min={0}
              max={500}
              value={unpenalizedNeighbors}
              onChange={(e) => setUnpenalizedNeighbors(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-bold tabular-nums text-[#0f2747]"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Number of other homes in the HOA with the exact same condition without fines.
            </p>
          </div>

          <div>
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={independentCommitteeUsed}
                onChange={(e) => setIndependentCommitteeUsed(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#0f2747]"
              />
              <span className="text-xs font-semibold text-slate-700 leading-relaxed">
                HOA provided a hearing before an <strong>independent fining committee</strong> (non-board members) prior to fining.
              </span>
            </label>
          </div>
        </div>

        {/* Live Forensics Results */}
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl p-6 border-2 bg-white border-[#0f2747] shadow-sm space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest font-bold text-[#0f2747]">
                  PROCEDURAL &amp; SELECTIVE ENFORCEMENT VERDICT
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#0f2747] mt-1">
                  {audit.voidabilityTier}
                </div>
              </div>
              <IcsDeadlineButton
                title={`HOA Hearing / Cure Deadline (${jurisdiction.abbr} — ${violationType})`}
                description={`Statutory cure & hearing defense deadline under ${jurisdiction.primaryStatute}. Procedural Voidability Score: ${audit.voidabilityScore}/100. Unpenalized comparators: ${unpenalizedNeighbors}.`}
                daysFromNow={audit.recommendedDeadlineDays}
                url="https://hoafig.com/calculators/selective-enforcement-analyzer/"
                label="Export Hearing Deadline (.ics)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Procedural Voidability Score
                </div>
                <div
                  className={`text-3xl font-extrabold tabular-nums mt-1 ${
                    audit.voidabilityScore >= 70
                      ? "text-[#059669]"
                      : audit.voidabilityScore >= 40
                      ? "text-amber-600"
                      : "text-[#0f2747]"
                  }`}
                >
                  {audit.voidabilityScore} / 100
                </div>
                <div className="text-xs text-slate-600 mt-0.5">Higher = Stronger Voidability</div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Selective Enforcement Strength
                </div>
                <div
                  className={`text-2xl font-extrabold mt-1 ${
                    audit.evidentiaryStrength === "Strong"
                      ? "text-[#059669]"
                      : audit.evidentiaryStrength === "Moderate"
                      ? "text-amber-600"
                      : "text-slate-700"
                  }`}
                >
                  {audit.evidentiaryStrength}
                </div>
                <div className="text-xs text-slate-600 mt-0.5 tabular-nums">
                  {unpenalizedNeighbors} unpenalized comparators
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  State Notice / Cure Benchmark
                </div>
                <div className="text-2xl font-extrabold text-[#0f2747] tabular-nums mt-1">
                  {audit.requiredWindow} Days
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Given: {noticeDaysGiven}d ({noticeDaysGiven < audit.requiredWindow ? "Deficient" : "Compliant"})
                </div>
              </div>
            </div>

            {/* Detected Defects */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#0f2747]">
                Detected Statutory &amp; Evidentiary Findings
              </div>
              {audit.defects.length > 0 ? (
                <ul className="space-y-2">
                  {audit.defects.map((d, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-800 bg-emerald-50/70 border border-emerald-200 rounded-xl px-4 py-2.5 flex items-start gap-2"
                    >
                      <span className="font-mono font-bold text-[#059669] shrink-0">[{idx + 1}]</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs sm:text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  No automatic notice or committee defects detected. Use the 5-Point Photo &amp; Witness Checklist below to build a selective-enforcement defense.
                </div>
              )}
            </div>
          </div>

          {/* 5-Point Photo & Witness Documentation Checklist */}
          <div className="brief-card p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#0f2747] font-bold">
                  EVIDENTIARY PACKET CHECKLIST
                </div>
                <h3 className="text-lg font-extrabold text-[#0f2747]">
                  5-Point Photo &amp; Witness Documentation Checklist
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#059669]/10 text-[#059669]">
                {violationType}
              </span>
            </div>
            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-1"
                >
                  <div className="text-sm font-extrabold text-[#0f2747]">{item.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Printable Hearing Defense Brief */}
      <HearingBriefPanel
        briefTitle={`${jurisdiction.name} Selective Enforcement & Procedural Defense (${violationType})`}
        jurisdictionName={jurisdiction.name}
        statuteCitation={jurisdiction.primaryStatute}
        officialGovUrl={jurisdiction.officialGovUrl}
        summaryRows={[
          { label: "Violation Category", value: violationType },
          {
            label: "Procedural Voidability Score",
            value: `${audit.voidabilityScore} / 100 (${audit.voidabilityTier})`,
            highlight: audit.voidabilityScore >= 40 ? "ok" : "warn",
          },
          {
            label: "Selective Enforcement Strength",
            value: `${audit.evidentiaryStrength} (${unpenalizedNeighbors} unpenalized neighbors)`,
            highlight: unpenalizedNeighbors >= 3 ? "ok" : "warn",
          },
          {
            label: "Notice / Cure Window",
            value: `${noticeDaysGiven} days given (State benchmark: ${audit.requiredWindow} days)`,
            highlight: noticeDaysGiven < audit.requiredWindow ? "danger" : "ok",
          },
          {
            label: "Independent Fining Committee",
            value: independentCommitteeUsed
              ? "Yes — Independent Committee Provided"
              : jurisdiction.independentCommitteeRequired
              ? "NO — Violates State Mandatory Committee Rule"
              : "No — Board Unilateral Action",
            highlight: !independentCommitteeUsed ? "danger" : "ok",
          },
          {
            label: "Records Inspection Window",
            value: `${jurisdiction.recordsInspectionDays} days (${jurisdiction.name})`,
          },
        ]}
        letterText={letterText}
      />

      {/* Dodo Paywall Dossier */}
      <ToolPaywallDossier
        badge="Selective Enforcement Defense Kit"
        title="Download Editable Selective Enforcement Exhibit Log & Certified Mail Demand"
        desc="Get the Word (.DOCX) Certified Mail Selective Enforcement Objection, Neighbor Affidavit Template, and 51-State Fining Committee Citation Matrix."
        price="$24.99"
        pid="pdt_0NsmkloFUuNMrFIQIYxtQ"
        docType="Selective Enforcement Hearing Packet"
        dynamicAmount={`${audit.voidabilityScore}/100 Voidability`}
        storageKey="selective_enforcement_analyzer"
        features={[
          "Editable Selective Enforcement Demand (.DOCX)",
          "5-Point Photo & Comparator Exhibit Log (.DOCX)",
          "Neighbor Witness Affidavit Template",
          "51-State Statutory Citation Matrix (2026)",
        ]}
        sampleLines={[
          { label: "Jurisdiction", value: `${jurisdiction.name} (${jurisdiction.abbr})` },
          { label: "Voidability Score", value: `${audit.voidabilityScore} / 100` },
          { label: "Unpenalized Homes", value: `${unpenalizedNeighbors} Comparators` },
        ]}
      />
    </div>
  );
}
