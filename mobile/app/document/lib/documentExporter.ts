import { Platform, Alert } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { File, Paths } from "expo-file-system";

/**
 * Builds clean legal document HTML for PDF generation and Word export.
 */
function buildDocumentHtml(title: string, content: string): string {
  const escapedContent = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 20mm 20mm 20mm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #111827;
      margin: 0;
      padding: 24px;
    }
    .header-rule {
      border-bottom: 2px solid #5B9BD5;
      margin-bottom: 24px;
      padding-bottom: 8px;
      font-size: 10pt;
      color: #64748B;
      font-family: sans-serif;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content-body {
      white-space: pre-wrap;
      font-size: 12pt;
      line-height: 1.7;
      text-align: justify;
    }
    .footer-note {
      margin-top: 40px;
      border-top: 1px solid #E2E8F0;
      padding-top: 10px;
      font-size: 9pt;
      color: #94A3B8;
      font-family: sans-serif;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header-rule">
    Prepared via Lexora Legal Assistant • Valenzuela City, Philippines
  </div>
  <div class="content-body">${escapedContent}</div>
  <div class="footer-note">
    Document generated for legal reference. Ensure proper notarization before an accredited Notary Public where required by Philippine law.
  </div>
</body>
</html>
  `.trim();
}

/**
 * Exports current document as PDF and triggers native share / save.
 */
export async function exportToPdf(title: string, content: string): Promise<boolean> {
  try {
    const html = buildDocumentHtml(title, content);

    if (Platform.OS === "web") {
      await Print.printAsync({ html });
      return true;
    }

    // Generate PDF file
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    // Check if sharing is available
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
        dialogTitle: `Save or Share ${title}`,
      });
      return true;
    } else {
      Alert.alert("PDF Generated", `Saved to temporary file:\n${uri}`);
      return true;
    }
  } catch (error: any) {
    console.error("Failed to export PDF:", error);
    Alert.alert("PDF Export Error", error?.message || "Could not generate PDF document.");
    return false;
  }
}

/**
 * Exports current document as Word (.doc) and triggers native share / save.
 */
export async function exportToDocs(title: string, content: string): Promise<boolean> {
  try {
    const html = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${title}</title>
  <style>
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 1in; }
    p { margin-bottom: 12pt; text-align: justify; }
    pre { white-space: pre-wrap; font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; }
  </style>
</head>
<body>
  <pre>${content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
</body>
</html>
    `.trim();

    if (Platform.OS === "web") {
      const blob = new Blob([html], { type: "application/msword" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/[^a-zA-Z0-9_-]/g, "_")}.doc`;
      a.click();
      URL.revokeObjectURL(url);
      return true;
    }

    const safeFilename = `${title.replace(/[^a-zA-Z0-9_-]/g, "_")}.doc`;
    const docFile = new File(Paths.cache, safeFilename);
    docFile.create({ overwrite: true });
    docFile.write(html);

    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(docFile.uri, {
        mimeType: "application/msword",
        dialogTitle: `Save or Share ${title} (.doc)`,
      });
      return true;
    } else {
      Alert.alert("Document Saved", `Saved to:\n${docFile.uri}`);
      return true;
    }
  } catch (error: any) {
    console.error("Failed to export DOCS:", error);
    Alert.alert("DOCS Export Error", error?.message || "Could not generate DOC file.");
    return false;
  }
}
