import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use & Legal Disclaimer',
  description: 'Terms of use and educational legal-information disclaimer for HOAFig.com.',
  alternates: { canonical: '/terms/' }
};

export default function TermsPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Terms of Use &amp; Legal Disclaimer</h1>
      <div className="brief-card p-6 sm:p-8 space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          HOAFig.com provides statutory compliance calculators, primary code summaries, and template correspondence for educational and informational purposes only. HOAFig is not a law firm and does not provide legal representation or create an attorney-client relationship.
        </p>
        <p>
          Always review your recorded Declaration (CC&amp;Rs), Bylaws, and current state statutes, and consult a licensed attorney in your jurisdiction for formal legal advice.
        </p>
      </div>
    </div>
  );
}
