"use client";

import React, { useState, useEffect } from "react";

interface ToolPaywallDossierProps {
  badge: string;
  title: string;
  desc: string;
  price?: string;
  pid?: string;
  site?: string;
  features: string[];
  dynamicAmount?: string;
  docType?: string;
  storageKey?: string;
  sampleLines?: { label: string; value: string }[];
}

export default function ToolPaywallDossier({
  badge,
  title,
  desc,
  price = "$29",
  pid = "pdt_0NryTUNyfdta6f959Z51a",
  site = "hoafig.com",
  features,
  dynamicAmount,
  docType = "Official HOA Statutory Defense Packet",
  storageKey,
  sampleLines,
}: ToolPaywallDossierProps) {
  const [showQr, setShowQr] = useState(false);
  const [restoredNotice, setRestoredNotice] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [hasActivePass, setHasActivePass] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [passError, setPassError] = useState("");
  const [verifyingPass, setVerifyingPass] = useState(false);

  const checkoutUrl = `https://checkout.dodopayments.com/buy/${encodeURIComponent(pid)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=${encodeURIComponent(checkoutUrl)}`;

  const handleCheckout = () => {
    try {
      fetch("https://send.lianu.com/api/vip/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, product_id: pid, source: "dossier_v2" }),
      }).catch(() => {});
    } catch {}
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("status") === "success") {
        setPaymentSuccess(true);
      }
      try {
        const savedKey = localStorage.getItem("matrix_all_access_key");
        if (savedKey && savedKey.startsWith("PASS-")) {
          setHasActivePass(true);
        }
        if (storageKey) {
          const saved = localStorage.getItem(`calc_${storageKey}`);
          if (saved) {
            setRestoredNotice(true);
            setTimeout(() => setRestoredNotice(false), 5000);
          }
        }
      } catch {}
    }
  }, [storageKey]);

  const handleVerifyPass = async () => {
    const clean = inputKey.trim().toUpperCase();
    if (!clean) return;
    setVerifyingPass(true);
    setPassError("");
    try {
      const res = await fetch("https://send.lianu.com/api/vip/verify-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: clean }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        localStorage.setItem("matrix_all_access_key", clean);
        setHasActivePass(true);
        setShowPassModal(false);
      } else {
        setPassError(data.message || "Invalid or expired key. Format: PASS-XXXX-XXXX-XXXX-XXXX");
      }
    } catch {
      setPassError("Network error checking key. Please try again.");
    } finally {
      setVerifyingPass(false);
    }
  };

  return (
    <div
      className="my-10 bg-[#0f2747] border border-slate-700/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden no-print"
      data-matrix-offer="1"
      data-offer-slot="inline"
      data-offer-id={pid}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8a24a]/10 rounded-full blur-3xl pointer-events-none" />

      {restoredNotice && (
        <div className="mb-6 bg-sky-950/80 border border-sky-500/40 text-sky-200 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
          <span>Your previous HOA audit session has been restored from browser storage.</span>
          <span className="font-bold">Session Active</span>
        </div>
      )}

      {paymentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div className="bg-[#091a32] border-2 border-[#059669] rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 bg-[#059669]/20 text-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto">
              ✓
            </div>
            <h4 className="text-2xl font-extrabold text-white">All-Access Matrix Pass Confirmed</h4>
            <p className="text-sm text-slate-300">
              Your official unwatermarked HOA Hearing Defense Brief &amp; Statutory Records Packet is ready to print or save as PDF.
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full bg-[#059669] hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition cursor-pointer"
            >
              Download / Print Certified Hearing Brief PDF
            </button>
            <button
              type="button"
              onClick={() => setPaymentSuccess(false)}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Back to Workbench
            </button>
          </div>
        </div>
      )}

      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div className="bg-[#091a32] border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-4 text-left shadow-2xl">
            <h4 className="text-lg font-extrabold text-white">Unlock with All-Access Matrix Pass</h4>
            <p className="text-xs text-slate-300">
              Enter your 16-character license key (<code className="bg-slate-950 px-1 py-0.5 rounded text-[#e2c275] font-mono">PASS-XXXX-XXXX-XXXX-XXXX</code>).
            </p>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value.toUpperCase())}
              placeholder="PASS-ABCD-EFGH-JKMN-PQRT"
              className="w-full font-mono bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#c8a24a]"
            />
            {passError && <div className="text-xs text-rose-400 font-medium">{passError}</div>}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                disabled={verifyingPass}
                onClick={handleVerifyPass}
                className="flex-1 bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] font-bold py-2.5 rounded-xl text-xs transition disabled:opacity-50 cursor-pointer"
              >
                {verifyingPass ? "Verifying..." : "Activate Pass"}
              </button>
              <button
                type="button"
                onClick={() => setShowPassModal(false)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[330px] bg-[#091a32] border border-slate-700 rounded-xl p-5 shadow-2xl">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">2026 STATUTORY BRIEF</div>
                <div className="text-xs font-extrabold text-white uppercase">{docType}</div>
              </div>
              <div className="w-7 h-7 rounded-full border border-[#c8a24a]/60 bg-[#c8a24a]/15 flex items-center justify-center text-[10px] text-[#e2c275] font-bold">
                §
              </div>
            </div>

            <div className="my-4 space-y-2.5 text-[11px] font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Jurisdiction Coverage:</span>
                <span className="text-white font-bold">51 U.S. Codes</span>
              </div>
              {dynamicAmount && (
                <div className="flex justify-between text-slate-200 bg-[#c8a24a]/15 p-1.5 rounded border border-[#c8a24a]/30">
                  <span className="font-bold text-[#e2c275]">Audited Exposure:</span>
                  <span className="font-black text-[#e2c275] tabular-nums">{dynamicAmount}</span>
                </div>
              )}
              {sampleLines?.map((s, i) => (
                <div key={i} className="flex justify-between text-slate-400">
                  <span>{s.label}:</span>
                  <span className="text-slate-200 font-semibold tabular-nums">{s.value}</span>
                </div>
              ))}
              <div className="flex justify-between text-slate-400">
                <span>Letter &amp; Records Demand:</span>
                <span className="text-emerald-400 font-semibold">Included (.DOCX)</span>
              </div>
            </div>

            <div className="my-3 py-2.5 px-2 bg-slate-900/90 rounded border border-dashed border-slate-700 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                [ BOARD HEARING BRIEF · CERTIFIED MAIL READY ]
              </span>
            </div>

            <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-[9px] text-slate-400 font-mono">
              <span>ALL-ACCESS MATRIX PASS</span>
              <span>100% IN-BROWSER</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#c8a24a]/20 text-[#e2c275] border border-[#c8a24a]/40">
                ★ {badge}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#059669]/20 text-emerald-300 border border-[#059669]/40">
                100% In-Browser · Zero Upload
              </span>
              {hasActivePass && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-950/80 text-sky-300 border border-sky-500/40">
                  All-Access Pass Active
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {dynamicAmount ? `Export ${dynamicAmount} HOA Hearing Defense Kit` : title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mt-1">{desc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-200">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-[#091a32]/80 border border-slate-700/80 p-3.5 space-y-1.5 text-[11px] font-mono text-slate-300">
            <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-1">
              <span>VIP Digital Hearing Defense Kit (All-Access Matrix Pass)</span>
              <span className="text-slate-400">Benchmark HOA Attorney: <span className="line-through">$350+/hr</span></span>
            </div>
            <div className="flex justify-between"><span>├── 01_Board_Hearing_Defense_Brief_2026.pdf</span><span className="text-slate-400">Printable</span></div>
            <div className="flex justify-between text-[#e2c275]"><span>├── 02_Certified_Mail_Records_Demand_Template.docx</span><span className="text-[#c8a24a]">Editable Word</span></div>
            <div className="flex justify-between text-sky-300"><span>├── 03_Reserve_&_Ledger_Audit_Workbook.xlsx</span><span className="text-sky-400">Live Formulas</span></div>
            <div className="flex justify-between text-emerald-300"><span>└── 04_51_State_HOA_Statute_Citation_Matrix.pdf</span><span className="text-emerald-400">2026 Verified</span></div>
          </div>

          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {hasActivePass ? (
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-[#059669] hover:bg-emerald-500 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm transition shadow-lg cursor-pointer"
              >
                Pass Active: Print Certified Hearing Brief
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckout}
                data-offer-action="buy"
                data-offer-id={pid}
                className="flex-1 bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] font-extrabold px-6 py-3.5 rounded-xl text-sm transition shadow-lg cursor-pointer"
              >
                Unlock All-Access Matrix Pass ({price})
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer"
            >
              {showQr ? "Hide QR" : "Pay via Phone"}
            </button>
          </div>

          {showQr && (
            <div className="p-4 bg-[#091a32] border border-slate-700 rounded-xl flex items-center gap-4">
              <img
                src={qrImageUrl}
                alt="Scan to pay via Apple Pay or Google Pay"
                className="w-20 h-20 rounded-lg bg-white p-1 shrink-0"
              />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-white">Apple Pay / Google Pay Mobile Checkout</div>
                <p className="text-slate-400 text-[11px]">
                  Scan with your phone camera to complete checkout via Dodo Payments and unlock your All-Access Pass immediately.
                </p>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <span>30-Day Money-Back Guarantee · Instant Receipt · Pay / GPay / Cards</span>
            <button
              type="button"
              onClick={() => setShowPassModal(true)}
              className="text-[#e2c275] hover:text-white underline font-semibold cursor-pointer"
            >
              Already have a Pass Key?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
