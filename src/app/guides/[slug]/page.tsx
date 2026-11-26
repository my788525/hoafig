import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HOA_GUIDES, GUIDES_BY_SLUG } from '@/data/guides';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/JsonLd';
import ToolPaywallDossier from '@/components/ToolPaywallDossier';

export function generateStaticParams() {
  return HOA_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES_BY_SLUG[slug];
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}/` }
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = GUIDES_BY_SLUG[slug];
  if (!g) notFound();

  return (
    <div className="container-exec py-10 space-y-8 max-w-4xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Defense Guides', url: '/guides/' },
          { name: g.shortTitle, url: `/guides/${g.slug}/` }
        ])}
      />
      <JsonLd data={faqJsonLd(g.faq)} />

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f2747]">Home</Link>
          <span>/</span>
          <Link href="/guides/" className="hover:text-[#0f2747]">Defense Guides</Link>
          <span>/</span>
          <span className="text-[#0f2747]">{g.shortTitle}</span>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="px-2.5 py-0.5 rounded-full bg-[#0f2747] text-white uppercase">{g.category}</span>
          <span className="text-slate-500">{g.readTime} · Updated {g.updated}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2747] leading-tight">{g.title}</h1>
        <p className="text-slate-600 text-base leading-relaxed">{g.description}</p>
      </div>

      {/* Direct Answer Table */}
      <div className="brief-card overflow-hidden">
        <div className="px-6 py-4 bg-[#0f2747] text-white">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#e2c275] font-bold">
            DIRECT STATUTORY ANSWER
          </div>
          <div className="text-base font-extrabold mt-0.5">{g.directAnswer.question}</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-4 font-bold">Factor</th>
                <th className="p-4 font-bold">Controlling Rule</th>
                <th className="p-4 font-bold">Primary Statute</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {g.directAnswer.rows.map((r, i) => (
                <tr key={i}>
                  <td className="p-4 font-bold text-[#0f2747]">{r.factor}</td>
                  <td className="p-4 text-slate-700">{r.rule}</td>
                  <td className="p-4 font-mono text-xs text-[#059669] font-semibold">{r.statuteExample}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="space-y-6">
        {g.sections.map((sec, idx) => (
          <section key={idx} className="brief-card p-6 sm:p-8 space-y-3">
            <h2 className="text-xl font-extrabold text-[#0f2747]">{sec.heading}</h2>
            {sec.body.map((p, j) => (
              <p key={j} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
            {sec.callout && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium">
                <strong>Practice Tip:</strong> {sec.callout}
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#0f2747] text-white">
        <div>
          <div className="text-xs font-mono uppercase text-[#e2c275] font-bold">Interactive Audit</div>
          <div className="text-lg font-extrabold">Test Your Notice Against State Statutes</div>
        </div>
        <Link
          href={g.relatedCalculator.href}
          className="px-5 py-3 rounded-xl bg-[#c8a24a] hover:bg-[#e2c275] text-[#091a32] text-xs font-extrabold transition"
        >
          {g.relatedCalculator.label} →
        </Link>
      </div>

      <ToolPaywallDossier
        badge="Defense Playbook Kit"
        title="Download Editable Hearing Briefs & Certified Mail Templates"
        desc="Get the complete 2026 HOA defense suite with Word (.DOCX) demand letters, Excel audit workbooks, and 51-state citations."
        features={[
          'Editable Certified Mail Templates (.DOCX)',
          'Selective Enforcement Exhibit Log',
          '51-State Statutory Citation Matrix',
          'Printable Hearing Brief PDF'
        ]}
      />
    </div>
  );
}
