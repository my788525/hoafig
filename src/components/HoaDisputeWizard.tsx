'use client';

import React, { useMemo, useState } from 'react';
import { HOA_STATUTES_2026, type HoaStatuteJurisdiction } from '@/data/hoa_statutes_2026';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';
import HiddenTrapsCallout from '@/components/HiddenTrapsCallout';
import IcsDeadlineButton from '@/components/IcsDeadlineButton';
import WizardLeadEscalation from '@/components/WizardLeadEscalation';

type DisputeCategory =
  | 'HOA Violation Fine'
  | 'Solar / EV Charger / OTARD ARC Denial'
  | 'Special Assessment / Reserve Hike'
  | 'Late Fee & Interest Stacking';

interface ProceduralFlags {
  noIndependentCommittee: boolean;
  noCertifiedMailOrHearing: boolean;
  lateFeesOrInterestAdded: boolean;
  selectiveEnforcement: boolean;
  exceedsStateCap: boolean;
}

const DISPUTE_CATEGORIES: {
  id: DisputeCategory;
  tag: string;
  desc: string;
  defaultAmount: number;
}[] = [
  {
    id: 'HOA Violation Fine',
    tag: 'Fine & Hearing Defense',
    desc: 'Challenge single or daily continuing fines, missing cure windows, or lack of an independent fining committee.',
    defaultAmount: 500
  },
  {
    id: 'Solar / EV Charger / OTARD ARC Denial',
    tag: 'Federal & State Preemption',
    desc: 'Override HOA architectural denials for solar panels, EV chargers, or satellite/fixed-wireless antennas (FCC OTARD).',
    defaultAmount: 1500
  },
  {
    id: 'Special Assessment / Reserve Hike',
    tag: 'Reserve & Vote Audit',
    desc: 'Audit sudden capital assessments, reserve study shortfalls, and mandatory homeowner voting thresholds.',
    defaultAmount: 4500
  },
  {
    id: 'Late Fee & Interest Stacking',
    tag: 'Ledger & Waterfall Audit',
    desc: 'Stop illegal compounding of late fees/interest onto fines and challenge improper payment-waterfall allocation.',
    defaultAmount: 750
  }
];

const PROCEDURAL_ITEMS: {
  key: keyof ProceduralFlags;
  label: string;
  hint: string;
  weight: number;
}[] = [
  {
    key: 'noIndependentCommittee',
    label: 'No independent fining committee',
    hint: 'Fine or sanction imposed directly by the Board or property manager without an impartial peer committee.',
    weight: 22
  },
  {
    key: 'noCertifiedMailOrHearing',
    label: 'No certified mail / hearing offered',
    hint: 'Notice lacked statutory delivery method, cure deadline, or written invitation to a due-process hearing.',
    weight: 25
  },
  {
    key: 'lateFeesOrInterestAdded',
    label: 'Late fees / interest added to fine',
    hint: 'Association tacked administrative late charges, interest, or collection fees onto an unverified fine.',
    weight: 18
  },
  {
    key: 'selectiveEnforcement',
    label: 'Selective enforcement by board',
    hint: 'Identical or similar conditions exist on neighboring lots/units without enforcement action.',
    weight: 15
  },
  {
    key: 'exceedsStateCap',
    label: 'Exceeds state cap',
    hint: 'Total fine, daily accrual, or assessment hike exceeds the state statutory ceiling or declaration limit.',
    weight: 20
  }
];

interface KitTier {
  id: 'fine' | 'arc' | 'reserve';
  pid: string;
  price: string;
  badge: string;
  title: string;
  desc: string;
  docType: string;
  features: string[];
  matchCategories: DisputeCategory[];
}

