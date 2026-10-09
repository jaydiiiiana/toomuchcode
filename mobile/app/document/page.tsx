/**
 * Document page – Upload, review, and manage legal contracts and forms.
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DocumentPageProps {
  onBack: () => void;
}

export default function DocumentPage({ onBack }: DocumentPageProps) {
  const insets = useSafeAreaInsets();

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
        <Text style={styles.headerTitle}>Document Review</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.uploadBox}>
          <View style={styles.uploadIcon}>
            <Ionicons name="cloud-upload-outline" size={36} color="#059669" />
          </View>
          <Text style={styles.uploadTitle}>Upload Legal Document</Text>
          <Text style={styles.uploadSubtitle}>
            Supported formats: PDF, DOCX, PNG (Contracts, Affidavits, Demand Letters)
          </Text>
          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
            <Ionicons name="add" size={18} color="#FFFFFF" />
            <Text style={styles.uploadBtnText}>Choose File</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Common Legal Document Templates</Text>

        <TouchableOpacity style={styles.templateCard} activeOpacity={0.7}>
          <Ionicons name="document-text-outline" size={24} color="#059669" />
          <View style={styles.templateInfo}>
            <Text style={styles.templateName}>Contract of Lease (Residential)</Text>
            <Text style={styles.templateDesc}>Standard Philippine rental agreement</Text>
          </View>
          <Ionicons name="download-outline" size={20} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.templateCard} activeOpacity={0.7}>
          <Ionicons name="document-text-outline" size={24} color="#059669" />
          <View style={styles.templateInfo}>
            <Text style={styles.templateName}>Affidavit of Loss</Text>
            <Text style={styles.templateDesc}>Notarization-ready template</Text>
          </View>
          <Ionicons name="download-outline" size={20} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.templateCard} activeOpacity={0.7}>
          <Ionicons name="document-text-outline" size={24} color="#059669" />
          <View style={styles.templateInfo}>
            <Text style={styles.templateName}>Formal Demand Letter</Text>
            <Text style={styles.templateDesc}>For collection of debt or notice to vacate</Text>
          </View>
          <Ionicons name="download-outline" size={20} color="#64748B" />
        </TouchableOpacity>
      </ScrollView>
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
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  content: {
    padding: 20,
    gap: 16,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: "#A7F3D0",
    borderStyle: "dashed",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#ECFDF5",
  },
  uploadIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  uploadSubtitle: {
    fontSize: 12.5,
    color: "#64748B",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#059669",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  uploadBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 8,
  },
  templateCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 14,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 14.5,
    fontWeight: "600",
    color: "#0F172A",
  },
  templateDesc: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
});
