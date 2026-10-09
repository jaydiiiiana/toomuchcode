/**
 * Admin Portal – Official Lexora Legal Administration & Attorney Verification Screen.
 * Allows Admin to review Roll of Attorneys credentials and verify/approve attorney applicants.
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AttorneyApplicationItem,
  subscribeToAttorneyApplications,
  verifyAndApproveAttorney,
  rejectAttorneyApplication,
} from "../services/attorneyApplicationService";

interface AdminPageProps {
  onLogout: () => void;
}

export default function AdminPage({ onLogout }: AdminPageProps) {
  const insets = useSafeAreaInsets();
  const [applications, setApplications] = useState<AttorneyApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "all">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToAttorneyApplications((apps) => {
      setApplications(apps);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const pendingApps = applications.filter((a) => a.status === "pending");
  const approvedApps = applications.filter((a) => a.status === "approved");

  const displayedApps = applications
    .filter((a) => {
      if (activeTab === "pending") return a.status === "pending";
      if (activeTab === "approved") return a.status === "approved";
      return true;
    })
    .filter((a) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.barRollNo.toLowerCase().includes(q) ||
        a.ibpChapter.toLowerCase().includes(q) ||
        a.specialization.toLowerCase().includes(q)
      );
    });

  const handleApprove = (app: AttorneyApplicationItem) => {
    Alert.alert(
      "Confirm Attorney Verification",
      `Are you sure you want to officially verify and approve ${app.name} (Bar Roll No. ${app.barRollNo}) as an Attorney?\n\nThis will activate their Attorney Portal and list them in the consultation directory.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Verify & Approve",
          style: "default",
          onPress: async () => {
            setProcessingId(app.id);
            try {
              await verifyAndApproveAttorney(app);
              Alert.alert(
                "Verification Success",
                `${app.name} has been officially verified! Their role is now updated to Attorney.`
              );
            } catch (err: any) {
              Alert.alert("Error", "Could not complete verification: " + err.message);
            } finally {
              setProcessingId(null);
            }
          },
        },
      ]
    );
  };

  const handleReject = (app: AttorneyApplicationItem) => {
    Alert.alert(
      "Reject Application",
      `Are you sure you want to reject the application for ${app.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: async () => {
            setProcessingId(app.id);
            try {
              await rejectAttorneyApplication(app.id);
              Alert.alert("Application Rejected", "The application has been marked rejected.");
            } catch (err: any) {
              Alert.alert("Error", "Could not reject application: " + err.message);
            } finally {
              setProcessingId(null);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.adminBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" />
            <Text style={styles.adminBadgeText}>ADMIN PORTAL</Text>
          </View>
          <Text style={styles.headerTitle}>Legal Administration</Text>
          <Text style={styles.headerSubtitle}>Philippine Bar Credentials Review</Text>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { borderColor: "#FCD34D", backgroundColor: "#FFFBEB" }]}>
          <Text style={[styles.metricCount, { color: "#D97706" }]}>{pendingApps.length}</Text>
          <Text style={styles.metricLabel}>Pending Verification</Text>
        </View>
        <View style={[styles.metricCard, { borderColor: "#86EFAC", backgroundColor: "#F0FDF4" }]}>
          <Text style={[styles.metricCount, { color: "#16A34A" }]}>{approvedApps.length}</Text>
          <Text style={styles.metricLabel}>Verified Attorneys</Text>
        </View>
        <View style={[styles.metricCard, { borderColor: "#BFDBFE", backgroundColor: "#EFF6FF" }]}>
          <Text style={[styles.metricCount, { color: "#2563EB" }]}>{applications.length}</Text>
          <Text style={styles.metricLabel}>Total Applications</Text>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, Bar Roll No., IBP chapter..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "pending" && styles.tabItemActive]}
          onPress={() => setActiveTab("pending")}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabItemText, activeTab === "pending" && styles.tabItemTextActive]}>
            Pending ({pendingApps.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === "approved" && styles.tabItemActive]}
          onPress={() => setActiveTab("approved")}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabItemText, activeTab === "approved" && styles.tabItemTextActive]}>
            Verified ({approvedApps.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === "all" && styles.tabItemActive]}
          onPress={() => setActiveTab("all")}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabItemText, activeTab === "all" && styles.tabItemTextActive]}>
            All ({applications.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Applications List */}
      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>Syncing attorney applications...</Text>
        </View>
      ) : (
        <FlatList
          data={displayedApps}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="checkmark-done-circle-outline" size={54} color="#94A3B8" />
              <Text style={styles.emptyTitle}>
                {activeTab === "pending"
                  ? "No pending attorney applications"
                  : "No applications found"}
              </Text>
              <Text style={styles.emptyBody}>
                {activeTab === "pending"
                  ? "All received Bar applications have been reviewed and processed."
                  : "Try checking another tab or adjust your search filter."}
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const isPending = item.status === "pending";
            const isApproved = item.status === "approved";
            const isProcessing = processingId === item.id;

            return (
              <View style={styles.card}>
                {/* Card Top: Name & Status */}
                <View style={styles.cardHeader}>
                  <View style={styles.cardNameRow}>
                    <Ionicons name="person-circle-outline" size={28} color="#1E3A8A" />
                    <View style={styles.nameContainer}>
                      <Text style={styles.applicantName}>{item.name}</Text>
                      <Text style={styles.applicantEmail}>{item.email}</Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.statusPill,
                      isPending && styles.statusPillPending,
                      isApproved && styles.statusPillApproved,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        isPending && styles.statusTextPending,
                        isApproved && styles.statusTextApproved,
                      ]}
                    >
                      {item.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* Details Grid */}
                <View style={styles.detailsGrid}>
                  <View style={styles.detailRow}>
                    <Ionicons name="shield-outline" size={16} color="#475569" style={styles.detailIcon} />
                    <Text style={styles.detailLabel}>Roll of Attorneys No.:</Text>
                    <Text style={styles.detailValueBold}>Roll No. {item.barRollNo}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="business-outline" size={16} color="#475569" style={styles.detailIcon} />
                    <Text style={styles.detailLabel}>IBP Chapter:</Text>
                    <Text style={styles.detailValue}>{item.ibpChapter}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="ribbon-outline" size={16} color="#475569" style={styles.detailIcon} />
                    <Text style={styles.detailLabel}>Specialization:</Text>
                    <Text style={styles.detailValue}>{item.specialization}</Text>
                  </View>

                  {item.phone ? (
                    <View style={styles.detailRow}>
                      <Ionicons name="call-outline" size={16} color="#475569" style={styles.detailIcon} />
                      <Text style={styles.detailLabel}>Phone:</Text>
                      <Text style={styles.detailValue}>{item.phone}</Text>
                    </View>
                  ) : null}

                  {item.officeAddress ? (
                    <View style={styles.detailRow}>
                      <Ionicons name="location-outline" size={16} color="#475569" style={styles.detailIcon} />
                      <Text style={styles.detailLabel}>Office:</Text>
                      <Text style={styles.detailValue}>{item.officeAddress}</Text>
                    </View>
                  ) : null}
                </View>

                {/* Action Buttons for Pending Applicants */}
                {isPending && (
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.rejectBtn}
                      activeOpacity={0.8}
                      onPress={() => handleReject(item)}
                      disabled={isProcessing}
                    >
                      <Ionicons name="close" size={18} color="#EF4444" />
                      <Text style={styles.rejectBtnText}>Reject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.approveBtn}
                      activeOpacity={0.85}
                      onPress={() => handleApprove(item)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                      ) : (
                        <>
                          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                          <Text style={styles.approveBtnText}>Verify & Approve</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                )}

                {/* Approved badge footer */}
                {isApproved && (
                  <View style={styles.approvedFooter}>
                    <Ionicons name="shield-checkmark" size={16} color="#16A34A" />
                    <Text style={styles.approvedFooterText}>
                      Officially Verified Attorney (Active in Consultation Directory)
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerLeft: {
    flex: 1,
  },
  adminBadge: {
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
  adminBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#EF4444",
  },
  metricsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  metricCard: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  metricCount: {
    fontSize: 20,
    fontWeight: "800",
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0F172A",
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 8,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#E2E8F0",
  },
  tabItemActive: {
    backgroundColor: "#1E3A8A",
  },
  tabItemText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },
  tabItemTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 14,
  },
  centerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loadingText: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 10,
  },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 12,
  },
  emptyBody: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  cardNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  nameContainer: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  applicantEmail: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 1,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
  },
  statusPillPending: {
    backgroundColor: "#FEF3C7",
  },
  statusPillApproved: {
    backgroundColor: "#DCFCE7",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#475569",
  },
  statusTextPending: {
    color: "#B45309",
  },
  statusTextApproved: {
    color: "#15803D",
  },
  detailsGrid: {
    gap: 6,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailIcon: {
    marginRight: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: "#64748B",
    marginRight: 6,
  },
  detailValue: {
    fontSize: 12,
    color: "#1E293B",
    fontWeight: "500",
    flex: 1,
  },
  detailValueBold: {
    fontSize: 12,
    color: "#1E3A8A",
    fontWeight: "800",
    flex: 1,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  rejectBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  rejectBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#EF4444",
  },
  approveBtn: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    shadowColor: "#16A34A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  approveBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  approvedFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F0FDF4",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  approvedFooterText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#15803D",
  },
});
