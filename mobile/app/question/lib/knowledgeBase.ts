/**
 * Lexi – Local Philippine Legal Attorney AI Engine.
 * 
 * Operates 100% locally on-device without cloud API dependencies.
 * Dynamic Natural Language Generation (NLG) Clause & Sentence Composer:
 * Replaces hardcoded paragraph scripts with atomic legal propositions and a
 * dynamic linguistic assembler that composes customized legal advice on the fly.
 */

export interface AIResponse {
  text: string;
  citations?: string[];
  suggestedAction?: {
    label: string;
    actionType: "consult" | "document" | "emergency";
  };
}

export interface ChatHistoryItem {
  sender: "user" | "ai";
  text: string;
}

// ----------------------------------------------------------------------
// 1. ATOMIC LEGAL KNOWLEDGE GRAPH (FACTS & PROPOSITIONS, NOT SCRIPTS)
// ----------------------------------------------------------------------

interface LegalAtom {
  domain: string;
  primaryStatute: string;
  citations: string[];
  civilGroundsEn: string[];
  civilGroundsTl: string[];
  prohibitionsEn: string[];
  prohibitionsTl: string[];
  criminalWarningEn?: string;
  criminalWarningTl?: string;
  statutoryThresholdEn?: string;
  statutoryThresholdTl?: string;
  proceduralStepsEn: string[];
  proceduralStepsTl: string[];
  diagnosticQuestionsEn: string[];
  diagnosticQuestionsTl: string[];
  suggestedAction: {
    label: string;
    actionType: "consult" | "document" | "emergency";
  };
}

