"use client";

import React, { useState, useMemo } from "react";
import { HOA_STATUTES_2026, STATUTES_BY_ABBR } from "@/data/hoa_statutes_2026";
import HearingBriefPanel from "@/components/HearingBriefPanel";
import ToolPaywallDossier from "@/components/ToolPaywallDossier";

const PRESETS = [
  {
    label: "CA Payment Misallocation",
    stateAbbr: "CA",
    regularDuesOwed: 420,
    disputedFineAmount: 250,
    lateFeeCharged: 42,
    interestCharged: 18,
    collectionAdminFee: 75,
    ownerPaymentMade: 420,
    hoaAppliedToFinesFirst: true,
  },
  {
    label: "TX Waterfall Violation (§ 209.0063)",
    stateAbbr: "TX",
    regularDuesOwed: 300,
    disputedFineAmount: 400,
    lateFeeCharged: 50,
    interestCharged: 25,
    collectionAdminFee: 195,
    ownerPaymentMade: 300,
    hoaAppliedToFinesFirst: true,
  },
  {
    label: "AZ Fine Foreclosure Threat",
    stateAbbr: "AZ",
    regularDuesOwed: 280,
    disputedFineAmount: 600,
    lateFeeCharged: 60,
    interestCharged: 30,
    collectionAdminFee: 150,
    ownerPaymentMade: 280,
    hoaAppliedToFinesFirst: true,
  },
];

