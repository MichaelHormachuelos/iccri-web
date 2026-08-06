/**
 * Stage 1 — Institutional Communication Architecture. Types only; see
 * README.md in this directory for status. No department, channel, or
 * inquiry currently exists — this defines the shape a future one
 * would take, not real institutional data.
 */

export type InquiryStatus = "received" | "assigned" | "in-review" | "responded" | "follow-up" | "closed";

/** Extensible — no specific department exists yet; a single "General" channel is the only one implied. */
export interface Department {
  id: string;
  name: string;
}

export interface ContactChannel {
  id: string;
  label: string;
  departmentId?: string;
}

export interface InquiryEntity {
  id: string;
  subject: string;
  channelId: string;
  status: InquiryStatus;
  submittedAt: string;
  respondedAt?: string;
}

/** Lifecycle record, not a persisted audit table — see README.md. */
export interface ContactHistoryEntry {
  inquiryId: string;
  event: "submitted" | "assigned" | "acknowledged" | "responded" | "followed-up" | "closed";
  at: string;
}
