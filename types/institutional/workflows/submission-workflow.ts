import type { WorkflowDefinition } from "./shared";
import type { SubmissionStatus } from "../submission";

/**
 * Research Submission Workflow. Pure data — no code executes these
 * transitions. "Peer Review (or AI Review)" from the milestone brief
 * is not modeled as two separate states: the workflow state is
 * `under-review` regardless of who reviews it, and *who* — editorial,
 * peer, or AI-assisted — is recorded separately on ReviewRecord
 * (types/institutional/submission.ts). Conflating reviewer type into
 * the state machine would double the state count for a distinction
 * that isn't actually about submission status.
 */
export const submissionWorkflow: WorkflowDefinition<SubmissionStatus> = {
  name: "Research Submission Workflow",
  states: [
    "draft",
    "submitted",
    "initial-screening",
    "under-review",
    "revision-requested",
    "accepted",
    "published",
    "archived",
    "rejected",
    "withdrawn",
  ],
  initialState: "draft",
  terminalStates: ["archived", "rejected", "withdrawn"],
  transitions: [
    { from: "draft", to: "submitted", rule: "An author submits a complete draft with at least one author and a target publication type." },
    { from: "draft", to: "withdrawn", rule: "An author may withdraw a draft before submission." },
    { from: "submitted", to: "initial-screening", rule: "Every submission is screened before being assigned for review." },
    { from: "initial-screening", to: "rejected", rule: "Screening may reject a submission outside ICCRI's scope without a full review." },
    { from: "initial-screening", to: "under-review", rule: "A submission passing screening enters review." },
    { from: "under-review", to: "revision-requested", rule: "A ReviewRecord with decision minor-revisions or major-revisions moves the submission here." },
    { from: "under-review", to: "accepted", rule: "A ReviewRecord with decision accept moves the submission here." },
    { from: "under-review", to: "rejected", rule: "A ReviewRecord with decision reject moves the submission here." },
    { from: "revision-requested", to: "submitted", rule: "A revised version (a new SubmissionVersion) re-enters the workflow at submission." },
    { from: "revision-requested", to: "withdrawn", rule: "An author may withdraw rather than revise." },
    { from: "accepted", to: "published", rule: "An accepted submission becomes a real Publication/KnowledgeObject entry once published." },
    { from: "published", to: "archived", rule: "A published work may later be archived without being unpublished." },
    { from: "withdrawn", to: "draft", rule: "A withdrawn submission may return to draft for future resubmission." },
  ],
  invariants: [
    "A submission has exactly one current status at any time.",
    "Every transition into revision-requested, accepted, or rejected must be backed by at least one ReviewRecord.",
    "A submission cannot move directly from draft or submitted to published — it must pass through review and acceptance.",
    "SubmissionVersion.versionNumber increases monotonically each time a submission re-enters the workflow after revision.",
  ],
};
