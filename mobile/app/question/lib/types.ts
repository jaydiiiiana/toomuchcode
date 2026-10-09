/**
 * Types for the AI Legal Question screen.
 */

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  legalCitations?: string[];
  suggestedAction?: {
    label: string;
    actionType: "consult" | "document" | "emergency";
  };
}

export interface SuggestedQuestion {
  id: string;
  label: string;
  prompt: string;
}
