/**
 * BookingModal component – Allows user to schedule an in-person office visit, video, or phone consultation in Valenzuela.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CONSULTATION_COLORS, CONSULTATION_MODES } from "../lib/constants";
import type { AreaAttorney, BookingRequest } from "../lib/types";

interface BookingModalProps {
  attorney: AreaAttorney | null;
  visible: boolean;
  onClose: () => void;
  onConfirm: (request: BookingRequest) => void;
}

const AVAILABLE_DATES = ["Today", "Tomorrow", "Mon, Oct 19", "Tue, Oct 20"];
const AVAILABLE_TIMES = ["10:00 AM", "1:30 PM", "3:00 PM", "4:30 PM"];

export default function BookingModal({
  attorney,
  visible,
  onClose,
  onConfirm,
}: BookingModalProps) {
  const [selectedMode, setSelectedMode] = useState<"office" | "video" | "phone">("office");
  const [selectedDate, setSelectedDate] = useState(AVAILABLE_DATES[0]);
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_TIMES[0]);
  const [caseSummary, setCaseSummary] = useState("");

  if (!attorney) return null;

  const handleSubmit = () => {
    onConfirm({
      attorney,
      mode: selectedMode,
      date: selectedDate,
      timeSlot: selectedTime,
      caseSummary,
    });
  };

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
          <View style={styles.dragHandle} />

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={22} color={CONSULTATION_COLORS.textSecondary} />
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Attorney summary */}
            <View style={styles.attorneyBox}>
              <View style={styles.avatarMini}>
                <Ionicons name="person" size={24} color={CONSULTATION_COLORS.primary} />
              </View>
              <View style={styles.attorneyTexts}>
                <Text style={styles.attorneyName}>{attorney.name}</Text>
                <Text style={styles.attorneySpecialty}>{attorney.specialty}</Text>
                <Text style={styles.attorneyLocation}>
                  📍 {attorney.barangay}, {attorney.city}
                </Text>
              </View>
            </View>

            {/* Select Consultation Mode */}
            <Text style={styles.sectionTitle}>Select Consultation Format</Text>
            <View style={styles.modesRow}>
              {CONSULTATION_MODES.map((item) => {
                const isActive = selectedMode === item.id;
                const isSupported = attorney.supportedModes.includes(item.id as any);
                if (!isSupported) return null;

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.modeOption,
                      isActive && styles.modeOptionActive,
                    ]}
                    onPress={() => setSelectedMode(item.id as any)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={isActive ? "#FFFFFF" : CONSULTATION_COLORS.primary}
                    />
                    <Text
                      style={[
                        styles.modeOptionText,
                        isActive && styles.modeOptionTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Office location reminder if in-person */}
            {selectedMode === "office" && (
              <View style={styles.officeNote}>
                <Ionicons name="location" size={16} color={CONSULTATION_COLORS.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.officeNoteTitle}>Valenzuela Office Address:</Text>
                  <Text style={styles.officeNoteBody}>{attorney.officeAddress}</Text>
                </View>
              </View>
            )}

            {/* Date Selection */}
            <Text style={styles.sectionTitle}>Select Consultation Date</Text>
            <View style={styles.datesRow}>
              {AVAILABLE_DATES.map((date) => {
                const isActive = selectedDate === date;
                return (
                  <TouchableOpacity
                    key={date}
                    style={[styles.dateChip, isActive && styles.dateChipActive]}
                    onPress={() => setSelectedDate(date)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dateChipText,
                        isActive && styles.dateChipTextActive,
                      ]}
                    >
                      {date}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Time Slot Selection */}
            <Text style={styles.sectionTitle}>Select Time Slot</Text>
            <View style={styles.timesRow}>
              {AVAILABLE_TIMES.map((time) => {
                const isActive = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    style={[styles.timeChip, isActive && styles.timeChipActive]}
                    onPress={() => setSelectedTime(time)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.timeChipText,
                        isActive && styles.timeChipTextActive,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Notes / Case Description */}
            <Text style={styles.sectionTitle}>Case Concern / Inquiries (Optional)</Text>
            <TextInput
              style={styles.summaryInput}
              placeholder="E.g., Seeking advice on labor contract termination or tenant rent dispute..."
              placeholderTextColor={CONSULTATION_COLORS.textMuted}
              multiline
              numberOfLines={3}
              value={caseSummary}
              onChangeText={setCaseSummary}
            />

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Confirm Consultation Request</Text>
            </TouchableOpacity>
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
    paddingBottom: 36,
  },
  attorneyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CONSULTATION_COLORS.surfaceCard,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
    marginBottom: 16,
    marginTop: 4,
  },
  avatarMini: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CONSULTATION_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  attorneyTexts: {
    flex: 1,
  },
  attorneyName: {
    fontSize: 15,
    fontWeight: "700",
    color: CONSULTATION_COLORS.textPrimary,
  },
  attorneySpecialty: {
    fontSize: 12,
    color: CONSULTATION_COLORS.primary,
    fontWeight: "600",
    marginTop: 1,
  },
  attorneyLocation: {
    fontSize: 11.5,
    color: CONSULTATION_COLORS.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: CONSULTATION_COLORS.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  modesRow: {
    flexDirection: "row",
    gap: 10,
  },
  modeOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: CONSULTATION_COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
  },
  modeOptionActive: {
    backgroundColor: CONSULTATION_COLORS.primary,
    borderColor: CONSULTATION_COLORS.primary,
  },
  modeOptionText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: CONSULTATION_COLORS.textPrimary,
  },
  modeOptionTextActive: {
    color: "#FFFFFF",
  },
  officeNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#F0F9FF",
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  officeNoteTitle: {
    fontSize: 11.5,
    fontWeight: "700",
    color: CONSULTATION_COLORS.primaryDark,
  },
  officeNoteBody: {
    fontSize: 11.5,
    color: "#334155",
    marginTop: 1,
  },
  datesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dateChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: CONSULTATION_COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
  },
  dateChipActive: {
    backgroundColor: CONSULTATION_COLORS.primaryLight,
    borderColor: CONSULTATION_COLORS.primary,
  },
  dateChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: CONSULTATION_COLORS.textSecondary,
  },
  dateChipTextActive: {
    color: CONSULTATION_COLORS.primaryDark,
  },
  timesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: CONSULTATION_COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
  },
  timeChipActive: {
    backgroundColor: CONSULTATION_COLORS.primaryLight,
    borderColor: CONSULTATION_COLORS.primary,
  },
  timeChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: CONSULTATION_COLORS.textSecondary,
  },
  timeChipTextActive: {
    color: CONSULTATION_COLORS.primaryDark,
  },
  summaryInput: {
    backgroundColor: CONSULTATION_COLORS.surfaceInput,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CONSULTATION_COLORS.border,
    padding: 12,
    fontSize: 13,
    color: CONSULTATION_COLORS.textPrimary,
    minHeight: 70,
    textAlignVertical: "top",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: CONSULTATION_COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