const LEGAL_KNOWLEDGE_GRAPH: Record<string, LegalAtom> = {
  tenancy_default: {
    domain: "tenancy",
    primaryStatute: "Rent Control Act of 2009 (Republic Act No. 9653)",
    citations: [
      "Republic Act No. 9653 (Rent Control Act)",
      "Revised Penal Code Art. 286 (Grave Coercion)",
      "Republic Act No. 7160 (Katarungang Pambarangay)",
      "Rules of Court Rule 70 (Unlawful Detainer)",
    ],
    civilGroundsEn: [
      "breach of lease covenant through failure to pay agreed monthly rentals",
      "obligation to surrender possession upon valid notice after default",
    ],
    civilGroundsTl: [
      "paglabag sa kasunduan sa upa dahil sa hindi pagbabayad sa takdang araw",
      "obligasyong lisanin ang inuupahan matapos magpadala ng pormal na abiso",
    ],
    prohibitionsEn: [
      "unilateral padlocking of doors or changing locks",
      "forcibly discarding personal belongings onto the street",
      "unauthorized disconnection of electricity, water, or utilities",
    ],
    prohibitionsTl: [
      "pagpapadlock o pagpapalit ng kandado ng pinto nang walang utos ng hukom",
      "pagtatapon ng mga gamit sa kalsada o labas ng bahay",
      "pagputol ng linya ng kuryente at tubig",
    ],
    criminalWarningEn:
      "Such extrajudicial self-help acts constitute the criminal offense of Grave Coercion under Article 286 of the Revised Penal Code.",
    criminalWarningTl:
      "Ang ganitong pamimilit ay maituturing na krimen na Grave Coercion sa ilalim ng Article 286 ng Revised Penal Code.",
    statutoryThresholdEn:
      "Under Section 9 of RA 9653, judicial ejectment for non-payment requires an accumulation of at least three (3) cumulative months of unpaid rent.",
    statutoryThresholdTl:
      "Sa ilalim ng Section 9 ng RA 9653, kinakailangang umabot muna sa tatlong (3) buwang sunod-sunod na atraso bago makapaghain ng pormal na demand to vacate.",
    proceduralStepsEn: [
      "Serve a formal written Demand Letter to Pay and Vacate granting 5 to 15 calendar days to settle or surrender the premises.",
      "Submit the dispute to the Barangay Lupong Tagapamayapa for mandatory conciliation under RA 7160 if both parties reside in the same municipality.",
      "File an Unlawful Detainer complaint before the Municipal Trial Court once a Certificate to File Action is issued by the Barangay.",
    ],
    proceduralStepsTl: [
      "Magpadala ng pormal na nakasulat na Demand Letter to Pay and Vacate na nagbibigay ng 5 hanggang 15 araw upang magbayad o umalis.",
      "Idulog ang usapin sa Barangay Lupon para sa conciliation sa ilalim ng RA 7160 kung parehong naninirahan sa iisang lungsod.",
      "Magsampa ng pormal na kasong Unlawful Detainer sa hukuman kapag mayroon nang Certificate to File Action mula sa Barangay.",
    ],
    diagnosticQuestionsEn: [
      "How many months of rental arrears have accumulated so far?",
      "Do you possess a written lease contract and past acknowledgment receipts?",
    ],
    diagnosticQuestionsTl: [
      "Ilang buwan na po ang kabuuang atraso sa upa?",
      "Mayroon po ba kayong nakasulat na kontrata ng upa at mga lumang resibo?",
    ],
    suggestedAction: { label: "Draft Demand Letter to Tenant", actionType: "document" },
  },

  tenancy_eviction_defense: {
    domain: "tenancy",
    primaryStatute: "Rent Control Act (RA 9653) & Civil Code Articles 1673-1674",
    citations: [
      "Republic Act No. 9653",
      "Civil Code Arts. 1673-1674",
      "Revised Penal Code Art. 286",
    ],
    civilGroundsEn: [
      "tenant right to peaceful and uninterrupted possession throughout lease term",
      "strict requirement of judicial due process before physical dispossession",
    ],
    civilGroundsTl: [
      "karapatan ng nangungupahan sa mapayapang paninirahan habang may umiiral na kasunduan",
      "mahigpit na pangangailangan ng due process sa korte bago mapaalis",
    ],
    prohibitionsEn: [
      "arbitrary utility cutoffs designed to force tenant abandonment",
      "unauthorized seizure of tenant furniture or personal property",
    ],
    prohibitionsTl: [
      "sadyang pagputol ng kuryente at tubig upang piliting umalis ang nangungupahan",
      "ilegal na pag-ipit o pagkuha ng mga personal na gamit",
    ],
    criminalWarningEn: "Such harassment is punishable criminally as Grave Coercion under the Revised Penal Code.",
    criminalWarningTl: "Ang ganitong panggigipit ay may parusang kriminal na Grave Coercion sa ilalim ng Revised Penal Code.",
    statutoryThresholdEn: "A tenant cannot be ejected on short notice without prior formal demand and elapsed statutory grace periods.",
    statutoryThresholdTl: "Hindi maaaring palayasin ang nangungupahan nang walang pormal na nakasulat na demand letter at sapat na palugit.",
    proceduralStepsEn: [
      "Record an official blotter report at the Barangay Hall documenting any utility shutoff or verbal threats.",
      "Request Barangay conciliation to assert tenant rights and demand an orderly accounting of security deposits.",
    ],
    proceduralStepsTl: [
      "Ipa-blotter agad sa Barangay Hall ang anumang banta o pagputol ng linya ng kuryente at tubig.",
      "Humingi ng pagdinig sa Barangay Lupon upang igiit ang inyong karapatan at pag-usapan ang maayos na plano.",
    ],
    diagnosticQuestionsEn: [
      "Did the landlord serve any formal written notice prior to this dispute?",
      "Do you have receipts for your initial advance and security deposits?",
    ],
    diagnosticQuestionsTl: [
      "May pormal bang nakasulat na sulat na ibinigay bago ito mangyari?",
      "Naitago po ba ninyo ang mga resibo ng inyong deposito at paunang bayad?",
    ],
    suggestedAction: { label: "Review Lease Rights", actionType: "document" },
  },

  labor_termination: {
    domain: "labor",
    primaryStatute: "Labor Code of the Philippines (Arts. 297-299) & DOLE DO 147-15",
    citations: [
      "Labor Code of the Philippines Arts. 297-299",
      "DOLE Department Order No. 147-15",
      "DOLE Labor Advisory No. 06-2020",
    ],
    civilGroundsEn: [
      "constitutional security of tenure protecting workers against arbitrary dismissal",
      "requirement of substantive just or authorized causes before severance",
    ],
    civilGroundsTl: [
      "saligang karapatan sa security of tenure laban sa di-makatarungang pagkatanggal",
      "pangangailangan ng legal na just o authorized cause bago magtanggal",
    ],
    prohibitionsEn: [
      "verbal or summary termination bypassing written due process",
      "coercing workers into signing voluntary resignation letters or quitclaims",
    ],
    prohibitionsTl: [
      "pasalita o biglaang pagtanggal nang walang nakasulat na due process",
      "pamimilit na pumirma sa resignation letter, waiver, o quitclaim",
    ],
    statutoryThresholdEn:
      "Management must observe the mandatory Two-Notice Rule: a written Notice to Explain with at least 5 calendar days to answer, followed by a formal Notice of Decision.",
    statutoryThresholdTl:
      "Obligadong sundin ng pamunuan ang Two-Notice Rule: unang sulat na may 5 araw para magpaliwanag, at pangalawang pormal na desisyon matapos ang pagdinig.",
    proceduralStepsEn: [
      "Refuse to sign any waiver, release, or quitclaim while under duress.",
      "File a Request for Assistance (RFA) under DOLE-SEnA for free 30-day conciliation.",
      "Elevate the complaint to the NLRC for Illegal Dismissal seeking reinstatement and full backwages if mediation fails.",
    ],
    proceduralStepsTl: [
      "Huwag pipirma sa anumang quitclaim, waiver, o resignation letter habang pinipilit.",
      "Maghain ng Request for Assistance (RFA) sa DOLE-SEnA para sa libreng mediation.",
      "Iakyat ang reklamo sa NLRC para sa Illegal Dismissal upang humingi ng reinstatement at full backwages kung hindi magkasundo.",
    ],
    diagnosticQuestionsEn: [
      "Was your dismissal communicated verbally or via formal written memorandum?",
      "How many months or years of service have you rendered with the company?",
    ],
    diagnosticQuestionsTl: [
      "Pasalita po ba o may nakasulat na memo ang pagkakatanggal sa inyo?",
      "Ilang buwan o taon na po kayong naglilingkod sa nasabing kumpanya?",
    ],
    suggestedAction: { label: "DOLE SEnA Filing Guide", actionType: "document" },
  },

  debt_collection_harassment: {
    domain: "debt",
    primaryStatute: "1987 Philippine Constitution Art. III Sec. 20 & SEC MC No. 18 (s. 2019)",
    citations: [
      "1987 Philippine Constitution Art. III Sec. 20",
      "SEC Memorandum Circular No. 18 (s. 2019)",
      "Republic Act No. 10173 (Data Privacy Act)",
      "Small Claims Rule (A.M. No. 08-8-7-SC)",
    ],
    civilGroundsEn: [
      "unpaid debts constitute purely civil contractual obligations, never criminal offenses",
      "absolute constitutional guarantee that no person shall be imprisoned for debt",
    ],
    civilGroundsTl: [
      "ang utang ay isang civil liability lamang at hindi kailanman nagiging krimen",
      "saligang garantiya na walang sinumang tao ang maaaring ipakulong dahil sa utang",
    ],
    prohibitionsEn: [
      "contacting third-party phonebook contacts to shame or embarrass the borrower",
      "using profane, threatening, or extortionate communication",
      "falsely claiming to be police officers, prosecutors, or court marshals",
    ],
    prohibitionsTl: [
      "pag-text o pagtawag sa mga kaibigan at katrabaho upang ipahiya ang nangutang",
      "paggamit ng mararahas na salita at pananakot ng dahas",
      "pagpapanggap bilang pulis, piskal, o kawani ng hukuman",
    ],
    statutoryThresholdEn:
      "Creditors seeking lawful recovery must utilize Small Claims Court for sums up to ₱1,000,000, where proceedings exclude lawyers and focus strictly on civil settlement.",
    statutoryThresholdTl:
      "Kung nais maningil sa legal na paraan, dapat dumaan sa Small Claims Court (hanggang ₱1,000,000) kung saan walang kulong at bawal ang abogado sa pagdinig.",
    proceduralStepsEn: [
      "Capture forensic screenshots of every threatening text, call log, or public post.",
      "File administrative complaints with the Securities and Exchange Commission (SEC) and the National Privacy Commission (NPC).",
    ],
    proceduralStepsTl: [
      "I-screenshot ang lahat ng mapang-abusong mensahe, tawag, at post na may petsa at oras.",
      "Magsumite ng pormal na reklamo sa SEC at sa National Privacy Commission (NPC).",
    ],
    diagnosticQuestionsEn: [
      "Are collectors contacting your third-party phone contacts or posting online?",
      "What is the principal loan balance involved?",
    ],
    diagnosticQuestionsTl: [
      "Kinokontak po ba nila ang inyong mga kakilala o nagpo-post sa social media?",
      "Magkano po ba ang kabuuang halaga ng orihinal na hiniram?",
    ],
    suggestedAction: { label: "Report Lending Harassment", actionType: "document" },
  },

  general_legal: {
    domain: "general",
    primaryStatute: "1987 Philippine Constitution & Civil Code of the Philippines",
    citations: [
      "1987 Philippine Constitution Art. III",
      "Civil Code of the Philippines",
      "Rules of Court of the Philippines",
    ],
    civilGroundsEn: [
      "constitutional right to due process of law and equal protection",
      "good faith, justice, and fair dealing in the exercise of rights under Civil Code Art. 19",
    ],
    civilGroundsTl: [
      "saligang karapatan sa due process at patas na pagtrato sa ilalim ng batas",
      "panuntunan ng mabuting kalooban at katarungan sa ilalim ng Art. 19 ng Kodigo Sibil",
    ],
    prohibitionsEn: [
      "taking the law into one's own hands without court authority",
      "harassment, intimidation, or coercion to enforce disputed claims",
    ],
    prohibitionsTl: [
      "paggawa ng sariling batas nang walang pahintulot ng hukuman",
      "panggigipit, pananakot, o pamimilit upang ipilit ang isang usapin",
    ],
    statutoryThresholdEn:
      "All civil, contractual, and personal disputes must follow orderly conciliation or court procedure.",
    statutoryThresholdTl:
      "Lahat ng usaping sibil at legal ay kailangang dumaan sa maayos na mediation o proseso sa hukuman.",
    proceduralStepsEn: [
      "Gather and secure all original contracts, receipts, messages, and factual timeline records.",
      "Initiate mediation before the Barangay Lupong Tagapamayapa if both parties reside in the same municipality.",
      "Consult licensed legal counsel or the Public Attorney's Office (PAO) for formal representation.",
    ],
    proceduralStepsTl: [
      "Ipunin ang lahat ng orihinal na kasulatan, resibo, palitan ng mensahe, at talaan ng mga pangyayari.",
      "Idulog sa Barangay Lupon para sa mapayapang pag-aayos kung parehong residente sa iisang lungsod.",
      "Sumangguni sa isang abogado o sa Public Attorney's Office (PAO) para sa pormal na tulong legal.",
    ],
    diagnosticQuestionsEn: [
      "What specific dispute or problem are you dealing with (employment, rent, debts, family, or online)?",
      "Do you currently have written agreements, messages, or receipts related to this matter?",
    ],
    diagnosticQuestionsTl: [
      "Tungkol po ba saan ang inyong partikular na suliranin (trabaho, upa, utang, pamilya, o online)?",
      "May hawak po ba kayong mga kasulatan, mensahe, o resibo kaugnay nito?",
    ],
    suggestedAction: { label: "Schedule Legal Consultation", actionType: "consult" },
  },
};

