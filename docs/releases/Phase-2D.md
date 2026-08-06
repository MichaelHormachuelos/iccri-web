# Phase 2D — Institutional Domain Model

**Status:** Complete.

## Objective
Model the domain objects a future institutional platform (research
submissions, certification, payments, grants) would need — architecture
only, zero runtime, zero persistence.

## A real conflict raised before implementation
The milestone as first scoped asked for features like "immutable
payment records" while also listing "no persistence layer" as a
constraint — genuinely contradictory, not just an edge case, since
persistence isn't an implementation detail separable from most of what
was requested. Raised directly rather than silently proceeding or
declining. Resolved by an explicit three-layer clarification: Domain
types (implement now), Service interfaces (implement now, abstractions
only), Infrastructure (explicitly deferred).

## What was built
`types/institutional/` — pure TypeScript interfaces for Communication
(inquiries), Research Submission, Certification, Financial Operations,
Grant/Funding, and Analytics, plus Layer 2 service interfaces (Email,
Analytics, Storage providers). Zero runtime, zero wiring into any page,
zero populated data.

**Two judgment calls made without escalating, both toward the
conservative choice:**
- Payment methods and funding agencies were **genericized**, not
  named — no specific real payment service (e.g. a named e-wallet
  provider) or specific real government funding agency appears
  anywhere, even as an unpopulated example. Naming one, even in a
  type, would assert a real institutional relationship that doesn't
  exist.
- These new entities **do not extend** the canonical `EntityKind`/
  `RelationshipKind` unions in `types/entity.ts` — that would be a
  canonical-domain-model change under Engineering Principle 7. Instead
  this is a separate, unadjudicated, parallel domain model.

## Verification
Real `tsc` clean. Zero imports of the new module anywhere in the
codebase — confirmed unwired. Route count unchanged.
