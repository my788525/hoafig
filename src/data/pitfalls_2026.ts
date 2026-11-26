export interface PitfallVignette {
  id: string;
  number: string;
  title: string;
  tag: string;
  exposureExample: string;
  scenario: string;
  blackHole: string;
  survivalMove: string;
  statute: string;
  statuteUrl: string;
  relatedToolHref: string;
  relatedToolLabel: string;
}

export interface PitfallFaqItem {
  q: string;
  a: string;
}

export const PITFALLS_2026: PitfallVignette[] = [
  {
    id: 'withholding-monthly-dues',
    number: '01',
    title: 'The "Withholding Monthly Dues in Protest" Lien Trap',
    tag: 'Lien & Foreclosure Risk',
    exposureExample: '$250 Fine → $3,800+ Lien & Attorney Fees',
    scenario:
      'A homeowner receives an unfair $250 landscaping fine. Outraged, they pause their $320/month regular HOA assessment autopay "until the board removes the illegal fine." Three months later, they receive a Notice of Intent to Lien for $1,950 in unpaid dues, late charges, and management collection fees.',
    blackHole:
      'In almost every state, an HOA cannot easily foreclose on a standalone behavioral fine—but it CAN record a super-priority assessment lien and foreclose for unpaid regular monthly dues. Worse, many HOA management portals apply any partial payment to attorney fees, collection costs, and fines first unless state law (like Cal. Civ. Code § 5655 or Tex. Prop. Code § 209.0063) mandates applying payments to regular assessments first.',
    survivalMove:
      'NEVER withhold regular monthly dues over a disputed fine. Keep paying your exact regular assessment on time every month by check or bill-pay with "Regular Assessment Only — Disputed Fine Excluded" written clearly in the memo line, and dispute the fine separately in writing.',
    statute: 'Tex. Prop. Code § 209.0063 · Cal. Civ. Code § 5655 · Fla. Stat. § 720.3085',
    statuteUrl: '/calculators/hoa-late-fee-auditor/',
    relatedToolHref: '/calculators/hoa-late-fee-auditor/',
    relatedToolLabel: 'Audit Payment Priority & Late Fees'
  },
  {
    id: 'portal-chat-vs-certified-mail',
    number: '02',
    title: 'The HOA Portal Chat vs. Certified Mail Hearing Trap',
    tag: 'Missed Statutory Deadline',
    exposureExample: '10–30 Day Waiver → Fine Locked In',
    scenario:
      'A homeowner receives a violation letter and immediately vents in the HOA management web portal ("AppFolio" / "TownSq" / "Vantaca") or replies to a `noreply@` management email explaining why the violation is wrong. The property manager replies "Noted, forwarding to the board," and 35 days later the fine is automatically assessed as final.',
    blackHole:
      'State HOA statutes (such as Tex. Prop. Code § 209.006 and Fla. Stat. § 720.305) grant a strict 10-to-30-day window to request a formal board or fining-committee hearing in writing. Portal chat threads and informal emails rarely count as statutory notice—and management companies frequently purge or ignore portal tickets, leaving you with zero proof of a timely hearing request.',
    survivalMove:
      'Within 7 days of any violation notice, send a formal Written Request for Board Hearing & Records Inspection via USPS Certified Mail with Return Receipt Requested (and keep a PDF copy + tracking number). Explicitly state that you are invoking your statutory right to a hearing and tolling any fine accrual.',
    statute: 'Tex. Prop. Code § 209.006 (30d) · Fla. Stat. § 720.305(2) (14d) · NRS § 116.31031',
    statuteUrl: '/wizard/',
    relatedToolHref: '/wizard/',
    relatedToolLabel: 'Generate Hearing Request Brief'
  },
  {
    id: 'illegal-interest-missing-committee',
    number: '03',
    title: 'The Illegal Fine Interest & Missing Independent Committee Trap',
    tag: 'Procedural Voidability',
    exposureExample: '$1,200+ Voidable Fine & Fee Stacking',
    scenario:
      'A Florida or California homeowner logs into their HOA ledger and sees a $100/day fine that snowballed to $1,400, plus a $50 late fee and 18% annual interest tacked onto the unpaid fine. The notice was issued directly by the property manager and rubber-stamped by the Board of Directors.',
    blackHole:
      'Boards and management software routinely auto-calculate interest and late fees on unpaid fines as if they were delinquent assessments—even when state law strictly prohibits it. In Florida, a fine is legally void unless approved by an independent 3-member fining committee (no board members, officers, or employees, or their spouses/relatives). In California, Cal. Civ. Code § 5850 (as amended by AB 130) caps most fines at $100 and bans late fees or interest on monetary penalties.',
    survivalMove:
      'Demand a line-item ledger audit and the signed minutes of the independent fining committee meeting. Cite the exact statutory cap and interest ban in writing—if the committee was composed of board members or never met, demand immediate rescission of the entire fine.',
    statute: 'Cal. Civ. Code § 5850 ($100 Cap / 0% Interest) · Fla. Stat. § 720.305(2)(b) (3-Member Committee)',
    statuteUrl: '/calculators/hoa-fine-compliance/',
    relatedToolHref: '/calculators/hoa-fine-compliance/',
    relatedToolLabel: 'Run Fine Compliance Check'
  },
  {
    id: 'unprepared-everyone-else-does-it',
    number: '04',
    title: 'The Unprepared "Everyone Else Does It" Trap',
    tag: 'Evidentiary Failure',
    exposureExample: 'Selective Enforcement Claim Dismissed',
    scenario:
      'Cited for a trash bin or driveway-parking violation, a homeowner walks into the 5-minute board hearing empty-handed and says, "Half the neighborhood leaves their bins out—you are just targeting me!" The board politely nods, marks the minutes "Homeowner appeared; violation upheld," and affirms the $500 fine.',
    blackHole:
      'Boards have broad discretion unless you build an objective, written evidentiary record of arbitrary or selective enforcement. Verbal complaints at a hearing are not evidence. Without documented comparators, the board’s written decision looks completely reasonable on paper if the dispute later goes to mediation, small claims court, or ADR.',
    survivalMove:
      'Before the hearing, photograph at least 3–5 identical, unpenalized conditions on your street with visible timestamps and lot addresses. Submit them in a numbered Exhibit Log alongside your written hearing brief, forcing the board to enter your comparators into the official HOA record.',
    statute: 'Restatement (Third) of Property: Servitudes § 6.13 · State Selective Enforcement Precedent',
    statuteUrl: '/calculators/selective-enforcement-analyzer/',
    relatedToolHref: '/calculators/selective-enforcement-analyzer/',
    relatedToolLabel: 'Build Selective Enforcement Log'
  },
  {
    id: '1990s-ccr-solar-ev-starlink-bluff',
    number: '05',
    title: 'The 1990s CC&R Solar / EV / Starlink Bluff',
    tag: 'Federal & State Preemption',
    exposureExample: '$5,000+ Modification Denial Overturned',
    scenario:
      'A homeowner submits an Architectural Review Committee (ARC) application for rooftop solar panels, a garage Level 2 EV charger, or a Starlink dish. The ARC rejects it, quoting a 1994 CC&R clause that bans "all exterior dishes, roof-mounted equipment, and electrical modifications visible from the street."',
    blackHole:
      'Boards routinely weaponize outdated 1980s–2000s CC&R language that has been legally voided by state and federal preemption statutes. Homeowners who accept the ARC denial letter at face value—or miss the short statutory window to challenge it—lose thousands in energy savings or face daily fines for installing protected equipment.',
    survivalMove:
      'Never argue aesthetics with an ARC citing void CC&Rs. Reply in writing citing the controlling preemption law: Federal FCC OTARD (47 C.F.R. § 1.4000) voids HOA bans on Starlink/antennas on exclusive-use property, and state Solar Rights / Right-to-Charge statutes void unreasonable restrictions or cost-inflating reroutes.',
    statute: 'FCC OTARD 47 C.F.R. § 1.4000 · Cal. Civ. Code §§ 714, 4745 · Fla. Stat. § 163.04',
    statuteUrl: '/calculators/arc-override-checker/',
    relatedToolHref: '/calculators/arc-override-checker/',
    relatedToolLabel: 'Verify Solar / EV / OTARD Override'
  },
  {
    id: 'special-assessment-blind-payment',
    number: '06',
    title: 'The Special Assessment Blind-Payment Trap',
    tag: 'Reserve & Bidding Audit',
    exposureExample: '$4,500 Surprise Assessment',
    scenario:
      'Homeowners receive a letter demanding a $4,500 "Emergency Roof & Paving Special Assessment" due in 30 days. Fearing late penalties, 80% of owners write the check immediately without asking how the board arrived at the number or why the reserve fund is empty.',
    blackHole:
      'Many special assessments violate statutory caps (e.g., California’s 5% annual cap without a homeowner vote under Cal. Civ. Code § 5605), lack a genuine "emergency" justification, or rely on a single sweetheart no-bid contractor instead of competitive bids. Once paid without protest, recovering overcharged funds is nearly impossible.',
    survivalMove:
      'Before paying a lump-sum special assessment, submit a statutory HOA Records Inspection Demand for: (1) the past 3 years of Reserve Studies, (2) at least 2–3 competitive vendor bids, and (3) board minutes showing whether the required homeowner vote threshold was met.',
    statute: 'Cal. Civ. Code §§ 5605, 5550 · Fla. Stat. § 718.112 / § 720.303 · State Records Acts',
    statuteUrl: '/calculators/special-assessment-calculator/',
    relatedToolHref: '/calculators/special-assessment-calculator/',
    relatedToolLabel: 'Audit Special Assessment & Reserves'
  }
];