// ----------------------------------------------------------------------
// 2. PARSER & SEMANTIC SLOT EXTRACTOR
// ----------------------------------------------------------------------

interface SemanticSlots {
  subjectName?: string;
  role: "tenant" | "landlord" | "employer" | "employee" | "borrower" | "creditor" | "spouse" | "counterparty";
  actionPredicate: string;
  categoryKey: string;
  isTagalogLang: boolean;
}

const STOP_TOKENS = new Set([
  "i", "me", "my", "you", "your", "he", "she", "we", "they", "it",
  "the", "a", "an", "is", "are", "was", "were", "be", "do", "does", "did",
  "not", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "if", "when", "why", "how", "what", "where", "who", "which", "then",
  "si", "ni", "kay", "ang", "ng", "sa", "mga", "may", "wala", "ko", "mo",
  "can", "could", "would", "should", "will", "please", "help", "hello", "hi"
]);

function detectLanguage(text: string): boolean {
  const lower = text.toLowerCase();
  const markers = ["ano", "paano", "bakit", "saan", "sino", "kailan", "po", "opo", "ko", "mo", "ako", "ikaw", "hindi", "ayaw", "upa", "utang", "sahod"];
  return markers.some((m) => lower.includes(m)) || lower.includes("po") || lower.includes("opo");
}

