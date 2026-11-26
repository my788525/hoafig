import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Contact & Statutory Corrections',
  description: 'Submit statutory citation updates, municipal ordinance references, or support inquiries to the HOAFig editorial team.',
  alternates: { canonical: '/contact/' }
};

export default function ContactPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact/' }
        ])}
      />
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          Editorial &amp; Support Desk
        </span>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Contact &amp; Statutory Corrections</h1>
      </div>

      <div className="brief-card p-6 sm:p-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">1. Direct Email Support</h2>
          <p>
            For statutory updates, legislative amendments, technical bug reports, privacy inquiries, or All-Access Matrix Pass billing support, please contact our editorial and support desk at{' '}
            <a href="mailto:support@hoafig.com" className="text-[#0f2747] font-bold underline">
              support@hoafig.com
            </a>
            . We aim to respond to all pass-key and technical support inquiries within one business day, and statutory correction requests within 72 hours.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">2. Submitting a Statutory Update or Citation Correction</h2>
          <p>
            Community association laws are amended every legislative session across all 50 states and the District of Columbia. We welcome corrections and newly enacted bill references from homeowners, community association managers, and real estate attorneys. To help our research team verify and deploy an update quickly, please include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>The state or jurisdiction name and whether the rule applies to single-family HOAs, condominiums, or both.</li>
            <li>The exact statutory title, chapter, and section number (for example, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">Fla. Stat. § 720.305(2)</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">Cal. Civ. Code § 5850</code>).</li>
            <li>A link to the official state legislature (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.gov</code>) bill text or codified statute, along with the effective date.</li>
            <li>The specific HOAFig.com calculator or state dossier page where the figure appears.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">3. All-Access Matrix Pass &amp; Order Support</h2>
          <p>
            If you purchased an All-Access Matrix Pass via Dodo Payments and need help locating your 16-character license key (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">PASS-XXXX-XXXX-XXXX-XXXX</code>), downloading your editable <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.docx</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.xlsx</code> kit, or requesting a 30-day money-back refund, email{' '}
            <a href="mailto:support@hoafig.com" className="text-[#0f2747] font-bold underline">
              support@hoafig.com
            </a>{' '}
            with your checkout email address or Dodo receipt ID.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">4. Privacy, GDPR, &amp; CCPA Requests</h2>
          <p>
            Because HOAFig.com processes all calculator inputs locally in your browser, we do not store your personal violation notices or ledgers on our servers. For data-privacy inquiries, cookie-consent questions, or requests under GDPR or CCPA/CPRA, please write to{' '}
            <a href="mailto:support@hoafig.com" className="text-[#0f2747] font-bold underline">
              support@hoafig.com
            </a>{' '}
            with &ldquo;Privacy Request&rdquo; in the subject line. You can also review our{' '}
            <Link href="/privacy/" className="text-[#0f2747] font-bold underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/disclaimer/" className="text-[#0f2747] font-bold underline">
              Legal Disclaimer
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