const KIT_TIERS: KitTier[] = [
  {
    id: 'fine',
    pid: 'pdt_0NsmkloFUuNMrFIQIYxtQ',
    price: '$24.99',
    badge: 'Fine & Hearing Defense Suite',
    title: '50-State HOA Fine Compliance & Board Hearing Defense VIP Suite',
    desc: 'Complete editable Word (.DOCX) Certified Mail demand letters, 51-state fine cap citations, and board hearing scripts.',
    docType: 'HOA Fine & Hearing Defense Suite',
    features: [
      'Editable Certified Mail Demand & Cure-Notice Letters (.DOCX)',
      '51-State Statutory Fine Cap & Committee Citation Matrix',
      'Board Hearing Oral Argument & Evidence Checklist',
      'Payment-Waterfall & Late-Fee Dispute Ledger Template'
    ],
    matchCategories: ['HOA Violation Fine', 'Late Fee & Interest Stacking']
  },
  {
    id: 'arc',
    pid: 'pdt_0NsmwwfDV7JbBnq8xutN0',
    price: '$29.99',
    badge: 'ARC Statutory Override Kit',
    title: 'Solar Access, EV Charger & FCC OTARD Statutory Override Kit',
    desc: 'Preemption demand templates citing state Solar Rights, Right-to-Charge statutes, and federal 47 C.F.R. § 1.4000.',
    docType: 'Solar / EV / OTARD Override Kit',
    features: [
      'Federal FCC OTARD (47 C.F.R. § 1.4000) Preemption Notice',
      'State Solar Access & EV Right-to-Charge Demand Letters',
      'ARC Re-Submission Cover Brief & Cost-Impacting Rule Audit',
      'Statutory Fee-Shifting & Attorney-Fee Warning Clauses'
    ],
    matchCategories: ['Solar / EV Charger / OTARD ARC Denial']
  },
  {
    id: 'reserve',
    pid: 'pdt_0Nsmwx3dR4hTpaHlLUuUt',
    price: '$39.99',
    badge: 'Reserve & Assessment Pack',
    title: 'HOA Reserve Study Audit & Special Assessment Petition Pack',
    desc: 'Challenge underfunded reserve hikes and unvoted special assessments with statutory records-inspection demands and owner petitions.',
    docType: 'Reserve Audit & Petition Pack',
    features: [
      'Statutory Records & Reserve Study Inspection Demand (.DOCX)',
      'Special Assessment Vote-Threshold & Cap Audit Workbook',
      'Homeowner Recall / Special Meeting Petition Templates',
      'Board Fiduciary Duty & Line-Item Budget Challenge Brief'
    ],
    matchCategories: ['Special Assessment / Reserve Hike']
  }
];