function parseQuerySlots(query: string): SemanticSlots {
  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();
  const isTag = detectLanguage(query);

  let subjectName: string | undefined;

  // Extract name: "si Jay", "ni Jay", "kay Jay"
  const tagMatch = trimmed.match(/\b(?:si|ni|kay)\s+([A-Za-z]{2,15})\b/i);
  if (tagMatch && !STOP_TOKENS.has(tagMatch[1].toLowerCase())) {
    subjectName = tagMatch[1].charAt(0).toUpperCase() + tagMatch[1].slice(1).toLowerCase();
  }

  // Extract name: "Jay not pay", "Jay didn't pay", "Jay refuses"
  if (!subjectName) {
    const engStartMatch = trimmed.match(/^([A-Za-z]{2,15})\s+(?:not\s+|did\s+not\s+|didn't\s+|refuses?\s+|wont\s+|won't\s+|is\s+not\s+|has\s+not\s+|fired\s+|tinanggal\s+|ayaw\s+|hindi\s+)/i);
    if (engStartMatch && !STOP_TOKENS.has(engStartMatch[1].toLowerCase())) {
      subjectName = engStartMatch[1].charAt(0).toUpperCase() + engStartMatch[1].slice(1).toLowerCase();
    }
  }

  // Determine category key and roles
  if (lower.includes("rent") || lower.includes("upa") || lower.includes("landlord") || lower.includes("tenant") || lower.includes("apartment") || lower.includes("evict")) {
    const isTenantDefaulting = lower.includes("not pay") || lower.includes("didn't pay") || lower.includes("hindi nagbayad") || lower.includes("ayaw magbayad") || lower.includes("arrear");
    return {
      subjectName,
      role: isTenantDefaulting ? "tenant" : "landlord",
      actionPredicate: isTenantDefaulting ? "defaulting on rent payments" : "eviction dispute",
      categoryKey: isTenantDefaulting ? "tenancy_default" : "tenancy_eviction_defense",
      isTagalogLang: isTag,
    };
  }

  if (lower.includes("tinanggal") || lower.includes("fired") || lower.includes("boss") || lower.includes("trabaho") || lower.includes("sahod") || lower.includes("13th month") || lower.includes("dole")) {
    return {
      subjectName,
      role: "employer",
      actionPredicate: "employment termination and compensation dispute",
      categoryKey: "labor_termination",
      isTagalogLang: isTag,
    };
  }

  if (lower.includes("utang") || lower.includes("loan") || lower.includes("lending") || lower.includes("ola") || lower.includes("singil") || lower.includes("shaming")) {
    return {
      subjectName,
      role: "creditor",
      actionPredicate: "unlawful loan collection and harassment",
      categoryKey: "debt_collection_harassment",
      isTagalogLang: isTag,
    };
  }

  return {
    subjectName,
    role: "counterparty",
    actionPredicate: "general legal dispute",
    categoryKey: "general_legal",
    isTagalogLang: isTag,
  };
}

