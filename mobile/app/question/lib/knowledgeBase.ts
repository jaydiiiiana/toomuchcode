/**
 * Local AI Knowledge Base for Philippine Law.
 * Provides thoughtful, accurate, and encouraging legal information.
 */

interface KnowledgeItem {
  keywords: string[];
  response: string;
  citations: string[];
  suggestedAction?: {
    label: string;
    actionType: "consult" | "document" | "emergency";
  };
}

export const PHILIPPINE_LEGAL_KNOWLEDGE: KnowledgeItem[] = [
  {
    keywords: ["landlord", "evict", "rent", "tenant", "apartment", "upa"],
    response:
      "Under Philippine Law (Rent Control Act / RA 9653 and the Civil Code):\n\n" +
      "1. **No Summary Eviction**: A landlord cannot immediately throw out your belongings, cut your utilities, or lock you out without due process.\n" +
      "2. **Grace Period & Notice**: Under the Rent Control Act, ejectment for arrears requires at least 3 months unpaid rent, followed by a formal written demand.\n" +
      "3. **Judicial Ejectment**: Even if you are behind on rent, the landlord must file a formal unlawful detainer case with the court or undergo Barangay conciliation first.\n\n" +
      "💡 *Tip: Keep payment receipts and written communication with your landlord to protect your rights.*",
    citations: ["RA 9653 (Rent Control Act)", "Civil Code Arts. 1673-1674", "Rule 70, Rules of Court"],
    suggestedAction: {
      label: "Review Rental Contract",
      actionType: "document",
    },
  },
  {
    keywords: ["13th month", "bonus", "resign", "payroll", "resignation", "sahod"],
    response:
      "Yes, under Presidential Decree No. 851 (13th Month Pay Law):\n\n" +
      "1. **Mandatory Benefit**: All rank-and-file employees who have worked for at least 1 month during the calendar year are entitled to 13th month pay.\n" +
      "2. **Resigned Employees**: If you resigned before December, you are entitled to a **prorated 13th month pay**, computed based on total basic salary earned during the year divided by 12.\n" +
      "3. **Deadline**: For active employees, it must be paid on or before December 24. For resigned employees, it is typically released with final pay within 30 days.",
    citations: ["Presidential Decree No. 851", "DOLE Labor Advisory No. 06-2020"],
    suggestedAction: {
      label: "Consult a Labor Attorney",
      actionType: "consult",
    },
  },
  {
    keywords: ["cyberlibel", "libel", "online", "facebook", "post", "slander", "defamation"],
    response:
      "Cyberlibel in the Philippines is governed by the Cybercrime Prevention Act of 2012 (RA 10175) and Article 355 of the Revised Penal Code:\n\n" +
      "1. **Elements**: It requires a public imputation of a discreditable act, made with malice, directed against an identifiable person, committed through a computer or social media.\n" +
      "2. **Prescriptive Period**: The Supreme Court confirmed that cyberlibel prescribes in **15 years** (Tolentino v. People).\n" +
      "3. **Defense**: Truth alone is not always a defense unless published with good motives and for justifiable ends, especially for private individuals.\n\n" +
      "⚠️ *Avoid publicly posting unverified accusations online. Sending private formal demands is safer.*",
    citations: ["RA 10175 (Cybercrime Prevention Act)", "Revised Penal Code Art. 355", "Tolentino v. People (G.R. 240310)"],
    suggestedAction: {
      label: "Consult an Attorney",
      actionType: "consult",
    },
  },
  {
    keywords: ["small claims", "utang", "debt", "money", "loan", "singil"],
    response:
      "The Supreme Court of the Philippines has simplified the **Small Claims Procedure** (A.M. No. 08-8-7-SC):\n\n" +
      "1. **Jurisdiction**: Covers purely money claims up to **₱1,000,000** in Metropolitan Trial Courts (and up to ₱400,000 in other First-Level Courts).\n" +
      "2. **No Lawyers Allowed**: Lawyers are strictly prohibited from appearing during hearings. You represent yourself!\n" +
      "3. **Speedy Decision**: Cases are resolved quickly, often in just one hearing day.\n" +
      "4. **Requirements**: Promissory note, proof of demand, and Barangay certification (if residing in the same city/municipality).",
    citations: ["Revised Rules of Procedure for Small Claims (A.M. No. 08-8-7-SC)"],
    suggestedAction: {
      label: "Prepare Demand Letter",
      actionType: "document",
    },
  },
  {
    keywords: ["fire", "terminated", "dismissal", "illegal dismissal", "dole", "ncmb", "nlrc"],
    response:
      "Under the Philippine Labor Code, security of tenure is guaranteed:\n\n" +
      "1. **Substantive Due Process**: An employee can only be dismissed for Just Causes (e.g., serious misconduct, fraud) or Authorized Causes (e.g., retrenchment, redundancy).\n" +
      "2. **Two-Notice Rule**: The employer must issue:\n" +
      "   • 1st Notice: Specific charges with opportunity to explain (at least 5 days).\n" +
      "   • 2nd Notice: Decision after hearing/investigation.\n" +
      "3. **Remedies**: If dismissed illegally, you may file a complaint with the DOLE-SEnA (Single Entry Approach) or NLRC for reinstatement, backwages, or separation pay.",
    citations: ["Labor Code of the Philippines Arts. 297-299", "DOLE Department Order No. 147-15"],
    suggestedAction: {
      label: "Consult a Labor Attorney",
      actionType: "consult",
    },
  },
  {
    keywords: ["support", "child", "custody", "sustento", "asawa", "bata", "annulment", "vawc"],
    response:
      "Under the Family Code of the Philippines and Republic Act No. 9262 (VAWC Act):\n\n" +
      "1. **Child Support is Mandatory**: Both parents are legally obligated to support their child, regardless of whether the child is legitimate or illegitimate.\n" +
      "2. **Amount**: Support is proportional to the child's basic needs (food, education, medical, shelter) and the parent's financial capability.\n" +
      "3. **Failure to Give Support**: Under RA 9262, economic abuse through willful failure to provide financial support can be penalized criminally with imprisonment.",
    citations: ["Family Code Arts. 194-208", "Republic Act No. 9262 (VAWC Act)"],
    suggestedAction: {
      label: "Talk to a Family Attorney",
      actionType: "consult",
    },
  },
];

