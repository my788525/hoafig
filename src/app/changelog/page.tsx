import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '2026 HOA Statutory Changelog',
  description:
    'Track 2025–2026 legislative updates affecting U.S. HOA fines, reserve studies, EV charging rights, and homeowner notice protections.',
  alternates: { canonical: '/changelog/' }
};

const UPDATES = [
  {
    date: '2026-11-26',
    jurisdiction: 'Platform Governance & Compliance',
    note: 'Added dedicated Editorial Policy and Legal Disclaimer pages, GDPR/CCPA Cookie Consent controls, and expanded AdSense & privacy disclosures across all governance routes.'
  },
  {
    date: '2026-11-01',
    jurisdiction: 'All 51 Jurisdictions',
    note: 'Initial institutional release of HOAFig.com with 51-state statutory dataset, 6 compliance workbenches, 3 forensic case studies, and 6 defense guides.'
  },
  {
    date: '2026-01-01',
    jurisdiction: 'California (AB 130 / Civ. Code § 5850)',
    note: 'Updated California Davis-Stirling fine cap model to reflect $100 non-health/safety cap, mandatory cure protections, and strict prohibition on late fees or interest on monetary penalties.'
  },
  {
    date: '2025-07-01',
    jurisdiction: 'Florida (HB 1203 / Fla. Stat. § 720.305)',
    note: 'Incorporated mandatory 14-day written notice, 3-member independent fining committee firewall, cure-before-fine compliance checks, and expanded official records inspection rules.'
  },
  {
    date: '2025-01-01',
    jurisdiction: 'Michigan (Homeowners’ Energy Policy Act)',
    note: 'Added Michigan statutory override protections voiding unreasonable HOA restrictions on rooftop solar energy systems, EV charging stations, and energy-saving improvements.'
  }
];

export default function ChangelogPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: '2026 Changelog', url: '/changelog/' }
        ])}
      />
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          Legislative &amp; Dataset Tracking
        </span>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">2026 Statutory Changelog</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          A dated audit log of legislative amendments, statutory cap updates, and platform compliance enhancements across HOAFig.com&apos;s 51-jurisdiction database.
        </p>
      </div>

      <div className="brief-card divide-y divide-slate-200">
        {UPDATES.map((u, i) => (
          <div key={i} className="p-6 space-y-1.5">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-mono font-bold text-[#059669]">{u.date}</span>
              <span className="font-extrabold text-[#0f2747]">{u.jurisdiction}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{u.note}</p>
          </div>
        ))}
      </div>

      <section className="brief-card p-6 sm:p-8 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
        <h2 className="text-lg font-extrabold text-[#0f2747]">
          How Legislative Amendments Are Verified &amp; Deployed
        </h2>
        <p>
          Community association statutes change frequently as state legislatures respond to rising reserve shortfalls, structural inspection mandates, and homeowner due-process complaints. Every entry in this changelog reflects a primary-source review of enacted bill text, codified statutory sections, and effective dates published by official state legislature portals.
        </p>
        <p>
          When a new law takes effect—such as California&apos;s AB 130 fine-cap reform or Florida&apos;s HB 1203 fining-committee and cure-window protections—our research team updates both the state&apos;s dossier in the{' '}
          <Link href="/states/" className="text-[#0f2747] font-bold underline">
            51-State HOA Statute Directory
          </Link>{' '}
          and the underlying TypeScript validation rules powering our{' '}
          <Link href="/calculators/" className="text-[#0f2747] font-bold underline">
            Compliance Calculators
          </Link>
          .
        </p>
        <p>
          If you are tracking a recently signed state bill or municipal ordinance that affects HOA fining authority, reserve funding, or solar/EV preemption, please submit the official <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.gov</code> bill citation through our{' '}
          <Link href="/contact/" className="text-[#0f2747] font-bold underline">
            Contact &amp; Corrections
          </Link>{' '}
          page.
        </p>
      </section>
    </div>
  );
}