export const PITFALLS_FAQS: PitfallFaqItem[] = [
  {
    q: 'Can my HOA foreclose on my house if I refuse to pay an unfair $250 fine?',
    a: 'In most states, an HOA cannot foreclose solely for a behavioral fine—but if you withhold your regular monthly dues in protest, the HOA can record a lien for the unpaid regular assessments and initiate foreclosure. Always pay your regular monthly dues separately and mark them "Regular Assessment Only."'
  },
  {
    q: 'Does complaining in the HOA web portal count as requesting a formal hearing?',
    a: 'Usually no. State statutes like Tex. Prop. Code § 209.006 and Fla. Stat. § 720.305 require a written hearing request within 10 to 30 days, and portal messages are often unlogged or ignored. Always send your hearing request via USPS Certified Mail with Return Receipt Requested.'
  },
  {
    q: 'Can an HOA charge late fees or 18% interest on an unpaid violation fine?',
    a: 'In key states like California (Cal. Civ. Code § 5850) and under many state statutory frameworks, late fees and interest are strictly reserved for delinquent regular/special assessments—not disciplinary fines. An audit of your HOA ledger can reveal illegal fee stacking.'
  },
  {
    q: 'What makes a Florida HOA fine legally void under Fla. Stat. § 720.305?',
    a: 'Under Fla. Stat. § 720.305(2)(b), a fine or suspension levied by the board cannot be imposed unless at least 14 days’ written notice is given and an opportunity for a hearing is provided before an independent committee of at least 3 members who are not officers, directors, or employees of the association (or their spouses, parents, or children).'
  },
  {
    q: 'Can my HOA enforce a 1990s CC&R clause banning Starlink dishes or rooftop solar?',
    a: 'No. Federal FCC OTARD rules (47 C.F.R. § 1.4000) preempt HOA restrictions on satellite dishes (including Starlink) and antennas installed on exclusive-use areas like roofs, patios, or balconies. Most states also have Solar Rights and EV Right-to-Charge laws that void contradictory CC&R bans.'
  }
];
