import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Clipboard,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DocumentTemplate } from "../lib/types";
import { exportToPdf, exportToDocs } from "../lib/documentExporter";
import SendToAttorneyModal from "./SendToAttorneyModal";

interface DocumentEditorModalProps {
  visible: boolean;
  template: DocumentTemplate | null;
  onClose: () => void;
}

type TabMode = "form" | "editor" | "preview";

export default function DocumentEditorModal({
  visible,
  template,
  onClose,
}: DocumentEditorModalProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabMode>("form");
  const [documentTitle, setDocumentTitle] = useState<string>("");
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [renameInput, setRenameInput] = useState<string>("");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [customText, setCustomText] = useState<string>("");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);
  const [isSendAttyModalVisible, setIsSendAttyModalVisible] = useState<boolean>(false);
  const [sentToastMessage, setSentToastMessage] = useState<string | null>(null);

  // Initialize form state whenever template changes
  useEffect(() => {
    if (template) {
      setDocumentTitle(template.title);
      const initial: Record<string, string> = {};
      template.fields.forEach((f) => {
        initial[f.key] = f.defaultValue;
      });
      setFormValues(initial);
      setCustomText(template.generateContent(initial));
      setActiveTab("form");
    }
  }, [template]);

  if (!template) return null;

  // Whenever form values change, update custom text if currently in form mode
  const handleFieldChange = (key: string, value: string) => {
    const updated = { ...formValues, [key]: value };
    setFormValues(updated);
    setCustomText(template.generateContent(updated));
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      await exportToPdf(documentTitle || template.title, customText);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDocs = async () => {
    setIsExporting(true);
    try {
      await exportToDocs(documentTitle || template.title, customText);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = () => {
    Clipboard.setString(customText);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleOpenRename = () => {
    setRenameInput(documentTitle || template.title);
    setIsRenaming(true);
  };

  const handleSaveRename = () => {
    const trimmed = renameInput.trim();
    if (trimmed) {
      setDocumentTitle(trimmed);
    }
    setIsRenaming(false);
  };

  const handleReset = () => {
    Alert.alert(
      "Reset Template",
      "Reset all fields and content back to the default template values?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            setDocumentTitle(template.title);
            const initial: Record<string, string> = {};
            template.fields.forEach((f) => {
              initial[f.key] = f.defaultValue;
            });
            setFormValues(initial);
            setCustomText(template.generateContent(initial));
          },
        },
      ]
    );
  };

  const handleAttorneySentSuccess = (attorneyName: string) => {
    setSentToastMessage(`Sent to ${attorneyName} for legal review!`);
    setTimeout(() => {
      setSentToastMessage(null);
    }, 4000);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { paddingTop: Platform.OS === "android" ? insets.top : 12 }]}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={22} color="#0F172A" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerTitleWrap}
            onPress={handleOpenRename}
            activeOpacity={0.7}
          >
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {documentTitle || template.title}
              </Text>
              <View style={styles.renamePencilWrap}>
                <Ionicons name="pencil" size={13} color="#2B6CB0" />
              </View>
            </View>
            <Text style={styles.headerSubtitle}>
              Tap to rename • {template.category} (PH Format)
            </Text>
          </TouchableOpacity>

          <View style={styles.headerActionsRight}>
            <TouchableOpacity
              style={[styles.headerIconBtn, styles.headerSendAttyBtn]}
              onPress={() => setIsSendAttyModalVisible(true)}
              activeOpacity={0.7}
            >
              <Ionicons name="paper-plane" size={16} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={handleReset}
              activeOpacity={0.7}
            >
              <Ionicons name="refresh-outline" size={18} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Success Feedback Toast Banner */}
        {sentToastMessage && (
          <View style={styles.toastBanner}>
            <Ionicons name="checkmark-circle" size={18} color="#2B6CB0" />
            <Text style={styles.toastText}>{sentToastMessage}</Text>
          </View>
        )}

        {/* Tab Switcher */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "form" && styles.tabBtnActive]}
            onPress={() => setActiveTab("form")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="create-outline"
              size={16}
              color={activeTab === "form" ? "#2B6CB0" : "#64748B"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "form" && styles.tabTextActive,
              ]}
            >
              Fill Form
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "editor" && styles.tabBtnActive]}
            onPress={() => setActiveTab("editor")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="code-working-outline"
              size={16}
              color={activeTab === "editor" ? "#2B6CB0" : "#64748B"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "editor" && styles.tabTextActive,
              ]}
            >
              Edit Text
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "preview" && styles.tabBtnActive]}
            onPress={() => setActiveTab("preview")}
            activeOpacity={0.7}
          >
            <Ionicons
              name="eye-outline"
              size={16}
              color={activeTab === "preview" ? "#2B6CB0" : "#64748B"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "preview" && styles.tabTextActive,
              ]}
            >
              Preview
            </Text>
          </TouchableOpacity>
        </View>

        {/* Body content based on active tab */}
        <View style={styles.body}>
          {activeTab === "form" && (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Document Title Rename Bar */}
              <TouchableOpacity
                style={styles.renameBanner}
                onPress={handleOpenRename}
                activeOpacity={0.7}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.renameBannerLabel}>DOCUMENT TITLE</Text>
                  <Text style={styles.renameBannerTitle} numberOfLines={1}>
                    {documentTitle}
                  </Text>
                </View>
                <View style={styles.renameBannerAction}>
                  <Text style={styles.renameBannerActionText}>Rename</Text>
                  <Ionicons name="pencil-outline" size={14} color="#2B6CB0" />
                </View>
              </TouchableOpacity>

              <View style={styles.bannerInfo}>
                <Ionicons name="information-circle-outline" size={18} color="#5B9BD5" />
                <Text style={styles.bannerText}>
                  Fill in the details below. The document will automatically update in real time.
                </Text>
              </View>

              {template.fields.map((field) => (
                <View key={field.key} style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <TextInput
                    style={[
                      styles.fieldInput,
                      field.multiline && styles.fieldInputMultiline,
                    ]}
                    value={formValues[field.key] ?? ""}
                    onChangeText={(text) => handleFieldChange(field.key, text)}
                    placeholder={field.placeholder}
                    placeholderTextColor="#94A3B8"
                    multiline={field.multiline}
                    numberOfLines={field.multiline ? 3 : 1}
                  />
                </View>
              ))}

              <TouchableOpacity
                style={styles.jumpToPreviewBtn}
                onPress={() => setActiveTab("preview")}
                activeOpacity={0.8}
              >
                <Text style={styles.jumpToPreviewText}>Review Completed Document →</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {activeTab === "editor" && (
            <View style={styles.editorWrap}>
              <View style={styles.editorHeaderBar}>
                <Text style={styles.editorCounter}>
                  {customText.length} characters • {customText.split(/\s+/).filter(Boolean).length} words
                </Text>
                <TouchableOpacity
                  style={styles.editorHeaderBtn}
                  onPress={handleCopy}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={copyFeedback ? "checkmark-circle" : "copy-outline"}
                    size={16}
                    color={copyFeedback ? "#10B981" : "#5B9BD5"}
                  />
                  <Text style={[styles.editorHeaderBtnText, copyFeedback && { color: "#10B981" }]}>
                    {copyFeedback ? "Copied!" : "Copy"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.rawTextInput}
                value={customText}
                onChangeText={setCustomText}
                multiline
                placeholder="Type or edit document text here..."
                placeholderTextColor="#94A3B8"
                textAlignVertical="top"
              />
            </View>
          )}

          {activeTab === "preview" && (
            <ScrollView
              contentContainerStyle={styles.previewScroll}
              showsVerticalScrollIndicator={true}
            >
              <View style={styles.paperSheet}>
                <View style={styles.paperHeaderRule}>
                  <Text style={styles.paperHeaderNotice}>
                    LEXORA LEGAL DOCUMENT • VALENZUELA CITY
                  </Text>
                  <Text style={styles.paperDocName}>{documentTitle.toUpperCase()}</Text>
                </View>
                <Text style={styles.paperText}>{customText}</Text>
                <View style={styles.paperFooterRule}>
                  <Text style={styles.paperFooterText}>
                    Ready for review, digital signature, or notarization before an accredited Notary Public.
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>

        {/* Bottom Floating Export & Send Actions */}
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          {/* Send to Attorney Button */}
          <TouchableOpacity
            style={styles.sendAttyBarBtn}
            onPress={() => setIsSendAttyModalVisible(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="paper-plane" size={16} color="#FFFFFF" />
            <Text style={styles.sendAttyBarBtnText}>Send to Atty</Text>
          </TouchableOpacity>

          {/* Save PDF */}
          <TouchableOpacity
            style={[styles.exportBtn, styles.exportBtnPdf]}
            onPress={handleExportPdf}
            disabled={isExporting}
            activeOpacity={0.85}
          >
            {isExporting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="document-outline" size={16} color="#FFFFFF" />
                <Text style={styles.exportBtnTextPdf}>PDF</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Save DOCS */}
          <TouchableOpacity
            style={[styles.exportBtn, styles.exportBtnDocs]}
            onPress={handleExportDocs}
            disabled={isExporting}
            activeOpacity={0.85}
          >
            <Ionicons name="newspaper-outline" size={16} color="#2B6CB0" />
            <Text style={styles.exportBtnTextDocs}>DOCS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rename Document Dialog Modal */}
      <Modal
        visible={isRenaming}
        animationType="fade"
        transparent
        onRequestClose={() => setIsRenaming(false)}
      >
        <View style={styles.renameModalOverlay}>
          <View style={styles.renameModalCard}>
            <View style={styles.renameModalHeader}>
              <Ionicons name="create-outline" size={22} color="#5B9BD5" />
              <Text style={styles.renameModalTitle}>Rename Document</Text>
            </View>
            <Text style={styles.renameModalDesc}>
              Enter a custom name for this legal draft:
            </Text>
            <TextInput
              style={styles.renameModalInput}
              value={renameInput}
              onChangeText={setRenameInput}
              placeholder="e.g. Lease Agreement - Karuhatan Unit 4"
              placeholderTextColor="#94A3B8"
              autoFocus
              selectTextOnFocus
            />
            <View style={styles.renameModalActions}>
              <TouchableOpacity
                style={styles.renameCancelBtn}
                onPress={() => setIsRenaming(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.renameCancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.renameConfirmBtn}
                onPress={handleSaveRename}
                activeOpacity={0.85}
              >
                <Text style={styles.renameConfirmBtnText}>Save Name</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Send to Attorney Modal */}
      <SendToAttorneyModal
        visible={isSendAttyModalVisible}
        documentTitle={documentTitle || template.title}
        documentText={customText}
        onClose={() => setIsSendAttyModalVisible(false)}
        onSentSuccess={handleAttorneySentSuccess}
      />
    </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  headerActionsRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerSendAttyBtn: {
    backgroundColor: "#5B9BD5",
  },
  headerTitleWrap: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: "88%",
  },
  headerTitle: {
    fontSize: 15.5,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  renamePencilWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EBF3FA",
    alignItems: "center",
    justifyContent: "center",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
    textAlign: "center",
  },
  toastBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF3FA",
    borderBottomWidth: 1,
    borderBottomColor: "#D8E6F5",
    paddingHorizontal: 16,
    paddingVertical: 9,
    gap: 8,
  },
  toastText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#2B6CB0",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tabBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: "#EBF3FA",
    borderWidth: 1,
    borderColor: "#D8E6F5",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  tabTextActive: {
    color: "#2B6CB0",
    fontWeight: "700",
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },
  renameBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  renameBannerLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#5B9BD5",
    letterSpacing: 0.5,
  },
  renameBannerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 2,
  },
  renameBannerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EBF3FA",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  renameBannerActionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2B6CB0",
  },
  bannerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#EBF3FA",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    padding: 12,
    borderRadius: 12,
  },
  bannerText: {
    flex: 1,
    fontSize: 12.5,
    color: "#2B6CB0",
    lineHeight: 18,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
  },
  fieldInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0F172A",
  },
  fieldInputMultiline: {
    minHeight: 70,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  jumpToPreviewBtn: {
    marginTop: 8,
    backgroundColor: "#F0F5FA",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  jumpToPreviewText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#2B6CB0",
  },
  editorWrap: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  editorHeaderBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editorCounter: {
    fontSize: 12,
    color: "#64748B",
  },
  editorHeaderBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EBF3FA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  editorHeaderBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2B6CB0",
  },
  rawTextInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D8E6F5",
    padding: 16,
    fontSize: 13.5,
    lineHeight: 22,
    color: "#1E293B",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  previewScroll: {
    padding: 16,
  },
  paperSheet: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#D8E6F5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  paperHeaderRule: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#5B9BD5",
    paddingBottom: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  paperHeaderNotice: {
    fontSize: 10,
    fontWeight: "700",
    color: "#5B9BD5",
    letterSpacing: 1,
    textAlign: "center",
  },
  paperDocName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 4,
    textAlign: "center",
  },
  paperText: {
    fontSize: 13,
    lineHeight: 22,
    color: "#1E293B",
    fontFamily: Platform.OS === "ios" ? "Times New Roman" : "serif",
  },
  paperFooterRule: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 12,
    marginTop: 24,
  },
  paperFooterText: {
    fontSize: 10.5,
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
  },
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  sendAttyBarBtn: {
    flex: 1.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: "#2B6CB0",
    gap: 6,
  },
  sendAttyBarBtnText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  exportBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderRadius: 14,
    gap: 6,
  },
  exportBtnPdf: {
    backgroundColor: "#5B9BD5",
  },
  exportBtnTextPdf: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  exportBtnDocs: {
    backgroundColor: "#EBF3FA",
    borderWidth: 1,
    borderColor: "#D8E6F5",
  },
  exportBtnTextDocs: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#2B6CB0",
  },
  renameModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  renameModalCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  renameModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  renameModalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  renameModalDesc: {
    fontSize: 12.5,
    color: "#64748B",
  },
  renameModalInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#D8E6F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0F172A",
  },
  renameModalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  renameCancelBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  renameCancelBtnText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#64748B",
  },
  renameConfirmBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#5B9BD5",
    alignItems: "center",
  },
  renameConfirmBtnText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
