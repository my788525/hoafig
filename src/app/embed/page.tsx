import type { Metadata } from 'next';
import Hoa2027RuleAuditCalc from '@/components/calculators/Hoa2027RuleAuditCalc';
import EmbedCodeBox from '@/components/EmbedCodeBox';

export const metadata: Metadata = {
  title: 'Embed Free HOA Fine Compliance Widget',
  description:
    'Embed HOAFig’s free 51-state HOA fine cap and 2027 rule-change compliance calculator on homeowner forums and neighborhood blogs.',
  alternates: { canonical: '/embed/' }
};

export default function HoaEmbedPage() {
  return (
    <div className="container-exec py-8 space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-mono uppercase tracking-widest text-[#9a7622] font-bold">
          FREE EMBEDDABLE WIDGET · HOAFIG.COM
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c2921]">
          Free 2027 HOA Statutory Compliance Widget
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          100% client-side and free to embed on homeowner association forums, neighborhood newsletters, and real-estate resources.
        </p>
      </div>

      <Hoa2027RuleAuditCalc />

      <EmbedCodeBox
        siteName="HOAFig.com"
        siteUrl="https://hoafig.com/"
        embedUrl="https://hoafig.com/embed/"
        accentClass="bg-[#c8a24a] hover:bg-[#e2c275] text-[#09221c]"
      />
    </div>
  );
}
