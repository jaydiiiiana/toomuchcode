/**
 * Local Offline Philippine Legal AI Engine.
 * Strictly specialized in Philippine Law (Republic Acts, Revised Penal Code, 1987 PH Constitution, SC Jurisprudence).
 */

import { getLocalAIResponse } from "../../question/lib/knowledgeBase";

export interface LegalAIResponse {
  text: string;
  citations: string[];
  isIntakeClarification?: boolean;
  topic?: string;
}

export function generatePhilippineAIResponse(
  userMessage: string,
  history: Array<{ senderId: string; text: string }> = []
): LegalAIResponse {
  const normalized = userMessage.toLowerCase().trim();

  // Look at last AI message in history to check if AI was in an intake question
  const lastAIMessage = [...history]
    .reverse()
    .find((m) => m.senderId === "ai" || m.senderId === "attorney");
  const wasAskedAboutCyberbullyDetails =
    lastAIMessage &&
    (lastAIMessage.text.includes("ano po ba ang partikular na ginawa") ||
      lastAIMessage.text.includes("partikular na ginawa sa inyo") ||
      lastAIMessage.text.includes("Cyber Libel"));

  // -------------------------------------------------------------
  // 1. FOLLOW-UP STAGE: User answers what was done
  // (e.g. "siniraan ako online nag pakalan ng maling information", "siniraan ako sa facebook", "pinahiya ako")
  // -------------------------------------------------------------
  const isDefamationDetail =
    normalized.includes("siniraan") ||
    normalized.includes("maling impormasyon") ||
    normalized.includes("pakalat") ||
    normalized.includes("fake news") ||
    normalized.includes("pinahiya") ||
    normalized.includes("post tungkol sa akin") ||
    normalized.includes("paninirang puri") ||
    normalized.includes("siraan");

  if (wasAskedAboutCyberbullyDetails || (isDefamationDetail && normalized.includes("online"))) {
    return {
      topic: "Cyber Libel & Online Defamation",
      citations: [
        "Republic Act No. 10175 (Cybercrime Prevention Act of 2012) Sec. 4(c)(4)",
        "Revised Penal Code Arts. 353 & 355 (Libel)",
        "Republic Act No. 11313 (Safe Spaces Act / Bawal Bastos Law)",
        "Republic Act No. 10173 (Data Privacy Act of 2012)",
        "Tolentino v. People (G.R. No. 240310 - 15-year Prescription)",
      ],
      text:
        "⚖️ **PAGSUSURI SA ILALIM NG BATAS NG PILIPINAS:**\n\n" +
        "Ang ginawang paninira sa inyo online at pagpapakalat ng maling impormasyon ay malinaw na sakop ng **Cyber Libel** sa ilalim ng **Section 4(c)(4) ng Republic Act No. 10175 (Cybercrime Prevention Act of 2012)** kaugnay ng **Articles 353 at 355 ng Revised Penal Code (RPC)**.\n\n" +
        "📌 **APAT (4) NA ELEMENTO NG CYBER LIBEL:**\n" +
        "1. **Defamatory Imputation**: May paratang o maling impormasyon na sumisira sa inyong karangalan, reputasyon, o nagdudulot ng panlilibak sa publiko.\n" +
        "2. **Publication**: Ipinaskil o ipinadala kung saan may ibang taong nakabasa (hal. Facebook post, comment, group chat, o social media).\n" +
        "3. **Identifiability**: Kayo ang tinutukoy, kahit walang buong pangalan basta't maliwanag sa mga nakakabasa na kayo ang pinatutungkulan.\n" +
        "4. **Malice**: Ipinapalagay ng batas (*presumed by law*) ang malisya sa ilalim ng Art. 354 RPC para sa mga pribadong indibidwal.\n\n" +
        "🛡️ **IBA PANG BUMABAGSAK NA BATAS:**\n" +
        "• **Safe Spaces Act (RA 11313)**: Kung may kasamang pambabastos, homophobic, o sexual harassment remarks online.\n" +
        "• **Data Privacy Act (RA 10173)**: Kung nagpakalat ng inyong pribadong litrato, numero, o address nang walang pahintulot (doxxing).\n" +
        "• **Civil Code Arts. 19, 20, at 21**: Para sa pagsingil ng bayad-pinsala (Moral and Exemplary Damages).\n\n" +
        "📋 **MGA HAKBANG NA DAPAT GAWIN AGAD:**\n" +
        "1. **I-preserve ang Ebidensya (Digital Forensics)**: Mag-screenshot agad na may kitang URL/link, petsa at oras, username, profile link, at mga komento. *Huwag agad i-block o burahin ang convo bago makakuha ng kopya.*\n" +
        "2. **Isumbong sa mga Ahensya**:\n" +
        "   • **PNP Anti-Cybercrime Group (PNP-ACG)**: Camp Crame, Hotline: (02) 8723-0401 / 0998-598-8116\n" +
        "   • **NBI Cybercrime Division**: Taft Ave, Manila, Hotline: (02) 8523-8231\n" +
        "3. **Barangay Conciliation**: Kung ang naninira ay nakatira sa parehong lungsod (hal. Valenzuela City), idulog muna sa Lupong Tagapamayapa ng Barangay bago ang korte.\n" +
        "4. **Pagsampa ng Kaso sa City Prosecutor**: Pormal na Complaint-Affidavit sa Office of the City Prosecutor.\n\n" +
        "💡 *Ang lahat ng ito ay naitala sa ating offline consultation at awtomatikong ibubuod para sa inyong abogado pagbalik online.*",
    };
  }

  // -------------------------------------------------------------
  // 2. INITIAL STAGE: User asks about cyberbullying / harassment
  // (The AI asks an intake clarification question first!)
  // -------------------------------------------------------------
  if (
    normalized.includes("cyberbully") ||
    normalized.includes("cyberbullying") ||
    normalized.includes("binubully") ||
    normalized.includes("cyber bully") ||
    normalized.includes("harass online") ||
    normalized.includes("online bullying")
  ) {
    return {
      topic: "Cyberbullying Intake",
      citations: [
        "Republic Act No. 10175 (Cybercrime Prevention Act)",
        "Republic Act No. 11313 (Safe Spaces Act)",
        "Republic Act No. 10627 (Anti-Bullying Act)",
      ],
      isIntakeClarification: true,
      text:
        "Naiintindihan ko ang inyong sitwasyon. Sa ilalim ng batas ng Pilipinas, ang tinatawag na 'cyberbullying' ay may iba't ibang legal na klasipikasyon depende sa partikular na ginawa ng nanliligalig.\n\n" +
        "Para maibigay ko ang pinakatumpak na legal na payo at tamang batas:\n\n" +
        "👉 **Ano po ba ang eksaktong ginawa sa inyo?**\n\n" +
        "Pumili o ikwento po ang detalye:\n" +
        "1. **Siniraan ba kayo o nagpakalat ng maling impormasyon sa publiko o Facebook?** *(Cyber Libel)*\n" +
        "2. **Nag-post ba ng edited o maselang litrato / personal na detalye?** *(Data Privacy & Photo Voyeurism)*\n" +
        "3. **May bastos, sexist, o sexual na pananalita?** *(Safe Spaces Act / RA 11313)*\n" +
        "4. **May pagbabanta sa inyong buhay o pananakot?** *(Grave Threats / Coercion)*\n\n" +
        "Maaari ninyong sabihin halimbawa: *'Siniraan ako online nagpakalat ng maling impormasyon'* para masuri natin.",
    };
  }

  // -------------------------------------------------------------
  // 3. LABOR & EMPLOYMENT LAW (PD 851, Labor Code)
  // -------------------------------------------------------------
  if (
    normalized.includes("13th month") ||
    normalized.includes("sahod") ||
    normalized.includes("sweldo") ||
    normalized.includes("illegal dismissal") ||
    normalized.includes("tinanggal sa trabaho") ||
    normalized.includes("tinanggal") ||
    normalized.includes("dole") ||
    normalized.includes("separation pay") ||
    normalized.includes("overtime") ||
    normalized.includes("resign")
  ) {
    return {
      topic: "Philippine Labor Law",
      citations: [
        "Presidential Decree No. 851 (13th Month Pay Law)",
        "Labor Code of the Philippines Arts. 297-299",
        "DOLE Department Order No. 147-15 (Due Process)",
      ],
      text:
        "Under Philippine Labor Law:\n\n" +
        "1. **13th Month Pay**: Mandatory for all rank-and-file employees who rendered at least 1 month of service. Resigned employees are entitled to prorated 13th month pay.\n" +
        "2. **Security of Tenure**: No employee can be dismissed without Substantive Due Process (Just/Authorized Causes) and Procedural Due Process (Two-Notice Rule).\n" +
        "3. **Legal Remedy**: File a Request for Assistance (RFA) under **DOLE-SEnA** (Single Entry Approach) for free 30-day conciliation-mediation.",
    };
  }

  // -------------------------------------------------------------
  // 4. TENANCY & LEASE (Rent Control Act / Civil Code)
  // -------------------------------------------------------------
  if (
    normalized.includes("rent") ||
    normalized.includes("upa") ||
    normalized.includes("landlord") ||
    normalized.includes("tenant") ||
    normalized.includes("paalisin") ||
    normalized.includes("eviction") ||
    normalized.includes("deposit") ||
    normalized.includes("kontrata ng upa")
  ) {
    return {
      topic: "Tenancy & Lease Law",
      citations: [
        "Republic Act No. 9653 (Rent Control Act of 2009)",
        "Civil Code of the Philippines Arts. 1673-1674",
        "Rule 70, Rules of Court (Unlawful Detainer)",
      ],
      text:
        "Under Philippine Tenancy & Lease Law (RA 9653 & Civil Code):\n\n" +
        "1. **No Self-Help Eviction**: A landlord cannot summarily padlock doors, throw belongings outside, or disconnect water/power without a formal court order.\n" +
        "2. **Non-Payment Grace Period**: Ejectment for non-payment requires at least 3 months cumulative arrears and a formal written Notice to Vacate and Demand to Pay.\n" +
        "3. **Barangay Conciliation**: Disputes must undergo Katarungang Pambarangay first if both parties reside in the same city/municipality.",
    };
  }

  // -------------------------------------------------------------
  // 5. VAWC & FAMILY CODE (RA 9262, Support)
  // -------------------------------------------------------------
  if (
    normalized.includes("vawc") ||
    normalized.includes("asawa") ||
    normalized.includes("sustento") ||
    normalized.includes("child support") ||
    normalized.includes("sinasaktan") ||
    normalized.includes("abuse") ||
    normalized.includes("bpo") ||
    normalized.includes("tpo")
  ) {
    return {
      topic: "VAWC & Family Support",
      citations: [
        "Republic Act No. 9262 (Anti-VAWC Act)",
        "Family Code of the Philippines Arts. 194-208 (Support)",
      ],
      text:
        "Under RA 9262 (Anti-VAWC Act) & Family Code:\n\n" +
        "1. **Protection Orders**: Immediate access to a Barangay Protection Order (BPO) issued within 24 hours (15 days validity) or Temporary Protection Order (TPO) from the Family Court.\n" +
        "2. **Mandatory Child Support**: Willful refusal to provide financial support for a child constitutes economic abuse under RA 9262 Sec. 5(i) with criminal penalties.\n" +
        "3. **Emergency Hotline**: PNP Women & Children Protection: (02) 8532-6690 or dial 911.",
    };
  }

  // -------------------------------------------------------------
  // 6. SMALL CLAIMS & UNPAID UTANG (Small Claims Rules / BP 22)
  // -------------------------------------------------------------
  if (
    normalized.includes("utang") ||
    normalized.includes("singil") ||
    normalized.includes("small claims") ||
    normalized.includes("loan") ||
    normalized.includes("tseke") ||
    normalized.includes("bouncing check")
  ) {
    return {
      topic: "Small Claims & Collection",
      citations: [
        "Revised Rules of Procedure for Small Claims (A.M. No. 08-8-7-SC)",
        "Batas Pambansa Blg. 22 (Bouncing Checks Law)",
      ],
      text:
        "Under Supreme Court Small Claims Rules:\n\n" +
        "1. **Simplified Procedure**: Claims up to **₱1,000,000** in Metropolitan Trial Courts can be filed without hiring a lawyer (lawyers are prohibited from appearing in hearings).\n" +
        "2. **Evidence Needed**: Promissory note, demand letter with proof of receipt, and Certificate to File Action from Barangay.\n" +
        "3. **Bouncing Checks (BP 22)**: Issuing a check without sufficient funds carries criminal liability with proper 5-day notice of dishonor.",
    };
  }

  // -------------------------------------------------------------
  // 7. ARREST, POLICE & INQUEST RIGHTS
  // -------------------------------------------------------------
  if (
    normalized.includes("huli") ||
    normalized.includes("pulis") ||
    normalized.includes("aresto") ||
    normalized.includes("warrant") ||
    normalized.includes("inquest") ||
    normalized.includes("kulong")
  ) {
    return {
      topic: "Arrest & Custodial Rights",
      citations: [
        "Article III, Section 12, 1987 Philippine Constitution",
        "Article 125, Revised Penal Code (Delay in Delivery)",
        "Rule 113, Section 5, Rules of Court (Warrantless Arrest)",
      ],
      text:
        "Under Philippine Constitutional Rights:\n\n" +
        "1. **Right to Counsel**: You have the right to remain silent and to have independent counsel of choice. If you cannot afford one, PAO must provide representation.\n" +
        "2. **Inquest Deadlines (Art. 125 RPC)**: Maximum holding period without charges: 12 hrs (light offenses), 18 hrs (correctional), 36 hrs (afflictive/grave).\n" +
        "3. **Contact PAO Inquest Hotline**: (02) 8929-9436 or 0939-323-3665.",
    };
  }

  // -------------------------------------------------------------
  // 8. NON-PHILIPPINE / OUT-OF-SCOPE FILTER
  // -------------------------------------------------------------
  if (
    normalized.includes("us law") ||
    normalized.includes("california") ||
    normalized.includes("uk law") ||
    normalized.includes("new york") ||
    normalized.includes("recipe") ||
    normalized.includes("minecraft") ||
    normalized.includes("movie")
  ) {
    return {
      topic: "Jurisdiction Notice",
      citations: ["1987 Constitution of the Republic of the Philippines"],
      text:
        "Ako ay isang AI Legal Assistant na eksklusibong nakatuon sa **Batas ng Pilipinas** (Philippine Jurisprudence, Republic Acts, at Revised Penal Code).\n\n" +
        "Hindi ako nagbibigay ng payo para sa ibang bansa o mga paksang labas sa batas ng Pilipinas. Mangyaring magtanong tungkol sa legal na sitwasyon sa ilalim ng hurisdiksyon ng Pilipinas.",
    };
  }

  // -------------------------------------------------------------
  // 9. GENERAL PHILIPPINE LEGAL CONSULTATION FALLBACK
  // -------------------------------------------------------------
  const dynamicAdvice = getLocalAIResponse(
    userMessage,
    history.map((h) => ({
      sender: h.senderId === "user" ? ("user" as const) : ("ai" as const),
      text: h.text,
    }))
  );
  return {
    topic: "Philippine Legal Advisory & Offline Consultation",
    citations: dynamicAdvice.citations || [
      "Civil Code of the Philippines",
      "Revised Penal Code",
      "1987 Philippine Constitution",
    ],
    text: dynamicAdvice.text,
  };
}

