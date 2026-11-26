'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'hoafig_cookie_consent_v1';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      // Ignore storage access errors in restricted browsing modes
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ status: choice, updatedAt: new Date().toISOString() })
      );
    } catch {
      // Ignore storage write errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-2xl border border-slate-700/80 bg-[#091a32]/95 p-4 sm:p-5 text-slate-200 shadow-2xl backdrop-blur-md no-print"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-xs leading-relaxed text-slate-300">
          <div className="font-bold text-white text-sm">
            Privacy &amp; Cookie Preferences (GDPR / CCPA)
          </div>
          <p>
            HOAFig.com runs all statutory calculations 100% locally in your browser without uploading your personal violation notices or ledgers. We use essential local storage for calculator state and optional analytics/advertising cookies (including Google AdSense) to keep our 51-state statutory tools free. Review our{' '}
            <Link href="/privacy/" className="text-[#e2c275] underline hover:text-white">
              Privacy Policy
            </Link>{' '}
            for details and opt-out controls.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="rounded-xl border border-slate-600 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="rounded-xl bg-[#c8a24a] px-4 py-2 text-xs font-extrabold text-[#091a32] hover:bg-[#e2c275] transition cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
}
