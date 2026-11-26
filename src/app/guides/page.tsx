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
    <div className="container-exec py-10 space-y-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Defense Guides', url: '/guides/' }
        ])}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747]">
          Homeowner Statutory Defense Guides
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
          Actionable legal-compliance playbooks with Direct Answer tables and primary statutory citations.
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
    </div>
  );
}
