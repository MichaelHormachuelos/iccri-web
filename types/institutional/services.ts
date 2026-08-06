/**
 * Layer 2 — Service Interfaces. Abstractions only. No implementation,
 * no API keys, no credentials, no runtime integration, no external
 * service of any kind. A future concrete implementation (e.g. a real
 * email provider) would satisfy one of these interfaces; nothing
 * here does today.
 */

import type { AnalyticsEvent } from "./analytics";

export interface OutgoingMessage {
  to: string;
  subject: string;
  body: string;
}

export interface IncomingMessage {
  from: string;
  subject: string;
  body: string;
  receivedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

/** No SMTP, no mail server, no inbox. */
export interface EmailProvider {
  send(message: OutgoingMessage): Promise<void>;
}

/** No tracking, no cookies, no storage. */
export interface AnalyticsProvider {
  record(event: AnalyticsEvent): Promise<void>;
}

/** Deliberately unspecified beyond shape — no real storage backend implied. */
export interface StorageProvider {
  put(key: string, data: unknown): Promise<void>;
  get(key: string): Promise<unknown>;
}
