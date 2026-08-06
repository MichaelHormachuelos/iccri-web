import type { WorkflowDefinition } from "./shared";
import type { InquiryStatus } from "../communication";

/** Communication Workflow. Pure data. */
export const communicationWorkflow: WorkflowDefinition<InquiryStatus> = {
  name: "Communication Workflow",
  states: ["received", "assigned", "in-review", "responded", "follow-up", "closed"],
  initialState: "received",
  terminalStates: ["closed"],
  transitions: [
    { from: "received", to: "assigned", rule: "An inquiry is routed to a Department/ContactChannel." },
    { from: "assigned", to: "in-review", rule: "The assigned party begins evaluating the inquiry." },
    { from: "in-review", to: "responded", rule: "A response is sent; InquiryEntity.respondedAt is set." },
    { from: "responded", to: "follow-up", rule: "The inquirer or ICCRI raises a follow-up on the same inquiry rather than opening a new one." },
    { from: "follow-up", to: "responded", rule: "A follow-up is itself answered, returning to responded." },
    { from: "responded", to: "closed", rule: "No follow-up occurs within a reasonable window, or the inquirer confirms resolution." },
    { from: "follow-up", to: "closed", rule: "A follow-up thread reaches resolution." },
  ],
  invariants: [
    "Every transition is recorded as a ContactHistoryEntry — the workflow state itself is derived from the latest history entry, not a separately maintained fact.",
    "An inquiry cannot reach responded without having been assigned first.",
    "follow-up and responded may alternate any number of times before closed.",
  ],
};