// ----------------------------------------------------------------------
// 3. DYNAMIC PARAGRAPH COMPOSER (NLG ENGINE)
// ----------------------------------------------------------------------

/**
 * Dynamically composes Paragraph 1: Legal assessment connecting subject, action, and statute.
 */
function composeOpeningParagraph(slots: SemanticSlots, atom: LegalAtom): string {
  const { subjectName, actionPredicate, isTagalogLang } = slots;

  if (isTagalogLang) {
    const subjectClause = subjectName
      ? `kung saan si **${subjectName}** ay may usapin hinggil sa ${actionPredicate}`
      : `hinggil sa ${actionPredicate}`;
    return (
      `Tungkol po sa inyong suliranin ${subjectClause}, ` +
      `narito po ang komprehensibong pagsusuri sa ilalim ng **${atom.primaryStatute}** at ng umiiral na jurisprudence sa Pilipinas. ` +
      `Sa ilalim ng ating legal na balangkas, ang bawat karapatan at pananagutan ay may itinakdang proseso upang maiwasan ang pang-aabuso ng sinumang partido.`
    );
  }

  const subjectClause = subjectName
    ? `concerning **${subjectName}** and the issue of ${actionPredicate}`
    : `concerning ${actionPredicate}`;
  return (
    `Regarding your situation ${subjectClause}, ` +
    `Philippine statutory law under the **${atom.primaryStatute}** directly governs the rights, obligations, and lawful remedies available to you. ` +
    `Under our legal framework, all remedies must strictly adhere to constitutional due process rather than unilateral extrajudicial actions.`
  );
}

