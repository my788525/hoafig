export interface HoaCaseStudy {
  slug: string;
  title: string;
  stateAbbr: string;
  stateName: string;
  statuteCited: string;
  disputedAmount: string;
  finalOutcome: string;
  savingsUsd: number;
  summary: string;
  ledgerBreakdown: {
    lineItem: string;
    hoaBilled: string;
    statutoryLimit: string;
    auditFinding: string;
  }[];
  timeline: {
    day: string;
    event: string;
    legalBasis: string;
  }[];
  defenseStrategy: string[];
  faq: { q: string; a: string }[];
}

export const HOA_CASES: HoaCaseStudy[] = [
  {
    slug: 'florida-2400-continuing-fine-voided-720-305',
    title: 'Florida $2,400 Continuing Fine Voided Under Fla. Stat. § 720.305',
    stateAbbr: 'FL',
    stateName: 'Florida',
    statuteCited: 'Fla. Stat. § 720.305(2)(b)',
    disputedAmount: '$2,400.00',
    finalOutcome: '$0.00 (100% Voided)',
    savingsUsd: 2400,
    summary:
      'A Palm Beach County homeowner was billed $2,400 ($100/day for 24 days) for an unapproved driveway paver border after the board voted to fine in a closed executive session without impaneling a 3-person independent fining committee.',
    ledgerBreakdown: [
      {
        lineItem: 'Daily Continuing Fine (24 days × $100/day)',
        hoaBilled: '$2,400.00',
        statutoryLimit: '$1,000.00 max aggregate',
        auditFinding: 'Exceeds Fla. Stat. § 720.305(2) $1,000 statutory cap by $1,400.00'
      },
      {
        lineItem: 'Independent 3-Member Committee Hearing',
        hoaBilled: 'Board-only vote (0 independent members)',
        statutoryLimit: 'Mandatory 3-member non-board committee',
        auditFinding: 'Per se void under Fla. Stat. § 720.305(2)(b)'
      },
      {
        lineItem: '14-Day Advance Written Hearing Notice',
        hoaBilled: '7-day email notice',
        statutoryLimit: 'Minimum 14-day written notice',
        auditFinding: 'Procedural defect; statutory notice window violated'
      },
      {
        lineItem: 'Interest & Late Fee Tacked onto Fine',
        hoaBilled: '$145.00',
        statutoryLimit: '$0.00 permitted on disputed fines',
        auditFinding: 'Improper fee stacking on unperfected penalty'
      }
    ],
    timeline: [
      {
        day: 'Day 1',
        event: 'Management company emailed a violation notice giving 7 days to remove paver border or face $100/day fines.',
        legalBasis: 'Fla. Stat. § 720.305(2)(b) requires at least 14 days written notice.'
      },
      {
        day: 'Day 31',
        event: 'Homeowner received ledger showing $2,400.00 in fines plus $145.00 in late fees and interest.',
        legalBasis: 'Fla. Stat. § 720.305(2) caps continuing fines at $1,000 aggregate unless declaration states otherwise.'
      },
      {
        day: 'Day 35',
        event: 'Homeowner served Formal Statutory Demand & Records Request under § 720.303(5) demanding committee roster and minutes.',
        legalBasis: 'HOA had 10 business days to produce committee appointment records.'
      },
      {
        day: 'Day 44',
        event: 'Association counsel confirmed no independent fining committee existed and issued a full $2,545.00 ledger credit.',
        legalBasis: 'Full statutory compliance achieved without litigation.'
      }
    ],
    defenseStrategy: [
      'Cite Fla. Stat. § 720.305(2)(b) verbatim: a fine may NOT be levied unless approved by a committee of at least three members appointed by the board who are not officers, directors, or employees of the association, or the spouse, parent, child, brother, or sister of an officer, director, or employee.',
      'Invoke the $1,000 aggregate continuing-fine ceiling under § 720.305(2) and verify whether the recorded declaration explicitly overrides the $1,000 cap.',
      'Pair the fine objection with a § 720.303(5) official records inspection demand for the committee’s appointment resolution and signed hearing minutes.'
    ],
    faq: [
      {
        q: 'Can a Florida HOA board vote on a fine itself without a fining committee?',
        a: 'No. Under Fla. Stat. § 720.305(2)(b), the board only proposes the fine; an independent 3-member committee must hold the hearing and approve it, or the fine cannot be imposed.'
      },
      {
        q: 'Can a Florida HOA foreclose on a $2,400 fine?',
        a: 'Under Fla. Stat. § 720.305(2), a fine of less than $1,000 cannot become a lien against a parcel, and fines exceeding the statutory cap or imposed without an independent committee are void.'
      }
    ]
  },
  {
    slug: 'california-350-fine-late-fee-struck-civ-code-5850',
    title: 'California $350 Fine + Late Fee Struck Under Cal. Civ. Code § 5850',
    stateAbbr: 'CA',
    stateName: 'California',
    statuteCited: 'Cal. Civ. Code §§ 5850, 5855, 5655',
    disputedAmount: '$435.00',
    finalOutcome: 'Reduced to $0.00 (Procedural + Cap Violation)',
    savingsUsd: 435,
    summary:
      'An Orange County HOA assessed a $350.00 "escalated parking fine" plus a $35.00 late fee and $50.00 administrative charge, and applied the homeowner’s monthly $420 assessment payment toward the fine first to trigger delinquency.',
    ledgerBreakdown: [
      {
        lineItem: 'Single-Occurrence Parking Fine',
        hoaBilled: '$350.00',
        statutoryLimit: '$100.00 cap (non-health/safety)',
        auditFinding: 'Exceeds Cal. Civ. Code § 5850 $100 statutory cap by $250.00'
      },
      {
        lineItem: 'Late Fee & Interest Assessed on Fine',
        hoaBilled: '$35.00 + $50.00 admin',
        statutoryLimit: '$0.00 (No late fees or interest on fines)',
        auditFinding: 'Prohibited under Cal. Civ. Code § 5850'
      },
      {
        lineItem: 'Payment Misallocation (Fine Paid Before Dues)',
        hoaBilled: 'Monthly dues marked delinquent',
        statutoryLimit: 'Assessments MUST be paid first (§ 5655)',
        auditFinding: 'Violates Cal. Civ. Code § 5655(a) payment priority'
      },
      {
        lineItem: '15-Day Post-Hearing Written Ruling',
        hoaBilled: 'Sent 29 days after hearing',
        statutoryLimit: 'Within 15 days of board action (§ 5855(c))',
        auditFinding: 'Violates Cal. Civ. Code § 5855(c) statutory deadline'
      }
    ],
    timeline: [
      {
        day: 'Day 1',
        event: 'Board held disciplinary hearing after 10-day notice for overnight street parking.',
        legalBasis: 'Cal. Civ. Code § 5855(a) requires 10-day advance written notice.'
      },
      {
        day: 'Day 29',
        event: 'Management mailed written notice of $350 fine — 14 days past the 15-day statutory window.',
        legalBasis: 'Cal. Civ. Code § 5855(c) mandates written notice within 15 days.'
      },
      {
        day: 'Day 45',
        event: 'HOA applied homeowner’s $420 regular assessment check to the $350 fine first, creating an artificial dues delinquency.',
        legalBasis: 'Cal. Civ. Code § 5655(a) requires payments to be applied first to assessments owed.'
      },
      {
        day: 'Day 52',
        event: 'Homeowner delivered Davis-Stirling Compliance Brief; board reversed the entire $435.00 balance and restored assessment standing.',
        legalBasis: 'Cal. Civ. Code §§ 5850, 5855, 5655.'
      }
    ],
    defenseStrategy: [
      'Cite Cal. Civ. Code § 5850: non-health/safety monetary penalties are capped at $100 per violation, and late fees or interest on fines are barred.',
      'Enforce Cal. Civ. Code § 5655(a): demand immediate ledger reallocation so regular monthly assessments are credited before any disputed penalty.',
      'Flag the missed 15-day post-hearing written notice deadline under Cal. Civ. Code § 5855(c).'
    ],
    faq: [
      {
        q: 'Can a California HOA charge a late fee or interest on an unpaid fine?',
        a: 'No. Under Cal. Civ. Code § 5850 (as updated by AB 130), an association cannot charge late fees or interest on monetary penalties.'
      },
      {
        q: 'Can a California HOA apply my monthly dues payment to a fine first?',
        a: 'No. Cal. Civ. Code § 5655 mandates that homeowner payments be applied first to regular and special assessments owed before any late charges, collection costs, or fines.'
      }
    ]
  },
  {
    slug: 'texas-certified-mail-hearing-demand-209-006',
    title: 'Texas Certified-Mail & Hearing Demand Under Tex. Prop. Code § 209.006',
    stateAbbr: 'TX',
    stateName: 'Texas',
    statuteCited: 'Tex. Prop. Code §§ 209.006, 209.0061, 209.007',
    disputedAmount: '$875.00',
    finalOutcome: '$0.00 (Dismissed for Lack of Certified Mail & Evidence Packet)',
    savingsUsd: 875,
    summary:
      'A Collin County (Plano) homeowner received $875.00 in yard-maintenance fines and attorney collection fees via email portal notifications only, with zero certified mail delivery and no 10-day pre-hearing evidence packet.',
    ledgerBreakdown: [
      {
        lineItem: 'Delivery Method of Pre-Fine Notice',
        hoaBilled: 'Email + Portal Notification Only',
        statutoryLimit: 'Certified Mail Required (§ 209.006(a))',
        auditFinding: 'Fails mandatory statutory service under § 209.006'
      },
      {
        lineItem: '30-Day Hearing Request Window',
        hoaBilled: '10-day compliance deadline',
        statutoryLimit: '30 days to request board hearing (§ 209.006(b))',
        auditFinding: 'Truncated statutory hearing window'
      },
      {
        lineItem: '10-Day Pre-Hearing Evidence Packet',
        hoaBilled: 'Not provided prior to hearing',
        statutoryLimit: 'Mandatory 10 days before hearing (§ 209.007(c))',
        auditFinding: 'Automatic postponement / dismissal ground'
      },
      {
        lineItem: 'Attorney Collection Fees Passed to Owner',
        hoaBilled: '$375.00',
        statutoryLimit: '$0.00 unless § 209.006 notice given (§ 209.008)',
        auditFinding: 'Tex. Prop. Code § 209.008 bars attorney fee recovery without § 209.006 notice'
      }
    ],
    timeline: [
      {
        day: 'Day 1',
        event: 'HOA manager sent email courtesy notice and began assessing $50/week fines without certified mail.',
        legalBasis: 'Tex. Prop. Code § 209.006(a) mandates certified mail before fining.'
      },
      {
        day: 'Day 60',
        event: 'Account referred to HOA law firm; $375.00 in legal demand fees added to $500.00 in fines.',
        legalBasis: 'Tex. Prop. Code § 209.008 bars attorney fee shifting if § 209.006 notice was defective.'
      },
      {
        day: 'Day 64',
        event: 'Homeowner sent Certified Mail § 209.007 Hearing Demand & § 209.0061 Fine Policy Request.',
        legalBasis: 'Requested 10-day pre-hearing evidence packet and recorded fine schedule.'
      },
      {
        day: 'Day 75',
        event: 'HOA attorney waived all $500.00 in fines and $375.00 in legal fees after confirming no certified mail tracking existed.',
        legalBasis: 'Tex. Prop. Code §§ 209.006, 209.007, 209.008.'
      }
    ],
    defenseStrategy: [
      'Demand the USPS Certified Mail tracking number required under Tex. Prop. Code § 209.006(a) before any fine or attorney fee can attach.',
      'Verify whether the HOA adopted and posted its Fine & Enforcement Policy on its website as required by Tex. Prop. Code § 209.0061.',
      'Cite Tex. Prop. Code § 209.008(b): an owner is NOT liable for attorney’s fees incurred by the association if the § 209.006 notice was not properly sent.'
    ],
    faq: [
      {
        q: 'Can a Texas HOA fine me by email or regular mail alone?',
        a: 'No. Under Tex. Prop. Code § 209.006(a), before an HOA may levy a fine, it must give written notice by verified mail (certified mail) to the owner’s last known address.'
      },
      {
        q: 'Do I have to pay the HOA’s attorney fees if they never sent certified mail?',
        a: 'Under Tex. Prop. Code § 209.008, an owner is not liable for attorney’s fees incurred by the POA before the required § 209.006 notice and hearing opportunity are provided.'
      }
    ]
  }
];

export const CASES_BY_SLUG: Record<string, HoaCaseStudy> = Object.fromEntries(
  HOA_CASES.map((c) => [c.slug, c])
);
