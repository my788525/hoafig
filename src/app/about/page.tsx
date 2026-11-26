import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About HOAFig — Homeowner Statutory Defense Platform',
  description: 'About HOAFig.com, our 51-state statutory research standards, and privacy-first in-browser compliance architecture.',
  alternates: { canonical: '/about/' }
};

export default function AboutPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about/' }
        ])}
      />
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          Our Mission &amp; Architecture
        </span>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">About HOAFig.com</h1>
      </div>

      <div className="brief-card p-6 sm:p-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">1. Why HOAFig.com Exists</h2>
          <p>
            More than 75 million Americans live in homeowners associations, condominium associations, and planned communities. When a dispute arises—whether over an escalating daily violation fine, an unexpected special assessment, compounded late fees, or an Architectural Review Committee (ARC) denial of rooftop solar panels or an EV charger—the information asymmetry is stark. Management companies and association counsel operate with specialized statutory playbooks, while individual homeowners are often given 14 days to prepare for a board hearing with little clarity on what state law actually permits.
          </p>
          <p>
            HOAFig.com was created to close that gap. We translate dense state property codes and federal preemption regulations into interactive, institutional-grade compliance calculators and printable Board Hearing Briefs that any homeowner can run in minutes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">2. 51-Jurisdiction Statutory Coverage</h2>
          <p>
            Our research team maintains a structured statutory dataset covering all 50 U.S. states plus the District of Columbia. Rather than offering generic advice, our workbenches model jurisdiction-specific rules—including Florida&apos;s $100/$1,000 fine cap and 3-member independent fining committee firewall (Fla. Stat. § 720.305), California&apos;s Davis-Stirling Act fine caps and prohibition on late fees on fines (Cal. Civ. Code § 5850), Texas Property Code Chapter 209 certified-mail notice mandates, Colorado&apos;s CCIOA notice and cure windows, and federal FCC OTARD preemption (47 C.F.R. § 1.4000).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">3. Privacy-First, 100% In-Browser Computation</h2>
          <p>
            Your HOA violation notices, dues ledgers, and property details are sensitive financial and legal records. Every calculator, dispute wizard, and printable brief generator on HOAFig.com executes 100% client-side inside your web browser. We never upload your entered fine amounts, parcel details, or ledger balances to our servers, and we do not require account registration to audit a fine or print a summary brief.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">4. Editorial Independence &amp; Transparency</h2>
          <p>
            HOAFig.com is supported by non-intrusive display advertising and optional digital defense kits for homeowners who want editable Word demand letters and Excel ledger audit workbooks. Our statutory data is verified against primary legislative sources under our{' '}
            <Link href="/editorial-policy/" className="text-[#0f2747] font-bold underline">
              Editorial Policy
            </Link>{' '}
            and{' '}
            <Link href="/methodology/" className="text-[#0f2747] font-bold underline">
              Audit Methodology
            </Link>
            . Please note that HOAFig.com provides educational and statutory compliance tools and is not a law firm; see our{' '}
            <Link href="/disclaimer/" className="text-[#0f2747] font-bold underline">
              Legal Disclaimer
            </Link>{' '}
            for full terms.
          </p>
        </section>
      </div>
    </div>
  );
}
