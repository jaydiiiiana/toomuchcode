/**
 * Repository for storing and retrieving consultation bookings in SQLite,
 * with reliable in-memory fallback if SQLite native module is unavailable.
 */
import { getDatabase } from "./db";
import type { BookingRequest } from "../consultation/lib/types";

export interface StoredBooking {
  id: string;
  attorneyId: string;
  attorneyName: string;
  attorneyAddress: string;
  mode: "office" | "video" | "phone";
  date: string;
  timeSlot: string;
  caseSummary: string;
  status: string;
  createdAt: number;
}

// In-memory fallback cache
const memoryBookings: StoredBooking[] = [];

export async function saveConsultationBooking(
  request: BookingRequest
): Promise<string> {
  const id = `book-${Date.now()}`;
  const newBooking: StoredBooking = {
    id,
    attorneyId: request.attorney?.id || "unknown",
    attorneyName: request.attorney?.name || "Attorney",
    attorneyAddress: request.attorney?.officeAddress || "",
    mode: request.mode,
    date: request.date,
    timeSlot: request.timeSlot,
    caseSummary: request.caseSummary || "",
    status: "confirmed",
    createdAt: Date.now(),
  };

  // Always update memory store first
  memoryBookings.unshift(newBooking);

  try {
    const db = await getDatabase();
    if (!db || typeof db.runAsync !== "function") return id;

    await db.runAsync(
      `INSERT INTO consultation_bookings 
        (id, attorney_id, attorney_name, attorney_address, mode, booking_date, time_slot, case_summary, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        id,
        newBooking.attorneyId,
        newBooking.attorneyName,
        newBooking.attorneyAddress,
        newBooking.mode,
        newBooking.date,
        newBooking.timeSlot,
        newBooking.caseSummary,
        newBooking.status,
        newBooking.createdAt,
      ]
    );
  } catch (err) {
    // Gracefully handle SQLite exceptions without breaking app flow
  }

  return id;
}

export async function getConsultationBookings(): Promise<StoredBooking[]> {
  try {
    const db = await getDatabase();
    if (db && typeof db.getAllAsync === "function") {
      const rows: Array<{
        id: string;
        attorney_id: string;
        attorney_name: string;
        attorney_address: string;
        mode: "office" | "video" | "phone";
        booking_date: string;
        time_slot: string;
        case_summary: string;
        status: string;
        created_at: number;
      }> = await db.getAllAsync(`SELECT * FROM consultation_bookings ORDER BY created_at DESC;`);

      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          attorneyId: r.attorney_id,
          attorneyName: r.attorney_name,
          attorneyAddress: r.attorney_address,
          mode: r.mode,
          date: r.booking_date,
          timeSlot: r.time_slot,
          caseSummary: r.case_summary,
          status: r.status,
          createdAt: r.created_at,
        }));
      }
    }
  } catch (err) {
    // Fall back to memory store
  }

  return [...memoryBookings];
}

export async function deleteConsultationBooking(id: string): Promise<void> {
  const idx = memoryBookings.findIndex((b) => b.id === id);
  if (idx >= 0) {
    memoryBookings.splice(idx, 1);
  }

  try {
    const db = await getDatabase();
    if (db && typeof db.runAsync === "function") {
      await db.runAsync(`DELETE FROM consultation_bookings WHERE id = ?;`, [id]);
    }
  } catch (err) {
    // Ignore error
  }
}
