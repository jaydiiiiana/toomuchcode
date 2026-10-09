/**
 * BookingSuccessModal component – Confirmation dialog upon appointment booking.
 */
import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CONSULTATION_COLORS } from "../lib/constants";
import type { BookingRequest } from "../lib/types";

interface BookingSuccessModalProps {
  request: BookingRequest | null;
  visible: boolean;
  onDismiss: () => void;
}

export default function BookingSuccessModal({
  request,
  visible,
  onDismiss,
}: BookingSuccessModalProps) {
  if (!request) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-done" size={32} color={CONSULTATION_COLORS.primaryDark} />
          </View>

          <Text style={styles.title}>Consultation Requested!</Text>
          <Text style={styles.subtitle}>
            Your appointment has been sent to {request.attorney.name}.
          </Text>

          <View style={styles.detailsBox}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={16} color={CONSULTATION_COLORS.primary} />
              <Text style={styles.detailText}>
                {request.date} • {request.timeSlot}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons
                name={
                  request.mode === "office"
                    ? "business-outline"
                    : request.mode === "video"
                    ? "videocam-outline"
                    : "call-outline"
                }
                size={16}
                color={CONSULTATION_COLORS.primary}
              />
              <Text style={styles.detailText}>
                {request.mode === "office"
                  ? `Office Visit (${request.attorney.barangay}, Valenzuela)`
                  : request.mode === "video"
                  ? "Encrypted Video Call"
                  : "Private Phone Call"}
              </Text>
            </View>

            {request.mode === "office" && (
              <View style={styles.addressNotice}>
                <Text style={styles.addressNoticeText}>
                  📍 {request.attorney.officeAddress}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={onDismiss}
            activeOpacity={0.8}
          >
            <Text style={styles.doneBtnText}>Got it, Thank you!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: CONSULTATION_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: CONSULTATION_COLORS.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: CONSULTATION_COLORS.textSecondary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  detailsBox: {
    backgroundColor: CONSULTATION_COLORS.surfaceCard,
    borderRadius: 14,
    padding: 14,
    width: "100%",
    gap: 10,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    fontWeight: "600",
    color: CONSULTATION_COLORS.textPrimary,
  },
  addressNotice: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
    marginTop: 2,
  },
  addressNoticeText: {
    fontSize: 11.5,
    color: CONSULTATION_COLORS.textSecondary,
  },
  doneBtn: {
    backgroundColor: CONSULTATION_COLORS.primary,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  doneBtnText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
