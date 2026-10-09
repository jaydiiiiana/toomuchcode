/**
 * Types for Document Templates and Legal Document Review.
 */

export interface TemplateField {
  key: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  multiline?: boolean;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: "Contracts" | "Affidavits" | "Notices" | "Authorizations";
  description: string;
  iconName: string;
  tags: string[];
  fields: TemplateField[];
  generateContent: (values: Record<string, string>) => string;
}

export interface DocumentReviewResult {
  documentName: string;
  documentType: string;
  safetyScore: number;
  summary: string;
  fairnessRating: "Fair" | "Moderate Risk" | "High Risk";
  keyClauses: Array<{
    title: string;
    status: "safe" | "warning" | "alert";
    detail: string;
    recommendation: string;
  }>;
  suggestedRevisions: string[];
}
