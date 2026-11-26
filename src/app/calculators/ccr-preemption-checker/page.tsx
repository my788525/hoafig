import type { Metadata } from 'next';
import Link from 'next/link';
import CcrPreemptionChecker from '@/components/calculators/CcrPreemptionChecker';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'CC&R vs. State & Federal Law Checker (2026)',
  description:
    'Check whether federal FCC OTARD (47 CFR § 1.4000), U.S. Flag Act, or state Solar, EV, Xeriscaping, and Right-to-Dry statutes override your HOA CC&Rs.',
  alternates: { canonical: '/calculators/ccr-preemption-checker/' },
};

const FAQS = [
  {
    q: 'Can state or federal law override my HOA CC&Rs?',
    a: 'Yes. Under federal supremacy and state statutory public policy, HOA CC&Rs cannot enforce bans or unreasonable restrictions on federally protected dishes/antennas (FCC OTARD 47 C.F.R. § 1.4000), U.S. flags (4 U.S.C. § 5 note), or state-protected solar panels, EV chargers, xeriscaping, and clotheslines.',
  },
  {
    q: 'Does FCC OTARD cover Starlink dishes in an HOA?',
    a: 'Yes. FCC OTARD (47 C.F.R. § 1.4000) protects satellite dishes and fixed-wireless antennas 1 meter or smaller—including Starlink—installed on exclusive-use property (roof, balcony, patio, or yard) in all 50 states.',
  },
  {
    q: 'What state statutes protect rooftop solar and EV chargers against HOA bans?',
    a: 'Key statutes include California Civil Code §§ 714 and 4745, Florida Statutes § 163.04, Texas Property Code § 202.010, and dozens of state Solar Access and Right-to-Charge laws indexed in our 51-jurisdiction checker.',
  },
];

export default function CcrPreemptionPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: 'HOA CC&R vs. State & Federal Law Override Checker',
          description:
            'Verify whether federal FCC OTARD, U.S. Flag Act, or state Solar, EV, Xeriscaping, and Right-to-Dry laws preempt your HOA CC&Rs.',
          url: '/calculators/ccr-preemption-checker/',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' },
          { name: 'CC&R Preemption Checker', url: '/calculators/ccr-preemption-checker/' },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/calculators/" className="hover:text-[#0f2747]">Calculators</Link>
          <span>/</span>
          <span className="text-[#0f2747]">CC&amp;R Preemption Checker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          HOA CC&amp;R vs. State &amp; Federal Law Override Checker
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Verify whether federal FCC OTARD (47 CFR § 1.4000), the U.S. Flag Act, or state Solar, EV Charger, Xeriscaping, and Right-to-Dry statutes void your HOA’s CC&amp;R restriction.
        </p>
      </div>

      <CcrPreemptionChecker />

      <section className="brief-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-extrabold text-[#0f2747]">
          Frequently Asked Questions: CC&amp;R Statutory Preemption
        </h2>
        <div className="divide-y divide-slate-200">
          {FAQS.map((item) => (
            <div key={item.q} className="py-4 space-y-1.5">
              <h3 className="text-sm font-extrabold text-[#0f2747]">{item.q}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
