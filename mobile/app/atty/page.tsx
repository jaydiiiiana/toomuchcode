/**
 * Attorney Portal – Official Screen for Attorneys.
 * Per specifications: Provides Notifications ONLY and Profile tabs for attorneys.
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNotifications } from "../notif/hooks/useNotifications";
import NotifHeader from "../notif/components/NotifHeader";
import NotifRow from "../notif/components/NotifRow";
import NotificationDetailModal from "../notif/components/NotificationDetailModal";
import type { NotificationItem } from "../notif/lib/types";
import { useProfile } from "../profile/hooks/useProfile";
import ProfileCard from "../profile/components/ProfileCard";
import MenuItem from "../profile/components/MenuItem";
import { PROFILE_COLORS } from "../profile/lib/constants";
import { auth } from "../database/firebase";
import { getLocalProfile } from "../services/userProfileService";

interface AttyPageProps {
  onLogout: () => void;
  userEmail?: string;
}

export default function AttyPage({ onLogout, userEmail }: AttyPageProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"notif" | "profile">("notif");
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);
  const [isAvailableForClients, setIsAvailableForClients] = useState(true);
  const [attyData, setAttyData] = useState<{
    barRollNo?: string;
    ibpChapter?: string;
    specialization?: string;
    officeAddress?: string;
    status?: string;
  }>({});

  const { notifications, unreadCount, markAllRead, toggleRead } = useNotifications();
  const { user, loading: profileLoading, isOnline, refreshProfile } = useProfile();

  useEffect(() => {
    (async () => {
      const currentUid = auth.currentUser?.uid || user?.uid || userEmail || "current_user";
      const local = await getLocalProfile(currentUid);
      if (local) {
        setAttyData({
          barRollNo: local.barRollNo,
          ibpChapter: local.ibpChapter,
          specialization: local.specialization,
          officeAddress: local.officeAddress,
          status: local.attorneyStatus || "approved",
        });
      }
    })();
  }, [user, userEmail]);

  const isVerified =
    user?.role === "attorney" && (user?.attorneyStatus === "approved" || attyData.status === "approved");
  const isPending =
    user?.attorneyStatus === "pending" || attyData.status === "pending" || !isVerified;

  const handlePressNotif = (item: NotificationItem) => {
    if (!item.isRead) {
      toggleRead(item.id);
    }
    setSelectedNotif(item);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Attorney Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerTitleBox}>
          <View style={styles.roleTag}>
            <Ionicons name="briefcase" size={12} color="#FFFFFF" />
            <Text style={styles.roleTagText}>ATTORNEY PORTAL</Text>
          </View>
          <Text style={styles.attyName}>
            {user?.name ? (user.name.startsWith("Atty") ? user.name : `Atty. ${user.name}`) : "Attorney-at-Law"}
          </Text>
        </View>

        <View
          style={[
            styles.badgePill,
            isVerified ? styles.badgePillVerified : styles.badgePillPending,
          ]}
        >
          <Ionicons
            name={isVerified ? "shield-checkmark" : "hourglass-outline"}
            size={14}
            color={isVerified ? "#15803D" : "#B45309"}
          />
          <Text
            style={[
              styles.badgeText,
              isVerified ? styles.badgeTextVerified : styles.badgeTextPending,
            ]}
          >
            {isVerified ? "IBP VERIFIED" : "VERIFICATION PENDING"}
          </Text>
        </View>
      </View>

      {/* Pending Banner if waiting for Admin approval */}
      {isPending && (
        <View style={styles.pendingBanner}>
          <Ionicons name="time-outline" size={20} color="#D97706" />
          <View style={styles.pendingTextBox}>
            <Text style={styles.pendingTitle}>Credentials Under Administrator Review</Text>
            <Text style={styles.pendingBody}>
              Your Roll of Attorneys No. ({attyData.barRollNo || "submitted"}) and IBP credentials are being verified by the Lexora Legal Admin. You will receive a notification upon approval.
            </Text>
          </View>
        </View>
      )}

      {/* Main Tab Content: Notifications or Profile */}
      <View style={styles.content}>
        {activeTab === "notif" ? (
          <View style={styles.tabContentContainer}>
            <NotifHeader unreadCount={unreadCount} onMarkAllRead={markAllRead} />

            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NotifRow item={item} onPress={() => handlePressNotif(item)} />
              )}
              contentContainerStyle={styles.notifList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyNotifBox}>
                  <Ionicons name="notifications-outline" size={48} color="#94A3B8" />
                  <Text style={styles.emptyNotifTitle}>No New Notifications</Text>
                  <Text style={styles.emptyNotifBody}>
                    You will receive consultation bookings, verification updates, and case notices here.
                  </Text>
                </View>
              }
            />

            <NotificationDetailModal
              notification={selectedNotif}
              visible={!!selectedNotif}
              onClose={() => setSelectedNotif(null)}
            />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.profileScroll}
            showsVerticalScrollIndicator={false}
          >
            {/* Profile Card */}
            <ProfileCard user={user} loading={profileLoading} isOnline={isOnline} />

            {/* Attorney Credentials Card */}
            <View style={styles.credentialsCard}>
              <View style={styles.credentialsHeader}>
                <Ionicons name="ribbon-outline" size={20} color="#1E3A8A" />
                <Text style={styles.credentialsTitle}>Official Bar Credentials</Text>
              </View>

              <View style={styles.credRow}>
                <Text style={styles.credLabel}>Roll of Attorneys No.:</Text>
                <Text style={styles.credValueBold}>
                  {attyData.barRollNo ? `Roll No. ${attyData.barRollNo}` : "Registered"}
                </Text>
              </View>

              <View style={styles.credRow}>
                <Text style={styles.credLabel}>IBP Chapter:</Text>
                <Text style={styles.credValue}>
                  {attyData.ibpChapter || "IBP National Chapter"}
                </Text>
              </View>

              <View style={styles.credRow}>
                <Text style={styles.credLabel}>Primary Specialization:</Text>
                <Text style={styles.credValue}>
                  {attyData.specialization || "Civil & Constitutional Law"}
                </Text>
              </View>

              {attyData.officeAddress ? (
                <View style={styles.credRow}>
                  <Text style={styles.credLabel}>Office Address:</Text>
                  <Text style={styles.credValue}>{attyData.officeAddress}</Text>
                </View>
              ) : null}

              <View style={styles.credRow}>
                <Text style={styles.credLabel}>Verification Status:</Text>
                <Text
                  style={[
                    styles.credValueBold,
                    { color: isVerified ? "#15803D" : "#D97706" },
                  ]}
                >
                  {isVerified ? "Officially Verified" : "Pending Admin Review"}
                </Text>
              </View>
            </View>

            {/* Availability Toggle */}
            <View style={styles.availabilityCard}>
              <View style={styles.availTextBox}>
                <Text style={styles.availTitle}>Accept Client Consultations</Text>
                <Text style={styles.availSubtitle}>
                  Make your profile discoverable for appointments
                </Text>
              </View>
              <Switch
                value={isAvailableForClients}
                onValueChange={setIsAvailableForClients}
                trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
                thumbColor={isAvailableForClients ? "#1D4ED8" : "#F8FAFC"}
              />
            </View>

            {/* Quick Actions */}
            <View style={styles.menuCard}>
              <MenuItem
                item={{
                  icon: "calendar-outline",
                  label: "Consultation Appointments",
                  subtitle: "View scheduled legal sessions",
                  color: "#1E3A8A",
                  onPress: () =>
                    Alert.alert(
                      "Appointments",
                      "You have no pending client consultations today."
                    ),
                }}
              />
              <View style={styles.menuDivider} />
              <MenuItem
                item={{
                  icon: "document-text-outline",
                  label: "Legal Formalities & PTR",
                  subtitle: "Manage professional tax receipts & certificates",
                  color: "#0D9488",
                  onPress: () =>
                    Alert.alert("Legal Credentials", "All credentials are up to date."),
                }}
              />
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={onLogout}
              activeOpacity={0.8}
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={styles.logoutBtnText}>Log Out from Attorney Portal</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>Lexora Attorney Edition • v1.0.0</Text>
          </ScrollView>
        )}
      </View>

      {/* Bottom Bar: 2 Tabs ONLY (Notifications & Profile) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navTab, activeTab === "notif" && styles.navTabActive]}
          onPress={() => setActiveTab("notif")}
          activeOpacity={0.8}
        >
          <View style={styles.iconWithBadge}>
            <Ionicons
              name={activeTab === "notif" ? "notifications" : "notifications-outline"}
              size={24}
              color={activeTab === "notif" ? "#1E3A8A" : "#64748B"}
            />
            {unreadCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.navTabText,
              activeTab === "notif" && styles.navTabTextActive,
            ]}
          >
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navTab, activeTab === "profile" && styles.navTabActive]}
          onPress={() => setActiveTab("profile")}
          activeOpacity={0.8}
        >
          <Ionicons
            name={activeTab === "profile" ? "person" : "person-outline"}
            size={24}
            color={activeTab === "profile" ? "#1E3A8A" : "#64748B"}
          />
          <Text
            style={[
              styles.navTabText,
              activeTab === "profile" && styles.navTabTextActive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitleBox: {
    flex: 1,
  },
  roleTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#1E3A8A",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  roleTagText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  attyName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgePillVerified: {
    backgroundColor: "#DCFCE7",
  },
  badgePillPending: {
    backgroundColor: "#FEF3C7",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  badgeTextVerified: {
    color: "#15803D",
  },
  badgeTextPending: {
    color: "#B45309",
  },
  pendingBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#FFFBEB",
    borderBottomWidth: 1,
    borderBottomColor: "#FDE68A",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  pendingTextBox: {
    flex: 1,
  },
  pendingTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#92400E",
  },
  pendingBody: {
    fontSize: 12,
    color: "#B45309",
    marginTop: 2,
    lineHeight: 17,
  },
  content: {
    flex: 1,
  },
  tabContentContainer: {
    flex: 1,
  },
  notifList: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  emptyNotifBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyNotifTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 14,
  },
  emptyNotifBody: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
  profileScroll: {
    paddingBottom: 32,
  },
  credentialsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  credentialsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  credentialsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  credRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  credLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  credValue: {
    fontSize: 13,
    color: "#1E293B",
    fontWeight: "600",
  },
  credValueBold: {
    fontSize: 13,
    color: "#1E3A8A",
    fontWeight: "800",
  },
  availabilityCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  availTextBox: {
    flex: 1,
    paddingRight: 12,
  },
  availTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  availSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginLeft: 66,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#EF4444",
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 16,
  },
  bottomNav: {
    flexDirection: "row",
    height: 64,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  navTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  navTabActive: {
    borderTopWidth: 2,
    borderTopColor: "#1E3A8A",
  },
  navTabText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  navTabTextActive: {
    color: "#1E3A8A",
    fontWeight: "700",
  },
  iconWithBadge: {
    position: "relative",
  },
  notifBadge: {
    position: "absolute",
    top: -2,
    right: -6,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  notifBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
});
