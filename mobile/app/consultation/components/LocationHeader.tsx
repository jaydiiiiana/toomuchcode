/**
 * LocationHeader component – Header with current location badge, search input, and barangay filters.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  CONSULTATION_COLORS,
  VALENZUELA_BARANGAYS,
  SPECIALTY_FILTERS,
} from "../lib/constants";

interface LocationHeaderProps {
  onBack: () => void;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  selectedBarangay: string;
  onSelectBarangay: (barangay: string) => void;
  selectedSpecialty: string;
  onSelectSpecialty: (specialty: string) => void;
  filterAvailableOnly: boolean;
  onToggleAvailableOnly: () => void;
}

export default function LocationHeader({
  onBack,
  searchQuery,
  onChangeSearch,
  selectedBarangay,
  onSelectBarangay,
  selectedSpecialty,
  onSelectSpecialty,
  filterAvailableOnly,
  onToggleAvailableOnly,
}: LocationHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button & Detected Location */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={CONSULTATION_COLORS.textPrimary}
          />
        </TouchableOpacity>

        {/* Location Badge */}
        <View style={styles.locationPill}>
          <Ionicons name="location" size={15} color={CONSULTATION_COLORS.primary} />
          <View>
            <Text style={styles.locationCity}>Valenzuela City</Text>
            <Text style={styles.locationSub}>Metro Manila • GPS Detected</Text>
          </View>
        </View>

        {/* Available Filter Toggle */}
        <TouchableOpacity
          style={[
            styles.availableToggle,
            filterAvailableOnly && styles.availableToggleActive,
          ]}
          onPress={onToggleAvailableOnly}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.availableDot,
              filterAvailableOnly && styles.availableDotActive,
            ]}
          />
          <Text
            style={[
              styles.availableToggleText,
              filterAvailableOnly && styles.availableToggleTextActive,
            ]}
          >
            Available Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search-outline"
          size={18}
          color={CONSULTATION_COLORS.textMuted}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search attorneys in Valenzuela (e.g. Karuhatan, Labor)..."
          placeholderTextColor={CONSULTATION_COLORS.textMuted}
          value={searchQuery}
          onChangeText={onChangeSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeSearch("")}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={CONSULTATION_COLORS.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Barangay Horizontal Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
      >
        {VALENZUELA_BARANGAYS.map((brgy) => {
          const isActive = selectedBarangay === brgy;
          return (
            <TouchableOpacity
              key={brgy}
              style={[styles.brgyChip, isActive && styles.brgyChipActive]}
              onPress={() => onSelectBarangay(brgy)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.brgyChipText, isActive && styles.brgyChipTextActive]}
              >
                {brgy}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Practice Specialty Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.practiceScroll}
      >
        {SPECIALTY_FILTERS.map((spec) => {
          const isActive = selectedSpecialty === spec;
          return (
            <TouchableOpacity
              key={spec}
              style={[styles.specChip, isActive && styles.specChipActive]}
              onPress={() => onSelectSpecialty(spec)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.specChipText, isActive && styles.specChipTextActive]}
              >
                {spec}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSULTATION_COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: CONSULTATION_COLORS.border,
    paddingBottom: 8,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: CONSULTATION_COLORS.surfaceCard,
    alignItems: "center",
    justifyContent: "center",
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: CONSULTATION_COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  locationCity: {
    fontSize: 13.5,
    fontWeight: "700",
    color: CONSULTATION_COLORS.primaryDark,
  },
  locationSub: {
    fontSize: 10,
    color: CONSULTATION_COLORS.primary,
    fontWeight: "600",
  },
  availableToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: CONSULTATION_COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
  },
  availableToggleActive: {
    backgroundColor: CONSULTATION_COLORS.successLight,
    borderColor: "#A7F3D0",
  },
  availableDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: CONSULTATION_COLORS.textMuted,
  },
  availableDotActive: {
    backgroundColor: CONSULTATION_COLORS.success,
  },
  availableToggleText: {
    fontSize: 11,
    fontWeight: "600",
    color: CONSULTATION_COLORS.textSecondary,
  },
  availableToggleTextActive: {
    color: CONSULTATION_COLORS.success,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: CONSULTATION_COLORS.surfaceInput,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: CONSULTATION_COLORS.textPrimary,
    padding: 0,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 6,
    paddingBottom: 6,
  },
  brgyChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: CONSULTATION_COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
  },
  brgyChipActive: {
    backgroundColor: CONSULTATION_COLORS.primary,
    borderColor: CONSULTATION_COLORS.primary,
  },
  brgyChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: CONSULTATION_COLORS.textSecondary,
  },
  brgyChipTextActive: {
    color: "#FFFFFF",
  },
  practiceScroll: {
    paddingHorizontal: 16,
    gap: 6,
    paddingTop: 2,
  },
  specChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },
  specChipActive: {
    backgroundColor: CONSULTATION_COLORS.accentLight,
  },
  specChipText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: CONSULTATION_COLORS.textSecondary,
  },
  specChipTextActive: {
    color: CONSULTATION_COLORS.accent,
  },
});
