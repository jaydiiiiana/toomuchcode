/**
 * Types for the Location-based Consultation screen.
 */

export interface AreaAttorney {
  id: string;
  name: string;
  title: string;
  officeAddress: string;
  barangay: string;
  city: string;
  distanceKm: number;
  specialty: string;
  category: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  ibpChapter: string;
  isAvailable: boolean;
  nextSlot: string;
  supportedModes: ("office" | "video" | "phone")[];
  about: string;
}

export interface BookingRequest {
  attorney: AreaAttorney;
  mode: "office" | "video" | "phone";
  date: string;
  timeSlot: string;
  caseSummary: string;
}
