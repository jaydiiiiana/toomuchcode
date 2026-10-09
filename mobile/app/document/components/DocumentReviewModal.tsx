import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DocumentReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onOpenTemplate: (templateId: string) => void;
}

const SAMPLE_DOCS = [
  {
    id: "sample-lease",
    title: "Apartment Lease Agreement (Sample Upload)",
    type: "Contract of Lease",
    score: 84,
    issuesCount: 2,
    summary:
      "Generally compliant with RA 9653 (Rent Control Act). Contains one unilateral penalty term and an ambiguous security deposit return clause.",
    clauses: [
      {
        title: "Clause 7: 10% Late Payment Surcharge per Week",
        status: "warning",
        desc: "Interest surcharge exceeds reasonable Philippine usury standards and may be held unconscionable by court.",
        fix: "Cap monthly late fees at 2-3% or reference standard bank legal interest rates.",
      },
      {
        title: "Clause 12: Landlord Forfeiture of Full Deposit",
        status: "warning",
        desc: "Automatic deposit forfeiture regardless of actual damage violates general principles of unjust enrichment.",
        fix: "Specify that deductions must be substantiated by itemized repair receipts within 30 days.",
      },
      {
        title: "Clause 4: 1-Year Fixed Term & Notice Period",
        status: "safe",
        desc: "Clear 30-day pre-termination notice requirement adhering to Civil Code guidelines.",
        fix: "No changes needed.",
      },
    ],
    recommendedTemplateId: "lease-contract",
  },
  {
    id: "sample-loan",
    title: "Online Lending App Agreement (Sample Upload)",
    type: "Promissory & Loan Agreement",
    score: 62,
    issuesCount: 4,
    summary:
      "High risk. Contains contacts harvesting permission, daily penalty rates exceeding SEC caps, and unilateral venue stipulations.",
    clauses: [
      {
        title: "Clause 3: 5% Compounding Interest Daily",
        status: "alert",
        desc: "Exorbitant and usurious under Supreme Court jurisprudence (Macalinao v. BPI). Void for being contrary to morals.",
        fix: "Demand interest recalculation at standard 6% to 12% per annum.",
      },
      {
        title: "Clause 8: Access to Phone Contacts for Debt Collection",
        status: "alert",
        desc: "Direct violation of RA 10173 (Data Privacy Act) and SEC Memorandum Circular No. 18.",
        fix: "Immediately report and revoke third-party app permissions.",
      },
    ],
    recommendedTemplateId: "demand-letter",
  },
];

