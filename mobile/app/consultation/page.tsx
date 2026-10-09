/**
 * Consultation page – Location-based attorney discovery and booking in Valenzuela City.
 */
import React from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CONSULTATION_COLORS } from "./lib/constants";
import { useConsultation } from "./hooks/useConsultation";
import LocationHeader from "./components/LocationHeader";
import AreaAttorneyCard from "./components/AreaAttorneyCard";
import BookingModal from "./components/BookingModal";
import BookingSuccessModal from "./components/BookingSuccessModal";

interface ConsultationPageProps {
  onBack: () => void;
}

export default function ConsultationPage({ onBack }: ConsultationPageProps) {
  const insets = useSafeAreaInsets();
  const {
    searchQuery,
    setSearchQuery,
    selectedBarangay,
    setSelectedBarangay,
    selectedSpecialty,
    setSelectedSpecialty,
    filterAvailableOnly,
    setFilterAvailableOnly,
    filteredAttorneys,
    selectedAttorney,
    setSelectedAttorney,
    bookedSuccess,
    handleBook,
    dismissSuccess,
  } = useConsultation();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Location, Search & Filter Header */}
      <LocationHeader
        onBack={onBack}
        searchQuery={searchQuery}
        onChangeSearch={setSearchQuery}
        selectedBarangay={selectedBarangay}
        onSelectBarangay={setSelectedBarangay}
        selectedSpecialty={selectedSpecialty}
        onSelectSpecialty={setSelectedSpecialty}
        filterAvailableOnly={filterAvailableOnly}
        onToggleAvailableOnly={() =>
          setFilterAvailableOnly((prev) => !prev)
        }
      />

      {/* Results Count Banner */}
      <View style={styles.resultsBanner}>
        <View style={styles.resultsLeft}>
          <Ionicons name="people" size={15} color={CONSULTATION_COLORS.primary} />
          <Text style={styles.resultsCount}>
            {filteredAttorneys.length} Verified Attorneys Found
          </Text>
        </View>
        <Text style={styles.resultsSub}>Valenzuela & IBP CalMANA</Text>
      </View>

      {/* Attorneys List */}
      <FlatList
        data={filteredAttorneys}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AreaAttorneyCard
            attorney={item}
            onBook={() => setSelectedAttorney(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={54}
              color={CONSULTATION_COLORS.border}
            />
            <Text style={styles.emptyTitle}>No attorneys found</Text>
            <Text style={styles.emptySubtitle}>
              Try changing the barangay filter or clearing your search term.
            </Text>
            <TouchableOpacity
              style={styles.resetFiltersBtn}
              onPress={() => {
                setSearchQuery("");
                setSelectedBarangay("All Valenzuela");
                setSelectedSpecialty("All Practices");
                setFilterAvailableOnly(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.resetFiltersText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Booking Form Modal */}
      <BookingModal
        attorney={selectedAttorney}
        visible={!!selectedAttorney}
        onClose={() => setSelectedAttorney(null)}
        onConfirm={handleBook}
      />

      {/* Booking Confirmation Dialog */}
      <BookingSuccessModal
        request={bookedSuccess}
        visible={!!bookedSuccess}
        onDismiss={dismissSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  resultsBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#F1F5F9",
  },
  resultsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resultsCount: {
    fontSize: 12.5,
    fontWeight: "700",
    color: CONSULTATION_COLORS.textPrimary,
  },
  resultsSub: {
    fontSize: 11,
    color: CONSULTATION_COLORS.textMuted,
    fontWeight: "500",
  },
  listContent: {
    paddingVertical: 6,
    paddingBottom: 30,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: CONSULTATION_COLORS.textPrimary,
    marginTop: 14,
  },
  emptySubtitle: {
    fontSize: 13,
    color: CONSULTATION_COLORS.textMuted,
    textAlign: "center",
    marginTop: 4,
    lineHeight: 18,
  },
  resetFiltersBtn: {
    marginTop: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: CONSULTATION_COLORS.primaryLight,
  },
  resetFiltersText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: CONSULTATION_COLORS.primaryDark,
  },
});
