import type { WorkflowDefinition } from "./shared";

/**
 * Funding Workflow. Pure data.
 *
 * Spans further than GrantApplicationEntity's own `status` field
 * (draft | submitted | under-review | awarded | declined), which
 * only covers the application phase. This workflow continues past
 * award into project execution — states that GrantApplicationStatus
 * was never meant to represent, since a grant application and the
 * project it funds are conceptually different things once awarded.
 */
export type FundingWorkflowState =
  | "opportunity-identified"
  | "proposal-drafting"
  | "submitted"
  | "under-evaluation"
  | "awarded"
  | "declined"
  | "project-active"
  | "financial-reporting"
  | "closed-out";

export const fundingWorkflow: WorkflowDefinition<FundingWorkflowState> = {
  name: "Funding Workflow",
  states: [
    "opportunity-identified",
    "proposal-drafting",
    "submitted",
    "under-evaluation",
    "awarded",
    "declined",
    "project-active",
    "financial-reporting",
    "closed-out",
  ],
  initialState: "opportunity-identified",
  terminalStates: ["declined", "closed-out"],
  transitions: [
    { from: "opportunity-identified", to: "proposal-drafting", rule: "A FundingAgencyEntity and GrantProgramEntity are identified as a real opportunity before proposal work begins." },
    { from: "proposal-drafting", to: "submitted", rule: "A GrantApplicationEntity is created and its status becomes submitted." },
    { from: "submitted", to: "under-evaluation", rule: "The funding agency's program begins evaluating the application." },
    { from: "under-evaluation", to: "awarded", rule: "GrantApplicationEntity.status becomes awarded." },
    { from: "under-evaluation", to: "declined", rule: "GrantApplicationEntity.status becomes declined; the workflow ends here." },
    { from: "awarded", to: "project-active", rule: "BudgetLine and MilestoneEntity records are established once funding begins." },
    { from: "project-active", to: "financial-reporting", rule: "A reporting requirement (recurring or milestone-triggered) comes due during active project work." },
    { from: "financial-reporting", to: "project-active", rule: "Reporting complete, the project resumes active status until the next requirement or closeout." },
    { from: "financial-reporting", to: "closed-out", rule: "Final reporting is accepted and all MilestoneEntity records reach completed or delayed-but-resolved." },
  ],
  invariants: [
    "A GrantApplicationEntity cannot reach project-active without having first reached awarded.",
    "BudgetLine.utilized must never be asserted as exceeding BudgetLine.allocated within this workflow's rules — a real overage is itself a reportable event, not a silently allowed state.",
    "financial-reporting may recur multiple times before closed-out; it is not itself a terminal state.",
    "declined and closed-out are the only two ways this workflow ends.",
  ],
};
