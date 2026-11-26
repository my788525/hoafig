"use client";

import React, { useState, useMemo } from "react";
import { HOA_STATUTES_2026, STATUTES_BY_ABBR, type HoaStatuteJurisdiction } from "@/data/hoa_statutes_2026";
import HearingBriefPanel from "@/components/HearingBriefPanel";
import IcsDeadlineButton from "@/components/IcsDeadlineButton";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

type RestrictedImprovement =
  | "Rooftop Solar Panels"
  | "Level-2 EV Charger"
  | "Starlink / Satellite Dish (FCC OTARD)"
  | "Drought-Tolerant Landscaping / Xeriscaping"
  | "U.S. / Political Flag"
  | "Clothesline / Energy-Saving Device";

const IMPROVEMENTS: RestrictedImprovement[] = [
  "Rooftop Solar Panels",
  "Level-2 EV Charger",
  "Starlink / Satellite Dish (FCC OTARD)",
  "Drought-Tolerant Landscaping / Xeriscaping",
  "U.S. / Political Flag",
  "Clothesline / Energy-Saving Device",
];

const XERISCAPE_STATUTES: Record<string, string> = {
  CA: "Cal. Civ. Code § 4735 (Low-Water-Using Plants & Artificial Turf Voidance)",
  FL: "Fla. Stat. § 720.3075(4) & § 373.185 (Florida-Friendly Landscaping Preemption)",
  TX: "Tex. Prop. Code § 202.007 (Drought-Resistant Landscaping & Water-Conserving Turf)",
  AZ: "A.R.S. § 33-1816 / § 33-1261 (Drought-Tolerant Landscaping Protection)",
  CO: "C.R.S. § 37-60-126 & § 38-33.3-106.5(1)(i) (Xeriscape & Turf Preemption)",
  NV: "NRS § 116.330 & § 278.0208 (Drought-Tolerant Landscaping Protection)",
  NM: "N.M. Stat. § 47-16-14 (Water-Conserving Landscaping)",
  UT: "Utah Code § 57-8a-231 (Water-Wise Landscaping Protection)",
};

const CLOTHESLINE_STATUTES: Record<string, string> = {
  CA: "Cal. Civ. Code § 4750.10 (Right to Dry — Clotheslines & Drying Racks)",
  FL: "Fla. Stat. § 163.04 (Energy Devices Based on Renewable Resources — Clotheslines)",
  CO: "C.R.S. § 38-33.3-106.5(1)(c) (Renewable Energy Generation & Retractable Clotheslines)",
  AZ: "A.R.S. § 33-439 (Solar & Energy-Saving Drying Devices)",
  TX: "Tex. Prop. Code § 202.010 / Local Energy Conservation Rules (Review Reasonable Placement)",
  HI: "Haw. Rev. Stat. § 196-8.5 (Right to Dry Clotheslines)",
  ME: "Me. Rev. Stat. tit. 33, § 1421 (Right to Dry)",
  MD: "Md. Code, Real Prop. § 14-130 (Clotheslines)",
  NC: "N.C. Gen. Stat. § 22B-20 (Solar Collectors & Energy Devices)",
  OR: "Or. Rev. Stat. § 94.776 (Solar & Energy-Saving Devices)",
  VT: "Vt. Stat. Ann. tit. 27, § 544 (Energy-Saving Devices & Clotheslines)",
  VA: "Va. Code § 55.1-1820.1 / § 67-701 (Energy-Saving Devices)",
};

const FLAG_STATUTES: Record<string, string> = {
  CA: "Cal. Civ. Code § 4710 & 4 U.S.C. § 5 note (U.S. Flag + Noncommercial Signs/Flags)",
  FL: "Fla. Stat. § 720.304(2) & 4 U.S.C. § 5 note (U.S. Flag, Military & First Responder Flags)",
  TX: "Tex. Prop. Code § 202.012 & 4 U.S.C. § 5 note (U.S. Flag, Texas Flag & Military Flags)",
  AZ: "A.R.S. § 33-1808 & 4 U.S.C. § 5 note (U.S. Flag, Political Signs & Military Flags)",
  CO: "C.R.S. § 38-33.3-106.5(1)(a)-(c) & 4 U.S.C. § 5 note (Flags & Political Signs)",
};