export default function DocumentReviewModal({
  visible,
  onClose,
  onOpenTemplate,
}: DocumentReviewModalProps) {
  const insets = useSafeAreaInsets();
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const activeDoc = SAMPLE_DOCS[selectedDocIndex];

  const handleSimulateScan = (index: number) => {
    setIsScanning(true);
    setSelectedDocIndex(index);
    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.container,
          { paddingTop: Platform.OS === "android" ? insets.top : 12 },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={22} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>AI Legal Document Review</Text>
            <Text style={styles.headerSubtitle}>
              Philippine Jurisprudence & Statutory Check
            </Text>
          </View>

          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 24) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Sample Switcher Tabs */}
          <Text style={styles.sectionLabel}>Select Sample Document to Review:</Text>
          <View style={styles.samplePicker}>
            {SAMPLE_DOCS.map((doc, idx) => (
              <TouchableOpacity
                key={doc.id}
                style={[
                  styles.sampleBtn,
                  selectedDocIndex === idx && styles.sampleBtnActive,
                ]}
                onPress={() => handleSimulateScan(idx)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={idx === 0 ? "home-outline" : "cash-outline"}
                  size={16}
                  color={selectedDocIndex === idx ? "#2B6CB0" : "#64748B"}
                />
                <Text
                  style={[
                    styles.sampleBtnText,
                    selectedDocIndex === idx && styles.sampleBtnTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {idx === 0 ? "Lease Sample" : "Loan App Sample"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {isScanning ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#5B9BD5" />
              <Text style={styles.loadingText}>
                Analyzing clauses against Philippine Civil Code...
              </Text>
            </View>
          ) : (
            <>
              {/* Score Card */}
              <View style={styles.scoreCard}>
                <View style={styles.scoreLeft}>
                  <Text style={styles.scoreLabel}>Legal Safety Score</Text>
                  <Text style={styles.scoreDocTitle}>{activeDoc.title}</Text>
                  <Text style={styles.scoreDocType}>{activeDoc.type}</Text>
                </View>

                <View
                  style={[
                    styles.scoreBadge,
                    {
                      backgroundColor:
                        activeDoc.score >= 80 ? "#EBF3FA" : "#FEE2E2",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.scoreValue,
                      {
                        color: activeDoc.score >= 80 ? "#2B6CB0" : "#DC2626",
                      },
                    ]}
                  >
                    {activeDoc.score}
                  </Text>
                  <Text
                    style={[
                      styles.scoreMax,
                      {
                        color: activeDoc.score >= 80 ? "#2B6CB0" : "#DC2626",
                      },
                    ]}
                  >
                    /100
                  </Text>
                </View>
              </View>

              {/* Summary */}
              <View style={styles.summaryBox}>
                <Ionicons name="shield-checkmark" size={20} color="#5B9BD5" />
                <Text style={styles.summaryText}>{activeDoc.summary}</Text>
              </View>

              {/* Clause Findings */}
              <Text style={styles.sectionTitle}>
                Key Clause Findings ({activeDoc.clauses.length})
              </Text>

              {activeDoc.clauses.map((clause, cIdx) => (
                <View key={cIdx} style={styles.clauseCard}>
                  <View style={styles.clauseHeader}>
                    <View
                      style={[
                        styles.clauseBadge,
                        clause.status === "safe"
                          ? styles.badgeSafe
                          : clause.status === "warning"
                          ? styles.badgeWarning
                          : styles.badgeAlert,
                      ]}
                    >
                      <Text
                        style={[
                          styles.clauseBadgeText,
                          clause.status === "safe"
                            ? styles.textSafe
                            : clause.status === "warning"
                            ? styles.textWarning
                            : styles.textAlert,
                        ]}
                      >
                        {clause.status.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.clauseTitle}>{clause.title}</Text>
                  </View>

                  <Text style={styles.clauseDesc}>{clause.desc}</Text>

                  <View style={styles.clauseFixWrap}>
                    <Ionicons name="bulb-outline" size={15} color="#5B9BD5" />
                    <Text style={styles.clauseFixText}>
                      <Text style={{ fontWeight: "700" }}>Recommendation: </Text>
                      {clause.fix}
                    </Text>
                  </View>
                </View>
              ))}

              {/* Action to open clean template */}
              <TouchableOpacity
                style={styles.openTemplateCta}
                onPress={() => {
                  onClose();
                  onOpenTemplate(activeDoc.recommendedTemplateId);
                }}
                activeOpacity={0.85}
              >
                <Ionicons name="document-text-outline" size={18} color="#FFFFFF" />
                <Text style={styles.openTemplateCtaText}>
                  Open & Customize Clean Template Instead
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },
  samplePicker: {
    flexDirection: "row",
    gap: 10,
  },
  sampleBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sampleBtnActive: {
    backgroundColor: "#EBF3FA",
    borderColor: "#5B9BD5",
  },
  sampleBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  sampleBtnTextActive: {
    color: "#2B6CB0",
    fontWeight: "700",
  },
  loadingBox: {
    paddingVertical: 48,
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 13,
    color: "#64748B",
  },
  scoreCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D8E6F5",
  },
  scoreLeft: {
    flex: 1,
    paddingRight: 12,
  },
  scoreLabel: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#5B9BD5",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scoreDocTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 4,
  },
  scoreDocType: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  scoreBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: "800",
  },
  scoreMax: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: -2,
  },
  summaryBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#EBF3FA",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    padding: 14,
    borderRadius: 14,
  },
  summaryText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: "#1E293B",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 4,
  },
  clauseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  clauseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  clauseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeSafe: {
    backgroundColor: "#EBF3FA",
  },
  badgeWarning: {
    backgroundColor: "#FEF3C7",
  },
  badgeAlert: {
    backgroundColor: "#FEE2E2",
  },
  clauseBadgeText: {
    fontSize: 10,
    fontWeight: "800",
  },
  textSafe: {
    color: "#2B6CB0",
  },
  textWarning: {
    color: "#B45309",
  },
  textAlert: {
    color: "#B91C1C",
  },
  clauseTitle: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  clauseDesc: {
    fontSize: 12.5,
    lineHeight: 18,
    color: "#475569",
  },
  clauseFixWrap: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  clauseFixText: {
    flex: 1,
    fontSize: 12,
    color: "#334155",
    lineHeight: 17,
  },
  openTemplateCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#5B9BD5",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 8,
  },
  openTemplateCtaText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
