export interface HoaScenario {
  slug: string;
  stateAbbr: string;
  stateName: string;
  title: string;
  statute: string;
  violationType: string;
  keyDefense: string;
  typicalExposure: string;
  faqs: { q: string; a: string }[];
}

export const HOA_SCENARIOS_2026: HoaScenario[] = [
  {
    slug: 'florida-board-only-fine-void',
    stateAbbr: 'FL',
    stateName: 'Florida',
    title: 'Florida Board-Only HOA Fine Without Independent Committee',
    statute: 'Fla. Stat. § 720.305(2)',
    violationType: 'Lawn, Exterior Paint, or Parking Fine',
    keyDefense: 'Under Fla. Stat. § 720.305(2), no fine or suspension can be imposed without 14 days notice AND approval by an independent 3-member committee not related to board members or officers.',
    typicalExposure: '$500 – $2,400',
    faqs: [
      {
        q: 'Can a Florida HOA board vote to fine me directly at a board meeting?',
        a: 'No. Florida law requires a separate 3-member fining committee of non-board homeowners to approve the fine after 14 days written notice.'
      }
    ]
  },
  {
    slug: 'california-100-fine-cap-sb5850',
    stateAbbr: 'CA',
    stateName: 'California',
    title: 'California HOA $100 Fine Cap & Hearing Due Process',
    statute: 'Cal. Civ. Code §§ 5850, 5855',
    violationType: 'Excessive Daily Fine / Late-Fee Stacking',
    keyDefense: 'California Civil Code § 5850 caps most HOA violation fines at $100 per violation (unless a specific health/safety exception applies), and § 5855 requires 10-day advance written notice of a disciplinary hearing.',
    typicalExposure: '$350 – $3,000',
    faqs: [
      {
        q: 'Can a California HOA charge $50/day indefinitely for a minor violation?',
        a: 'Generally no—monetary penalties exceeding the statutory $100 per-violation cap without proper schedule adoption and health/safety findings violate Cal. Civ. Code § 5850.'
      }
    ]
  },
  {
    slug: 'texas-certified-mail-cure-209-006',
    stateAbbr: 'TX',
    stateName: 'Texas',
    title: 'Texas HOA Fine Without Certified Mail & 30-Day Cure Notice',
    statute: 'Tex. Prop. Code § 209.006 & § 209.007',
    violationType: 'Curable Exterior / Landscaping / Trash Violation',
    keyDefense: 'Texas Property Code § 209.006 voids fines for curable violations unless the HOA first sends Certified Mail detailing a reasonable cure period and your 30-day right to request a board hearing.',
    typicalExposure: '$250 – $1,500',
    faqs: [
      {
        q: 'Is an email or regular USPS letter valid notice for a Texas HOA fine?',
        a: 'No. Tex. Prop. Code § 209.006 explicitly requires verified/certified mail before a fine or suspension can be enforced.'
      }
    ]
  },
  {
    slug: 'arizona-commercial-rv-parking-fine',
    stateAbbr: 'AZ',
    stateName: 'Arizona',
    title: 'Arizona HOA Street Parking & Violation Hearing Rights',
    statute: 'Ariz. Rev. Stat. § 33-1803 & § 33-1818',
    violationType: 'Public Street Parking / RV / Truck Fine',
    keyDefense: 'Under A.R.S. § 33-1818, Arizona HOAs generally cannot regulate public roadways dedicated to a city/county unless specific pre-2015 CC&R exceptions apply, and § 33-1803 guarantees written notice and hearing rights.',
    typicalExposure: '$200 – $1,200',
    faqs: [
      {
        q: 'Can an Arizona HOA fine me for parking on a public city street?',
        a: 'Under A.R.S. § 33-1818, HOAs lack authority over public streets unless grandfathered before 2015 or expressly authorized by municipal agreement.'
      }
    ]
  },
  {
    slug: 'nevada-health-safety-fine-cap',
    stateAbbr: 'NV',
    stateName: 'Nevada',
    title: 'Nevada $100 / $1,000 HOA Fine Cap & Cure Opportunity',
    statute: 'NRS § 116.31031',
    violationType: 'Non-Safety Architectural or Maintenance Fine',
    keyDefense: 'Nevada NRS § 116.31031 caps non-health/safety HOA fines at $100 per violation (max $1,000 total per hearing) and mandates a 14-day cure notice before any fine may accrue.',
    typicalExposure: '$400 – $2,000',
    faqs: [
      {
        q: 'What is the maximum HOA fine for a non-safety violation in Nevada?',
        a: 'NRS § 116.31031 caps non-health/safety fines at $100 per violation or $1,000 total, and requires a cure opportunity first.'
      }
    ]
  },
  {
    slug: 'colorado-500-cap-two-30day-cures',
    stateAbbr: 'CO',
    stateName: 'Colorado',
    title: 'Colorado HB 22-1137 $500 Cap & Two 30-Day Cure Windows',
    statute: 'C.R.S. § 38-33.3-209.5',
    violationType: 'Non-Health/Safety CC&R Violation',
    keyDefense: 'Colorado’s HB 22-1137 caps non-safety fines at $500 total and requires TWO consecutive 30-day cure periods via Certified Mail + in-person notice before fining or referring to collections.',
    typicalExposure: '$500 – $2,500',
    faqs: [
      {
        q: 'Can a Colorado HOA fine me more than $500 for a non-safety violation?',
        a: 'No. C.R.S. § 38-33.3-209.5 caps total fines for non-health/safety violations at $500 after two mandatory 30-day cure periods.'
      }
    ]
  }
];
