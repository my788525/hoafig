import type { Metadata } from 'next';
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
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Contact &amp; Statutory Corrections</h1>
      <div className="brief-card p-6 sm:p-8 space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          For statutory updates, legislative amendments, or All-Access Matrix Pass support, email{' '}
          <a href="mailto:support@hoafig.com" className="text-[#0f2747] font-bold underline">
            support@hoafig.com
          </a>.
        </p>
        <p className="text-xs text-slate-500">
          Please include the state, statutory section number, and official legislature URL when reporting a legislative update.
        </p>
      </div>
    </div>
  );
}