/**
 * Dynamically composes Paragraph 2: Statutory prohibitions, protections, and penal consequences.
 */
function composeProhibitionParagraph(slots: SemanticSlots, atom: LegalAtom): string {
  const { subjectName, isTagalogLang } = slots;
  const targetDescTl = subjectName ? `kay **${subjectName}**` : "sa kabilang partido";
  const targetDescEn = subjectName ? `against **${subjectName}**` : "against the other party";

  if (isTagalogLang) {
    const prohibitions = atom.prohibitionsTl.join(", ");
    return (
      `Mahalagang bigyang-diin na mahigpit na ipinagbabawal sa batas ang paggawa ng sariling hakbang laban ${targetDescTl}. ` +
      `Partikular, bawal ang mga sumusunod: ${prohibitions}. ` +
      `${atom.criminalWarningTl || ""} ` +
      `Ang sinumang lumabag dito ay maaaring managot sa ilalim ng batas kahit may lehitimo pa siyang karapatan laban ${targetDescTl}.`
    );
  }

  const prohibitions = atom.prohibitionsEn.join(", ");
  return (
    `It is imperative to underscore that Philippine jurisprudence strictly prohibits extrajudicial self-help enforcement ${targetDescEn}. ` +
    `Specifically, the law strictly proscribes: ${prohibitions}. ` +
    `${atom.criminalWarningEn || ""} ` +
    `Any party resorting to such measures exposes themselves to legal counter-action regardless of the underlying validity of their monetary or possessory claims ${targetDescEn}.`
  );
}

/**
 * Dynamically composes Paragraph 3: Procedural sequence and administrative/judicial remedies.
 */
function composeProcedureParagraph(slots: SemanticSlots, atom: LegalAtom): string {
  const { subjectName, isTagalogLang } = slots;
  const name = subjectName || (isTagalogLang ? "kabilang panig" : "the other party");
  const targetDescTl = subjectName ? `laban kay **${subjectName}**` : "sa inyong sitwasyon";
  const targetDescEn = subjectName ? `against **${subjectName}**` : "in your situation";

  if (isTagalogLang) {
    const step1 = atom.proceduralStepsTl[0].replace(/tenant|kumpanya|partido/gi, name);
    const step2 = atom.proceduralStepsTl[1] ? atom.proceduralStepsTl[1].replace(/tenant|kumpanya|partido/gi, name) : "";
    const step3 = atom.proceduralStepsTl[2] ? atom.proceduralStepsTl[2].replace(/tenant|kumpanya|partido/gi, name) : "";

    return (
      `Upang maipatupad ang inyong mga legal na karapatan ${targetDescTl} sa tamang kaparaanan, narito ang sunod-sunod na prosesong itinatadhana ng batas:\n` +
      `Una, ${step1}.\n` +
      `Pangalawa, ${step2}.\n` +
      `Pangatlo, kung patuloy pa ring mabigo ang maayos na kasunduan, ${step3}.`
    );
  }

  const step1 = atom.proceduralStepsEn[0].replace(/tenant|employer|counterparty/gi, name);
  const step2 = atom.proceduralStepsEn[1] ? atom.proceduralStepsEn[1].replace(/tenant|employer|counterparty/gi, name) : "";
  const step3 = atom.proceduralStepsEn[2] ? atom.proceduralStepsEn[2].replace(/tenant|employer|counterparty/gi, name) : "";

  return (
    `To enforce your substantive rights ${targetDescEn} through legitimate statutory channels, the law commands adherence to the following sequence:\n` +
    `First, ${step1}.\n` +
    `Second, ${step2}.\n` +
    `Third, should the matter remain unresolved, ${step3}.`
  );
}