export default function LateFeeAuditorClient() {
  const [stateAbbr, setStateAbbr] = useState("CA");
  const [regularDuesOwed, setRegularDuesOwed] = useState(420);
  const [disputedFineAmount, setDisputedFineAmount] = useState(250);
  const [lateFeeCharged, setLateFeeCharged] = useState(42);
  const [interestCharged, setInterestCharged] = useState(18);
  const [collectionAdminFee, setCollectionAdminFee] = useState(75);
  const [ownerPaymentMade, setOwnerPaymentMade] = useState(420);
  const [hoaAppliedToFinesFirst, setHoaAppliedToFinesFirst] = useState(true);

  const jurisdiction = STATUTES_BY_ABBR[stateAbbr] || STATUTES_BY_ABBR["CA"];

  const audit = useMemo(() => {
    const findings: string[] = [];
    let strikeableCharges = 0;

    if (hoaAppliedToFinesFirst && ownerPaymentMade >= regularDuesOwed) {
      findings.push(
        `Illegal Payment Misallocation: Applying your $${ownerPaymentMade.toLocaleString()} payment to fines/fees before regular assessments violates ${jurisdiction.name} payment priority (${jurisdiction.paymentPriorityRule}).`
      );
    }

    if (lateFeeCharged > 0 && !jurisdiction.lateFeesOnFinesAllowed) {
      findings.push(
        `Unlawful Late Fee on Fines: $${lateFeeCharged.toLocaleString()} late fee cannot be compounded onto disputed fines in ${jurisdiction.name}.`
      );
      strikeableCharges += lateFeeCharged;
    }

    if (interestCharged > 0 && !jurisdiction.interestOnFinesAllowed) {
      findings.push(
        `Unlawful Interest on Fines: $${interestCharged.toLocaleString()} interest charge is barred on fines under ${jurisdiction.name} law.`
      );
      strikeableCharges += interestCharged;
    }

    if (collectionAdminFee > 0 && hoaAppliedToFinesFirst) {
      findings.push(
        `Derivative Collection/Admin Fee ($${collectionAdminFee.toLocaleString()}): Triggered by artificial dues delinquency after misapplying your assessment payment.`
      );
      strikeableCharges += collectionAdminFee;
    }

    const totalLedgerClaimed =
      regularDuesOwed + disputedFineAmount + lateFeeCharged + interestCharged + collectionAdminFee - ownerPaymentMade;

    return {
      findings,
      strikeableCharges,
      totalLedgerClaimed: Math.max(0, totalLedgerClaimed),
      remainingDuesAfterProperAllocation: Math.max(0, regularDuesOwed - ownerPaymentMade),
    };
  }, [
    jurisdiction,
    regularDuesOwed,
    disputedFineAmount,
    lateFeeCharged,
    interestCharged,
    collectionAdminFee,
    ownerPaymentMade,
    hoaAppliedToFinesFirst,
  ]);

  const letterText = `VIA CERTIFIED MAIL & EMAIL
Date: ${new Date().toISOString().slice(0, 10)}
To: Association Treasurer & Management Accounting Department
Re: Notice of Improper Payment Allocation & Demand for Ledger Correction

Dear Accounting Team:

I recently remitted $${ownerPaymentMade.toLocaleString()} expressly designated for regular monthly assessments ($${regularDuesOwed.toLocaleString()}). Your ledger instead misapplied my payment to disputed fines/fees, creating an artificial delinquency and $${audit.strikeableCharges.toLocaleString()} in improper late fees, interest, and collection charges.

STATUTORY AUTHORITY (${jurisdiction.name}):
- ${jurisdiction.paymentPriorityRule}
- Primary Code: ${jurisdiction.primaryStatute}

DEMAND FOR LEDGER RECONCILIATION:
1. Reallocate my $${ownerPaymentMade.toLocaleString()} payment strictly to regular assessments first (leaving $${audit.remainingDuesAfterProperAllocation.toLocaleString()} assessment balance).
2. Reverse all $${audit.strikeableCharges.toLocaleString()} in derivative late fees, interest, and collection/admin charges.
3. Produce a complete itemized general ledger within ${jurisdiction.recordsInspectionDays} business days.

Sincerely,
[Homeowner Name]
[Property Address / Account #]`;

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
              setRegularDuesOwed(p.regularDuesOwed);
              setDisputedFineAmount(p.disputedFineAmount);
              setLateFeeCharged(p.lateFeeCharged);
              setInterestCharged(p.interestCharged);
              setCollectionAdminFee(p.collectionAdminFee);
              setOwnerPaymentMade(p.ownerPaymentMade);
              setHoaAppliedToFinesFirst(p.hoaAppliedToFinesFirst);
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
            <h2 className="text-base font-extrabold text-[#0f2747]">1. Ledger &amp; Payment Inputs</h2>
            <p className="text-xs text-slate-500">Detect illegal fee stacking and waterfall violations.</p>
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Regular Dues Owed ($)</label>
              <input
                type="number"
                min={0}
                value={regularDuesOwed}
                onChange={(e) => setRegularDuesOwed(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Payment You Made ($)</label>
              <input
                type="number"
                min={0}
                value={ownerPaymentMade}
                onChange={(e) => setOwnerPaymentMade(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Disputed Fine ($)</label>
              <input
                type="number"
                min={0}
                value={disputedFineAmount}
                onChange={(e) => setDisputedFineAmount(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Late Fee Charged ($)</label>
              <input
                type="number"
                min={0}
                value={lateFeeCharged}
                onChange={(e) => setLateFeeCharged(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Interest Charged ($)</label>
              <input
                type="number"
                min={0}
                value={interestCharged}
                onChange={(e) => setInterestCharged(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Collection / Admin Fee ($)</label>
              <input
                type="number"
                min={0}
                value={collectionAdminFee}
                onChange={(e) => setCollectionAdminFee(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={hoaAppliedToFinesFirst}
              onChange={(e) => setHoaAppliedToFinesFirst(e.target.checked)}
              className="rounded border-slate-300"
            />
            <span className="font-medium text-slate-700">
              HOA Applied My Dues Payment Toward Fines / Fees First
            </span>
          </label>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="brief-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  LEDGER &amp; PAYMENT WATERFALL AUDIT
                </div>
                <div className="text-2xl font-extrabold text-[#0f2747] tabular-nums mt-0.5">
                  ${audit.strikeableCharges.toLocaleString()} Strikeable Fee Stacking
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                  audit.findings.length > 0
                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}
              >
                {audit.findings.length} Violation{audit.findings.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-xs text-emerald-800 font-semibold">Remaining Regular Dues (Properly Allocated)</div>
                <div className="text-2xl font-extrabold text-[#059669] tabular-nums mt-1">
                  ${audit.remainingDuesAfterProperAllocation.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
                <div className="text-xs text-amber-900 font-semibold">Reversible Late / Interest / Admin Fees</div>
                <div className="text-2xl font-extrabold text-amber-800 tabular-nums mt-1">
                  ${audit.strikeableCharges.toLocaleString()}
                </div>
              </div>
            </div>

            {audit.findings.length > 0 && (
              <ul className="space-y-2">
                {audit.findings.map((f, i) => (
                  <li key={i} className="text-sm text-rose-950 bg-rose-50 border border-rose-200 rounded-lg px-3.5 py-2.5">
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600">
              <strong>State Payment Priority Rule:</strong> {jurisdiction.paymentPriorityRule}
            </div>
          </div>

          <HearingBriefPanel
            briefTitle={`${jurisdiction.name} HOA Ledger & Fee-Stacking Audit`}
            jurisdictionName={jurisdiction.name}
            statuteCitation={jurisdiction.primaryStatute}
            officialGovUrl={jurisdiction.officialGovUrl}
            summaryRows={[
              { label: "Regular Dues Owed", value: `$${regularDuesOwed.toLocaleString()}` },
              { label: "Homeowner Payment Remitted", value: `$${ownerPaymentMade.toLocaleString()}` },
              {
                label: "Assessment Balance After Proper Allocation",
                value: `$${audit.remainingDuesAfterProperAllocation.toLocaleString()}`,
                highlight: audit.remainingDuesAfterProperAllocation === 0 ? "ok" : "warn",
              },
              {
                label: "Strikeable Late / Interest / Collection Charges",
                value: `$${audit.strikeableCharges.toLocaleString()}`,
                highlight: audit.strikeableCharges > 0 ? "danger" : "ok",
              },
            ]}
            letterText={letterText}
          />
        </div>
      </div>

      <ToolPaywallDossier
        badge="Ledger Audit Kit"
        title="Download HOA Ledger Reconciliation & Payment Designation Packet"
        desc="Export the Certified Mail payment-allocation demand, general ledger reconciliation workbook, and state waterfall citations."
        dynamicAmount={audit.strikeableCharges > 0 ? `$${audit.strikeableCharges.toLocaleString()} Reversible` : undefined}
        storageKey="hoa_late_fee"
        features={[
          "Payment Waterfall Demand Letter (.DOCX)",
          "Itemized Ledger Audit Workbook (.XLSX)",
          "51-State Fee & Interest Cap Matrix",
          "Certified Mail Delivery Checklist",
        ]}
      />
    </div>
  );
}
