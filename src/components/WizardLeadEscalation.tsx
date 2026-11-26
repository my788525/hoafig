'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface WizardLeadEscalationProps {
  stateAbbr: string;
  stateName: string;
  exposureAmount: number;
  summaryText: string;
  statuteCitation: string;
}

export default function WizardLeadEscalation({
  stateAbbr,
  stateName,
  exposureAmount,
  summaryText,
  statuteCitation
}: WizardLeadEscalationProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const isHighStakes = exposureAmount >= 3000;

  const handleSaveBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      setMsg('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    setMsg('');
    try {
      await fetch('https://mail.lianu.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: 'hoafig.com',
          email: email.trim(),
          lead_type: 'wizard_brief_save',
          state: stateAbbr,
          lead_value: `$${exposureAmount.toLocaleString()}`,
          subject: `HOAFig Brief & Hearing Deadline Save (${stateAbbr})`,
          message: summaryText.slice(0, 1800),
          page_url: typeof window !== 'undefined' ? window.location.href : 'https://hoafig.com/wizard/'
        })
      });
      const blob = new Blob([`${summaryText}\n\nSaved via HOAFig.com (${statuteCitation})`], {
        type: 'text/plain;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hoafig-${stateAbbr.toLowerCase()}-hearing-brief.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus('done');
      setMsg('Saved! Your hearing brief backup downloaded and deadline alert is logged.');
      setEmail('');
    } catch {
      setStatus('error');
      setMsg('Could not save right now—please use the Print Brief button above.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 no-print">
      <div className="brief-card p-5 space-y-3">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#059669]">
          FREE BACKUP &amp; HEARING REMINDER
        </div>
        <h4 className="text-base font-extrabold text-[#0c2921]">
          Save Your {stateAbbr} Hearing Brief &amp; Deadline
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Download a plain-text backup and log your email before your board hearing or 14-day statutory cure deadline.
        </p>
        <form onSubmit={handleSaveBrief} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0c2921]"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-4 py-2 rounded-xl bg-[#0c2921] hover:bg-[#0f332a] text-white font-bold text-xs cursor-pointer transition shrink-0"
          >
            {status === 'sending' ? 'Saving...' : 'Save & Download →'}
          </button>
        </form>
        {msg && (
          <p className={`text-[11px] font-semibold ${status === 'done' ? 'text-emerald-700' : 'text-rose-700'}`}>
            {msg}
          </p>
        )}
      </div>

      <div
        className={`rounded-2xl p-5 border space-y-3 shadow-sm ${
          isHighStakes
            ? 'bg-amber-50/70 border-amber-400/70'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9a7622]">
          {isHighStakes ? 'HIGH-STAKES / LIEN ESCALATION ($3,000+)' : 'BOARD HEARING & COUNSEL ESCALATION'}
        </div>
        <h4 className="text-base font-extrabold text-[#0c2921]">
          {isHighStakes
            ? `High Assessment / Lien Risk ($${exposureAmount.toLocaleString()})`
            : `Escalate Unlawful ${stateName} HOA Demands`}
        </h4>
        <p className="text-xs text-slate-700 leading-relaxed">
          {isHighStakes
            ? `If the HOA threatens a lien, foreclosure, or a $3,000+ special assessment, bring your printed Statutory Brief to a ${stateName} community-association attorney and organize an owner petition immediately.`
            : `If the board ignores a Certified Mail hearing demand under ${statuteCitation}, audit their selective enforcement record or file a statutory records inspection demand.`}
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/selective-enforcement-analyzer/"
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-[#0c2921] hover:bg-slate-100"
          >
            Selective Enforcement Audit →
          </Link>
          <Link
            href="/pitfalls/"
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-[#9a7622] hover:bg-slate-100"
          >
            Avoid Lien &amp; Payment Traps →
          </Link>
        </div>
      </div>
    </div>
  );
}
