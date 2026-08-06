/**
 * Cross-cutting — Analytics. Types only. No tracking, no cookies, no
 * storage. AnalyticsEvent is a shape a future AnalyticsProvider
 * implementation (see services.ts) could record; nothing records
 * anything today.
 */

export type AnalyticsEventType =
  | "page-view"
  | "publication-download"
  | "citation"
  | "contact-submission"
  | "submission-created"
  | "payment-completed";

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  occurredAt: string;
  /** The KnowledgeObject/Publication/etc. this event relates to, if any. */
  relatedEntityId?: string;
}

export interface Metric {
  name: string;
  value: number;
}

export interface Counter {
  name: string;
  count: number;
}

export interface VisitorStatistic {
  periodLabel: string;
  uniqueVisitors: number;
  pageViews: number;
}
