export interface HoaGuide {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  readTime: string;
  updated: string;
  description: string;
  directAnswer: {
    question: string;
    rows: { factor: string; rule: string; statuteExample: string }[];
  };
  sections: {
    heading: string;
    body: string[];
    callout?: string;
  }[];
  relatedCalculator: {
    href: string;
    label: string;
  };
  faq: { q: string; a: string }[];
}

export const HOA_GUIDES: HoaGuide[] = [
  {
    slug: 'how-to-fight-an-hoa-fine',
    title: 'How to Fight an HOA Fine: 2026 Statutory Defense Playbook',
    shortTitle: 'How to Fight an HOA Fine',
    category: 'Fine Defense',
    readTime: '7 min read',
    updated: '2026-11-01',
    description:
      'Step-by-step framework to audit an HOA violation notice against state statutory caps, mandatory cure windows, certified mail rules, and independent committee requirements.',
    directAnswer: {
      question: 'What makes an HOA fine legally unenforceable in most U.S. states?',
      rows: [
        {
          factor: 'Exceeded Statutory Cap',
          rule: 'Fine exceeds state dollar limit (e.g., $100 in CA, $1,000 in FL/NV, $500 in CO/UT, $50/$900 in VA).',
          statuteExample: 'Cal. Civ. Code § 5850; Fla. Stat. § 720.305'
        },
        {
          factor: 'Missing Cure or Hearing Notice',
          rule: 'HOA skipped mandatory advance written notice, cure window, or board/committee hearing.',
          statuteExample: 'Tex. Prop. Code § 209.006; Colo. Rev. Stat. § 38-33.3-209.5'
        },
        {
          factor: 'No Independent Committee',
          rule: 'Board imposed fine directly where state law requires a non-board fining committee.',
          statuteExample: 'Fla. Stat. § 720.305(2)(b)'
        },
        {
          factor: 'Illegal Fee / Interest Stacking',
          rule: 'HOA added late fees, interest, or misapplied dues payments to fines first.',
          statuteExample: 'Cal. Civ. Code § 5655; Tex. Prop. Code § 209.0063'
        }
      ]
    },
    sections: [
      {
        heading: '1. Audit the Notice Method and Cure Window First',
        body: [
          'Most HOA fines fail on procedure before they ever reach the merits of the underlying rule. Management companies routinely send automated email portal alerts or regular first-class letters, which violate statutory service requirements in states like Texas (Tex. Prop. Code § 209.006 certified mail) and Colorado (Colo. Rev. Stat. § 38-33.3-209.5 certified mail + posted notice).',
          'Check the exact number of days between the notice date, the cure deadline, and the hearing date. In Nevada (NRS § 116.31031(4)), curing the violation within 14 days bars the HOA from imposing any fine at all.'
        ],
        callout: 'Never pay a disputed fine before requesting an itemized ledger and written hearing packet—payment can be misconstrued as waiver in non-protective jurisdictions.'
      },
      {
        heading: '2. Cross-Check the Fine Amount Against State Caps',
        body: [
          'Even when a violation occurred, boards frequently apply outdated or inflated fine schedules. California caps non-health/safety fines at $100 per violation (Cal. Civ. Code § 5850) and prohibits late fees or interest on fines. Virginia caps single offenses at $50 and continuing offenses at $10/day for 90 days ($900 max).',
          'Use our HOA Fine Compliance Checker to run an automated statutory audit of your notice and generate a printable Hearing Brief.'
        ]
      },
      {
        heading: '3. Submit a Written Hearing & Records Demand',
        body: [
          'Always respond in writing via Certified Mail (Return Receipt Requested) and email. Request: (a) the exact recorded CC&R section and board-adopted fine schedule, (b) the date and name of the inspector (mandatory upon request in Arizona under A.R.S. § 33-1803), and (c) a formal hearing before the board or independent committee.'
        ]
      }
    ],
    relatedCalculator: {
      href: '/calculators/hoa-fine-compliance/',
      label: 'Run HOA Fine Compliance Checker'
    },
    faq: [
      {
        q: 'Should I withhold my regular monthly HOA dues while fighting a fine?',
        a: 'No. Never withhold regular monthly assessments—doing so can trigger valid assessment liens and foreclosure. Always pay regular dues separately with a memo designating "Regular Monthly Assessment Only."'
      },
      {
        q: 'Can an HOA foreclose on my house over an unpaid fine?',
        a: 'In many states (including Arizona, California, Colorado, Florida under $1,000, and Nevada), HOAs are statutorily barred from foreclosing solely for unpaid fines.'
      }
    ]
  },
  {
    slug: 'selective-enforcement-evidence-guide',
    title: 'Selective Enforcement Evidence: Proving Arbitrary HOA Fining',
    shortTitle: 'Selective Enforcement Evidence',
    category: 'Board Hearing Defense',
    readTime: '6 min read',
    updated: '2026-11-01',
    description:
      'How to document selective, arbitrary, or retaliatory HOA enforcement using time-stamped neighborhood logs, architectural precedent, and statutory records requests.',
    directAnswer: {
      question: 'What evidence proves selective enforcement at an HOA hearing?',
      rows: [
        {
          factor: 'Time-Stamped Visual Log',
          rule: 'Dated photos of 5–15 identical un-fined conditions on neighboring lots in the same subdivision.',
          statuteExample: 'White Egret Condo. v. Franklin (FL); Nahrstedt (CA)'
        },
        {
          factor: 'Violation Ledger Parity',
          rule: 'Records request for anonymized violation counts and fine waivers over the prior 24 months.',
          statuteExample: 'Fla. Stat. § 720.303(5); Cal. Civ. Code § 5200'
        },
        {
          factor: 'ARC Approval Precedent',
          rule: 'Prior board/ARC approvals of the same paint color, fence style, or parking configuration.',
          statuteExample: 'Restatement (Third) of Property: Servitudes § 6.13'
        }
      ]
    },
    sections: [
      {
        heading: '1. The Legal Standard: Arbitrary & Capricious Enforcement',
        body: [
          'Under the Restatement (Third) of Property: Servitudes and state appellate precedent (such as White Egret Condominium v. Franklin in Florida and Cohen v. Kite Hill in California), an association’s enforcement power must be exercised reasonably, in good faith, and not arbitrarily or discriminatorily.',
          'When an HOA fines one homeowner for a basketball hoop, trash bin placement, or roof stain while ignoring identical visible conditions on 10 other lots, the fine is vulnerable to a selective-enforcement defense.'
        ]
      },
      {
        heading: '2. Building an Admissible Photo & Address Matrix',
        body: [
          'Walk public sidewalks only (never trespass) and capture GPS/date-stamped photos of identical conditions visible from the street. Organize them into a 1-page table listing Street Address, Condition Observed, Date Photographed, and Whether Visible from Street.',
          'Present this table calmly at your hearing as "Exhibit A — Community Enforcement Parity Audit." Boards and HOA attorneys recognize that selective enforcement creates fee-shifting exposure if litigated.'
        ],
        callout: 'Keep your hearing tone clinical and evidentiary—avoid personal attacks on board members, which obscure the legal record.'
      }
    ],
    relatedCalculator: {
      href: '/calculators/hoa-fine-compliance/',
      label: 'Generate Hearing Brief & Exhibit Packet'
    },
    faq: [
      {
        q: 'Does selective enforcement void a covenant forever?',
        a: 'Not always forever, but it bars the HOA from enforcing the rule against you unless it first announces prospective, uniform enforcement across the entire community.'
      }
    ]
  },
  {
    slug: 'solar-ev-charger-hoa-overrides',
    title: 'Solar Panels & EV Chargers: Federal & State HOA Override Laws',
    shortTitle: 'Solar & EV HOA Overrides',
    category: 'ARC Overrides',
    readTime: '6 min read',
    updated: '2026-11-01',
    description:
      'Complete breakdown of state Solar Access Laws, Right-to-Charge EV statutes, and Federal FCC OTARD (47 C.F.R. § 1.4000) preemption over HOA architectural denials.',
    directAnswer: {
      question: 'When can state or federal law override an HOA architectural denial?',
      rows: [
        {
          factor: 'Rooftop Solar Systems',
          rule: '30+ states void HOA bans or restrictions that increase cost (e.g., >$1,000 in CA) or cut efficiency (>10%).',
          statuteExample: 'Cal. Civ. Code § 714; Fla. Stat. § 163.04; Tex. Prop. Code § 202.010'
        },
        {
          factor: 'EV Charging Stations',
          rule: 'Right-to-Charge states bar HOAs from prohibiting Level 1/2 chargers in owner-assigned parking.',
          statuteExample: 'Cal. Civ. Code § 4745; Fla. Stat. § 720.3075; Colo. § 38-33.3-106.8'
        },
        {
          factor: 'Satellite / Fixed Wireless',
          rule: 'Federal FCC OTARD rule preempts ALL HOA bans on dishes/antennas ≤1 meter in exclusive-use areas.',
          statuteExample: '47 C.F.R. § 1.4000 (Federal Preemption)'
        }
      ]
    },
    sections: [
      {
        heading: '1. Solar Access Statutes: The Cost & Efficiency Test',
        body: [
          'In states with Solar Rights Acts (including CA, FL, TX, AZ, CO, NV, NJ, NY, NC, VA, WA, IL, MI), an HOA cannot flatly prohibit rooftop solar panels. Even "aesthetic placement" conditions are void if they materially raise installation cost or reduce energy output.',
          'For example, California Civil Code § 714 voids any HOA condition that increases a solar system’s cost by more than $1,000 or decreases efficiency by more than 10%.'
        ]
      },
      {
        heading: '2. Right-to-Charge EV Laws & Deemed-Approval Clocks',
        body: [
          'States including California (§ 4745), Florida (§ 718.113(8) & § 720.3075), Colorado (§ 38-33.3-106.8), Virginia (§ 55.1-1823.1), Illinois (765 ILCS 1085/15), and New Jersey (N.J.S.A. § 45:22A-48.4) prohibit HOAs from blocking EV chargers when the owner covers installation and electricity costs.',
          'Many statutes also include a "deemed-approved" clock (e.g., 60 days in California)—if the ARC fails to issue a written decision in time, your application is approved by operation of law.'
        ]
      }
    ],
    relatedCalculator: {
      href: '/calculators/arc-override-checker/',
      label: 'Check ARC Statutory Override Eligibility'
    },
    faq: [
      {
        q: 'Does FCC OTARD apply to Starlink dishes?',
        a: 'Yes. Under 47 C.F.R. § 1.4000, antennas and satellite dishes 1 meter or less in diameter placed in an owner’s exclusive-use area (roof, balcony, patio) are protected from HOA bans and prior-approval delays.'
      }
    ]
  },
  {
    slug: 'special-assessment-voting-thresholds',
    title: 'Special Assessment Voting Thresholds & Reserve Study Audits',
    shortTitle: 'Special Assessment Thresholds',
    category: 'Special Assessments',
    readTime: '6 min read',
    updated: '2026-11-01',
    description:
      'How to verify whether your HOA board has authority to levy a special assessment without a homeowner vote, and how to audit reserve study shortfalls.',
    directAnswer: {
      question: 'Can an HOA board pass a special assessment without a homeowner vote?',
      rows: [
        {
          factor: 'California (Davis-Stirling)',
          rule: 'Board capped at 5% of budgeted gross expenses per fiscal year without majority member vote.',
          statuteExample: 'Cal. Civ. Code § 5605(b)'
        },
        {
          factor: 'UCIOA States (CO, CT, NV, WA, DE)',
          rule: 'Board adopts budget/assessment, but owners can veto at a mandatory ratification meeting.',
          statuteExample: 'Colo. Rev. Stat. § 38-33.3-303(4); Wash. RCW § 64.90.525'
        },
        {
          factor: 'Illinois Condominiums',
          rule: 'Special assessments >115% of prior year trigger unit owner petition right to call a veto vote.',
          statuteExample: '765 ILCS 605/18(a)(8)'
        }
      ]
    },
    sections: [
      {
        heading: '1. Checking the 5% / Ratification Threshold',
        body: [
          'Boards frequently attempt to pass five-figure special assessments by calling them "emergency assessments" or splitting a single capital project into multiple smaller assessments across fiscal quarters.',
          'Under Cal. Civ. Code § 5605(b), any special assessment exceeding 5% of the association’s budgeted gross expenses requires a majority vote of a quorum of members—unless it meets strict statutory emergency criteria (court order, extraordinary threat to safety).'
        ]
      },
      {
        heading: '2. Auditing the Reserve Study Shortfall',
        body: [
          'Before voting on or paying a special assessment, inspect the latest Reserve Study. Check the Percent Funded ratio (below 30% indicates severe underfunding) and verify whether the board obtained competitive bids and disclosed alternative financing (HOA loan vs. lump-sum assessment).'
        ]
      }
    ],
    relatedCalculator: {
      href: '/calculators/special-assessment-calculator/',
      label: 'Run Special Assessment & Reserve Estimator'
    },
    faq: [
      {
        q: 'What is a healthy HOA reserve percent-funded level?',
        a: 'Industry reserve-study standards treat 70%–100% funded as strong, 30%–69% as fair, and under 30% as high risk for special assessments.'
      }
    ]
  },
  {
    slug: 'requesting-hoa-financial-violation-records',
    title: 'Requesting HOA Financial, Reserve & Violation Records by Statute',
    shortTitle: 'Requesting HOA Records',
    category: 'Records & Transparency',
    readTime: '5 min read',
    updated: '2026-11-01',
    description:
      'State-by-state statutory deadlines (5–10 business days) and penalties for demanding HOA financial ledgers, reserve studies, board minutes, and fine policies.',
    directAnswer: {
      question: 'How fast must an HOA produce official records upon written request?',
      rows: [
        {
          factor: 'Florida (HOAs & Condos)',
          rule: '10 business days from receipt of written request; $50/day statutory damages up to 10 days ($500) for willful denial.',
          statuteExample: 'Fla. Stat. § 720.303(5)'
        },
        {
          factor: 'Texas (POAs)',
          rule: '10 business days by certified mail request; must produce books, financial records, and fine policies.',
          statuteExample: 'Tex. Prop. Code § 209.005'
        },
        {
          factor: 'California (Davis-Stirling)',
          rule: '10 business days for current-year records (30 days for prior years); $500 civil penalty per denial in small claims.',
          statuteExample: 'Cal. Civ. Code §§ 5210, 5235'
        }
      ]
    },
    sections: [
      {
        heading: '1. What Records You Have a Statutory Right to Inspect',
        body: [
          'Homeowners are entitled to inspect current financial statements, general ledgers, vendor contracts, reserve studies, board meeting minutes, insurance policies, and the association’s adopted fine and enforcement policy.',
          'While individual neighbor violation files are generally confidential, you can request anonymized enforcement statistics and your own complete account ledger and inspection photos.'
        ]
      },
      {
        heading: '2. Triggering Statutory Damages for Stonewalling',
        body: [
          'Send your request via Certified Mail so the 10-business-day clock is indisputable. If the management company ignores the deadline, California (§ 5235) and Florida (§ 720.303(5)) authorize $500 statutory penalties plus attorney fees in small claims or county court.'
        ]
      }
    ],
    relatedCalculator: {
      href: '/calculators/hoa-late-fee-auditor/',
      label: 'Audit HOA Ledger & Generate Records Demand'
    },
    faq: [
      {
        q: 'Can an HOA charge me $500 to email PDF records?',
        a: 'No. Most states limit copying charges to actual direct costs (e.g., $0.10–$0.25/page) and require electronic records to be provided at minimal or zero cost.'
      }
    ]
  },
  {
    slug: 'independent-fining-committees-explained',
    title: 'Independent Fining Committees: Why Board-Only Fines Are Often Void',
    shortTitle: 'Independent Fining Committees',
    category: 'Procedural Defense',
    readTime: '5 min read',
    updated: '2026-11-01',
    description:
      'How independent fining committee statutes in Florida, Colorado, and UCIOA states invalidate fines voted on solely by HOA board members or property managers.',
    directAnswer: {
      question: 'When is an independent fining committee legally required?',
      rows: [
        {
          factor: 'Florida (Mandatory)',
          rule: '3-member committee; NO officers, directors, employees, or their spouses/relatives may serve.',
          statuteExample: 'Fla. Stat. § 720.305(2)(b)'
        },
        {
          factor: 'Colorado (Impartial Decision-Maker)',
          rule: 'Hearing must be conducted by an impartial decision-maker who has no direct personal/financial interest.',
          statuteExample: 'Colo. Rev. Stat. § 38-33.3-209.5(1.7)'
        },
        {
          factor: 'North Carolina (Adjudicatory Panel)',
          rule: 'Hearing before board or adjudicatory panel; fine accrues only 5 days after written decision.',
          statuteExample: 'N.C. Gen. Stat. § 47F-3-107.1'
        }
      ]
    },
    sections: [
      {
        heading: '1. The Conflict-of-Interest Firewall',
        body: [
          'In Florida, the legislature recognized that an HOA board acting as prosecutor, judge, and jury creates due-process abuse. Under Fla. Stat. § 720.305(2)(b), the board may only levy a fine if a separate 3-member committee—composed entirely of non-board, non-employee, non-relative owners—votes to approve it after a 14-day noticed hearing.',
          'If the committee rejects the fine, the board cannot override the committee and impose the fine anyway.'
        ]
      },
      {
        heading: '2. How to Verify Committee Legitimacy',
        body: [
          'At your hearing—or in your records request—ask for the names of all three committee members and the board resolution appointing them. If any member is a board director’s spouse, sibling, or management employee, the committee is unlawfully constituted and the fine is void.'
        ]
      }
    ],
    relatedCalculator: {
      href: '/calculators/hoa-fine-compliance/',
      label: 'Check Committee Compliance Now'
    },
    faq: [
      {
        q: 'Can a property manager impose a fine without a committee or board hearing?',
        a: 'No. A property management company has zero independent statutory authority to levy fines; it can only send notices on behalf of the board or committee.'
      }
    ]
  }
];

export const GUIDES_BY_SLUG: Record<string, HoaGuide> = Object.fromEntries(
  HOA_GUIDES.map((g) => [g.slug, g])
);
