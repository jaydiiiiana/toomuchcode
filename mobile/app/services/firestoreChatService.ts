/**
 * Firestore Chat Service.
 * Manages real-time 1-on-1 direct messaging threads and message sync in Firestore.
 */
import {
  collection,
  doc,
  getDocs,
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
import { MOCK_CHATS, MOCK_THREAD_MESSAGES } from "../chat/lib/mockData";

const CHATS_COLLECTION = "chats";

/**
 * Initializes default chat threads in Firestore if not present.
 */
export async function seedInitialChatsIfEmpty(): Promise<void> {
  try {
    const chatsRef = collection(firestore, CHATS_COLLECTION);
    const snap = await getDocs(chatsRef);

    if (snap.empty) {
      for (const chat of MOCK_CHATS) {
        await setDoc(doc(firestore, CHATS_COLLECTION, chat.id), chat);

        // Seed messages
        const initialMsgs = MOCK_THREAD_MESSAGES[chat.id] || [];
        for (const msg of initialMsgs) {
          await setDoc(
            doc(firestore, `${CHATS_COLLECTION}/${chat.id}/messages`, msg.id),
            {
              ...msg,
              createdAt: serverTimestamp(),
            }
          );
        }
      }
    }
  } catch (err) {
    console.warn("Could not seed chats to Firestore (offline or unauthenticated):", err);
  }
}

/**
 * Subscribes to real-time chat threads list from Firestore.
 */
export function subscribeToChatThreads(
  onUpdate: (threads: ChatThread[]) => void
): Unsubscribe {
  const chatsRef = collection(firestore, CHATS_COLLECTION);

  seedInitialChatsIfEmpty();

  return onSnapshot(
    chatsRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: ChatThread[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        onUpdate(items);
      } else {
        onUpdate(MOCK_CHATS);
      }
    },
    (error) => {
      console.warn("Firestore chat threads snapshot error, using local:", error);
      onUpdate(MOCK_CHATS);
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
      if (!snapshot.empty) {
        const msgs: DirectMessage[] = [];
        snapshot.forEach((docSnap) => {
          msgs.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        onUpdate(msgs);
      } else {
        onUpdate(MOCK_THREAD_MESSAGES[chatId] || []);
      }
    },
    (error) => {
      console.warn("Firestore messages snapshot error, using local:", error);
      onUpdate(MOCK_THREAD_MESSAGES[chatId] || []);
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
