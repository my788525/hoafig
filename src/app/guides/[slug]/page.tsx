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

        {/* Quick-Jump Anchor Pills */}
        <nav aria-label="Guide sections" className="flex flex-wrap gap-2 pt-1">
          <a href="#direct-answer" className="px-3 py-1 rounded-full text-xs font-bold bg-[#0f2747] text-white hover:bg-[#1a3b68] transition">
            Direct Statutory Answer
          </a>
          {g.sections.map((sec, idx) => (
            <a
              key={idx}
              href={`#sec-${idx}`}
              className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-[#0f2747] hover:bg-slate-200 transition"
            >
              {sec.heading}
            </a>
          ))}
          <a href="#defense-kit" className="px-3 py-1 rounded-full text-xs font-bold bg-[#c8a24a]/20 text-[#0f2747] border border-[#c8a24a]/40 hover:bg-[#c8a24a]/30 transition">
            Defense Kit
          </a>
          <a href="#faq" className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-[#0f2747] hover:bg-slate-200 transition">
            FAQs
          </a>
        </nav>
      </div>

      {/* Direct Answer Table */}
      <div id="direct-answer" className="brief-card overflow-hidden scroll-mt-20">
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

      {/* Guide Sections with Offer Mounted at ~35-40% Scroll Depth */}
      <div className="space-y-6">
        {g.sections.map((sec, idx) => (
          <div key={idx} className="space-y-6">
            <section id={`sec-${idx}`} className="brief-card p-6 sm:p-8 space-y-3 scroll-mt-20">
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

            {idx === 0 && (
              <div id="defense-kit" className="scroll-mt-20">
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
            )}
          </div>
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

      {/* Visible FAQ Section for GEO & Bing */}
      <section id="faq" className="brief-card p-6 sm:p-8 space-y-4 scroll-mt-20">
        <h2 className="text-xl font-extrabold text-[#0f2747]">Frequently Asked Questions</h2>
        <div className="divide-y divide-slate-200">
          {g.faq.map((f, i) => (
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
