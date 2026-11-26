import type { Metadata } from 'next';
import Link from 'next/link';
import ArcOverrideClient from './ArcOverrideClient';
import { JsonLd, webApplicationJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Solar, EV & FCC OTARD Override Checker (2026)',
  description:
    'Check if federal FCC OTARD (47 C.F.R. § 1.4000) or state Solar Access and EV Right-to-Charge statutes override your HOA architectural denial.',
  alternates: { canonical: '/calculators/arc-override-checker/' }
};

export default function ArcOverridePage() {
  return (
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={webApplicationJsonLd({
          name: 'HOA Solar, EV & FCC OTARD Override Checker',
          description: 'Verify federal and state statutory preemption over HOA architectural denials.',
          url: '/calculators/arc-override-checker/'
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators/' },
          { name: 'ARC Override Checker', url: '/calculators/arc-override-checker/' }
        ])}
      />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/calculators/" className="hover:text-[#0f2747]">Calculators</Link>
          <span>/</span>
          <span className="text-[#0f2747]">ARC Statutory Override Checker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] tracking-tight">
          ARC Solar, EV Charger &amp; FCC OTARD Override Checker
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Determine whether federal FCC OTARD preemption or state Solar Access / Right-to-Charge statutes void your HOA’s architectural denial or unreasonable placement conditions.
        </p>
      </div>

      <ArcOverrideClient />
    </div>
  );
}
