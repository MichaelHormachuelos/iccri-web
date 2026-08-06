/**
 * Stage 5 — Grant & Research Funding Management. Types only.
 *
 * Deliberately genericized: no specific funding agency (e.g. any
 * national science agency) is named anywhere here. ICCRI has no
 * existing grant relationships to model as data, and naming one would
 * assert a relationship that doesn't exist. FundingAgencyEntity is a
 * shape any real agency could eventually populate.
 */

export type GrantApplicationStatus =
  | "draft"
  | "submitted"
  | "under-review"
  | "awarded"
  | "declined";

export type MilestoneStatus = "pending" | "in-progress" | "completed" | "delayed";

export interface FundingAgencyEntity {
  id: string;
  name: string;
}

export interface GrantProgramEntity {
  id: string;
  agencyId: string;
  name: string;
}

export interface GrantApplicationEntity {
  id: string;
  programId: string;
  status: GrantApplicationStatus;
  submittedAt?: string;
}

export interface BudgetLine {
  applicationId: string;
  category: string;
  allocated: number;
  utilized: number;
}

export interface MilestoneEntity {
  applicationId: string;
  title: string;
  dueAt?: string;
  status: MilestoneStatus;
}

/** Shape for a future dashboard — no aggregation logic, no data yet. */
export interface FundingDashboardSummary {
  totalAwarded: number;
  activeApplications: number;
  upcomingMilestones: number;
  currency: string;
}