/**
 * Dynamically composes Paragraph 4: Probing diagnostic questions referencing the subject.
 */
function composeDiagnosticParagraph(slots: SemanticSlots, atom: LegalAtom): string {
  const { subjectName, isTagalogLang } = slots;
  const targetDescTl = subjectName ? `kaugnay ni **${subjectName}**` : "sa inyong usapin";
  const targetDescEn = subjectName ? `regarding **${subjectName}**` : "regarding your dispute";

  if (isTagalogLang) {
    const q1 = atom.diagnosticQuestionsTl[0];
    const q2 = atom.diagnosticQuestionsTl[1] || "";
    return (
      `Upang matulungan ko po kayong makabuo ng pinaka-epektibong susunod na legal na hakbang ${targetDescTl}, nais ko pong linawin:\n` +
      `1. ${q1}\n` +
      `2. ${q2}`
    );
  }

  const q1 = atom.diagnosticQuestionsEn[0];
  const q2 = atom.diagnosticQuestionsEn[1] || "";
  return (
    `To assist you in formulating the most effective tactical legal strategy ${targetDescEn}, could you clarify:\n` +
    `1. ${q1}\n` +
    `2. ${q2}`
  );
}

// ----------------------------------------------------------------------
// 4. MAIN DISPATCHER
// ----------------------------------------------------------------------

