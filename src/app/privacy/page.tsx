import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy — Cookies, AdSense & GDPR/CCPA',
  description:
    'HOAFig.com privacy policy: 100% client-side computation, Google AdSense & DART cookie disclosures, and GDPR/CCPA user privacy rights.',
  alternates: { canonical: '/privacy/' }
};

export default function PrivacyPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy/' }
        ])}
      />
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#0f2747]/10 text-[#0f2747]">
          Privacy &amp; Data Protection
        </span>
        <h1 className="text-3xl font-extrabold text-[#0f2747]">Privacy Policy</h1>
        <p className="text-xs text-slate-500 font-mono">
          Effective Date: November 2026 · Compliant with GDPR &amp; CCPA/CPRA
        </p>
      </div>

      <div className="brief-card p-6 sm:p-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">1. 100% Client-Side Computation (Zero Notice Upload)</h2>
          <p>
            HOAFig.com is architected as a privacy-first static web application. Every statutory calculation, fine-cap audit, special assessment estimate, late-fee waterfall check, and Board Hearing Brief compilation runs exclusively inside your local web browser. We do not collect, transmit, or store your personal HOA violation notices, property addresses, fine amounts, or financial ledgers on our servers. Optional session persistence uses your browser&apos;s <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">localStorage</code> solely on your own device, which you may clear at any time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">2. Google AdSense &amp; Third-Party Advertising Cookies (DART Cookie)</h2>
          <p>
            To keep our 51-state HOA statutory calculators and defense guides free to the public, HOAFig.com partners with Google AdSense and third-party advertising vendors. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to HOAFig.com or other websites on the Internet.
          </p>
          <p>
            Specifically, Google&apos;s use of advertising cookies (including the DoubleClick DART cookie) enables Google and its partners to serve advertisements to you based on your visit to our site and/or other sites across the web. You may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0f2747] font-bold underline"
            >
              Google Ads Settings
            </a>{' '}
            or by visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0f2747] font-bold underline"
            >
              aboutads.info
            </a>{' '}
            to opt out of third-party vendor cookie usage for personalized advertising.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">3. Analytics &amp; Payment Processing</h2>
          <p>
            We use lightweight, privacy-conscious site analytics to measure aggregate page traffic, tool engagement, and checkout click events so we can prioritize statutory updates. We do not sell personal browsing histories to data brokers. If you choose to purchase an optional All-Access Matrix Pass, checkout and payment processing are handled securely by Dodo Payments under their own privacy policy and PCI-DSS security standards; HOAFig.com never receives or stores your credit card number.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">4. Your GDPR Rights (EEA &amp; UK Visitors)</h2>
          <p>
            If you visit HOAFig.com from the European Economic Area or the United Kingdom, you have rights under the General Data Protection Regulation (GDPR), including the right to access, rectify, or erase personal data, restrict or object to processing, and withdraw consent for non-essential cookies at any time via our cookie consent preferences or your browser settings. Because HOAFig.com does not maintain user accounts or store uploaded HOA documents, our processing of personal data is limited to standard server access logs and consent preferences.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">5. Your CCPA / CPRA Rights (California Residents)</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), California residents have the right to know what categories of personal information are collected, request deletion of personal information, and opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information for cross-context behavioral advertising. You may decline non-essential advertising cookies using our on-site Cookie Consent banner (&ldquo;Essential Only&rdquo;) or disable third-party cookies in your browser. We do not discriminate against any user for exercising privacy rights.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-extrabold text-[#0f2747]">6. Contact Us Regarding Privacy</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your GDPR or CCPA rights, please email{' '}
            <a href="mailto:support@hoafig.com" className="text-[#0f2747] font-bold underline">
              support@hoafig.com
            </a>{' '}
            or visit our{' '}
            <Link href="/contact/" className="text-[#0f2747] font-bold underline">
              Contact &amp; Corrections
            </Link>{' '}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
