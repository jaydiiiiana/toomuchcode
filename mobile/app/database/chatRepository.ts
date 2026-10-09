/**
 * Repository for storing and retrieving AI Legal Chat messages in SQLite,
 * with reliable in-memory fallback if SQLite native module is unavailable.
 */
import { getDatabase } from "./db";
import type { ChatMessage } from "../question/lib/types";

// In-memory fallback cache
const memoryChatStore = new Map<string, ChatMessage[]>();

export async function saveChatMessage(
  message: ChatMessage,
  sessionId = "default"
): Promise<void> {
  // Always update memory store first for immediate reliability
  const current = memoryChatStore.get(sessionId) || [];
  const existingIdx = current.findIndex((m) => m.id === message.id);
  if (existingIdx >= 0) {
    current[existingIdx] = message;
  } else {
    current.push(message);
  }
  memoryChatStore.set(sessionId, [...current]);

  try {
    const db = await getDatabase();
    if (!db || typeof db.runAsync !== "function") return;

    const citationsJson = message.legalCitations
      ? JSON.stringify(message.legalCitations)
      : null;
    const suggestedActionJson = message.suggestedAction
      ? JSON.stringify(message.suggestedAction)
      : null;

    await db.runAsync(
      `INSERT OR REPLACE INTO ai_chat_messages 
        (id, session_id, sender, text, legal_citations, suggested_action, timestamp, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        message.id,
        sessionId,
        message.sender,
        message.text,
        citationsJson,
        suggestedActionJson,
        message.timestamp,
        Date.now(),
      ]
    );
  } catch (err) {
    // Gracefully handle SQLite exceptions without breaking app flow
  }
}

export async function getChatMessages(
  sessionId = "default"
): Promise<ChatMessage[]> {
  try {
    const db = await getDatabase();
    if (db && typeof db.getAllAsync === "function") {
      const rows: Array<{
        id: string;
        session_id: string;
        sender: "user" | "ai";
        text: string;
        legal_citations: string | null;
        suggested_action: string | null;
        timestamp: string;
        created_at: number;
      }> = await db.getAllAsync(
        `SELECT * FROM ai_chat_messages WHERE session_id = ? ORDER BY created_at ASC;`,
        [sessionId]
      );

      if (rows && rows.length > 0) {
        const parsed = rows.map((row) => ({
          id: row.id,
          sender: row.sender,
          text: row.text,
          timestamp: row.timestamp,
          legalCitations: row.legal_citations
            ? JSON.parse(row.legal_citations)
            : undefined,
          suggestedAction: row.suggested_action
            ? JSON.parse(row.suggested_action)
            : undefined,
        }));
        memoryChatStore.set(sessionId, parsed);
        return parsed;
      }
    }
  } catch (err) {
    // Fall back to memory cache
  }

  return memoryChatStore.get(sessionId) || [];
}

export async function clearChatMessages(
  sessionId = "default"
): Promise<void> {
  memoryChatStore.delete(sessionId);
  try {
    const db = await getDatabase();
    if (db && typeof db.runAsync === "function") {
      await db.runAsync(`DELETE FROM ai_chat_messages WHERE session_id = ?;`, [
        sessionId,
      ]);
    }
  } catch (err) {
    // Ignore error
  }
}