export function getLocalAIResponse(
  query: string,
  _history: ChatHistoryItem[] = []
): AIResponse {
  const lower = query.toLowerCase().trim();
  const isTag = detectLanguage(query);

  // Check 1: Identity & capability questions (e.g., "who are you", "sino ka")
  const isIdentity = /^(who\s+are\s+you|what\s+are\s+you|what\s+is\s+your\s+name|sino\s+ka|ano\s+ka|anong\s+pangalan\s+mo|what\s+can\s+you\s+do|ano\s+kaya\s+mong\s+gawin)[\.!\?]*$/i.test(lower);
  if (isIdentity) {
    return {
      text: isTag
        ? "Ako po si Atty. Lexi, ang inyong dedikadong Philippine Legal AI Companion mula sa Lexora. " +
          "Binuo ako upang magbigay ng maagap, makabuluhan, at maaasahang gabay-legal batay sa Saligang Batas ng Pilipinas, Revised Penal Code, Labor Code, Civil Code, at iba pang umiiral na batas at jurisprudence.\n\n" +
          "Maaari ko po kayong tulungan sa mga usapin tulad ng:\n" +
          "• Usapin sa upa at tenancy (hal. hindi nagbabayad ng upa, banta ng eviction o pagpapalayas)\n" +
          "• Problema sa trabaho (hal. ilegal na pagkakatanggal, hindi binayarang 13th month o sahod)\n" +
          "• Panggigipit sa utang (hal. harassment ng Online Lending Apps, pananakot, at pamamahiya)\n" +
          "• Iba pang usaping sibil, kontrata, at mga hakbang sa Barangay Lupon.\n\n" +
          "Ano po ang kasalukuyang sitwasyon o katanungang legal na nais ninyong pag-usapan?"
        : "I am Atty. Lexi, your dedicated Philippine Legal AI Companion powered by Lexora. " +
          "I am designed to provide actionable, reliable, and legally sound guidance grounded in Philippine statutory law, the Civil Code, Labor Code, Revised Penal Code, and Supreme Court jurisprudence.\n\n" +
          "I can assist you with concerns including:\n" +
          "• Tenancy and lease disputes (e.g. non-payment of rent, unlawful eviction, utility cut-offs)\n" +
          "• Labor and employment matters (e.g. illegal dismissal, unpaid wages, DOLE procedures)\n" +
          "• Unlawful debt collection and harassment (e.g. OLA contact shaming, SEC violations)\n" +
          "• Civil disputes, contracts, demand letters, and Katarungang Pambarangay mediation.\n\n" +
          "How can I assist you with your legal concerns today?",
      citations: ["1987 Philippine Constitution", "Lexora Philippine Legal Companion"],
      suggestedAction: { label: isTag ? "Ikwento ang Problema" : "Discuss Your Case", actionType: "consult" },
    };
  }

  // Check 2: Conversational greetings (e.g., "hello", "hi", "good morning", "kumusta po")
  const greetingWords = ["hello", "hi", "hey", "kumusta", "kamusta", "musta", "good morning", "good afternoon", "good evening", "good day", "magandang araw", "magandang umaga", "magandang hapon", "magandang gabi"];
  const isGreetingPrefix = greetingWords.some((g) => lower.startsWith(g));
  const hasSubstantiveIssue =
    lower.includes("rent") || lower.includes("upa") ||
    lower.includes("utang") || lower.includes("loan") || lower.includes("singil") ||
    lower.includes("trabaho") || lower.includes("tinanggal") || lower.includes("fired") || lower.includes("sahod") || lower.includes("dole");

  if (isGreetingPrefix && !hasSubstantiveIssue) {
    return {
      text: isTag
        ? "Magandang araw po! Huwag po kayong mag-alala, nandito po ako bilang inyong personal na legal companion upang umalalay sa inyo. Naiintindihan ko na labis na nakakabahala ang humarap sa isang suliraning legal, ngunit bawat sitwasyon ay may kaukulang proteksyon at lunas sa ilalim ng ating mga batas sa Pilipinas.\n\n" +
          "Upang masimulan natin ang maayos at tumpak na pagsusuri ng inyong usapin, maaari niyo po bang ikwento sa akin kung ano ang eksaktong nangyari? Halimbawa, ito po ba ay may kinalaman sa:\n" +
          "1. Problema sa inuupahan o paupahan (hal. tenant na hindi nagbabayad, o landlord na nagbabantang magpalayas);\n" +
          "2. Usapin sa trabaho o sahod (hal. biglaang pagkakatanggal nang walang due process, o hindi binayarang sahod);\n" +
          "3. Panggigipit sa utang (hal. pamamahiya at pananakot ng loan apps o pautang); o\n" +
          "4. Iba pang usaping sibil, kontrata, o personal na alitan?\n\n" +
          "Ibahagi niyo po ang mga detalye, at isa-isa nating hihimayin ang inyong mga legal na karapatan at mga tamang susunod na hakbang."
        : "Hello and good day! Please know that you are in a safe, confidential space—I am here to guide and advise you as your Philippine legal companion. Legal challenges can feel overwhelming, but our laws provide clear rights, safeguards, and statutory remedies to protect your interests.\n\n" +
          "To help me provide you with an accurate legal assessment, could you share the details of your situation? For example, is your concern regarding:\n" +
          "1. Tenancy or rental property issues (e.g., a tenant who has stopped paying rent, or a landlord threatening eviction);\n" +
          "2. Employment or labor disputes (e.g., termination without due process, unpaid salary or separation pay);\n" +
          "3. Debt collection harassment (e.g., predatory online lending apps, threats, or public shaming); or\n" +
          "4. Other contractual or civil disputes?\n\n" +
          "Feel free to describe what happened in your own words, and we will formulate the appropriate legal strategy together.",
      citations: ["1987 Philippine Constitution", "Lexora Philippine Legal Companion"],
      suggestedAction: { label: isTag ? "Ikwento ang Problema" : "Describe Your Problem", actionType: "consult" },
    };
  }

  // Parse semantic slots (subject, predicate, role, category)
  const slots = parseQuerySlots(query);
  const atom = LEGAL_KNOWLEDGE_GRAPH[slots.categoryKey] || LEGAL_KNOWLEDGE_GRAPH.general_legal;

  // Synthesize paragraphs dynamically using linguistic composers
  const p1 = composeOpeningParagraph(slots, atom);
  const p2 = composeProhibitionParagraph(slots, atom);
  const p3 = composeProcedureParagraph(slots, atom);
  const p4 = composeDiagnosticParagraph(slots, atom);

  const fullText = `${p1}\n\n${p2}\n\n${p3}\n\n${p4}`;

  return {
    text: fullText,
    citations: atom.citations,
    suggestedAction: atom.suggestedAction,
  };
}
