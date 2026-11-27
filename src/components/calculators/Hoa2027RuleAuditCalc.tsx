'use client';

import React, { useMemo, useState } from 'react';
import IcsDeadlineButton from '@/components/IcsDeadlineButton';

export default function Hoa2027RuleAuditCalc() {
  const [state, setState] = useState<'MN' | 'FL' | 'CA' | 'TX'>('MN');
  const [fineAssessed, setFineAssessed] = useState(450);
  const [noticeDays, setNoticeDays] = useState(10);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const cap = state === 'MN' || state === 'CA' ? 100 : state === 'FL' ? 1000 : 0;
    const minNotice = state === 'MN' ? 21 : state === 'FL' ? 14 : 15;
    const fineExcess = cap > 0 ? Math.max(0, fineAssessed - cap) : 0;
    const noticeDefect = noticeDays < minNotice;
    const statute =
      state === 'MN'
        ? 'Minnesota HF 1268 / SF 1750 (eff. Jan 1, 2027) — $100 Fine Cap & 21-Day Rule-Change Notice'
        : state === 'FL'
          ? 'Florida Stat. § 720.305 — 14-Day Notice & Independent 3-Member Fining Committee'
          : state === 'CA'
            ? 'California Civ. Code §§ 5850, 5855 — $100 Fine Cap & Hearing Due Process'
            : 'Texas Prop. Code § 209.006 — Certified Mail Cure & 30-Day Hearing Right';

    const brief = `2027 HOA STATUTORY FINE & RULE-CHANGE AUDIT\nStatute: ${statute}\nFine Assessed: $${fineAssessed} | Statutory Cap: ${cap > 0 ? `$${cap}` : 'Due-Process / Cure Required'}\nRule/Hearing Notice Given: ${noticeDays} days (Required: ${minNotice}+ days)\nVerdict: ${noticeDefect ? 'PROCEDURAL DEFECT DETECTED — ' : ''}${fineExcess > 0 ? `$${fineExcess} exceeds statutory fine cap.` : 'Verify committee independence & cure window.'}`;

    return { cap, minNotice, fineExcess, noticeDefect, statute, brief };
  }, [state, fineAssessed, noticeDays]);

  const copyBrief = () => {
    navigator.clipboard?.writeText(result.brief).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 brief-card p-6 space-y-4 no-print">
        <div className="text-xs font-mono uppercase tracking-wider text-[#9a7622] font-bold">
          2027 HOA REFORM AUDIT INPUTS
        </div>
        <label className="block text-xs font-bold text-[#0c2921]">
          State Jurisdiction
          <select
            value={state}
            onChange={(e) => setState(e.target.value as 'MN' | 'FL' | 'CA' | 'TX')}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm bg-white"
          >
            <option value="MN">Minnesota (HF 1268 / SF 1750 · Eff. Jan 1, 2027)</option>
            <option value="CA">California (Civ. Code § 5850 $100 Cap)</option>
            <option value="FL">Florida (Fla. Stat. § 720.305)</option>
            <option value="TX">Texas (Tex. Prop. Code § 209.006)</option>
          </select>
        </label>
        <label className="block text-xs font-bold text-[#0c2921]">
          Fine Assessed ($)
          <input
            type="number"
            min={0}
            value={fineAssessed}
            onChange={(e) => setFineAssessed(Math.max(0, Number(e.target.value) || 0))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
        <label className="block text-xs font-bold text-[#0c2921]">
          Advance Notice Given for Rule Change / Hearing (Days)
          <input
            type="number"
            min={0}
            value={noticeDays}
            onChange={(e) => setNoticeDays(Math.max(0, Number(e.target.value) || 0))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
      </div>

      <div className="lg:col-span-7 bg-[#09221c] text-white border border-[#c8a24a]/50 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#e2c275] font-bold">
              2027 STATUTORY VERDICT
            </div>
            <h2 className="text-xl font-extrabold">
              {result.noticeDefect || result.fineExcess > 0
                ? 'Statutory Violation / Procedural Defect Found'
                : 'Audit Cure Window & Committee Records'}
            </h2>
          </div>
          <div className="bg-[#c8a24a]/20 border border-[#c8a24a]/50 rounded-xl px-4 py-2 text-right">
            <div className="text-[10px] font-mono text-[#e2c275]">UNLAWFUL EXCESS</div>
            <div className="text-2xl font-black text-white tabular-nums">
              ${result.fineExcess.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="text-xs text-emerald-50/90 space-y-1.5">
          <div><strong className="text-white">Governing Statute:</strong> {result.statute}</div>
          <div><strong className="text-white">Notice Check:</strong> {noticeDays} days given vs. {result.minNotice} days required</div>
        </div>

        <pre className="bg-black/40 border border-white/10 rounded-xl p-4 text-[11px] font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
          {result.brief}
        </pre>

        <div className="flex flex-wrap gap-3 no-print">
          <button
            type="button"
            onClick={copyBrief}
            className="px-4 py-2.5 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] text-[#09221c] font-extrabold text-xs cursor-pointer transition"
          >
            {copied ? '✓ Copied Brief' : 'Copy Free HOA Objection'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white font-bold text-xs cursor-pointer transition"
          >
            Print Brief
          </button>
          <IcsDeadlineButton
            title="HOA 21-Day Rule / Hearing Notice Deadline"
            description={result.statute}
            daysFromNow={21}
            url="https://hoafig.com/calculators/2027-hoa-rule-fine-audit/"
            label="Add 21-Day Deadline (.ics)"
          />
        </div>
      </div>
    </div>
  );
}
