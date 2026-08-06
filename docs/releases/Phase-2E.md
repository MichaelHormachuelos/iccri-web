# Phase 2E — Institutional Workflow Architecture

**Status:** Complete.

## Objective
Define how the Phase 2D institutional objects change over time —
state machines, transition rules, invariants. Still zero runtime,
zero persistence.

## What was built
`types/institutional/workflows/` — five workflows (Research Submission,
Certification, Funding, Payment, Communication) sharing a declarative
`WorkflowDefinition<TState>` shape: states, an initial state, terminal
states, transitions with documented rules, and cross-cutting
invariants. Pure data — nothing executes a transition.

**Analytics was deliberately modeled differently.** "Visitor → Event →
Metric → Dashboard → Institutional Report" isn't one entity moving
through sequential states — it's a many-to-one aggregation pipeline
(many events produce one metric, many metrics compose one dashboard).
Forcing it into the same `WorkflowDefinition` shape as the other five
would have misrepresented it. It's modeled separately as a
`PipelineDefinition` in `analytics-pipeline.ts`.

**Certificate "Download" was deliberately not modeled as a state** —
an issued certificate can be downloaded any number of times without
changing its status; it's a repeatable action against a terminal
state, not a transition.

## Verification
Real `tsc` clean. A genuine programmatic self-consistency audit was
run on all five state machines beyond type-checking — every
transition's `from`/`to` verified to reference a real declared state,
every state confirmed reachable from the initial state, all terminal
states verified real. Fully clean, zero orphaned or unreachable
states. Zero wiring anywhere; route count unchanged.
