/**
 * Firestore Chat Service.
 * Manages real-time 1-on-1 direct messaging threads and message sync in Firestore.
 * No mock data — all data comes from Firestore.
 */
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { firestore } from "../database/firebase";
import { ChatThread, DirectMessage } from "../chat/lib/types";

const CHATS_COLLECTION = "chats";

/**
 * Subscribes to real-time chat threads list from Firestore.
 * Returns empty array if no threads exist yet.
 */
export function subscribeToChatThreads(
  onUpdate: (threads: ChatThread[]) => void
): Unsubscribe {
  const chatsRef = collection(firestore, CHATS_COLLECTION);

  return onSnapshot(
    chatsRef,
    (snapshot) => {
      const items: ChatThread[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...(docSnap.data() as any) });
      });
      onUpdate(items);
    },
    (error) => {
      console.warn("Firestore chat threads snapshot error:", error);
      onUpdate([]);
    }
  );
}

/**
 * Subscribes to real-time messages within a specific chat thread.
 */
export function subscribeToChatMessages(
  chatId: string,
  onUpdate: (messages: DirectMessage[]) => void
): Unsubscribe {
  const msgsRef = collection(firestore, `${CHATS_COLLECTION}/${chatId}/messages`);

  return onSnapshot(
    msgsRef,
    (snapshot) => {
      const msgs: DirectMessage[] = [];
      snapshot.forEach((docSnap) => {
        msgs.push({ id: docSnap.id, ...(docSnap.data() as any) });
      });
      onUpdate(msgs);
    },
    (error) => {
      console.warn("Firestore messages snapshot error:", error);
      onUpdate([]);
    }
  );
}

/**
 * Sends a message to Firestore and updates thread's lastMessage.
 */
export async function sendMessageToFirestore(
  chatId: string,
  message: DirectMessage
): Promise<void> {
  try {
    const msgDocRef = doc(
      firestore,
      `${CHATS_COLLECTION}/${chatId}/messages`,
      message.id
    );

    await setDoc(msgDocRef, {
      ...message,
      createdAt: serverTimestamp(),
    });

    // Update parent thread lastMessage
    const chatDocRef = doc(firestore, CHATS_COLLECTION, chatId);
    await updateDoc(chatDocRef, {
      lastMessage: message.text,
      time: message.timestamp,
    });
  } catch (err) {
    console.warn("Error sending message to Firestore (will save locally):", err);
  }
}

/**
 * Creates a new chat thread in Firestore (e.g. when starting a conversation with an attorney).
 */
export async function createChatThread(thread: ChatThread): Promise<void> {
  try {
    await setDoc(doc(firestore, CHATS_COLLECTION, thread.id), {
      ...thread,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Error creating chat thread in Firestore:", err);
  }
}
