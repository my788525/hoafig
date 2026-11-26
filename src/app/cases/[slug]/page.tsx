import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HOA_CASES, CASES_BY_SLUG } from '@/data/cases';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export function generateStaticParams() {
  return HOA_CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = CASES_BY_SLUG[slug];
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/cases/${c.slug}/` }
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASES_BY_SLUG[slug];
  if (!c) notFound();

  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Case Studies', url: '/cases/' },
          { name: c.title, url: `/cases/${c.slug}/` }
        ])}
      />
      <JsonLd data={faqJsonLd(c.faq)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/cases/" className="hover:text-[#0f2747]">Case Studies</Link>
          <span>/</span>
          <span className="text-[#0f2747]">{c.stateName}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0f2747] text-white">
            {c.stateName} · {c.statuteCited}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#059669]">
            Outcome: {c.finalOutcome}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">{c.title}</h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">{c.summary}</p>
      </div>

      {/* Forensic Ledger Breakdown */}
      <div className="brief-card overflow-hidden">
        <div className="px-6 py-4 bg-[#0f2747] text-white font-extrabold text-sm">
          Forensic Ledger &amp; Statutory Audit Breakdown
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-4 font-bold">Ledger Line Item</th>
                <th className="p-4 font-bold">HOA Billed</th>
                <th className="p-4 font-bold">Statutory Limit</th>
                <th className="p-4 font-bold">Audit Finding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {c.ledgerBreakdown.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-4 font-semibold text-[#0f2747]">{row.lineItem}</td>
                  <td className="p-4 font-mono text-rose-700 font-bold tabular-nums">{row.hoaBilled}</td>
                  <td className="p-4 font-mono text-[#059669] font-bold tabular-nums">{row.statutoryLimit}</td>
                  <td className="p-4 text-slate-700">{row.auditFinding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline Offer at ~35-40% Scroll Depth */}
      <ToolPaywallDossier
        badge="Case Study Kit"
        title={`Download ${c.stateName} Hearing Defense Brief & Certified Mail Demand`}
        desc="Includes the exact statutory demand letter structure and ledger audit workbook used in this case."
        dynamicAmount={`$${c.savingsUsd.toLocaleString()} Saved`}
        features={[
          `${c.stateName} Certified Mail Demand (.DOCX)`,
          'Forensic Ledger Audit Spreadsheet',
          'Independent Committee Records Request',
          '51-State Statutory Citation Matrix'
        ]}
      />

      {/* Resolution Timeline & Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 brief-card p-6 space-y-4">
          <h2 className="text-lg font-extrabold text-[#0f2747]">Resolution Timeline</h2>
          <div className="space-y-4">
            {c.timeline.map((t, i) => (
              <div key={i} className="border-l-2 border-[#c8a24a] pl-4 space-y-1">
                <div className="text-xs font-mono font-bold text-[#0f2747]">{t.day}</div>
                <div className="text-sm text-slate-800">{t.event}</div>
                <div className="text-xs text-[#059669] font-semibold">{t.legalBasis}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 brief-card p-6 space-y-4">
          <h2 className="text-lg font-extrabold text-[#0f2747]">Replicable Defense Strategy</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            {c.defenseStrategy.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#059669] font-bold mt-0.5">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Link
              href="/calculators/hoa-fine-compliance/"
              className="inline-block px-5 py-2.5 rounded-xl bg-[#0f2747] hover:bg-[#1a3b68] text-white text-xs font-bold transition"
            >
              Audit Your Own Notice Now →
            </Link>
          </div>
        </div>
      </div>

      {/* Visible FAQ Section */}
      <section className="brief-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-extrabold text-[#0f2747]">Case Study FAQs</h2>
        <div className="divide-y divide-slate-200">
          {c.faq.map((f, i) => (
            <div key={i} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
              <h3 className="text-sm sm:text-base font-bold text-[#0f2747]">{f.q}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
