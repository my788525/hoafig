import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'HOAFig.com privacy policy: 100% client-side computation with zero upload of personal HOA notices or ledgers.',
  alternates: { canonical: '/privacy/' }
};

export default function PrivacyPage() {
  return (
    <div className="container-exec py-10 max-w-4xl space-y-6">
      <h1 className="text-3xl font-extrabold text-[#0f2747]">Privacy Policy</h1>
      <div className="brief-card p-6 sm:p-8 space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          HOAFig.com processes all calculator inputs, fine amounts, reserve figures, and Hearing Briefs strictly within your local web browser. We do not collect, store, or transmit your personal HOA violation notices or financial ledgers to any server.
        </p>
        <p>
          Optional All-Access Matrix Pass checkouts are processed securely by Dodo Payments under their privacy policy.
        </p>
      </div>
    </div>
  );
}
