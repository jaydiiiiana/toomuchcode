/**
 * Hybrid Local Legal AI Service.
 * 
 * Combines Option 1 (On-Device Dynamic NLG Engine) and Option 2 (Local Neural LLM / Ollama).
 * 
 * Flow:
 * 1. Checks if a local Ollama neural model endpoint (localhost:11434 / 10.0.2.2:11434) is reachable.
 * 2. If available: generates response using local neural model (100% offline real LLM).
 * 3. If unreachable or offline: seamlessly falls back to on-device Dynamic NLG Composer (Option 1).
 * 
 * Zero cloud dependencies — perfectly suited for hackathon requirements.
 */
import { Platform } from "react-native";
import {
  getLocalAIResponse,
  AIResponse,
  ChatHistoryItem,
} from "../question/lib/knowledgeBase";

// Configurable local Ollama endpoint
const DEFAULT_OLLAMA_PORT = 11434;

function getCandidateEndpoints(): string[] {
  const envUrl = process.env.EXPO_PUBLIC_OLLAMA_URL;
  if (envUrl) return [envUrl];

  if (Platform.OS === "android") {
    // 10.0.2.2 connects Android emulator to host machine localhost
    return [
      `http://10.0.2.2:${DEFAULT_OLLAMA_PORT}`,
      `http://localhost:${DEFAULT_OLLAMA_PORT}`,
    ];
  }

  return [`http://localhost:${DEFAULT_OLLAMA_PORT}`];
}

const DEFAULT_MODEL = process.env.EXPO_PUBLIC_OLLAMA_MODEL || "llama3";

const PHILIPPINE_ATTORNEY_SYSTEM_PROMPT =
  "You are Atty. Lexi, a dedicated and compassionate Philippine legal AI companion. " +
  "You specialize strictly in Philippine Law (1987 Philippine Constitution, Revised Penal Code, Civil Code, Labor Code, Family Code, Republic Acts, and Katarungang Pambarangay). " +
  "Always formulate your advice in complete, articulate paragraphs without using checklists or bullet points. " +
  "Address specific persons (e.g., Jay), situations, and disputes directly, giving actionable steps under Philippine statutes.";

/**
 * Checks if Ollama is accessible with a short timeout.
 */
async function checkOllamaEndpoint(endpoint: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const response = await fetch(`${endpoint}/api/tags`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Queries local Ollama endpoint for neural generation.
 */
async function queryLocalOllama(
  endpoint: string,
  prompt: string,
  history: ChatHistoryItem[]
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s max for neural generation

  // Construct context prompt with recent history
  const historyText = history
    .slice(-4)
    .map((m) => `${m.sender === "user" ? "Client" : "Atty. Lexi"}: ${m.text}`)
    .join("\n\n");

  const fullPrompt = `${PHILIPPINE_ATTORNEY_SYSTEM_PROMPT}\n\n${
    historyText ? `Previous Conversation:\n${historyText}\n\n` : ""
  }Client Question: ${prompt}\n\nAtty. Lexi Advice:`;

  const response = await fetch(`${endpoint}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      prompt: fullPrompt,
      stream: false,
    }),
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error(`Ollama returned status ${response.status}`);
  }

  const data = await response.json();
  return data.response ? data.response.trim() : "";
}

/**
 * Main Hybrid Legal Advice Entry Point.
 * Tries local neural Ollama first, seamlessly falls back to on-device Dynamic NLG Composer.
 */
export async function getHybridLegalAdvice(
  query: string,
  history: ChatHistoryItem[] = []
): Promise<AIResponse> {
  // 1. Try local neural LLM (Option 2)
  const candidateEndpoints = getCandidateEndpoints();

  for (const endpoint of candidateEndpoints) {
    try {
      const isOnline = await checkOllamaEndpoint(endpoint);
      if (isOnline) {
        const neuralText = await queryLocalOllama(endpoint, query, history);
        if (neuralText && neuralText.length > 20) {
          return {
            text: neuralText,
            citations: [
              "Philippine Legal Jurisprudence",
              "Local Neural Legal Engine (Ollama)",
            ],
            suggestedAction: {
              label: "Schedule Legal Consultation",
              actionType: "consult",
            },
          };
        }
      }
    } catch {
      // Ollama not ready or busy, continue to fallback
    }
  }

  // 2. Seamless fallback to on-device Dynamic NLG Composer (Option 1)
  return getLocalAIResponse(query, history);
}
