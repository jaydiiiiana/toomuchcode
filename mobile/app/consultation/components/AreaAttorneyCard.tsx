/**
 * AreaAttorneyCard component – Displays attorney details, distance, address, and consultation modes in Valenzuela.
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CONSULTATION_COLORS } from "../lib/constants";
import type { AreaAttorney } from "../lib/types";

interface AreaAttorneyCardProps {
  attorney: AreaAttorney;
  onBook: () => void;
}

export default function AreaAttorneyCard({
  attorney,
  onBook,
}: AreaAttorneyCardProps) {
  return (
    <View style={styles.card}>
      {/* Top Row: Avatar, Name, Availability */}
      <View style={styles.topRow}>
        <View style={styles.avatarBox}>
          <Ionicons
            name="person"
            size={26}
            color={CONSULTATION_COLORS.primary}
          />
          {attorney.isAvailable && <View style={styles.onlineBadge} />}
        </View>

        <View style={styles.infoBox}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{attorney.name}</Text>
          </View>
          <Text style={styles.title}>{attorney.title}</Text>

          {/* Rating and Reviews */}
          <View style={styles.metaRow}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingText}>{attorney.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>({attorney.reviewsCount} reviews)</Text>
            <View style={styles.dot} />
            <Text style={styles.expText}>{attorney.experienceYears} yrs exp</Text>
          </View>
        </View>
      </View>

      {/* Proximity & Office Address */}
      <View style={styles.addressBox}>
        <View style={styles.addressLine}>
          <Ionicons name="location" size={14} color={CONSULTATION_COLORS.primary} />
          <Text style={styles.distanceTag}>{attorney.distanceKm} km away</Text>
          <Text style={styles.brgyTag}>• {attorney.barangay}</Text>
        </View>
        <Text style={styles.fullAddress} numberOfLines={1}>
          {attorney.officeAddress}
        </Text>
      </View>

      {/* IBP Chapter & Next Slot */}
      <View style={styles.badgeRow}>
        <View style={styles.ibpBadge}>
          <Ionicons name="shield-checkmark" size={12} color={CONSULTATION_COLORS.primary} />
          <Text style={styles.ibpText}>{attorney.ibpChapter}</Text>
        </View>

        <View style={styles.slotBadge}>
          <Ionicons name="time-outline" size={12} color={CONSULTATION_COLORS.primary} />
          <Text style={styles.slotText}>{attorney.nextSlot}</Text>
        </View>
      </View>

      {/* Footer: Supported Modes & Book CTA */}
      <View style={styles.footerRow}>
        <View style={styles.modesRow}>
          {attorney.supportedModes.map((mode) => (
            <View key={mode} style={styles.modeChip}>
              <Ionicons
                name={
                  mode === "office"
                    ? "business"
                    : mode === "video"
                    ? "videocam"
                    : "call"
                }
                size={11}
                color={CONSULTATION_COLORS.textSecondary}
              />
              <Text style={styles.modeText}>
                {mode === "office"
                  ? "Office"
                  : mode === "video"
                  ? "Video"
                  : "Phone"}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={onBook}
          activeOpacity={0.8}
        >
          <Ionicons name="calendar" size={14} color="#FFFFFF" />
          <Text style={styles.bookBtnText}>Consult</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: CONSULTATION_COLORS.surface,
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: CONSULTATION_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    position: "relative",
  },
  onlineBadge: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: CONSULTATION_COLORS.primary,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  infoBox: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 15.5,
    fontWeight: "700",
    color: CONSULTATION_COLORS.textPrimary,
  },
  title: {
    fontSize: 12,
    color: CONSULTATION_COLORS.textSecondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  reviewsText: {
    fontSize: 11,
    color: CONSULTATION_COLORS.textMuted,
    marginLeft: 3,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 6,
  },
  expText: {
    fontSize: 11.5,
    color: CONSULTATION_COLORS.textSecondary,
    fontWeight: "500",
  },
  addressBox: {
    backgroundColor: CONSULTATION_COLORS.surfaceCard,
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
  },
  addressLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 3,
  },
  distanceTag: {
    fontSize: 12,
    fontWeight: "700",
    color: CONSULTATION_COLORS.primary,
  },
  brgyTag: {
    fontSize: 11.5,
    fontWeight: "600",
    color: CONSULTATION_COLORS.textSecondary,
  },
  fullAddress: {
    fontSize: 11.5,
    color: CONSULTATION_COLORS.textMuted,
    marginLeft: 18,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  ibpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: CONSULTATION_COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  ibpText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: CONSULTATION_COLORS.primaryDark,
  },
  slotBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F0F6FC",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
  },
  slotText: {
    fontSize: 10.5,
    fontWeight: "600",
    color: CONSULTATION_COLORS.primaryDark,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: CONSULTATION_COLORS.border,
  },
  modesRow: {
    flexDirection: "row",
    gap: 6,
  },
  modeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  modeText: {
    fontSize: 10.5,
    color: CONSULTATION_COLORS.textSecondary,
    fontWeight: "500",
  },
  bookBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: CONSULTATION_COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 10,
  },
  bookBtnText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
