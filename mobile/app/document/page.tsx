/**
 * Document page – Upload, review, customize, and export legal templates and contracts.
 */
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DOCUMENT_TEMPLATES } from "./lib/templates";
import { DocumentTemplate } from "./lib/types";
import DocumentEditorModal from "./components/DocumentEditorModal";
import DocumentReviewModal from "./components/DocumentReviewModal";

interface DocumentPageProps {
  onBack: () => void;
}

const CATEGORIES = ["All", "Contracts", "Affidavits", "Notices", "Authorizations"] as const;

export default function DocumentPage({ onBack }: DocumentPageProps) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeEditorTemplate, setActiveEditorTemplate] = useState<DocumentTemplate | null>(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return DOCUMENT_TEMPLATES.filter((tpl) => {
      const matchesCategory =
        selectedCategory === "All" || tpl.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tpl.title.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q) ||
        tpl.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleOpenTemplateById = (templateId: string) => {
    const found = DOCUMENT_TEMPLATES.find((t) => t.id === templateId);
    if (found) {
      setActiveEditorTemplate(found);
    }
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
        <Text style={styles.headerTitle}>Legal Document Studio</Text>
        <TouchableOpacity
          style={styles.headerActionBtn}
          onPress={() => setIsReviewModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="shield-checkmark-outline" size={20} color="#5B9BD5" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, 24) + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Upload & AI Review Box */}
        <TouchableOpacity
          style={styles.uploadBox}
          activeOpacity={0.85}
          onPress={() => setIsReviewModalVisible(true)}
        >
          <View style={styles.uploadIcon}>
            <Ionicons name="cloud-upload-outline" size={32} color="#5B9BD5" />
          </View>
          <Text style={styles.uploadTitle}>Upload Document for AI Review</Text>
          <Text style={styles.uploadSubtitle}>
            Scan contracts, promissory notes, or leases for unfair clauses, usurious interest, or missing provisions under PH Law.
          </Text>
          <View style={styles.uploadBtn}>
            <Ionicons name="scan-outline" size={16} color="#FFFFFF" />
            <Text style={styles.uploadBtnText}>Review Document Now</Text>
          </View>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search templates (e.g. lease, affidavit, demand)..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isActive && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            Standard Legal Templates ({filteredTemplates.length})
          </Text>
          <Text style={styles.sectionSubtitle}>
            Customizable & ready to export to PDF or DOCS
          </Text>
        </View>

        {/* Templates List */}
        {filteredTemplates.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={40} color="#CBD5E1" />
            <Text style={styles.emptyStateTitle}>No templates found</Text>
            <Text style={styles.emptyStateDesc}>
              Try searching for a different keyword or category.
            </Text>
          </View>
        ) : (
          filteredTemplates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.templateCard}
              activeOpacity={0.75}
              onPress={() => setActiveEditorTemplate(template)}
            >
              <View style={styles.templateIconWrap}>
                <Ionicons
                  name={template.iconName as any}
                  size={24}
                  color="#5B9BD5"
                />
              </View>

              <View style={styles.templateInfo}>
                <View style={styles.templateTitleRow}>
                  <Text style={styles.templateName}>{template.title}</Text>
                </View>
                <Text style={styles.templateDesc} numberOfLines={2}>
                  {template.description}
                </Text>

                <View style={styles.tagsRow}>
                  <View style={styles.badgeCategory}>
                    <Text style={styles.badgeCategoryText}>{template.category}</Text>
                  </View>
                  {template.tags.slice(0, 2).map((tag, tIdx) => (
                    <View key={tIdx} style={styles.tagPill}>
                      <Text style={styles.tagPillText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.actionArrowWrap}>
                <View style={styles.editBadge}>
                  <Text style={styles.editBadgeText}>Edit</Text>
                  <Ionicons name="arrow-forward" size={13} color="#2B6CB0" />
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        {/* Notarial Information Notice */}
        <View style={styles.notarialNotice}>
          <Ionicons name="shield-outline" size={20} color="#5B9BD5" />
          <View style={{ flex: 1 }}>
            <Text style={styles.notarialNoticeTitle}>
              Philippine Notarial Advisory
            </Text>
            <Text style={styles.notarialNoticeDesc}>
              Contracts, Deeds of Sale, and Affidavits must be acknowledged before a commissioned Notary Public with competent evidence of identity (government ID) to have full legal effect as public instruments.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Document Editor Modal */}
      <DocumentEditorModal
        visible={activeEditorTemplate !== null}
        template={activeEditorTemplate}
        onClose={() => setActiveEditorTemplate(null)}
      />

      {/* AI Document Review Modal */}
      <DocumentReviewModal
        visible={isReviewModalVisible}
        onClose={() => setIsReviewModalVisible(false)}
        onOpenTemplate={handleOpenTemplateById}
      />
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
  headerActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EBF3FA",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: "#D8E6F5",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F4F8FC",
  },
  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EBF3FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  uploadSubtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
    lineHeight: 17,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#5B9BD5",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 12,
  },
  uploadBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: "#0F172A",
  },
  categoryScroll: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },
  categoryChipActive: {
    backgroundColor: "#EBF3FA",
    borderWidth: 1,
    borderColor: "#D8E6F5",
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  categoryChipTextActive: {
    color: "#2B6CB0",
    fontWeight: "700",
  },
  sectionHeaderRow: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  templateCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  templateIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EBF3FA",
    alignItems: "center",
    justifyContent: "center",
  },
  templateInfo: {
    flex: 1,
  },
  templateTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  templateName: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  templateDesc: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
    lineHeight: 16,
  },
  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  badgeCategory: {
    backgroundColor: "#EBF3FA",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeCategoryText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2B6CB0",
  },
  tagPill: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagPillText: {
    fontSize: 11,
    color: "#64748B",
  },
  actionArrowWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  editBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EBF3FA",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D8E6F5",
  },
  editBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2B6CB0",
  },
  emptyState: {
    paddingVertical: 36,
    alignItems: "center",
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
  },
  emptyStateDesc: {
    fontSize: 12.5,
    color: "#64748B",
  },
  notarialNotice: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    borderRadius: 14,
    marginTop: 4,
  },
  notarialNoticeTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
  },
  notarialNoticeDesc: {
    fontSize: 11.5,
    color: "#64748B",
    lineHeight: 16,
    marginTop: 2,
  },
});
