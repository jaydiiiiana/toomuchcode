/**
 * Emergency page – Hotlines and immediate legal rights assistance (PNP, PAO, CHR, VAWC).
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface EmergencyPageProps {
  onBack: () => void;
}

const EMERGENCY_CONTACTS = [
  {
    title: "National Emergency Hotline",
    number: "911",
    desc: "Police, Fire, Medical, Rescue",
    icon: "call",
    color: "#DC2626",
    bg: "#FEE2E2",
  },
  {
    title: "Public Attorney's Office (PAO)",
    number: "(02) 8929-9436",
    desc: "Free legal representation for indigents & inquest",
    icon: "shield-checkmark",
    color: "#0284C7",
    bg: "#E0F2FE",
  },
  {
    title: "Commission on Human Rights (CHR)",
    number: "0920-509-9940",
    desc: "Arrest violations, illegal detention, human rights",
    icon: "hand-left",
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  {
    title: "PNP Women & Children Protection",
    number: "(02) 8532-6690",
    desc: "VAWC, domestic abuse, harassment hotline",
    icon: "heart",
    color: "#E11D48",
    bg: "#FFE4E6",
  },
];

export default function EmergencyPage({ onBack }: EmergencyPageProps) {
  const insets = useSafeAreaInsets();

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`).catch(() => {});
  };

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
        <Text style={styles.headerTitle}>Emergency Legal Help</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.alertCard}>
          <Ionicons name="warning" size={32} color="#DC2626" />
          <Text style={styles.alertTitle}>Know Your Miranda Rights</Text>
          <Text style={styles.alertBody}>
            If detained or questioned by authorities in the Philippines:
            {"\n"}• You have the right to remain silent.
            {"\n"}• You have the right to have competent, independent counsel of your own choice.
            {"\n"}• No torture, force, violence, or intimidation may be used against you.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Philippine Legal & Emergency Hotlines</Text>

        {EMERGENCY_CONTACTS.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.contactCard}
            onPress={() => handleCall(item.number)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>{item.title}</Text>
              <Text style={styles.contactNumber}>{item.number}</Text>
              <Text style={styles.contactDesc}>{item.desc}</Text>
            </View>
            <View style={styles.callBadge}>
              <Ionicons name="call" size={16} color="#059669" />
              <Text style={styles.callText}>Call</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  alertCard: {
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#991B1B",
    marginTop: 8,
    marginBottom: 6,
  },
  alertBody: {
    fontSize: 13,
    color: "#7F1D1D",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 8,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  contactNumber: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#0284C7",
    marginTop: 2,
  },
  contactDesc: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
  },
  callBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  callText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#059669",
  },
});