export default function HoaDisputeWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [stateAbbr, setStateAbbr] = useState<string>('FL');
  const [category, setCategory] = useState<DisputeCategory>('HOA Violation Fine');
  const [amountStr, setAmountStr] = useState<string>('500');
  const [noticeDaysStr, setNoticeDaysStr] = useState<string>('7');
  const [monthlyDuesStr, setMonthlyDuesStr] = useState<string>('250');
  const [flags, setFlags] = useState<ProceduralFlags>({
    noIndependentCommittee: false,
    noCertifiedMailOrHearing: true,
    lateFeesOrInterestAdded: false,
    selectiveEnforcement: false,
    exceedsStateCap: false
  });
  const [copiedSummary, setCopiedSummary] = useState(false);

  const jurisdiction: HoaStatuteJurisdiction = useMemo(
    () => HOA_STATUTES_2026.find((s) => s.abbr === stateAbbr) || HOA_STATUTES_2026[0],
    [stateAbbr]
  );

  const amount = Math.max(0, Number(amountStr) || 0);
  const noticeDays = Math.max(0, Number(noticeDaysStr) || 0);
  const monthlyDues = Math.max(0, Number(monthlyDuesStr) || 0);

  const matchedKit: KitTier = useMemo(() => {
    return (
      KIT_TIERS.find((k) => k.matchCategories.includes(category)) || KIT_TIERS[0]
    );
  }, [category]);

  const analysis = useMemo(() => {
    const violations: string[] = [];
    let penaltyPoints = 0;

    if (
      jurisdiction.perViolationCapUsd !== null &&
      amount > jurisdiction.perViolationCapUsd &&
      (category === 'HOA Violation Fine' || category === 'Late Fee & Interest Stacking')
    ) {
      violations.push(
        `Claimed amount ($${amount.toLocaleString()}) exceeds ${jurisdiction.name} per-violation cap of $${jurisdiction.perViolationCapUsd.toLocaleString()}.`
      );
      penaltyPoints += 22;
    } else if (
      jurisdiction.continuingFineCapUsd !== null &&
      amount > jurisdiction.continuingFineCapUsd &&
      category === 'HOA Violation Fine'
    ) {
      violations.push(
        `Claimed amount ($${amount.toLocaleString()}) exceeds ${jurisdiction.name} continuing fine cap of $${jurisdiction.continuingFineCapUsd.toLocaleString()}.`
      );
      penaltyPoints += 22;
    }

    if (noticeDays < jurisdiction.mandatoryNoticeDays) {
      violations.push(
        `Notice/cure window provided (${noticeDays} days) is below ${jurisdiction.name}'s ${jurisdiction.mandatoryNoticeDays}-day statutory benchmark.`
      );
      penaltyPoints += 18;
    }

    if (flags.noIndependentCommittee) {
      if (jurisdiction.independentCommitteeRequired) {
        violations.push(
          `${jurisdiction.name} mandates an independent fining committee (${jurisdiction.primaryStatute}); board-only fines are procedurally defective.`
        );
        penaltyPoints += 22;
      } else {
        violations.push(
          `No independent fining committee convened — raises due-process and bias objections under ${jurisdiction.primaryStatute}.`
        );
        penaltyPoints += 12;
      }
    }

    if (flags.noCertifiedMailOrHearing) {
      violations.push(
        jurisdiction.certifiedMailRequired
          ? `${jurisdiction.name} requires certified mail / formal hearing notice (${jurisdiction.hearingRight}).`
          : `No formal hearing opportunity or verifiable notice offered (${jurisdiction.hearingRight}).`
      );
      penaltyPoints += 20;
    }

    if (flags.lateFeesOrInterestAdded) {
      if (!jurisdiction.interestOnFinesAllowed || jurisdiction.lateFeesOnFinesAllowed === false) {
        violations.push(
          `${jurisdiction.name} restricts or prohibits stacking late fees/interest onto HOA fines (${jurisdiction.paymentPriorityRule}).`
        );
        penaltyPoints += 18;
      } else {
        violations.push(
          `Late-fee/interest stacking requires strict ledger separation from regular assessments (${jurisdiction.paymentPriorityRule}).`
        );
        penaltyPoints += 10;
      }
    }

    if (flags.selectiveEnforcement) {
      violations.push(
        `Selective/arbitrary enforcement defense triggered — board must prove uniform enforcement across similarly situated parcels.`
      );
      penaltyPoints += 12;
    }

    if (flags.exceedsStateCap) {
      violations.push(
        `Statutory / CC&R cap exceeded: ${jurisdiction.capSummary}`
      );
      penaltyPoints += 16;
    }

    if (category === 'Solar / EV Charger / OTARD ARC Denial') {
      if (jurisdiction.solarOverrideProtected) {
        violations.push(`State Solar Access Override applies: ${jurisdiction.solarOverrideStatute}`);
      }
      if (jurisdiction.evOverrideProtected) {
        violations.push(`State EV Right-to-Charge Override applies: ${jurisdiction.evOverrideStatute}`);
      }
      violations.push(
        `Federal FCC OTARD Rule (47 C.F.R. § 1.4000) preempts HOA bans on qualifying customer-end antennas/dishes in exclusive-use areas.`
      );
    }

    if (category === 'Special Assessment / Reserve Hike') {
      violations.push(
        `Special Assessment Voting Rule: ${jurisdiction.specialAssessmentVoteThreshold}`
      );
      violations.push(
        `Statutory Records Inspection Right: Association must produce reserve studies & contracts within ${jurisdiction.recordsInspectionDays} days.`
      );
    }

    const complianceScore = Math.max(5, Math.min(100, 100 - penaltyPoints));
    const defenseStrength =
      complianceScore <= 45
        ? 'Strong Statutory Defense (High Procedural Defect Risk)'
        : complianceScore <= 75
        ? 'Moderate-to-Strong Defense (Verify Notice & Records)'
        : 'Baseline Audit (Request Written Ledger & Authority)';

    const annualDues = monthlyDues * 12;
    const exposureRatio = annualDues > 0 ? ((amount / annualDues) * 100).toFixed(1) : 'N/A';

    return {
      complianceScore,
      defenseStrength,
      violations,
      exposureRatio
    };
  }, [jurisdiction, category, amount, noticeDays, monthlyDues, flags]);

  const primaryAuthorityText = useMemo(() => {
    if (category === 'Solar / EV Charger / OTARD ARC Denial') {
      return `${jurisdiction.solarOverrideStatute} | ${jurisdiction.evOverrideStatute} | 47 C.F.R. § 1.4000`;
    }
    if (category === 'Special Assessment / Reserve Hike') {
      return `${jurisdiction.primaryStatute} · ${jurisdiction.specialAssessmentVoteThreshold}`;
    }
    return `${jurisdiction.primaryStatute} (${jurisdiction.condoStatute})`;
  }, [category, jurisdiction]);

  const freeSummaryText = useMemo(() => {
    return [
      `《HOA STATUTORY VIOLATION & BOARD HEARING BRIEF》`,
      `Dispute Category: ${category}`,
      `Jurisdiction: ${jurisdiction.name} (${jurisdiction.abbr})`,
      `Primary Statute: ${jurisdiction.primaryStatute}`,
      `Official Source: ${jurisdiction.officialGovUrl}`,
      `--------------------------------------------------`,
      `Disputed Exposure: $${amount.toLocaleString()} (${analysis.exposureRatio}% of annual dues)`,
      `Notice / Cure Window Provided: ${noticeDays} days (State benchmark: ${jurisdiction.mandatoryNoticeDays}d notice / ${jurisdiction.mandatoryCureDays}d cure)`,
      `HOA Compliance Score: ${analysis.complianceScore}/100 — ${analysis.defenseStrength}`,
      `--------------------------------------------------`,
      `STATUTORY & PROCEDURAL FINDINGS:`,
      ...analysis.violations.map((v, i) => `${i + 1}. ${v}`),
      `--------------------------------------------------`,
      `KEY DEFENSE TAKEAWAY:`,
      jurisdiction.keyDefenseTakeaway,
      `--------------------------------------------------`,
      `Generated by HOAFig.com/wizard (100% Client-Side Audit)`
    ].join('\n');
  }, [category, jurisdiction, amount, noticeDays, analysis]);

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(freeSummaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {}
  };

  const toggleFlag = (key: keyof ProceduralFlags) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const progressPct = (step / 4) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Bar & Stepper Header */}
      <div className="brief-card p-5 sm:p-6 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0f2747]">
            Step {step} of 4
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {step === 1 && 'Dispute Category & State'}
            {step === 2 && 'Financial Exposure & Notice Window'}
            {step === 3 && 'Procedural & Statutory Violations'}
            {step === 4 && 'Printable Brief & Matched Defense Kit'}
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c8a24a] transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3 text-[11px] font-semibold">
          {[
            { n: 1, label: '1. State & Type' },
            { n: 2, label: '2. Exposure' },
            { n: 3, label: '3. Violations' },
            { n: 4, label: '4. Brief & Kit' }
          ].map((s) => (
            <button
              key={s.n}
              type="button"
              onClick={() => setStep(s.n as 1 | 2 | 3 | 4)}
              className={`text-left py-1 px-1.5 rounded transition cursor-pointer truncate ${
                step === s.n
                  ? 'text-[#0f2747] font-extrabold bg-[#c8a24a]/15'
                  : step > s.n
                  ? 'text-[#059669]'
                  : 'text-slate-400'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="brief-card p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
              Step 1: Select Your State &amp; HOA Dispute Category
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Choose your jurisdiction (all 50 states + D.C.) and the primary dispute type to load verified 2026 statutory rules.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="wizard-state" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Property Jurisdiction (51 Codes)
            </label>
            <select
              id="wizard-state"
              value={stateAbbr}
              onChange={(e) => setStateAbbr(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-[#0f2747] focus:border-[#0f2747] focus:outline-none"
            >
              {HOA_STATUTES_2026.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name} ({s.abbr}) — {s.primaryStatute.split('(')[0].trim()}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              Loaded authority: <strong className="text-[#0f2747]">{jurisdiction.primaryStatute}</strong>
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Dispute Category
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DISPUTE_CATEGORIES.map((item) => {
                const selected = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCategory(item.id);
                      setAmountStr(String(item.defaultAmount));
                    }}
                    className={`text-left p-4 sm:p-5 rounded-xl border-2 transition cursor-pointer space-y-1.5 ${
                      selected
                        ? 'border-[#0f2747] bg-[#0f2747]/5 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">
                        {item.tag}
                      </span>
                      {selected && (
                        <span className="text-xs font-extrabold text-[#0f2747]">Selected ✓</span>
                      )}
                    </div>
                    <div className="text-base font-extrabold text-[#0f2747]">{item.id}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] text-white text-sm font-extrabold transition cursor-pointer"
            >
              Next: Financial Exposure →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="brief-card p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
              Step 2: Financial Exposure &amp; Notice Window
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Enter the dollar demand, cure/notice days provided by the HOA, and your regular monthly dues.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="wizard-amount" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Fine / Assessment Amount ($)
              </label>
              <input
                id="wizard-amount"
                type="number"
                min={0}
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-[#0f2747] tabular-nums"
              />
              <p className="text-[11px] text-slate-500">
                {jurisdiction.perViolationCapUsd !== null
                  ? `${jurisdiction.abbr} per-violation cap: $${jurisdiction.perViolationCapUsd}`
                  : jurisdiction.continuingFineCapUsd !== null
                  ? `${jurisdiction.abbr} continuing cap: $${jurisdiction.continuingFineCapUsd}`
                  : 'Reasonableness standard applies'}
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="wizard-days" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Cure / Notice Days Provided
              </label>
              <input
                id="wizard-days"
                type="number"
                min={0}
                value={noticeDaysStr}
                onChange={(e) => setNoticeDaysStr(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-[#0f2747] tabular-nums"
              />
              <p className="text-[11px] text-slate-500">
                {jurisdiction.abbr} benchmark: {jurisdiction.mandatoryNoticeDays}d notice / {jurisdiction.mandatoryCureDays}d cure
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="wizard-dues" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Monthly HOA Dues ($)
              </label>
              <input
                id="wizard-dues"
                type="number"
                min={0}
                value={monthlyDuesStr}
                onChange={(e) => setMonthlyDuesStr(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-[#0f2747] tabular-nums"
              />
              <p className="text-[11px] text-slate-500">
                Used to compute annual assessment exposure ratio.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-[#0f2747]">{jurisdiction.name} Statutory Snapshot:</div>
            <p>{jurisdiction.capSummary}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-bold transition cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] text-white text-sm font-extrabold transition cursor-pointer"
            >
              Next: Procedural Violations →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="brief-card p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747]">
              Step 3: Procedural &amp; Statutory Violations
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Check every procedural defect that applies to your notice, hearing, or ledger.
            </p>
          </div>

          <div className="space-y-3">
            {PROCEDURAL_ITEMS.map((item) => {
              const checked = flags[item.key];
              return (
                <label
                  key={item.key}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border transition cursor-pointer ${
                    checked
                      ? 'border-[#0f2747] bg-[#0f2747]/5'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleFlag(item.key)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0f2747] focus:ring-[#c8a24a]"
                  />
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-[#0f2747]">{item.label}</div>
                    <p className="text-xs text-slate-600">{item.hint}</p>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-bold transition cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-3 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] text-sm font-extrabold transition cursor-pointer shadow-sm"
            >
              Generate Printable Brief &amp; Match Kit →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3 no-print">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
            >
              ← Edit Procedural Violations
            </button>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Audit Complete · 100% Client-Side
            </span>
          </div>

          {/* Free Printable 《HOA Statutory Violation & Board Hearing Brief》 */}
          <div className="brief-card print-brief p-6 sm:p-8 bg-white space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#0f2747] font-bold">
                  《HOA STATUTORY VIOLATION &amp; BOARD HEARING BRIEF》
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2747] mt-1">
                  {jurisdiction.name} — {category}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Primary Authority:{' '}
                  <a
                    href={jurisdiction.officialGovUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0f2747] underline font-semibold"
                  >
                    {primaryAuthorityText}
                  </a>
                </p>
              </div>

              <div className="no-print flex flex-wrap items-center gap-2">
                <IcsDeadlineButton
                  title={`HOA Cure/Hearing Deadline (${jurisdiction.abbr} — ${category})`}
                  description={`Statutory cure/hearing response deadline under ${primaryAuthorityText}. Disputed exposure: $${amount.toLocaleString()}. Benchmark: ${jurisdiction.mandatoryNoticeDays}d notice / ${jurisdiction.mandatoryCureDays}d cure.`}
                  daysFromNow={Math.max(1, noticeDays || jurisdiction.mandatoryCureDays || 14)}
                  url="https://hoafig.com/wizard/"
                  label="Export Deadline (.ics)"
                />
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="px-3.5 py-2 rounded-lg bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                >
                  {copiedSummary ? 'Violation Summary Copied ✓' : 'Copy Free Violation Summary'}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg bg-[#0f2747] hover:bg-[#1a3b68] text-white text-xs font-bold transition cursor-pointer"
                >
                  Print Hearing Brief (PDF)
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  HOA Compliance Score
                </div>
                <div
                  className={`text-2xl font-extrabold tabular-nums mt-1 ${
                    analysis.complianceScore <= 50
                      ? 'text-rose-700'
                      : analysis.complianceScore <= 75
                      ? 'text-amber-700'
                      : 'text-[#059669]'
                  }`}
                >
                  {analysis.complianceScore} / 100
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{analysis.defenseStrength}</div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Disputed Exposure
                </div>
                <div className="text-2xl font-extrabold text-[#0f2747] tabular-nums mt-1">
                  ${amount.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {analysis.exposureRatio}% of annual dues (${(monthlyDues * 12).toLocaleString()}/yr)
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Notice / Cure Window
                </div>
                <div className="text-2xl font-extrabold text-[#0f2747] tabular-nums mt-1">
                  {noticeDays} Days
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  State Benchmark: {jurisdiction.mandatoryNoticeDays}d notice / {jurisdiction.mandatoryCureDays}d cure
                </div>
              </div>
            </div>

            {/* Statutory Findings */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#0f2747]">
                Detected Statutory &amp; Procedural Findings
              </h3>
              {analysis.violations.length > 0 ? (
                <ul className="space-y-2">
                  {analysis.violations.map((v, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-800 bg-rose-50/70 border border-rose-200/80 rounded-xl px-4 py-2.5"
                    >
                      <span className="font-mono font-bold text-rose-700 shrink-0">[{i + 1}]</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  No automatic statutory violations flagged from current inputs. Request a certified itemized ledger and written rule authority prior to any board hearing.
                </div>
              )}
            </div>

            <div className="rounded-xl bg-[#0f2747]/5 border border-[#0f2747]/15 p-4 text-xs text-slate-700 space-y-1">
              <div className="font-extrabold text-[#0f2747]">Key Defense Takeaway ({jurisdiction.name}):</div>
              <p>{jurisdiction.keyDefenseTakeaway}</p>
            </div>

            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap justify-between gap-2">
              <span>Generated by HOAFig.com/wizard · 100% Client-Side Statutory Audit</span>
              <span>Prepared for Board / Fining Committee Submission</span>
            </div>
          </div>

          {/* Contextual 3-Trap Survival Callout */}
          <HiddenTrapsCallout />

          {/* Dynamic ROI Value Anchor Banner */}
          <div className="no-print rounded-2xl border-2 border-[#c8a24a] bg-gradient-to-r from-[#091a32] to-[#0f2747] p-5 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#e2c275]">
                Dynamic ROI Value Anchor
              </div>
              <div className="text-lg sm:text-xl font-extrabold">
                Defending ${amount.toLocaleString()} Exposure for $29.99 ={' '}
                <span className="text-[#e2c275] tabular-nums">
                  {Math.max(1, Math.round(amount / 29.99))}x ROI
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Compare your ${amount.toLocaleString()} disputed exposure against the $29.99 Board Hearing &amp; Certified Demand Kit—fraction of a single $300/hr HOA attorney consultation.
              </p>
            </div>
            <div className="shrink-0 rounded-xl bg-[#c8a24a]/20 border border-[#c8a24a]/50 px-4 py-2.5 text-center">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#e2c275]">Leverage Ratio</div>
              <div className="text-2xl font-black text-white tabular-nums">
                {Math.max(1, Math.round(amount / 29.99))}x
              </div>
            </div>
          </div>

          <WizardLeadEscalation
            stateAbbr={jurisdiction.abbr}
            stateName={jurisdiction.name}
            exposureAmount={amount}
            summaryText={`${jurisdiction.name} (${jurisdiction.primaryStatute}) | Score: ${analysis.complianceScore}/100 (${analysis.defenseStrength}) | ${analysis.violations.join('; ')}`}
            statuteCitation={jurisdiction.primaryStatute}
          />

          {/* Matched Dodo Digital Product via ToolPaywallDossier */}
          <ToolPaywallDossier
            badge={`Matched Kit: ${matchedKit.badge}`}
            title={matchedKit.title}
            desc={matchedKit.desc}
            price={matchedKit.price}
            pid={matchedKit.pid}
            docType={matchedKit.docType}
            dynamicAmount={`$${amount.toLocaleString()} (${jurisdiction.abbr})`}
            features={matchedKit.features}
            storageKey="hoa_dispute_wizard"
            sampleLines={[
              { label: 'Jurisdiction', value: `${jurisdiction.name} (${jurisdiction.abbr})` },
              { label: 'Dispute Branch', value: category },
              { label: 'Compliance Score', value: `${analysis.complianceScore}/100` }
            ]}
          />

          {/* 3-Tier Kit Comparison Cards */}
          <section className="space-y-4 no-print">
            <div>
              <h3 className="text-xl font-extrabold text-[#0f2747]">
                Compare All 3 HOA Defense Kits
              </h3>
              <p className="text-sm text-slate-600">
                Your recommended kit is highlighted below, or select any specialized packet directly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {KIT_TIERS.map((tier) => {
                const isMatch = tier.id === matchedKit.id;
                const checkoutUrl = `https://checkout.dodopayments.com/buy/${encodeURIComponent(tier.pid)}`;
                return (
                  <div
                    key={tier.id}
                    data-matrix-offer="1"
                    data-offer-slot="inline"
                    data-offer-id={tier.pid}
                    className={`brief-card p-6 flex flex-col justify-between gap-5 ${
                      isMatch ? 'border-2 border-[#c8a24a] ring-2 ring-[#c8a24a]/20' : ''
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">
                          {tier.badge}
                        </span>
                        {isMatch && (
                          <span className="px-2 py-0.5 rounded-full bg-[#c8a24a]/20 text-[#0f2747] text-[10px] font-extrabold uppercase">
                            Best Match
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-extrabold text-[#0f2747] tabular-nums">
                        {tier.price}
                      </div>
                      <h4 className="text-base font-extrabold text-[#0f2747] leading-snug">
                        {tier.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{tier.desc}</p>
                      <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                        {tier.features.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#059669] font-bold">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-offer-action="buy"
                      data-offer-id={tier.pid}
                      className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-xs font-extrabold transition ${
                        isMatch
                          ? 'bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] shadow-sm'
                          : 'bg-[#0f2747] hover:bg-[#1a3b68] text-white'
                      }`}
                    >
                      Get {tier.price} Kit →
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
