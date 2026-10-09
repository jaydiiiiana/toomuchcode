/**
 * Home tab – Dashboard with greeting, search, quick actions, categories, and featured attorneys.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MAIN_COLORS, LEGAL_CATEGORIES, FEATURED_ATTORNEYS } from "../lib/constants";
import type { AttorneyItem } from "../lib/constants";
import { QUICK_ACTIONS } from "../lib/mockData";

export default function HomeTab() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Good day! 👋</Text>
          <Text style={styles.userName}>Welcome to Lexora</Text>
        </View>
        <TouchableOpacity style={styles.headerAvatar}>
          <Ionicons name="person" size={20} color={MAIN_COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={MAIN_COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search attorneys, services..."
            placeholderTextColor={MAIN_COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={18} color={MAIN_COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: action.bgColor }]}
              activeOpacity={0.7}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + "1A" }]}>
                <Ionicons name={action.icon as any} size={22} color={action.color} />
              </View>
              <Text style={[styles.quickActionLabel, { color: action.color }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {LEGAL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  isActive && styles.categoryChipActive,
                ]}
                onPress={() => setActiveCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={16}
                  color={isActive ? "#FFFFFF" : MAIN_COLORS.textSecondary}
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    isActive && styles.categoryLabelActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Featured Attorneys */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Attorneys</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {FEATURED_ATTORNEYS.map((attorney) => (
          <AttorneyCard key={attorney.id} attorney={attorney} />
        ))}
      </View>
    </ScrollView>
  );
}

function AttorneyCard({ attorney }: { attorney: AttorneyItem }) {
  return (
    <TouchableOpacity style={styles.attorneyCard} activeOpacity={0.7}>
      <View style={styles.attorneyLeft}>
        <View style={styles.attorneyAvatar}>
          <Ionicons name="person" size={24} color={MAIN_COLORS.primary} />
        </View>
        {attorney.isAvailable && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.attorneyInfo}>
        <Text style={styles.attorneyName}>{attorney.name}</Text>
        <Text style={styles.attorneyTitle}>{attorney.title}</Text>
        <View style={styles.attorneyMeta}>
          <Ionicons name="star" size={13} color="#F59E0B" />
          <Text style={styles.attorneyRating}>
            {attorney.rating} ({attorney.reviewsCount})
          </Text>
          <View style={styles.metaDot} />
          <Text style={styles.attorneyExp}>{attorney.experienceYears} yrs</Text>
        </View>
      </View>
      <View style={styles.attorneyRight}>

        <View
          style={[
            styles.availBadge,
            { backgroundColor: attorney.isAvailable ? "#D1FAE5" : "#FEE2E2" },
          ]}
        >
          <Text
            style={[
              styles.availText,
              { color: attorney.isAvailable ? "#059669" : "#DC2626" },
            ]}
          >
            {attorney.isAvailable ? "Available" : "Busy"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLORS.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerLeft: {},
  greeting: {
    fontSize: 14,
    color: MAIN_COLORS.textMuted,
    fontWeight: "500",
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: MAIN_COLORS.textPrimary,
    marginTop: 2,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: MAIN_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: MAIN_COLORS.primary,
  },
  searchWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAIN_COLORS.surfaceInput,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: MAIN_COLORS.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: MAIN_COLORS.textPrimary,
    marginLeft: 10,
  },
  filterBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: MAIN_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: MAIN_COLORS.textPrimary,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: MAIN_COLORS.primary,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
  },
  quickActionCard: {
    width: "47%",
    flexGrow: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 100,
    justifyContent: "space-between",
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  categoriesRow: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MAIN_COLORS.surfaceInput,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: MAIN_COLORS.border,
  },
  categoryChipActive: {
    backgroundColor: MAIN_COLORS.primary,
    borderColor: MAIN_COLORS.primary,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: MAIN_COLORS.textSecondary,
  },
  categoryLabelActive: {
    color: "#FFFFFF",
  },
  attorneyCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: MAIN_COLORS.surfaceCard,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: MAIN_COLORS.border,
  },
  attorneyLeft: {
    position: "relative",
  },
  attorneyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: MAIN_COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: MAIN_COLORS.success,
    borderWidth: 2,
    borderColor: MAIN_COLORS.surface,
  },
  attorneyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  attorneyName: {
    fontSize: 15,
    fontWeight: "700",
    color: MAIN_COLORS.textPrimary,
  },
  attorneyTitle: {
    fontSize: 12,
    color: MAIN_COLORS.textMuted,
    marginTop: 1,
  },
  attorneyMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  attorneyRating: {
    fontSize: 12,
    fontWeight: "600",
    color: MAIN_COLORS.textSecondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: MAIN_COLORS.textMuted,
  },
  attorneyExp: {
    fontSize: 12,
    color: MAIN_COLORS.textMuted,
  },
  attorneyRight: {
    alignItems: "flex-end",
    gap: 6,
  },

  availBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  availText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
