# Institutional Workflow Architecture — status

**Proposed, not adjudicated** — same status as the rest of
`types/institutional/` (see the parent README). Pure data: every
workflow here is a declared graph of states and transitions, not
executable code. Nothing transitions anything; nothing is persisted.

## Five state machines, one pipeline

Five of the six requested workflows (Research Submission,
Certification, Funding, Payment, Communication) are genuinely state
machines — one entity, one current state, a defined set of valid
transitions between states. They share the `WorkflowDefinition<TState>`
shape in `shared.ts`.

The sixth, Analytics, is not that shape, and modeling it as one would
misrepresent it. "Visitor → Event → Metric → Dashboard → Institutional
Report" is a data pipeline with a fan-in at every stage — many events
produce one metric, many metrics compose one dashboard — not a single
entity moving through sequential states. It's modeled separately in
`analytics-pipeline.ts` as a `PipelineDefinition`, which describes
aggregation stages rather than state transitions. Forcing it into
`WorkflowDefinition` would have been the mechanical choice; this is
the accurate one.

## Where each workflow's states come from

Where a workflow's states matched an existing Phase 2D entity status
exactly, it reuses that type directly (Communication Workflow imports
`InquiryStatus`, Research Submission imports `SubmissionStatus`) —
one definition, not two. Where the requested workflow was more
granular than the Phase 2D entity status it was based on (Certification,
Funding, Payment), a separate workflow-level state type was introduced,
because the workflow spans more than one entity's lifecycle or
precedes that entity's existence — documented in each file's header
comment specifically.

## Relationship to the Domain Layer (knowledge graph)

None of this connects to `lib/domain/` — the knowledge graph
(Entities, Relationships, Transformations for Ideas, Publications,
etc.) and this institutional workflow model are deliberately separate
systems, per the same reasoning as `types/institutional/README.md`:
these aren't part of the Approved Meta-Architecture Specification, and
extending that canonical model to include them would be a
Principle-7-triggering change this milestone doesn't authorize.