const PRESETS: {
  label: string;
  stateAbbr: string;
  improvement: RestrictedImprovement;
  exclusiveUseArea: boolean;
  hoaAddedCostUsd: number;
}[] = [
  {
    label: "FCC OTARD Starlink (All 50 States)",
    stateAbbr: "TX",
    improvement: "Starlink / Satellite Dish (FCC OTARD)",
    exclusiveUseArea: true,
    hoaAddedCostUsd: 0,
  },
  {
    label: "CA Rooftop Solar + EV (Civ. Code §§ 714, 4745)",
    stateAbbr: "CA",
    improvement: "Rooftop Solar Panels",
    exclusiveUseArea: true,
    hoaAddedCostUsd: 2400,
  },
  {
    label: "FL Clothesline / Solar (Fla. Stat. § 163.04)",
    stateAbbr: "FL",
    improvement: "Clothesline / Energy-Saving Device",
    exclusiveUseArea: true,
    hoaAddedCostUsd: 0,
  },
  {
    label: "TX Xeriscaping (Tex. Prop. Code § 202.007)",
    stateAbbr: "TX",
    improvement: "Drought-Tolerant Landscaping / Xeriscaping",
    exclusiveUseArea: true,
    hoaAddedCostUsd: 0,
  },
];

function evaluatePreemption(
  jurisdiction: HoaStatuteJurisdiction,
  improvement: RestrictedImprovement,
  exclusiveUseArea: boolean,
  hoaAddedCostUsd: number
) {
  const abbr = jurisdiction.abbr;

  if (improvement === "Starlink / Satellite Dish (FCC OTARD)") {
    return {
      preempted: exclusiveUseArea,
      level: exclusiveUseArea ? "FEDERAL PREEMPTION (ALL 50 STATES + D.C.)" : "COMMON ELEMENT — NOT COVERED BY OTARD",
      authority: "FCC OTARD Rule — 47 C.F.R. § 1.4000",
      summary: exclusiveUseArea
        ? "Federal FCC OTARD (47 C.F.R. § 1.4000) preempts any HOA CC&R, rule, or architectural denial that impairs installation, maintenance, or use of dishes/antennas ≤ 1 meter (including Starlink & fixed wireless) within your exclusive-use area."
        : "FCC OTARD applies only to exclusive-use areas (your roof, balcony, patio, or yard), not shared common-area roofs.",
      deadlineDays: 14,
    };
  }

  if (improvement === "Rooftop Solar Panels") {
    const protectedState = jurisdiction.solarOverrideProtected;
    const solarCite =
      abbr === "CA"
        ? "Cal. Civ. Code § 714 (Solar Rights Act) & § 4746"
        : abbr === "FL"
        ? "Fla. Stat. § 163.04 (Solar & Renewable Energy Devices)"
        : abbr === "TX"
        ? "Tex. Prop. Code § 202.010 (Regulation of Solar Energy Devices)"
        : jurisdiction.solarOverrideStatute;
    return {
      preempted: protectedState,
      level: protectedState
        ? `STATE STATUTORY PREEMPTION ACTIVE (${abbr})`
        : "NO STATEWIDE SOLAR OVERRIDE — CHECK CC&Rs & LOCAL CODE",
      authority: solarCite,
      summary: protectedState
        ? `${jurisdiction.name} law voids HOA CC&Rs that prohibit or impose unreasonable cost/efficiency burdens on rooftop solar (${solarCite}).${
            abbr === "CA" && hoaAddedCostUsd > 1000
              ? ` Note: $${hoaAddedCostUsd.toLocaleString()} in HOA-mandated rerouting exceeds California's $1,000 cost threshold under Civ. Code § 714.`
              : ""
          }`
        : `${jurisdiction.name} does not have a statewide HOA solar access override statute; review recorded CC&Rs and municipal solar ordinances.`,
      deadlineDays: abbr === "CA" ? 45 : 30,
    };
  }

  if (improvement === "Level-2 EV Charger") {
    const protectedState = jurisdiction.evOverrideProtected;
    const evCite =
      abbr === "CA"
        ? "Cal. Civ. Code § 4745 (Electric Vehicle Charging Stations)"
        : jurisdiction.evOverrideStatute;
    return {
      preempted: protectedState,
      level: protectedState
        ? `STATE RIGHT-TO-CHARGE PREEMPTION ACTIVE (${abbr})`
        : "NO STATEWIDE EV OVERRIDE — CHECK CC&Rs & BUILDING CODE",
      authority: evCite,
      summary: protectedState
        ? `${jurisdiction.name} Right-to-Charge law voids any HOA covenant or rule that prohibits or unreasonably restricts installing a Level-2 EV charger in your exclusive-use garage or deeded parking (${evCite}).`
        : `${jurisdiction.name} has no statewide HOA EV Right-to-Charge preemption; check municipal electrical codes and CC&R architectural standards.`,
      deadlineDays: abbr === "CA" ? 60 : 30,
    };
  }

  if (improvement === "Drought-Tolerant Landscaping / Xeriscaping") {
    const cite = XERISCAPE_STATUTES[abbr];
    return {
      preempted: Boolean(cite),
      level: cite
        ? `STATE XERISCAPING PREEMPTION ACTIVE (${abbr})`
        : "CHECK MUNICIPAL WATER-CONSERVATION & CC&R RULES",
      authority: cite || `${jurisdiction.primaryStatute} (No statewide xeriscaping preemption)`,
      summary: cite
        ? `${jurisdiction.name} statute (${cite}) prohibits HOAs from banning drought-tolerant landscaping, native plants, or water-conserving turf, or fining owners for reducing turf watering during drought.`
        : `${jurisdiction.name} does not have a dedicated statewide HOA xeriscaping override; check city/county water-authority ordinances that may preempt HOA turf mandates.`,
      deadlineDays: 21,
    };
  }

  if (improvement === "U.S. / Political Flag") {
    const cite =
      FLAG_STATUTES[abbr] ||
      "Freedom to Display the American Flag Act of 2005 (Pub. L. 109-243, 4 U.S.C. § 5 note)";
    return {
      preempted: true,
      level: "FEDERAL + STATE FLAG DISPLAY PROTECTION",
      authority: cite,
      summary: `Federal law (4 U.S.C. § 5 note) prohibits any HOA nationwide from banning the display of the U.S. flag on residential property, subject only to reasonable time, place, and manner rules.${
        FLAG_STATUTES[abbr]
          ? ` ${jurisdiction.name} additionally protects state, military, and political flags/signs under ${FLAG_STATUTES[abbr]}.`
          : ""
      }`,
      deadlineDays: 14,
    };
  }

  // Clothesline / Energy-Saving Device
  const cite = CLOTHESLINE_STATUTES[abbr];
  return {
    preempted: Boolean(cite),
    level: cite
      ? `STATE RIGHT-TO-DRY PREEMPTION ACTIVE (${abbr})`
      : "NO STATEWIDE RIGHT-TO-DRY STATUTE — CHECK CC&Rs",
    authority: cite || `${jurisdiction.primaryStatute} (No statewide Right-to-Dry statute)`,
    summary: cite
      ? `${jurisdiction.name} "Right to Dry" statute (${cite}) voids HOA bans on outdoor clotheslines and solar energy-saving drying devices, allowing only reasonable aesthetic placement rules.`
      : `${jurisdiction.name} does not have a statewide HOA Right-to-Dry statute; check local energy-conservation ordinances and CC&R backyard screening rules.`,
    deadlineDays: 14,
  };
}

export default function CcrPreemptionChecker() {
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [improvement, setImprovement] = useState<RestrictedImprovement>("Rooftop Solar Panels");
  const [exclusiveUseArea, setExclusiveUseArea] = useState(true);
  const [hoaAddedCostUsd, setHoaAddedCostUsd] = useState(2400);

  const jurisdiction = STATUTES_BY_ABBR[stateAbbr] || STATUTES_BY_ABBR["CA"];

  const verdict = useMemo(
    () => evaluatePreemption(jurisdiction, improvement, exclusiveUseArea, hoaAddedCostUsd),
    [jurisdiction, improvement, exclusiveUseArea, hoaAddedCostUsd]
  );

  const letterText = `VIA CERTIFIED MAIL & EMAIL
Date: ${new Date().toISOString().slice(0, 10)}
To: Board of Directors & Architectural Review Committee (ARC)
Re: Notice of Statutory Preemption — ${improvement} (${jurisdiction.name})

Dear Board of Directors & ARC:

Please take notice that the Association's restriction or denial regarding "${improvement}" within my exclusive-use property area is preempted and void as a matter of law.

CONTROLLING STATUTORY PREEMPTION AUTHORITY:
- Authority: ${verdict.authority}
- Preemption Verdict: ${verdict.level}
- Analysis: ${verdict.summary}

Under controlling federal and/or ${jurisdiction.name} law, any private CC&R provision, architectural guideline, or fine that conflicts with statutory public policy is unenforceable. Please confirm withdrawal of any violation notice or architectural denial within 10 business days.

Sincerely,
[Homeowner Name]
[Property Address / Lot #]`;

  return (
    <div className="space-y-8">
      {/* One-Click Presets */}
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
              setImprovement(p.improvement);
              setExclusiveUseArea(p.exclusiveUseArea);
              setHoaAddedCostUsd(p.hoaAddedCostUsd);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-[#0f2747] text-[#0f2747] transition cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Inputs + Live Statutory Preemption Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 brief-card p-6 space-y-5 no-print">
          <h2 className="text-lg font-extrabold text-[#0f2747] border-b border-slate-200 pb-3">
            1. Select Jurisdiction &amp; Restricted Improvement
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
              Restricted Improvement
            </label>
            <select
              value={improvement}
              onChange={(e) => setImprovement(e.target.value as RestrictedImprovement)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-[#0f2747] bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2747]"
            >
              {IMPROVEMENTS.map((imp) => (
                <option key={imp} value={imp}>
                  {imp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              HOA-Added Compliance Cost ($)
            </label>
            <input
              type="number"
              min={0}
              max={50000}
              step={100}
              value={hoaAddedCostUsd}
              onChange={(e) => setHoaAddedCostUsd(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-bold tabular-nums text-[#0f2747]"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Extra cost imposed by HOA rerouting, screening, or aesthetic conditions.
            </p>
          </div>

          <div>
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={exclusiveUseArea}
                onChange={(e) => setExclusiveUseArea(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#0f2747]"
              />
              <span className="text-xs font-semibold text-slate-700 leading-relaxed">
                Installation is on my <strong>exclusive-use property</strong> (roof, yard, patio, balcony, or deeded parking).
              </span>
            </label>
          </div>
        </div>

        {/* Verdict Panel */}
        <div className="lg:col-span-7 space-y-5">
          <div
            className={`rounded-2xl p-6 border-2 shadow-sm space-y-4 ${
              verdict.preempted
                ? "bg-emerald-50/60 border-[#059669]"
                : "bg-amber-50/60 border-amber-500"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest font-bold text-[#0f2747]">
                  《STATUTORY PREEMPTION VERDICT》
                </div>
                <div
                  className={`text-xl sm:text-2xl font-extrabold mt-1 ${
                    verdict.preempted ? "text-[#059669]" : "text-amber-700"
                  }`}
                >
                  {verdict.level}
                </div>
              </div>
              <IcsDeadlineButton
                title={`HOA Preemption Response Deadline (${jurisdiction.abbr} — ${improvement})`}
                description={`Statutory preemption response deadline under ${verdict.authority}. Verdict: ${verdict.level}.`}
                daysFromNow={verdict.deadlineDays}
                url="https://hoafig.com/calculators/ccr-preemption-checker/"
                label="Export Response Deadline (.ics)"
              />
            </div>

            <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Controlling Statutory Authority
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#0f2747]">
                {verdict.authority}
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">{verdict.summary}</p>

            {/* Key Federal & State Reference Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="rounded-xl bg-white border border-slate-200 p-3.5">
                <div className="font-extrabold text-[#0f2747]">Federal Preemption Floor</div>
                <p className="text-slate-600 mt-1">
                  FCC OTARD (47 C.F.R. § 1.4000) &amp; Freedom to Display the American Flag Act (4 U.S.C. § 5 note) apply in all 50 states.
                </p>
              </div>
              <div className="rounded-xl bg-white border border-slate-200 p-3.5">
                <div className="font-extrabold text-[#0f2747]">Benchmark State Citations</div>
                <p className="text-slate-600 mt-1">
                  CA Civ. Code §§ 714, 4745 · FL Fla. Stat. § 163.04 · TX Tex. Prop. Code § 202.010.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Preemption Brief */}
      <HearingBriefPanel
        briefTitle={`《Statutory Preemption Brief》 — ${improvement} (${jurisdiction.name})`}
        jurisdictionName={jurisdiction.name}
        statuteCitation={verdict.authority}
        officialGovUrl={jurisdiction.officialGovUrl}
        summaryRows={[
          { label: "Restricted Improvement", value: improvement },
          {
            label: "Statutory Preemption Verdict",
            value: verdict.level,
            highlight: verdict.preempted ? "ok" : "warn",
          },
          { label: "Controlling Authority", value: verdict.authority },
          {
            label: "Exclusive-Use Property",
            value: exclusiveUseArea ? "Yes (Protected Area)" : "No (Common Area)",
            highlight: exclusiveUseArea ? "ok" : "warn",
          },
          {
            label: "HOA-Added Compliance Cost",
            value: `$${hoaAddedCostUsd.toLocaleString()}`,
            highlight: hoaAddedCostUsd > 1000 ? "danger" : "ok",
          },
        ]}
        letterText={letterText}
      />

      {/* Dodo Paywall Dossier */}
      <ToolPaywallDossier
        badge="CC&R Statutory Preemption Kit"
        title="Download Editable CC&R Preemption Demand & Federal/State Citation Packet"
        desc="Get the Word (.DOCX) Certified Mail Statutory Preemption Notice, FCC OTARD & State Solar/EV/Xeriscape Exhibit Citations, and Board Hearing Script."
        price="$29.99"
        pid="pdt_0NsmwwfDV7JbBnq8xutN0"
        docType="CC&R Statutory Preemption Packet"
        dynamicAmount={verdict.preempted ? `PREEMPTED (${jurisdiction.abbr})` : `CC&R AUDIT (${jurisdiction.abbr})`}
        storageKey="ccr_preemption_checker"
        features={[
          "Editable Preemption Demand Letter (.DOCX)",
          "FCC OTARD 47 CFR § 1.4000 Exhibit Sheet",
          "CA/FL/TX & 51-State Preemption Matrix",
          "Certified Mail & ARC Appeal Checklist",
        ]}
        sampleLines={[
          { label: "Jurisdiction", value: `${jurisdiction.name} (${jurisdiction.abbr})` },
          { label: "Improvement", value: improvement },
          { label: "Preemption Status", value: verdict.preempted ? "Protected" : "Check CC&Rs" },
        ]}
      />
    </div>
  );
}
