import type { Metadata } from 'next';
import Link from 'next/link';
import SpecialAssessmentClient from './SpecialAssessmentClient';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'HOA Special Assessment Calculator (2026)',
  description:
    'Calculate per-unit HOA special assessment exposure, reserve study percent-funded ratio, monthly dues spike, and state homeowner-vote thresholds.',
  alternates: { canonical: '/calculators/special-assessment-calculator/' }
};

const FAQS = [
  {
    q: 'When does an HOA special assessment require a homeowner vote?',
    a: 'Thresholds depend on state law and your recorded CC&Rs. For example, California Civil Code § 5605(b) requires a majority vote of a quorum of members for special assessments exceeding 5% of budgeted gross expenses, while UCIOA states (CO, WA, NV, CT) allow owners to veto budgets/assessments at a ratification meeting.'
  },
  {
    q: 'What reserve percent-funded ratio triggers special assessment risk?',
    a: 'Reserve ratios below 30% are considered critically underfunded and frequently force boards to levy lump-sum special assessments for roofs, paving, or structural repairs.'
  }
];

export default function SpecialAssessmentPage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: 'HOA Special Assessment & Reserve Shortfall Calculator',
          description: 'Estimate per-unit special assessments, reserve shortfalls, and state voting thresholds.',
          url: '/calculators/special-assessment-calculator/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' },
          { name: 'Special Assessment Calculator', url: '/calculators/special-assessment-calculator/' }
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/calculators/" className="hover:text-[#0f2747]">Calculators</Link>
          <span>/</span>
          <span className="text-[#0f2747]">Special Assessment Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          HOA Special Assessment &amp; Reserve Shortfall Estimator
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Audit your association’s reserve study shortfall, calculate your exact per-unit assessment and monthly dues impact, and verify whether state law requires a homeowner vote.
        </p>
      </div>

      <SpecialAssessmentClient />
    </div>
  );
}
