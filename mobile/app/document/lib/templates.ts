import { DocumentTemplate } from "./types";

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: "lease-contract",
    title: "Contract of Lease (Residential)",
    category: "Contracts",
    description: "Standard Philippine residential lease agreement under RA 9653 (Rent Control Act).",
    iconName: "home-outline",
    tags: ["Rental", "Landlord", "Tenant", "Residential"],
    fields: [
      { key: "lessorName", label: "Lessor / Landlord Name", placeholder: "e.g. Juan Dela Cruz", defaultValue: "Juan Dela Cruz" },
      { key: "lessorAddress", label: "Lessor Address", placeholder: "e.g. 123 McArthur Hwy, Karuhatan, Valenzuela City", defaultValue: "123 McArthur Highway, Karuhatan, Valenzuela City" },
      { key: "lesseeName", label: "Lessee / Tenant Name", placeholder: "e.g. Maria Santos", defaultValue: "Maria Santos" },
      { key: "lesseeAddress", label: "Lessee Address", placeholder: "e.g. 45 Rizal St., Malinta, Valenzuela City", defaultValue: "45 Rizal St., Malinta, Valenzuela City" },
      { key: "propertyAddress", label: "Leased Property Address", placeholder: "e.g. Unit 4B, Sunrise Residences, Karuhatan, Valenzuela City", defaultValue: "Unit 4B, Sunrise Residences, Karuhatan, Valenzuela City" },
      { key: "monthlyRent", label: "Monthly Rental (PHP)", placeholder: "e.g. 15,000.00", defaultValue: "15,000.00" },
      { key: "depositAmount", label: "Security Deposit (PHP)", placeholder: "e.g. 30,000.00", defaultValue: "30,000.00" },
      { key: "leasePeriod", label: "Lease Duration", placeholder: "e.g. One (1) Year starting November 1, 2026", defaultValue: "One (1) Year starting November 1, 2026" },
      { key: "dateExecuted", label: "Date Executed", placeholder: "e.g. October 10, 2026", defaultValue: "October 10, 2026" },
    ],
    generateContent: (values) => `CONTRACT OF LEASE

KNOW ALL MEN BY THESE PRESENTS:

This CONTRACT OF LEASE is entered into this ${values.dateExecuted || "___ day of ________, 2026"} at Valenzuela City, Philippines, by and between:

${(values.lessorName || "____________________").toUpperCase()}, of legal age, Filipino, residing at ${values.lessorAddress || "____________________"}, hereinafter referred to as the "LESSOR";

- and -

${(values.lesseeName || "____________________").toUpperCase()}, of legal age, Filipino, residing at ${values.lesseeAddress || "____________________"}, hereinafter referred to as the "LESSEE".

WITNESSETH:

WHEREAS, the LESSOR is the absolute owner of that residential premises located at ${values.propertyAddress || "____________________"};

WHEREAS, the LESSEE desires to lease the aforementioned premises, and the LESSOR is willing to lease the same under the following terms and conditions:

1. TERM: The term of this lease shall be for a period of ${values.leasePeriod || "One (1) Year"}, renewable upon mutual written agreement of both parties at least thirty (30) days prior to expiration.

2. MONTHLY RENT: The agreed monthly rental fee is PHILIPPINE PESOS: ${values.monthlyRent || "__________"} (PHP ${values.monthlyRent || "__________"}), payable within the first five (5) days of each calendar month without necessity of demand.

3. ADVANCE & SECURITY DEPOSIT: Upon signing, the LESSEE shall deliver to the LESSOR the sum of PHP ${values.depositAmount || "__________"} equivalent to two (2) months security deposit. This deposit shall guarantee the full and faithful compliance of the LESSEE's obligations and shall be returned, net of unpaid utility charges or damage repairs, within thirty (30) days following termination.

4. PURPOSE & OCCUPANCY: The premises shall be used exclusively for private residential living. The LESSEE shall not sublease, assign, or mortgage the premises or any part thereof without prior written consent from the LESSOR.

5. UTILITIES: All charges for electricity, water, internet, and cable during the period of lease shall be exclusively for the account of the LESSEE.

6. REPAIRS AND MAINTENANCE: Minor repairs resulting from ordinary wear and tear shall be borne by the LESSEE. Major structural repairs not attributable to the fault or negligence of the LESSEE shall be the responsibility of the LESSOR.

7. TERMINATION & DEFAULT: In the event of default in payment of rent for two (2) consecutive months, or failure to remedy any breach within fifteen (15) days after written notice, the LESSOR shall have the right to declare this Contract terminated and re-enter the premises peacefully.

IN WITNESS WHEREOF, the parties have signed this Contract of Lease on the date and at the place first above written.


________________________________________          ________________________________________
${(values.lessorName || "LESSOR NAME").toUpperCase()}                                ${(values.lesseeName || "LESSEE NAME").toUpperCase()}
Lessor                                            Lessee


SIGNED IN THE PRESENCE OF:

________________________________________          ________________________________________
Witness 1                                         Witness 2

ACKNOWLEDGMENT

REPUBLIC OF THE PHILIPPINES)
CITY OF VALENZUELA         ) S.S.

BEFORE ME, a Notary Public for and in the City of Valenzuela, this ${values.dateExecuted || "___ day of ________, 2026"}, personally appeared the above-named parties who showed their competent evidence of identity, known to me to be the same persons who executed the foregoing Contract of Lease and acknowledged that the same is their free and voluntary act and deed.

Doc. No. ____;
Page No. ____;
Book No. ____;
Series of 2026.`,
  },
  {
    id: "affidavit-loss",
    title: "Affidavit of Loss",
    category: "Affidavits",
    description: "Standard Philippine sworn statement for lost ID, ATM card, passport, or official certificate.",
    iconName: "document-text-outline",
    tags: ["Notarization", "Sworn Statement", "Lost Item", "ID Replacement"],
    fields: [
      { key: "affiantName", label: "Affiant Full Name", placeholder: "e.g. Juan Dela Cruz", defaultValue: "Juan Dela Cruz" },
      { key: "civilStatus", label: "Civil Status", placeholder: "e.g. Single / Married", defaultValue: "Single" },
      { key: "affiantAddress", label: "Address", placeholder: "e.g. 78 Gen. T. De Leon, Valenzuela City", defaultValue: "78 Gen. T. De Leon, Valenzuela City" },
      { key: "lostItemName", label: "Lost Document / Item", placeholder: "e.g. Driver's License / UMID Card / Land Title", defaultValue: "Philippine National ID (PhilID) card" },
      { key: "itemDetails", label: "Document / ID Number or Details", placeholder: "e.g. ID No. 1234-5678-9012 issued by PSA", defaultValue: "ID No. 1234-5678-9012 issued by PSA" },
      { key: "dateOfLoss", label: "Approximate Date of Loss", placeholder: "e.g. October 5, 2026", defaultValue: "October 5, 2026" },
      { key: "circumstancesOfLoss", label: "How It Was Lost", placeholder: "e.g. while commuting along McArthur Highway", defaultValue: "while commuting via jeepney along McArthur Highway, Valenzuela City, when my wallet accidentally slipped from my bag", multiline: true },
      { key: "dateExecuted", label: "Date Executed", placeholder: "e.g. October 10, 2026", defaultValue: "October 10, 2026" },
    ],
    generateContent: (values) => `REPUBLIC OF THE PHILIPPINES)
CITY OF VALENZUELA         ) S.S.

AFFIDAVIT OF LOSS

I, ${(values.affiantName || "____________________").toUpperCase()}, of legal age, Filipino, ${values.civilStatus || "Single"}, and a resident of ${values.affiantAddress || "____________________"}, after having been duly sworn to in accordance with law, depose and state that:

1. I am the lawful holder and owner of that certain ${values.lostItemName || "document/card"}, specifically: ${values.itemDetails || "____________________"};

2. Sometime on or about ${values.dateOfLoss || "____________________"}, the said ${values.lostItemName || "item"} was lost under the following circumstances:
${values.circumstancesOfLoss || "The item was misplaced and despite diligent search and effort, could not be found."};

3. Diligent and earnest efforts were exerted to locate and recover the aforementioned item, but all efforts proved futile, leading me to believe that the same is now beyond recovery;

4. The said item has not been confiscated by law enforcement authorities, nor surrendered as collateral for any debt or obligation, nor transferred to any third person;

5. I am executing this Affidavit under oath to attest to the truth of the foregoing facts and for the purpose of securing a replacement copy from the concerned agency, and for all other legal intents and purposes.

IN WITNESS WHEREOF, I have hereunto set my hand this ${values.dateExecuted || "___ day of ________, 2026"} at Valenzuela City, Philippines.


________________________________________
${(values.affiantName || "AFFIANT NAME").toUpperCase()}
Affiant


SUBSCRIBED AND SWORN to before me this ${values.dateExecuted || "___ day of ________, 2026"} at Valenzuela City, Philippines, affiant exhibiting to me competent evidence of identity.

Doc. No. ____;
Page No. ____;
Book No. ____;
Series of 2026.`,
  },
  {
    id: "demand-letter",
    title: "Formal Demand Letter",
    category: "Notices",
    description: "Legal demand letter for unpaid collection or compliance before filing legal action.",
    iconName: "mail-outline",
    tags: ["Collection", "Debt", "Breach", "Pre-litigation"],
    fields: [
      { key: "senderName", label: "Sender / Creditor Name", placeholder: "e.g. Atty. Juan Dela Cruz / ABC Enterprise", defaultValue: "Juan Dela Cruz" },
      { key: "senderAddress", label: "Sender Address", placeholder: "e.g. Karuhatan, Valenzuela City", defaultValue: "123 McArthur Highway, Karuhatan, Valenzuela City" },
      { key: "recipientName", label: "Recipient / Debtor Name", placeholder: "e.g. Pedro Penduko", defaultValue: "Pedro Penduko" },
      { key: "recipientAddress", label: "Recipient Address", placeholder: "e.g. Marulas, Valenzuela City", defaultValue: "45 MacArthur Highway, Marulas, Valenzuela City" },
      { key: "obligationDetails", label: "Subject of Demand / Obligation", placeholder: "e.g. Unpaid loan covered by Promissory Note", defaultValue: "unpaid loan obligation evidenced by Promissory Note dated August 15, 2026" },
      { key: "amountDue", label: "Total Amount Due (PHP)", placeholder: "e.g. 50,000.00", defaultValue: "50,000.00" },
      { key: "daysToComply", label: "Days to Comply", placeholder: "e.g. five (5) days", defaultValue: "five (5) days" },
      { key: "dateExecuted", label: "Letter Date", placeholder: "e.g. October 10, 2026", defaultValue: "October 10, 2026" },
    ],
    generateContent: (values) => `${values.dateExecuted || "October 10, 2026"}

DEMAND LETTER
(URGENT AND FINAL DEMAND)

To:
${(values.recipientName || "RECIPIENT NAME").toUpperCase()}
${values.recipientAddress || "Recipient Address"}

Re: FINAL DEMAND TO SETTLE OBLIGATION / PAYMENT

Dear Mr./Ms. ${values.recipientName || "Sir/Madam"}:

We write to you on behalf of ${values.senderName || "the undersigned"}, concerning your outstanding ${values.obligationDetails || "unpaid obligation"}.

Records and verifiable documents establish that despite repeated informal follow-ups, your account remains overdue and unsettled in the aggregate sum of:

     PHILIPPINE PESOS: ${values.amountDue || "0.00"} (PHP ${values.amountDue || "0.00"})

Your protracted failure to satisfy this liquidated and demandable obligation causes substantial prejudice and damages.

IN VIEW OF THE FOREGOING, DEMAND IS HEREBY FORMALLY MADE upon you to remit the full amount of PHP ${values.amountDue || "0.00"} within ${values.daysToComply || "five (5) days"} from receipt of this letter.

SHOULD YOU FAIL OR REFUSE to comply within the prescribed period, we shall be constrained to initiate appropriate civil, administrative, and/or criminal proceedings against you before the proper court of justice, including claims for legal interest, attorney's fees, and cost of litigation.

Please treat this matter with the urgency it strictly deserves. Remit payment directly or coordinate immediately to avoid public and costly litigation.


Respectfully yours,


________________________________________
${(values.senderName || "SENDER NAME").toUpperCase()}
Address: ${values.senderAddress || "Valenzuela City, Philippines"}`,
  },
  {
    id: "spa",
    title: "Special Power of Attorney (SPA)",
    category: "Authorizations",
    description: "Empowers an Attorney-in-Fact to represent, transact, or claim documents on your behalf.",
    iconName: "ribbon-outline",
    tags: ["Authorization", "Representative", "Agent", "Notarized"],
    fields: [
      { key: "principalName", label: "Principal (You)", placeholder: "e.g. Juan Dela Cruz", defaultValue: "Juan Dela Cruz" },
      { key: "principalAddress", label: "Principal Address", placeholder: "e.g. Valenzuela City", defaultValue: "Valenzuela City, Philippines" },
      { key: "attorneyInFactName", label: "Attorney-in-Fact (Representative)", placeholder: "e.g. Maria Santos", defaultValue: "Maria Santos" },
      { key: "attorneyInFactAddress", label: "Representative Address", placeholder: "e.g. Malinta, Valenzuela City", defaultValue: "Malinta, Valenzuela City, Philippines" },
      { key: "specificPowers", label: "Specific Authority Granted", placeholder: "e.g. To process, claim, and sign documents with the Registry of Deeds", defaultValue: "To transact, request, sign, execute, and receive certified copies of documents and titles before government and private institutions, particularly the City Government of Valenzuela, Bureau of Internal Revenue (BIR), and Registry of Deeds.", multiline: true },
      { key: "dateExecuted", label: "Date Executed", placeholder: "e.g. October 10, 2026", defaultValue: "October 10, 2026" },
    ],
    generateContent: (values) => `SPECIAL POWER OF ATTORNEY

KNOW ALL MEN BY THESE PRESENTS:

I, ${(values.principalName || "____________________").toUpperCase()}, of legal age, Filipino, residing at ${values.principalAddress || "____________________"}, do hereby NAME, CONSTITUTE, and APPOINT:

${(values.attorneyInFactName || "____________________").toUpperCase()}, of legal age, Filipino, residing at ${values.attorneyInFactAddress || "____________________"}, to be my true and lawful ATTORNEY-IN-FACT, for me and in my name, place, and stead, to perform the following specific acts:

${values.specificPowers || "1. To represent and act on my behalf in all matters concerning the subject transaction."}

HEREBY GIVING AND GRANTING unto my said Attorney-in-Fact full power and authority to do and perform any and every act requisite and necessary to be done in and about the premises, as fully to all intents and purposes as I might or could do if personally present, and hereby ratifying and confirming all that my said Attorney-in-Fact shall lawfully do or cause to be done by virtue of these presents.

IN WITNESS WHEREOF, I have hereunto set my hand this ${values.dateExecuted || "___ day of ________, 2026"} at Valenzuela City, Philippines.


________________________________________          ________________________________________
${(values.principalName || "PRINCIPAL NAME").toUpperCase()}                                ${(values.attorneyInFactName || "ATTORNEY-IN-FACT").toUpperCase()}
Principal                                         Attorney-in-Fact


SIGNED IN THE PRESENCE OF:

________________________________________          ________________________________________
Witness 1                                         Witness 2

ACKNOWLEDGMENT

REPUBLIC OF THE PHILIPPINES)
CITY OF VALENZUELA         ) S.S.

BEFORE ME, a Notary Public in the City of Valenzuela, personally appeared the parties with their valid government identification, known to me to be the same persons who executed this Special Power of Attorney, and they acknowledged that the same is their free and voluntary deed.

Doc. No. ____;
Page No. ____;
Book No. ____;
Series of 2026.`,
  },
  {
    id: "nda",
    title: "Non-Disclosure Agreement (NDA)",
    category: "Contracts",
    description: "Protects trade secrets, proprietary software, and confidential business disclosures.",
    iconName: "lock-closed-outline",
    tags: ["Confidentiality", "Business", "Startup", "IP"],
    fields: [
      { key: "disclosingParty", label: "Disclosing Party", placeholder: "e.g. Alpha Solutions Corp.", defaultValue: "Alpha Tech Solutions" },
      { key: "receivingParty", label: "Receiving Party", placeholder: "e.g. John Doe Consulting", defaultValue: "Juan Dela Cruz" },
      { key: "projectScope", label: "Project / Purpose of Disclosure", placeholder: "e.g. Software Development and Mobile Application Project", defaultValue: "Evaluation and collaboration regarding Lexora Legal Mobile Application architecture" },
      { key: "durationYears", label: "Confidentiality Term", placeholder: "e.g. Two (2) Years", defaultValue: "Two (2) Years" },
      { key: "dateExecuted", label: "Date Executed", placeholder: "e.g. October 10, 2026", defaultValue: "October 10, 2026" },
    ],
    generateContent: (values) => `MUTUAL NON-DISCLOSURE AGREEMENT

This MUTUAL NON-DISCLOSURE AGREEMENT is made and entered into this ${values.dateExecuted || "October 10, 2026"}, by and between:

${(values.disclosingParty || "DISCLOSING PARTY").toUpperCase()}, located at Valenzuela City, Philippines;

- and -

${(values.receivingParty || "RECEIVING PARTY").toUpperCase()}, located at Valenzuela City, Philippines.

1. PURPOSE: The parties wish to explore a potential business relationship concerning: ${values.projectScope || "Proprietary technology and legal operations"}. In connection with this purpose, confidential technical, financial, and proprietary information will be disclosed.

2. CONFIDENTIAL INFORMATION: Confidential Information includes, without limitation, source code, data, business models, client information, designs, and proprietary know-how disclosed directly or indirectly.

3. OBLIGATIONS: The Receiving Party agrees: (a) to hold all Confidential Information in strict trust and confidence; (b) not to disclose such information to any third party without prior written consent; and (c) to use the information solely for the Purpose described herein.

4. DURATION: The obligations of non-disclosure shall survive for a period of ${values.durationYears || "Two (2) Years"} following termination or disclosure.

5. GOVERNING LAW: This Agreement shall be governed by and construed under the laws of the Republic of the Philippines. Any disputes arising hereunder shall be submitted to the exclusive jurisdiction of the competent courts of Valenzuela City.

IN WITNESS WHEREOF, the authorized representatives have executed this Agreement as of the date first above written.


________________________________________          ________________________________________
${(values.disclosingParty || "DISCLOSING PARTY").toUpperCase()}                           ${(values.receivingParty || "RECEIVING PARTY").toUpperCase()}`,
  },
  {
    id: "deed-sale",
    title: "Deed of Absolute Sale (Motor Vehicle)",
    category: "Contracts",
    description: "Standard Philippine transfer of ownership for motor vehicles or personal property.",
    iconName: "car-outline",
    tags: ["Vehicle", "Transfer", "LTO", "Notarized"],
    fields: [
      { key: "vendorName", label: "Vendor / Seller Name", placeholder: "e.g. Juan Dela Cruz", defaultValue: "Juan Dela Cruz" },
      { key: "vendeeName", label: "Vendee / Buyer Name", placeholder: "e.g. Maria Santos", defaultValue: "Maria Santos" },
      { key: "vehicleMake", label: "Vehicle Make & Model", placeholder: "e.g. Toyota Vios 1.3E 2022", defaultValue: "Toyota Vios 1.3E (2022)" },
      { key: "plateNumber", label: "Plate Number", placeholder: "e.g. NBD 1234", defaultValue: "NBD 1234" },
      { key: "chassisNumber", label: "Chassis / VIN Number", placeholder: "e.g. MHFXB123456789", defaultValue: "MHFXB123456789" },
      { key: "engineNumber", label: "Engine Number", placeholder: "e.g. 1NZ-9876543", defaultValue: "1NZ-9876543" },
      { key: "purchasePrice", label: "Total Purchase Price (PHP)", placeholder: "e.g. 450,000.00", defaultValue: "450,000.00" },
      { key: "dateExecuted", label: "Date Executed", placeholder: "e.g. October 10, 2026", defaultValue: "October 10, 2026" },
    ],
    generateContent: (values) => `DEED OF ABSOLUTE SALE
(MOTOR VEHICLE)

KNOW ALL MEN BY THESE PRESENTS:

I, ${(values.vendorName || "____________________").toUpperCase()}, of legal age, Filipino, residing at Valenzuela City, for and in consideration of the sum of PHILIPPINE PESOS: ${values.purchasePrice || "__________"} (PHP ${values.purchasePrice || "__________"}), paid to my full satisfaction by:

${(values.vendeeName || "____________________").toUpperCase()}, of legal age, Filipino, residing at Valenzuela City,

DO HEREBY SELL, TRANSFER, AND CONVEY, by way of Absolute Sale, unto the said Vendee, his/her heirs and assigns, the following motor vehicle:

    MAKE / MODEL     : ${values.vehicleMake || "____________________"}
    PLATE NUMBER     : ${values.plateNumber || "____________________"}
    CHASSIS NUMBER   : ${values.chassisNumber || "____________________"}
    ENGINE NUMBER    : ${values.engineNumber || "____________________"}

I hereby warrant that I am the absolute legal owner of the said motor vehicle, and that the same is free and clear from any liens, mortgages, and encumbrances whatsoever.

IN WITNESS WHEREOF, we have hereunto signed this deed this ${values.dateExecuted || "October 10, 2026"} at Valenzuela City, Philippines.


________________________________________          ________________________________________
${(values.vendorName || "VENDOR / SELLER").toUpperCase()}                                 ${(values.vendeeName || "VENDEE / BUYER").toUpperCase()}
Vendor / Seller                                   Vendee / Buyer

ACKNOWLEDGMENT

REPUBLIC OF THE PHILIPPINES)
CITY OF VALENZUELA         ) S.S.

BEFORE ME, a Notary Public for Valenzuela City, personally appeared the parties known to me to be the same persons who executed this Deed of Absolute Sale, acknowledging the same as their free act.

Doc. No. ____;
Page No. ____;
Book No. ____;
Series of 2026.`,
  },
];
