'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'hoafig_cookie_consent_v1';

const EU_UK_CH_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL',
  'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'GB', 'UK'
]);

const US_PRIVACY_STATES = new Set([
  'CA', 'VA', 'CO', 'CT', 'UT', 'TX', 'OR', 'MT', 'FL', 'IA', 'IN', 'TN',
  'DE', 'NE', 'NH', 'NJ', 'MN', 'MD', 'KY', 'RI'
]);

function shouldShowForGeo(country: string, regionCode: string): boolean {
  const c = country.trim().toUpperCase();
  const r = regionCode.trim().toUpperCase();
  if (EU_UK_CH_COUNTRIES.has(c)) return true;
  if (c === 'US' && US_PRIVACY_STATES.has(r)) return true;
  return false;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return;
    } catch {
      // Ignore storage access errors in restricted browsing modes
      return;
    }

    let cancelled = false;

    const fetchWithTimeout = async (url: string) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      try {
        return await fetch(url, { cache: 'no-store', signal: controller.signal });
      } finally {
        clearTimeout(timer);
      }
    };

    (async () => {
      try {
        const res = await fetchWithTimeout('/api/geo');
        if (res.ok) {
          const data = (await res.json()) as { country?: string; regionCode?: string };
          if (!cancelled && shouldShowForGeo(data.country || '', data.regionCode || '')) {
            setVisible(true);
          }
          return;
        }
      } catch {
        // Fall through to /cdn-cgi/trace fallback
      }

      try {
        const traceRes = await fetchWithTimeout('/cdn-cgi/trace');
        if (traceRes.ok) {
          const text = await traceRes.text();
          const match = text.match(/^loc=([A-Z]{2})$/m);
          const loc = match?.[1]?.toUpperCase() || '';
          if (!cancelled && EU_UK_CH_COUNTRIES.has(loc)) {
            setVisible(true);
          }
        }
      } catch {
        // Geo lookup failed; keep banner hidden
      }
    })();

    return () => {
      cancelled = true;
    };
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
