/**
 * NotificationDetailModal component – Slide-up modal displaying full notification details, source, timestamp, and actions.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NOTIF_COLORS } from "../lib/constants";
import type { NotificationItem } from "../lib/types";

interface NotificationDetailModalProps {
  notification: NotificationItem | null;
  visible: boolean;
  onClose: () => void;
  onActionPress?: (notification: NotificationItem) => void;
}

export default function NotificationDetailModal({
  notification,
  visible,
  onClose,
  onActionPress,
}: NotificationDetailModalProps) {
  if (!notification) return null;

  const typeLabel =
    notification.type === "appointment"
      ? "Consultation Update"
      : notification.type === "message"
      ? "Direct Message"
      : notification.type === "system"
      ? "System Notice"
      : "Special Update";

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
          {/* Top drag handle */}
          <View style={styles.dragHandle} />

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={22} color={NOTIF_COLORS.textSecondary} />
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header: Icon, Type Badge & Timestamp */}
            <View style={styles.headerBox}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name={(notification.icon as any) || "notifications"}
                  size={32}
                  color={NOTIF_COLORS.primary}
                />
              </View>

              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{typeLabel}</Text>
              </View>

              <Text style={styles.title}>{notification.title}</Text>

              <View style={styles.timeRow}>
                <Ionicons name="time-outline" size={13} color={NOTIF_COLORS.textMuted} />
                <Text style={styles.timeText}>{notification.time}</Text>
                {notification.referenceNumber && (
                  <>
                    <View style={styles.dot} />
                    <Text style={styles.refText}>
                      Ref: {notification.referenceNumber}
                    </Text>
                  </>
                )}
              </View>
            </View>

            {/* Sender / Source Information */}
            {notification.senderOrSource && (
              <View style={styles.sourceBox}>
                <Ionicons name="shield-checkmark" size={15} color={NOTIF_COLORS.primary} />
                <Text style={styles.sourceLabel}>From:</Text>
                <Text style={styles.sourceValue}>{notification.senderOrSource}</Text>
              </View>
            )}

            {/* Full Notification Message Body */}
            <View style={styles.messageBox}>
              <Text style={styles.fullMessage}>
                {notification.fullMessage || notification.body}
              </Text>
            </View>

            {/* Extra Metadata Details (if present) */}
            {notification.metadata && (
              <View style={styles.metaBox}>
                <Text style={styles.metaSectionTitle}>Appointment Summary</Text>
                {notification.metadata.attorneyName && (
                  <View style={styles.metaRow}>
                    <Ionicons name="person-outline" size={15} color={NOTIF_COLORS.primary} />
                    <Text style={styles.metaKey}>Attorney:</Text>
                    <Text style={styles.metaVal}>{notification.metadata.attorneyName}</Text>
                  </View>
                )}
                {notification.metadata.date && (
                  <View style={styles.metaRow}>
                    <Ionicons name="calendar-outline" size={15} color={NOTIF_COLORS.primary} />
                    <Text style={styles.metaKey}>Date:</Text>
                    <Text style={styles.metaVal}>{notification.metadata.date}</Text>
                  </View>
                )}
                {notification.metadata.timeSlot && (
                  <View style={styles.metaRow}>
                    <Ionicons name="time-outline" size={15} color={NOTIF_COLORS.primary} />
                    <Text style={styles.metaKey}>Time:</Text>
                    <Text style={styles.metaVal}>{notification.metadata.timeSlot}</Text>
                  </View>
                )}
                {notification.metadata.location && (
                  <View style={styles.metaRow}>
                    <Ionicons name="location-outline" size={15} color={NOTIF_COLORS.primary} />
                    <Text style={styles.metaKey}>Channel:</Text>
                    <Text style={styles.metaVal}>{notification.metadata.location}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              {notification.actionLabel && (
                <TouchableOpacity
                  style={styles.primaryBtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    onClose();
                    onActionPress?.(notification);
                  }}
                >
                  <Ionicons name="arrow-forward-circle" size={18} color="#FFFFFF" />
                  <Text style={styles.primaryBtnText}>{notification.actionLabel}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.dismissBtn}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.dismissBtnText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
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
    position: "relative",
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
    paddingHorizontal: 22,
    paddingBottom: 36,
  },
  headerBox: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 16,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: NOTIF_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  typeBadge: {
    backgroundColor: "#F0F6FC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: NOTIF_COLORS.border,
    marginBottom: 8,
  },
  typeBadgeText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: NOTIF_COLORS.primaryDark,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: NOTIF_COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 25,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: NOTIF_COLORS.textMuted,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: NOTIF_COLORS.border,
    marginHorizontal: 4,
  },
  refText: {
    fontSize: 11.5,
    color: NOTIF_COLORS.textMuted,
    fontWeight: "500",
  },
  sourceBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: NOTIF_COLORS.surfaceCard,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: NOTIF_COLORS.border,
    marginBottom: 16,
  },
  sourceLabel: {
    fontSize: 12,
    color: NOTIF_COLORS.textMuted,
    fontWeight: "600",
  },
  sourceValue: {
    fontSize: 12.5,
    fontWeight: "700",
    color: NOTIF_COLORS.textPrimary,
    flex: 1,
  },
  messageBox: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 4,
    marginBottom: 16,
  },
  fullMessage: {
    fontSize: 14.5,
    lineHeight: 23,
    color: NOTIF_COLORS.textSecondary,
  },
  metaBox: {
    backgroundColor: NOTIF_COLORS.surfaceCard,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: NOTIF_COLORS.border,
    gap: 10,
    marginBottom: 20,
  },
  metaSectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: NOTIF_COLORS.textPrimary,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaKey: {
    fontSize: 12.5,
    color: NOTIF_COLORS.textMuted,
    fontWeight: "500",
    width: 60,
  },
  metaVal: {
    fontSize: 13,
    fontWeight: "600",
    color: NOTIF_COLORS.textPrimary,
    flex: 1,
  },
  actionContainer: {
    gap: 10,
    marginTop: 6,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: NOTIF_COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  dismissBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  dismissBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: NOTIF_COLORS.textMuted,
  },
});
