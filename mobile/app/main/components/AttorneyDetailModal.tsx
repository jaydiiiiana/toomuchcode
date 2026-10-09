/**
 * AttorneyDetailModal component – Slide-up modal displaying comprehensive attorney profile, bio, credentials, and actions.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MAIN_COLORS, type AttorneyItem } from "../lib/constants";

interface AttorneyDetailModalProps {
  attorney: AttorneyItem | null;
  visible: boolean;
  onClose: () => void;
  onBookConsultation?: (attorney: AttorneyItem) => void;
  onSendMessage?: (attorney: AttorneyItem) => void;
}

export default function AttorneyDetailModal({
  attorney,
  visible,
  onClose,
  onBookConsultation,
  onSendMessage,
}: AttorneyDetailModalProps) {
  if (!attorney) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.sheetContainer}>
          {/* Top handle bar */}
          <View style={styles.dragHandle} />

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={22} color={MAIN_COLORS.textSecondary} />
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header info */}
            <View style={styles.headerCenter}>
              <View style={styles.avatarLarge}>
                <Ionicons name="person" size={42} color={MAIN_COLORS.primary} />
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                </View>
              </View>

              <Text style={styles.attorneyName}>{attorney.name}</Text>
              <Text style={styles.attorneyTitle}>{attorney.title}</Text>
              <Text style={styles.attorneySpecialty}>{attorney.specialty}</Text>

              <View
                style={[
                  styles.availBadge,
                  {
                    backgroundColor: attorney.isAvailable
                      ? MAIN_COLORS.primaryLight
                      : "#F1F5F9",
                  },
                ]}
              >
                <View
                  style={[
                    styles.availDot,
                    {
                      backgroundColor: attorney.isAvailable
                        ? MAIN_COLORS.primary
                        : MAIN_COLORS.textMuted,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.availText,
                    {
                      color: attorney.isAvailable
                        ? MAIN_COLORS.primaryDark
                        : MAIN_COLORS.textMuted,
                    },
                  ]}
                >
                  {attorney.isAvailable
                    ? "Available for Consultation"
                    : "Currently Busy"}
                </Text>
              </View>
            </View>

            {/* Quick Stats Grid */}
            <View style={styles.statsCard}>
              <View style={styles.statBox}>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={15} color="#F59E0B" />
                  <Text style={styles.statVal}>{attorney.rating}</Text>
                </View>
                <Text style={styles.statSub}>{attorney.reviewsCount} Reviews</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statBox}>
                <Text style={styles.statVal}>{attorney.experienceYears}+ yrs</Text>
                <Text style={styles.statSub}>Experience</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statBox}>
                <View style={styles.ratingRow}>
                  <Ionicons name="shield-checkmark" size={15} color="#059669" />
                  <Text style={styles.statVal}>Verified</Text>
                </View>
                <Text style={styles.statSub}>Philippine Bar</Text>
              </View>
            </View>

            {/* About Section */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="information-circle-outline" size={18} color={MAIN_COLORS.primary} />
                <Text style={styles.sectionTitle}>About {attorney.name.split(" ")[1] || "Attorney"}</Text>
              </View>
              <Text style={styles.aboutText}>{attorney.about}</Text>
            </View>

            {/* Areas of Expertise */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="ribbon-outline" size={18} color={MAIN_COLORS.primary} />
                <Text style={styles.sectionTitle}>Areas of Expertise</Text>
              </View>
              <View style={styles.chipsWrap}>
                {attorney.expertise.map((exp, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{exp}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Credentials & Location */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="school-outline" size={18} color={MAIN_COLORS.primary} />
                <Text style={styles.sectionTitle}>Education & Bar Credentials</Text>
              </View>

              <View style={styles.credentialCard}>
                <View style={styles.credentialItem}>
                  <Ionicons name="school" size={18} color={MAIN_COLORS.primary} />
                  <View style={styles.credentialItemText}>
                    <Text style={styles.credLabel}>Education</Text>
                    <Text style={styles.credValue}>{attorney.education}</Text>
                  </View>
                </View>

                <View style={styles.credDivider} />

                <View style={styles.credentialItem}>
                  <Ionicons name="shield" size={18} color={MAIN_COLORS.primary} />
                  <View style={styles.credentialItemText}>
                    <Text style={styles.credLabel}>Integrated Bar of the Philippines</Text>
                    <Text style={styles.credValue}>{attorney.ibpChapter}</Text>
                  </View>
                </View>

                <View style={styles.credDivider} />

                <View style={styles.credentialItem}>
                  <Ionicons name="location" size={18} color={MAIN_COLORS.primary} />
                  <View style={styles.credentialItemText}>
                    <Text style={styles.credLabel}>Office Location</Text>
                    <Text style={styles.credValue}>{attorney.location}</Text>
                  </View>
                </View>

                <View style={styles.credDivider} />

                <View style={styles.credentialItem}>
                  <Ionicons name="globe-outline" size={18} color={MAIN_COLORS.primary} />
                  <View style={styles.credentialItemText}>
                    <Text style={styles.credLabel}>Languages</Text>
                    <Text style={styles.credValue}>{attorney.languages.join(", ")}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.consultButton}
                activeOpacity={0.8}
                onPress={() => {
                  onClose();
                  onBookConsultation?.(attorney);
                }}
              >
                <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
                <Text style={styles.consultButtonText}>Book Consultation</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.messageButton}
                activeOpacity={0.7}
                onPress={() => {
                  onClose();
                  onSendMessage?.(attorney);
                }}
              >
                <Ionicons name="chatbubble-outline" size={18} color={MAIN_COLORS.primary} />
                <Text style={styles.messageButtonText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "85%",
    paddingTop: 12,
    position: "relative",
  },
  dragHandle: {
    width: 44,
    height: 5,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 8,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerCenter: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 16,
  },
  avatarLarge: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: MAIN_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 12,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: MAIN_COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  attorneyName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  attorneyTitle: {
    fontSize: 13.5,
    color: "#475569",
    marginTop: 3,
    textAlign: "center",
  },
  attorneySpecialty: {
    fontSize: 13,
    fontWeight: "600",
    color: MAIN_COLORS.primary,
    marginTop: 2,
    textAlign: "center",
  },
  availBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  availDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  availText: {
    fontSize: 12,
    fontWeight: "700",
  },
  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statVal: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  statSub: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#E2E8F0",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  aboutText: {
    fontSize: 13.5,
    lineHeight: 21,
    color: "#334155",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: MAIN_COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: MAIN_COLORS.border,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: MAIN_COLORS.primaryDark,
  },
  credentialCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  credentialItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  credentialItemText: {
    flex: 1,
  },
  credLabel: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#64748B",
  },
  credValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    marginTop: 1,
  },
  credDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  actionsContainer: {
    gap: 10,
    marginTop: 10,
  },
  consultButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: MAIN_COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
  },
  consultButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: MAIN_COLORS.primary,
    paddingVertical: 13,
    borderRadius: 14,
  },
  messageButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: MAIN_COLORS.primary,
  },
});
