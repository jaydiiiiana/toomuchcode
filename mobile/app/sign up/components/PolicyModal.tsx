import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  PRIVACY_POLICY_CONTENT,
  TERMS_OF_SERVICE_CONTENT,
} from "../lib/policyContent";
import { SIGNUP_COLORS } from "../lib/constants";

export type PolicyTab = "terms" | "privacy";

interface PolicyModalProps {
  visible: boolean;
  initialTab?: PolicyTab;
  onClose: () => void;
  onAccept?: () => void;
}

export default function PolicyModal({
  visible,
  initialTab = "terms",
  onClose,
  onAccept,
}: PolicyModalProps) {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const content =
    activeTab === "terms" ? TERMS_OF_SERVICE_CONTENT : PRIVACY_POLICY_CONTENT;
  const title =
    activeTab === "terms" ? "Terms of Service" : "Privacy Policy";

  const handleAccept = () => {
    if (onAccept) onAccept();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Background tap to dismiss */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Modal Container */}
        <View style={styles.container}>
          {/* Drag Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="close" size={20} color={SIGNUP_COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "terms" ? styles.activeTab : null,
              ]}
              activeOpacity={0.8}
              onPress={() => setActiveTab("terms")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "terms" ? styles.activeTabText : null,
                ]}
              >
                Terms of Service
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "privacy" ? styles.activeTab : null,
              ]}
              activeOpacity={0.8}
              onPress={() => setActiveTab("privacy")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "privacy" ? styles.activeTabText : null,
                ]}
              >
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>

          {/* Policy Body - smooth native scrolling */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            bounces={true}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.lastUpdated}>Last updated: October 2026</Text>

            {content.map((section, idx) => (
              <View key={idx} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionBody}>{section.content}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Footer Accept Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.acceptButton}
              activeOpacity={0.88}
              onPress={handleAccept}
            >
              <Text style={styles.acceptButtonText}>
                I Understand & Accept
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: "82%",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 6,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: SIGNUP_COLORS.textPrimary,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: SIGNUP_COLORS.textMuted,
  },
  activeTabText: {
    color: SIGNUP_COLORS.textPrimary,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
    marginBottom: 12,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  lastUpdated: {
    fontSize: 12,
    color: SIGNUP_COLORS.textMuted,
    marginBottom: 16,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: SIGNUP_COLORS.textPrimary,
    marginBottom: 6,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 22,
    color: SIGNUP_COLORS.textSecondary,
  },
  footer: {
    paddingTop: 8,
  },
  acceptButton: {
    backgroundColor: SIGNUP_COLORS.primary,
    borderRadius: 16,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