/**
 * Generates a formal Case Intake Summary for the Attorney once back online.
 */
export function generateAttorneyCaseSummary(
  offlineMessages: Array<{ senderId: string; text: string }>,
  attorneyName: string
): { summaryText: string; attorneyReply: string } {
  const userTexts = offlineMessages
    .filter((m) => m.senderId === "user")
    .map((m) => m.text)
    .join(" ");

  const lowerUserTexts = userTexts.toLowerCase();

  let detectedTopic = "General Legal Consultation";
  let applicableLaws = "Philippine Civil Code & Applicable Republic Acts";
  let clientFactSummary = userTexts || "Client inquired about legal remedies while offline.";
  let urgentAction = "Review documented evidence and discuss immediate legal next steps.";

  if (
    lowerUserTexts.includes("siniraan") ||
    lowerUserTexts.includes("cyberbully") ||
    lowerUserTexts.includes("maling impormasyon") ||
    lowerUserTexts.includes("libel")
  ) {
    detectedTopic = "Cyber Libel & Online Defamation";
    applicableLaws = "RA 10175 (Cybercrime Prevention Act) Sec. 4(c)(4), RPC Arts. 353-355, RA 11313 (Safe Spaces Act)";
    urgentAction = "Review saved digital screenshots, verify publisher identity, and evaluate Complaint-Affidavit for City Prosecutor filing.";
  } else if (lowerUserTexts.includes("13th month") || lowerUserTexts.includes("sahod") || lowerUserTexts.includes("tinanggal")) {
    detectedTopic = "Labor Dispute / Wage Claim";
    applicableLaws = "PD 851 (13th Month Pay), Labor Code Arts. 297-299, DOLE DO 147-15";
    urgentAction = "Evaluate employment records and prepare SEnA Request for Assistance.";
  } else if (lowerUserTexts.includes("rent") || lowerUserTexts.includes("upa") || lowerUserTexts.includes("landlord")) {
    detectedTopic = "Lease Dispute & Tenancy";
    applicableLaws = "RA 9653 (Rent Control Act), Civil Code Arts. 1673-1674";
    urgentAction = "Examine lease contract, rent ledgers, and formal notice to vacate requirements.";
  } else if (lowerUserTexts.includes("utang") || lowerUserTexts.includes("small claims")) {
    detectedTopic = "Collection of Sum of Money";
    applicableLaws = "Supreme Court Small Claims Rule (A.M. No. 08-8-7-SC)";
    urgentAction = "Inspect promissory note and draft formal Demand Letter.";
  }

  const summaryText =
    `📋 [LEXORA AI CASE INTAKE SUMMARY FOR ${attorneyName.toUpperCase()}]\n\n` +
    `• Subject: ${detectedTopic}\n` +
    `• Applicable Laws: ${applicableLaws}\n` +
    `• Client Facts (Recorded Offline): "${clientFactSummary.slice(0, 180)}${clientFactSummary.length > 180 ? "..." : ""}"\n` +
    `• Recommended Attorney Action: ${urgentAction}\n` +
    `• Status: Synced to Attorney Case Docket upon connection.`;

  const attorneyReply =
    `Good day! I have reviewed the AI Case Intake Summary of your offline consultation regarding ${detectedTopic}.\n\n` +
    `I am actively handling this matter for you. Please send any screenshots or documents you have preserved so we can proceed with your case.`;

  return { summaryText, attorneyReply };
}
