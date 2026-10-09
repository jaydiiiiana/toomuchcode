import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface AttorneyContact {
  id: string;
  name: string;
  specialty: string;
  location: string;
  isOnline: boolean;
  avatarLetter: string;
}

const AVAILABLE_ATTORNEYS: AttorneyContact[] = [
  {
    id: "att-1",
    name: "Atty. Carlos Mendoza",
    specialty: "Labor Law & Civil Litigation",
    location: "Karuhatan, Valenzuela City",
    isOnline: true,
    avatarLetter: "CM",
  },
  {
    id: "att-2",
    name: "Atty. Elena Bautista-Santos",
    specialty: "Family & Property Contracts",
    location: "Dalandanan, Valenzuela City",
    isOnline: true,
    avatarLetter: "EB",
  },
  {
    id: "att-3",
    name: "Atty. Rafael Cruz",
    specialty: "Commercial Contracts & Lease",
    location: "Malinta, Valenzuela City",
    isOnline: false,
    avatarLetter: "RC",
  },
  {
    id: "att-4",
    name: "Atty. Jonathan Reyes",
    specialty: "Notarial Services & Affidavits",
    location: "Poblacion, Valenzuela City",
    isOnline: true,
    avatarLetter: "JR",
  },
];

interface SendToAttorneyModalProps {
  visible: boolean;
  documentTitle: string;
  documentText: string;
  onClose: () => void;
  onSentSuccess?: (attorneyName: string) => void;
}