/**
 * Find matching AI response or fallback to contextual answer.
 */
export function getLocalAIResponse(query: string): {
  text: string;
  citations?: string[];
  suggestedAction?: {
    label: string;
    actionType: "consult" | "document" | "emergency";
  };
} {
  const lower = query.toLowerCase().trim();

  for (const item of PHILIPPINE_LEGAL_KNOWLEDGE) {
    const isMatch = item.keywords.some((kw) => lower.includes(kw));
    if (isMatch) {
      return {
        text: item.response,
        citations: item.citations,
        suggestedAction: item.suggestedAction,
      };
    }
  }

  // Friendly contextual general response
  return {
    text:
      `Thank you for asking! Regarding your question:\n\n` +
      `Under Philippine General Principles of Law, rights and obligations are governed primarily by the 1987 Philippine Constitution, the Civil Code, and relevant special statutes.\n\n` +
      `Here is how to approach this matter:\n` +
      `1. **Documentation**: Always gather and secure all written communications, contracts, receipts, or screenshots.\n` +
      `2. **Barangay Conciliation (Katarungang Pambarangay)**: If the dispute involves individuals living in the same city or municipality, the law usually requires mediation at the Barangay before filing a court case (RA 7160).\n` +
      `3. **Professional Guidance**: When dealing with contracts or potential liabilities, consulting with a licensed Philippine attorney is highly recommended.\n\n` +
      `Feel free to ask more details, or try one of the quick topics above! 😊`,
    citations: ["1987 Philippine Constitution", "Civil Code of the Philippines", "RA 7160 (Katarungang Pambarangay)"],
    suggestedAction: {
      label: "Schedule Attorney Consultation",
      actionType: "consult",
    },
  };
}
