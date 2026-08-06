/**
 * Stage 2 — Research Submission Platform. Types only. "AI review
 * placeholder" and "Peer review placeholder" are modeled as taxonomy
 * slots on ReviewRecord (reviewerRole), not as any working review
 * process — no automation, no reviewer pool, no workflow engine
 * exists or is implied.
 */

import type { PublicationSubtype } from "@/types/entity";

export type SubmissionStatus =
  | "draft"
  | "submitted"
  | "initial-screening"
  | "under-review"
  | "revision-requested"
  | "accepted"
  | "published"
  | "archived"
  | "rejected"
  | "withdrawn";

export type ReviewDecision = "accept" | "minor-revisions" | "major-revisions" | "reject";

export interface SubmissionAuthor {
  name: string;
  affiliation?: string;
  isCorresponding?: boolean;
}

export interface SubmissionVersion {
  versionNumber: number;
  submittedAt: string;
  notes?: string;
}

export interface SubmissionEntity {
  id: string;
  title: string;
  authors: SubmissionAuthor[];
  /** Reuses the canonical PublicationSubtype rather than duplicating it — a submission targets one of the existing publication categories. */
  targetPublicationType: PublicationSubtype;
  status: SubmissionStatus;
  versions: SubmissionVersion[];
}

/** reviewerRole is a category slot, not an active reviewer or AI process. */
export interface ReviewRecord {
  submissionId: string;
  reviewerRole: "editorial" | "peer" | "ai-assisted";
  decision: ReviewDecision;
  recordedAt: string;
}
