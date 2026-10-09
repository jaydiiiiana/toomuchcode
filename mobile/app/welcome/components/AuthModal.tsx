import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AUTH_MODAL_COPY, COLORS } from "../lib/constants";

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignUp: () => void;
}

export default function AuthModal({
  visible,
  onClose,
  onLogin,
  onSignUp,
}: AuthModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              {/* Drag Handle Indicator */}
              <View style={styles.handleContainer}>
                <View style={styles.handle} />
              </View>

              {/* Header with Title and Close Button */}
              <View style={styles.header}>
                <View style={styles.headerTextGroup}>
                  <Text style={styles.title}>{AUTH_MODAL_COPY.title}</Text>
                  <Text style={styles.subtitle}>{AUTH_MODAL_COPY.subtitle}</Text>
                </View>

                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeButton}
                  activeOpacity={0.7}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Ionicons name="close" size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Options */}
              <View style={styles.options}>
                {/* Log In Option */}
                <TouchableOpacity
                  style={styles.loginCard}
                  activeOpacity={0.88}
                  onPress={onLogin}
                >
                  <View style={styles.iconCirclePrimary}>
                    <Ionicons name="log-in-outline" size={22} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardTextGroup}>
                    <Text style={styles.loginTitle}>
                      {AUTH_MODAL_COPY.loginTitle}
                    </Text>
                    <Text style={styles.loginSubtitle}>
                      {AUTH_MODAL_COPY.loginSubtitle}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#FFFFFF"
                    style={styles.chevron}
                  />
                </TouchableOpacity>

                {/* Sign Up Option */}
                <TouchableOpacity
                  style={styles.signUpCard}
                  activeOpacity={0.88}
                  onPress={onSignUp}
                >
                  <View style={styles.iconCircleSecondary}>
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <View style={styles.cardTextGroup}>
                    <Text style={styles.signUpTitle}>
                      {AUTH_MODAL_COPY.signUpTitle}
                    </Text>
                    <Text style={styles.signUpSubtitle}>
                      {AUTH_MODAL_COPY.signUpSubtitle}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.textMuted}
                    style={styles.chevron}
                  />
                </TouchableOpacity>
              </View>

              {/* Disclaimer footer */}
              <Text style={styles.disclaimer}>{AUTH_MODAL_COPY.disclaimer}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 20,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 8,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 24,
  },
  headerTextGroup: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  options: {
    gap: 14,
    marginBottom: 20,
  },
  loginCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
  iconCirclePrimary: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  loginTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  loginSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.85)",
  },
  signUpCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircleSecondary: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  signUpTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  signUpSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  cardTextGroup: {
    flex: 1,
  },
  chevron: {
    marginLeft: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
  },
});
