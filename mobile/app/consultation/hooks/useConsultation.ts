/**
 * Hook to manage location-based attorney search, filters, and booking state.
 * Data is fetched from Firestore in real-time.
 */
import { useState, useMemo, useCallback, useEffect } from "react";
import type { AreaAttorney, BookingRequest } from "../lib/types";
import { saveConsultationBooking } from "../../database";
import {
  subscribeToAttorneys,
  saveConsultationToFirestore,
} from "../../services/firestoreAttorneyService";

export function useConsultation() {
  const [attorneys, setAttorneys] = useState<AreaAttorney[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("All Valenzuela");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Practices");
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);
  const [selectedAttorney, setSelectedAttorney] = useState<AreaAttorney | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState<BookingRequest | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAttorneys((updatedAttorneys) => {
      setAttorneys(updatedAttorneys);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filteredAttorneys = useMemo(() => {
    return attorneys.filter((att) => {
      // Barangay / Area filter
      if (
        selectedBarangay !== "All Valenzuela" &&
        att.barangay !== selectedBarangay
      ) {
        return false;
      }

      // Specialty filter
      if (
        selectedSpecialty !== "All Practices" &&
        att.category !== selectedSpecialty
      ) {
        return false;
      }

      // Available only filter
      if (filterAvailableOnly && !att.isAvailable) {
        return false;
      }

      // Search query filter (name, address, specialty)
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesName = att.name.toLowerCase().includes(query);
        const matchesAddress = att.officeAddress.toLowerCase().includes(query);
        const matchesSpecialty = att.specialty.toLowerCase().includes(query);
        const matchesBarangay = att.barangay.toLowerCase().includes(query);
        return matchesName || matchesAddress || matchesSpecialty || matchesBarangay;
      }

      return true;
    });
  }, [attorneys, searchQuery, selectedBarangay, selectedSpecialty, filterAvailableOnly]);

  const handleBook = useCallback(async (request: BookingRequest) => {
    try {
      await saveConsultationBooking(request);
      await saveConsultationToFirestore(request);
    } catch (err) {
      console.warn("Failed to persist booking:", err);
    }
    setSelectedAttorney(null);
    setBookedSuccess(request);
  }, []);

  const dismissSuccess = useCallback(() => {
    setBookedSuccess(null);
  }, []);

  return {
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
  };
}
