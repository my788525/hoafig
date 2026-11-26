import type { Metadata } from 'next';
import Link from 'next/link';
import { HOA_GUIDES } from '@/data/guides';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Defense Guides & Statutory Playbooks (2026)',
  description:
    'Six institutional-grade guides covering how to fight HOA fines, selective enforcement evidence, solar & EV overrides, special assessments, records requests, and fining committees.',
  alternates: { canonical: '/guides/' }
};

export default function GuidesIndexPage() {
  return (
    <div className="container-exec py-10 space-y-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Defense Guides', url: '/guides/' }
        ])}
      />

      <div className="space-y-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          2026 Homeowner Playbooks
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          Homeowner Statutory Defense Guides
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Actionable legal-compliance playbooks with Direct Answer tables, evidentiary checklists, certified-mail timelines, and primary statutory citations across all 51 U.S. jurisdictions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOA_GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            className="brief-card p-6 hover:border-[#0f2747] transition flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                <span className="text-[#c8a24a]">{g.category}</span>
                <span className="text-slate-400">{g.readTime}</span>
              </div>
              <h2 className="text-lg font-extrabold text-[#0f2747] leading-snug">{g.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>
            </div>
            <div className="text-xs font-extrabold text-[#059669]">Read Playbook →</div>
          </Link>
        ))}
      </div>

      <section className="brief-card p-6 sm:p-8 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Building a Statutory Paper Trail Before Your Board Hearing
        </h2>
        <p>
          Most homeowners lose HOA enforcement hearings not because their underlying conduct was unreasonable, but because they appear at a 5-minute board or fining-committee meeting with verbal complaints instead of a statutory paper trail. Boards and property managers respond to documented procedural defects—missing cure periods, unrecorded rule amendments, conflicted committee members, and disparate enforcement logs—because those defects create immediate reversal risk in mediation, arbitration, or small-claims court.
        </p>
        <p>
          Each playbook in our library is structured around three practical phases: (1) <strong>Preserving the Record</strong> via timely written hearing requests and statutory records-inspection demands; (2) <strong>Auditing Procedural &amp; Quantitative Compliance</strong> against your state&apos;s enacted property code; and (3) <strong>Delivering a Concise Hearing Brief</strong> by certified mail so every objection is preserved in the association&apos;s official minutes.
        </p>
        <p>
          Pair these guides with our interactive{' '}
          <Link href="/calculators/" className="text-[#0f2747] font-bold underline">
            Compliance Calculators
          </Link>{' '}
          and{' '}
          <Link href="/states/" className="text-[#0f2747] font-bold underline">
            51-State Statute Directory
          </Link>{' '}
          to verify exact notice days and dollar caps for your jurisdiction, or review our{' '}
          <Link href="/pitfalls/" className="text-[#0f2747] font-bold underline">
            HOA Pitfalls &amp; Traps Playbook
          </Link>{' '}
          to avoid common ledger traps like paying a contested fine before your hearing.
        </p>
      </section>
    </div>
  );
}
