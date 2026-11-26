import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Terms of Use & Legal Disclaimer',
  description: 'Terms of use, license scope, and educational legal-information disclaimer for HOAFig.com.',
  alternates: { canonical: '/terms/' }
};

export default function TermsPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Terms of Use', url: '/terms/' }
        ])}
      />
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          Terms &amp; Conditions
        </span>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Terms of Use &amp; Legal Disclaimer</h1>
        <p className="text-xs text-slate-500 font-mono">
          Last Updated: November 2026 · HOAFig.com
        </p>
      </div>

      <div className="brief-card p-6 sm:p-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">1. Acceptance of Terms</h2>
          <p>
            By accessing or using HOAFig.com, including any of our statutory calculators, state statute directories, forensic case studies, defense guides, or downloadable defense kits, you agree to be bound by these Terms of Use and our{' '}
            <Link href="/privacy/" className="text-[#0f2747] font-bold underline">
              Privacy Policy
            </Link>
            . If you do not agree to these terms, please discontinue use of the site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">2. Educational Purpose Only — No Legal Representation</h2>
          <p>
            HOAFig.com provides statutory compliance calculators, primary code summaries, and template correspondence strictly for educational and informational purposes. HOAFig.com is not a law firm, does not practice law, and does not provide legal representation or create an attorney-client relationship. Always review your recorded Declaration (CC&amp;Rs), Bylaws, and current state statutes, and consult a licensed attorney in your jurisdiction for formal legal advice. For additional details, review our full{' '}
            <Link href="/disclaimer/" className="text-[#0f2747] font-bold underline">
              Legal Disclaimer
            </Link>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">3. License &amp; Acceptable Use</h2>
          <p>
            You are granted a limited, non-exclusive, non-transferable license to use HOAFig.com tools for personal, non-commercial homeowner defense, educational research, or individual property compliance audits. If you purchase an All-Access Matrix Pass, your license permits you to customize and print the included <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.docx</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.xlsx</code>, and <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.pdf</code> materials for your own household or property disputes. You may not scrape, bulk-republish, resell, or redistribute HOAFig.com&apos;s proprietary calculator code, statutory datasets, or paid templates as a competing commercial product.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">4. Digital Products &amp; 30-Day Refund Policy</h2>
          <p>
            All-Access Matrix Pass purchases are processed by Dodo Payments and delivered digitally via license key and instant download. Every purchase is backed by our 30-day money-back guarantee. If a defense kit does not meet your expectations, contact{' '}
            <a href="mailto:support@hoafig.com" className="text-[#0f2747] font-bold underline">
              support@hoafig.com
            </a>{' '}
            within 30 days of purchase with your order receipt for a prompt refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">5. Disclaimer of Warranties &amp; Limitation of Liability</h2>
          <p>
            HOAFig.com is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis without warranties of any kind, whether express or implied. Because HOA disputes depend on specific recorded covenants, board minutes, and local judicial interpretation, HOAFig.com cannot guarantee any particular board hearing outcome, fine waiver, or litigation result. To the maximum extent permitted by law, HOAFig.com shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.
          </p>
        </section>
      </div>
    </div>
  );
}
