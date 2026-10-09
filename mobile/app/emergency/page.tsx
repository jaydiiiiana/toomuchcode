/**
 * Emergency page – Comprehensive Philippine Emergency & Legal Rights Directory.
 */
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
  Clipboard,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  PHILIPPINE_EMERGENCY_CONTACTS,
  EmergencyContact,
} from "./lib/contactsData";

interface EmergencyPageProps {
  onBack: () => void;
}

const CATEGORIES = [
  "All",
  "National",
  "Legal Aid",
  "Women & Kids",
  "Valenzuela",
  "Labor & Rights",
] as const;

export default function EmergencyPage({ onBack }: EmergencyPageProps) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isRightsModalVisible, setIsRightsModalVisible] = useState(false);

  // Search & category filter
  const filteredContacts = useMemo(() => {
    return PHILIPPINE_EMERGENCY_CONTACTS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.agency.toLowerCase().includes(q) ||
        item.number.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.coverage.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCall = (number: string) => {
    // Strip non-digits for tel URL except '+'
    const cleanNumber = number.replace(/[^\d+]/g, "");
    Linking.openURL(`tel:${cleanNumber}`).catch(() => {});
  };

  const handleCopy = (number: string, title: string) => {
    Clipboard.setString(number);
    setCopyFeedback(`Copied ${title} (${number})`);
    setTimeout(() => {
      setCopyFeedback(null);
    }, 2500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Philippine Emergency & Legal Hub</Text>
          <Text style={styles.headerSubtitle}>Official Hotlines & Citizen Rights</Text>
        </View>
        <TouchableOpacity
          style={styles.rightsIconBtn}
          onPress={() => setIsRightsModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="shield-checkmark" size={20} color="#2B6CB0" />
        </TouchableOpacity>
      </View>

      {/* Copy Toast Banner */}
      {copyFeedback && (
        <View style={styles.toastBanner}>
          <Ionicons name="checkmark-circle" size={16} color="#2B6CB0" />
          <Text style={styles.toastText} numberOfLines={1}>
            {copyFeedback}
          </Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, 24) + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Speed Dial Bar */}
        <View style={styles.speedDialContainer}>
          <TouchableOpacity
            style={[styles.speedDialBtn, styles.speedDial911]}
            onPress={() => handleCall("911")}
            activeOpacity={0.8}
          >
            <View style={styles.speedDialIconWrap}>
              <Ionicons name="call" size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.speedDialLabel}>E911 National</Text>
              <Text style={styles.speedDialSub}>Police • Fire • Medical</Text>
            </View>
            <Text style={styles.speedDialCallBadge}>911</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.speedDialBtn, styles.speedDialPao]}
            onPress={() => handleCall("(02) 8929-9436")}
            activeOpacity={0.8}
          >
            <View style={styles.speedDialIconWrap}>
              <Ionicons name="shield" size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.speedDialLabel}>PAO Inquest Legal Aid</Text>
              <Text style={styles.speedDialSub}>Free Arrest Counsel</Text>
            </View>
            <Text style={styles.speedDialCallBadge}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Know Your Rights Banner */}
        <TouchableOpacity
          style={styles.alertCard}
          onPress={() => setIsRightsModalVisible(true)}
          activeOpacity={0.85}
        >
          <View style={styles.alertHeaderRow}>
            <View style={styles.alertIconWrap}>
              <Ionicons name="scale-outline" size={22} color="#2B6CB0" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Philippine Miranda & Inquest Rights</Text>
              <Text style={styles.alertSubtitle}>
                Protected under Art. III, Sec. 12 of the 1987 PH Constitution
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#5B9BD5" />
          </View>
          <Text style={styles.alertBody}>
            • Right to remain silent • Right to independent counsel of choice • No torture or coerced confessions • Maximum inquest detention limits (Art. 125 RPC).
          </Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hotlines (e.g. 911, PAO, CHR, police, VAWC)..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isActive && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Verified Philippine Emergency Contacts ({filteredContacts.length})
          </Text>
          <Text style={styles.sectionSubtitle}>
            Tap "Call" to dial immediately, or tap copy to save number
          </Text>
        </View>

        {/* Emergency Contacts List */}
        {filteredContacts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="call-outline" size={38} color="#CBD5E1" />
            <Text style={styles.emptyStateTitle}>No hotlines found</Text>
            <Text style={styles.emptyStateDesc}>
              Try searching with another keyword or selecting "All".
            </Text>
          </View>
        ) : (
          filteredContacts.map((item) => (
            <View key={item.id} style={styles.contactCard}>
              <View style={styles.iconBox}>
                <Ionicons name={item.icon as any} size={22} color="#2B6CB0" />
              </View>

              <View style={styles.contactInfo}>
                <View style={styles.agencyBadgeRow}>
                  <Text style={styles.coverageText}>{item.coverage}</Text>
                  <View style={styles.hoursBadge}>
                    <Text style={styles.hoursBadgeText}>{item.availableHours}</Text>
                  </View>
                </View>

                <Text style={styles.contactTitle}>{item.title}</Text>
                <Text style={styles.agencyText}>{item.agency}</Text>

                <TouchableOpacity
                  style={styles.numberRow}
                  onPress={() => handleCopy(item.number, item.title)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.contactNumber}>{item.number}</Text>
                  <Ionicons name="copy-outline" size={13} color="#5B9BD5" />
                </TouchableOpacity>

                {item.tollFree && (
                  <Text style={styles.tollFreeText}>Alt / Mobile: {item.tollFree}</Text>
                )}

                <Text style={styles.contactDesc}>{item.desc}</Text>
              </View>

              {/* Call Button */}
              <TouchableOpacity
                style={styles.callBadge}
                onPress={() => handleCall(item.number)}
                activeOpacity={0.8}
              >
                <Ionicons name="call" size={15} color="#FFFFFF" />
                <Text style={styles.callText}>Call</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* Valenzuela City Police Advisory */}
        <View style={styles.localAdvisory}>
          <Ionicons name="location-outline" size={20} color="#5B9BD5" />
          <View style={{ flex: 1 }}>
            <Text style={styles.localAdvisoryTitle}>
              Valenzuela City 24/7 Police & Rescue Hotlines
            </Text>
            <Text style={styles.localAdvisoryBody}>
              For emergency dispatch within Karuhatan, Malanday, Malinta, Marulas, Gen. T. de Leon, and Poblacion, dial{" "}
              <Text style={{ fontWeight: "700", color: "#2B6CB0" }}>(02) 8352-5000</Text> or{" "}
              <Text style={{ fontWeight: "700", color: "#2B6CB0" }}>911</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Miranda Rights & Legal Advisory Modal */}
      <Modal
        visible={isRightsModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsRightsModalVisible(false)}
      >
        <View
          style={[
            styles.modalContainer,
            { paddingTop: insets.top || 16, paddingBottom: Math.max(insets.bottom, 20) },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Philippine Citizen Legal Rights</Text>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setIsRightsModalVisible(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={22} color="#0F172A" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalScroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.rightsSection}>
              <View style={styles.rightsSectionHeader}>
                <Ionicons name="shield-checkmark" size={20} color="#2B6CB0" />
                <Text style={styles.rightsSectionTitle}>
                  1. Miranda Rights (Art. III, Sec. 12, 1987 Constitution)
                </Text>
              </View>
              <Text style={styles.rightsText}>
                Any person under custodial investigation for the commission of an offense has the right:
                {"\n"}• To be informed of his right to remain silent;
                {"\n"}• To have competent and independent counsel preferably of his own choice. If the person cannot afford counsel, one must be provided by the State (Public Attorney's Office);
                {"\n"}• These rights cannot be waived except in writing and in the presence of counsel.
                {"\n"}• No torture, force, violence, threat, or intimidation shall be used against any person.
              </Text>
            </View>

            <View style={styles.rightsSection}>
              <View style={styles.rightsSectionHeader}>
                <Ionicons name="document-lock-outline" size={20} color="#2B6CB0" />
                <Text style={styles.rightsSectionTitle}>
                  2. Warrantless Arrest Limits (Rule 113, Sec. 5)
                </Text>
              </View>
              <Text style={styles.rightsText}>
                A peace officer or citizen may arrest without warrant ONLY when:
                {"\n"}1. <Text style={{ fontWeight: "700" }}>In Flagrante Delicto:</Text> The person is actually committing, has committed, or is attempting to commit an offense in their presence;
                {"\n"}2. <Text style={{ fontWeight: "700" }}>Hot Pursuit:</Text> An offense has just been committed, and there is probable cause based on personal knowledge of facts;
                {"\n"}3. <Text style={{ fontWeight: "700" }}>Escaped Prisoner:</Text> The person is an escaped convict or detainee.
              </Text>
            </View>

            <View style={styles.rightsSection}>
              <View style={styles.rightsSectionHeader}>
                <Ionicons name="time-outline" size={20} color="#2B6CB0" />
                <Text style={styles.rightsSectionTitle}>
                  3. Inquest Holding Periods (Article 125, Revised Penal Code)
                </Text>
              </View>
              <Text style={styles.rightsText}>
                Authorities must deliver arrested persons to the judicial authorities within:
                {"\n"}• <Text style={{ fontWeight: "700" }}>12 hours</Text> for light penalties;
                {"\n"}• <Text style={{ fontWeight: "700" }}>18 hours</Text> for correctional penalties;
                {"\n"}• <Text style={{ fontWeight: "700" }}>36 hours</Text> for afflictive/capital penalties.
                {"\n"}Detention beyond these periods without charges filed constitutes arbitrary detention under Philippine Law.
              </Text>
            </View>

            <View style={styles.rightsSection}>
              <View style={styles.rightsSectionHeader}>
                <Ionicons name="heart-outline" size={20} color="#2B6CB0" />
                <Text style={styles.rightsSectionTitle}>
                  4. Anti-VAWC Protection Orders (RA 9262)
                </Text>
              </View>
              <Text style={styles.rightsText}>
                Victims of domestic abuse, marital infidelity, or psychological harm have immediate access to:
                {"\n"}• <Text style={{ fontWeight: "700" }}>Barangay Protection Order (BPO):</Text> Issued within 24 hours by Punong Barangay, effective for 15 days;
                {"\n"}• <Text style={{ fontWeight: "700" }}>Temporary Protection Order (TPO):</Text> Issued ex parte by Family Court within the day.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.modalDismissBtn}
              onPress={() => setIsRightsModalVisible(false)}
              activeOpacity={0.85}
            >
              <Text style={styles.modalDismissBtnText}>Close Advisory</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 8,
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
  rightsIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EBF3FA",
    alignItems: "center",
    justifyContent: "center",
  },
  toastBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF3FA",
    borderBottomWidth: 1,
    borderBottomColor: "#D8E6F5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  toastText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2B6CB0",
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 14,
  },
  speedDialContainer: {
    flexDirection: "row",
    gap: 10,
  },
  speedDialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    gap: 10,
  },
  speedDial911: {
    backgroundColor: "#2B6CB0",
  },
  speedDialPao: {
    backgroundColor: "#5B9BD5",
  },
  speedDialIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  speedDialLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  speedDialSub: {
    fontSize: 10,
    color: "#EBF3FA",
    marginTop: 1,
  },
  speedDialCallBadge: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  alertCard: {
    backgroundColor: "#F4F8FC",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D8E6F5",
    gap: 8,
  },
  alertHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  alertIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EBF3FA",
    alignItems: "center",
    justifyContent: "center",
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  alertSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 1,
  },
  alertBody: {
    fontSize: 12,
    color: "#475569",
    lineHeight: 18,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: "#0F172A",
  },
  categoryScroll: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },
  categoryChipActive: {
    backgroundColor: "#EBF3FA",
    borderWidth: 1,
    borderColor: "#D8E6F5",
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  categoryChipTextActive: {
    color: "#2B6CB0",
    fontWeight: "700",
  },
  sectionHeaderRow: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  sectionSubtitle: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EBF3FA",
    alignItems: "center",
    justifyContent: "center",
  },
  contactInfo: {
    flex: 1,
  },
  agencyBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  coverageText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#5B9BD5",
    textTransform: "uppercase",
  },
  hoursBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  hoursBadgeText: {
    fontSize: 9.5,
    fontWeight: "600",
    color: "#64748B",
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  agencyText: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 1,
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  contactNumber: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#2B6CB0",
  },
  tollFreeText: {
    fontSize: 11,
    color: "#88A3C0",
    marginTop: 1,
  },
  contactDesc: {
    fontSize: 11.5,
    color: "#475569",
    marginTop: 4,
    lineHeight: 16,
  },
  callBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#2B6CB0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  callText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  emptyState: {
    paddingVertical: 36,
    alignItems: "center",
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
  },
  emptyStateDesc: {
    fontSize: 12,
    color: "#64748B",
  },
  localAdvisory: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    borderRadius: 14,
    marginTop: 6,
  },
  localAdvisoryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
  },
  localAdvisoryBody: {
    fontSize: 11.5,
    color: "#64748B",
    lineHeight: 16,
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  modalHeaderTitle: {
    fontSize: 16.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  modalCloseBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  modalScroll: {
    padding: 20,
    gap: 18,
  },
  rightsSection: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  rightsSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightsSectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
  },
  rightsText: {
    fontSize: 12.5,
    color: "#334155",
    lineHeight: 19,
  },
  modalDismissBtn: {
    backgroundColor: "#5B9BD5",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  modalDismissBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