export default function SendToAttorneyModal({
  visible,
  documentTitle,
  documentText,
  onClose,
  onSentSuccess,
}: SendToAttorneyModalProps) {
  const insets = useSafeAreaInsets();
  const [selectedAttorney, setSelectedAttorney] = useState<AttorneyContact>(
    AVAILABLE_ATTORNEYS[0]
  );
  const [messageNote, setMessageNote] = useState(
    `Attorney, please review this draft of "${documentTitle}". Let me know if there are any clauses that need revision before notarization.`
  );
  const [formatType, setFormatType] = useState<"pdf" | "docs">("pdf");
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        onClose();
        if (onSentSuccess) {
          onSentSuccess(selectedAttorney.name);
        }
      }, 1800);
    }, 1000);
  };

  const wordCount = documentText.split(/\s+/).filter(Boolean).length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.sheetContainer,
            { paddingBottom: Math.max(insets.bottom, 20) },
          ]}
        >
          {/* Header */}
          <View style={styles.sheetHeader}>
            <View>
              <Text style={styles.sheetTitle}>Send Document to Attorney</Text>
              <Text style={styles.sheetSubtitle}>
                Request formal legal review or notarial preparation
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {sentSuccess ? (
            <View style={styles.successState}>
              <View style={styles.successIconCircle}>
                <Ionicons name="checkmark-circle" size={54} color="#5B9BD5" />
              </View>
              <Text style={styles.successTitle}>Document Dispatched!</Text>
              <Text style={styles.successSubtitle}>
                "{documentTitle}" has been securely forwarded to{" "}
                <Text style={{ fontWeight: "700" }}>{selectedAttorney.name}</Text>.
                {"\n"}You will be notified once their legal review is ready.
              </Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={styles.scrollBody}
              showsVerticalScrollIndicator={false}
            >
              {/* Document Attachment Preview Card */}
              <View style={styles.attachmentCard}>
                <View style={styles.attachmentIconWrap}>
                  <Ionicons
                    name={formatType === "pdf" ? "document-text" : "newspaper"}
                    size={24}
                    color="#5B9BD5"
                  />
                </View>
                <View style={styles.attachmentDetails}>
                  <Text style={styles.attachmentTitle} numberOfLines={1}>
                    {documentTitle}
                  </Text>
                  <Text style={styles.attachmentMeta}>
                    Attachment • {formatType.toUpperCase()} Format • {wordCount} words
                  </Text>
                </View>
                <View style={styles.attachmentBadge}>
                  <Text style={styles.attachmentBadgeText}>Draft Ready</Text>
                </View>
              </View>

              {/* Format Selection */}
              <View style={styles.formatRow}>
                <Text style={styles.label}>Send Format:</Text>
                <View style={styles.formatPills}>
                  <TouchableOpacity
                    style={[
                      styles.formatPill,
                      formatType === "pdf" && styles.formatPillActive,
                    ]}
                    onPress={() => setFormatType("pdf")}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="document-outline"
                      size={14}
                      color={formatType === "pdf" ? "#2B6CB0" : "#64748B"}
                    />
                    <Text
                      style={[
                        styles.formatPillText,
                        formatType === "pdf" && styles.formatPillTextActive,
                      ]}
                    >
                      PDF
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.formatPill,
                      formatType === "docs" && styles.formatPillActive,
                    ]}
                    onPress={() => setFormatType("docs")}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="newspaper-outline"
                      size={14}
                      color={formatType === "docs" ? "#2B6CB0" : "#64748B"}
                    />
                    <Text
                      style={[
                        styles.formatPillText,
                        formatType === "docs" && styles.formatPillTextActive,
                      ]}
                    >
                      Word (.doc)
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Choose Attorney */}
              <Text style={styles.label}>Select Valenzuela Attorney:</Text>
              <View style={styles.attorneyList}>
                {AVAILABLE_ATTORNEYS.map((att) => {
                  const isSelected = selectedAttorney.id === att.id;
                  return (
                    <TouchableOpacity
                      key={att.id}
                      style={[
                        styles.attorneyCard,
                        isSelected && styles.attorneyCardSelected,
                      ]}
                      onPress={() => setSelectedAttorney(att)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.avatarWrap}>
                        <Text style={styles.avatarText}>{att.avatarLetter}</Text>
                        {att.isOnline && <View style={styles.onlineDot} />}
                      </View>

                      <View style={styles.attorneyInfo}>
                        <Text style={styles.attorneyName}>{att.name}</Text>
                        <Text style={styles.attorneySpecialty}>{att.specialty}</Text>
                        <Text style={styles.attorneyLocation}>
                          <Ionicons name="location-outline" size={11} color="#88A3C0" />{" "}
                          {att.location}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.radioCircle,
                          isSelected && styles.radioCircleSelected,
                        ]}
                      >
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Instructions / Notes for the Attorney */}
              <Text style={styles.label}>Note / Instructions for the Attorney:</Text>
              <TextInput
                style={styles.messageInput}
                value={messageNote}
                onChangeText={setMessageNote}
                placeholder="Include specific questions or instructions for the attorney..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSend}
                disabled={isSending}
                activeOpacity={0.85}
              >
                {isSending ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="paper-plane" size={18} color="#FFFFFF" />
                    <Text style={styles.sendButtonText}>
                      Send to {selectedAttorney.name.split(" ")[1] || "Attorney"}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    paddingTop: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  sheetSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollBody: {
    padding: 20,
    gap: 14,
  },
  attachmentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F8FC",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  attachmentIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EBF3FA",
    alignItems: "center",
    justifyContent: "center",
  },
  attachmentDetails: {
    flex: 1,
  },
  attachmentTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  attachmentMeta: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
  },
  attachmentBadge: {
    backgroundColor: "#EBF3FA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  attachmentBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2B6CB0",
  },
  formatRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
  },
  formatPills: {
    flexDirection: "row",
    gap: 8,
  },
  formatPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  formatPillActive: {
    backgroundColor: "#EBF3FA",
    borderColor: "#5B9BD5",
  },
  formatPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  formatPillTextActive: {
    color: "#2B6CB0",
    fontWeight: "700",
  },
  attorneyList: {
    gap: 10,
  },
  attorneyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  attorneyCardSelected: {
    backgroundColor: "#F4F8FC",
    borderColor: "#5B9BD5",
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#5B9BD5",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  attorneyInfo: {
    flex: 1,
  },
  attorneyName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  attorneySpecialty: {
    fontSize: 12,
    color: "#475569",
    marginTop: 1,
  },
  attorneyLocation: {
    fontSize: 11,
    color: "#88A3C0",
    marginTop: 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: "#5B9BD5",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5B9BD5",
  },
  messageInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    borderRadius: 12,
    padding: 12,
    fontSize: 13,
    color: "#0F172A",
    minHeight: 70,
  },
  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#5B9BD5",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 6,
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  successState: {
    padding: 32,
    alignItems: "center",
    gap: 12,
  },
  successIconCircle: {
    marginBottom: 6,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  successSubtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 19,
  },
});
