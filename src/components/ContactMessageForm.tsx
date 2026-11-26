'use client';

import React, { useState } from 'react';

const FEEDBACK_ENDPOINT = 'https://mail.lianu.com/api/feedback';

export default function ContactMessageForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Statutory Correction');
  const [stateCode, setStateCode] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || message.trim().length < 5) {
      setStatus('error');
      setFeedback('Please enter a valid email address and a message of at least 5 characters.');
      return;
    }

    setStatus('submitting');
    setFeedback('');
    try {
      const res = await fetch(FEEDBACK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: 'hoafig.com',
          name: name.trim(),
          email: email.trim(),
          subject: topic,
          state: stateCode.trim().toUpperCase(),
          lead_type: 'contact_message',
          message: message.trim(),
          page_url: typeof window !== 'undefined' ? window.location.href : 'https://hoafig.com/contact/',
          _hp_website: honeypot
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
        setFeedback('Message received. Our HOA statutory research desk will reply to your email.');
        setName('');
        setEmail('');
        setStateCode('');
        setMessage('');
      } else {
        setStatus('error');
        setFeedback(data.error || 'Unable to send message right now. Please email support@hoafig.com.');
      }
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again or email support@hoafig.com.');
    }
  };

  return (
    <section className="brief-card p-6 sm:p-8 space-y-5">
      <div className="space-y-1">
        <div className="text-xs font-mono uppercase tracking-widest text-[#9a7622] font-bold">
          FIRST-PARTY DIRECT MESSAGE DESK
        </div>
        <h2 className="text-xl font-extrabold text-[#0c2921]">
          Send a Direct Message to HOAFig
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Submit a state HOA/condo statutory amendment, calculator edge case, or digital kit support inquiry directly through our first-party desk.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="_hp_website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="hoa-contact-name" className="block text-xs font-bold text-[#0c2921]">
              Your Name
            </label>
            <input
              id="hoa-contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Morgan Ellis"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0c2921]"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="hoa-contact-email" className="block text-xs font-bold text-[#0c2921]">
              Reply Email <span className="text-rose-600">*</span>
            </label>
            <input
              id="hoa-contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0c2921]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="hoa-contact-topic" className="block text-xs font-bold text-[#0c2921]">
              Inquiry Topic
            </label>
            <select
              id="hoa-contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#0c2921]"
            >
              <option value="Statutory Correction">HOA / Condo Statute Correction</option>
              <option value="Digital Kit & Pass Support">Defense Kit / Matrix Pass Support</option>
              <option value="Calculator Bug Report">Calculator Edge Case / Bug Report</option>
              <option value="Press & Data Citation">Press / Dataset Citation</option>
              <option value="Privacy & GDPR/CCPA">Privacy / GDPR / CCPA Request</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="hoa-contact-state" className="block text-xs font-bold text-[#0c2921]">
              State (Optional)
            </label>
            <input
              id="hoa-contact-state"
              type="text"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              placeholder="e.g. FL, CA, TX, CO"
              maxLength={24}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0c2921]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="hoa-contact-message" className="block text-xs font-bold text-[#0c2921]">
            Message <span className="text-rose-600">*</span>
          </label>
          <textarea
            id="hoa-contact-message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Include the state dossier URL, HOA/condo statute citation, or Dodo receipt ID..."
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0c2921]"
          />
        </div>

        {feedback && (
          <div
            className={`rounded-xl px-4 py-3 text-xs font-semibold ${
              status === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {feedback}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500">
            Routed directly to our first-party desk · Zero third-party trackers.
          </span>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-3 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] disabled:opacity-60 text-[#09221c] font-extrabold text-xs sm:text-sm cursor-pointer transition"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Direct Message →'}
          </button>
        </div>
      </form>
    </section>
  );
}
