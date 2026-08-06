# ICCRI Computational Dimensions — status and adjudication record

**Status:** v1.1 confirmation review complete (Chief Engineer
recommendation: Approve for Architectural Freeze). The one deferred
item — Validation Framework compatibility — has since been verified
and certified Compatible with Observations, and the Chief Architect
has declared the Foundation Phase of ICCRI complete. No explicit
freeze declaration for this specific document has been issued as a
standalone statement, but nothing remains blocking it — treating it as
finalized in effect. All three v1.0 findings (1:1 table, Entity-history
ambiguity, Context's entity-like examples) were resolved precisely,
with two added strengthenings (Temporal and Contextual Integrity
invariants) and no regressions. The Validation Framework compatibility
gap noted at confirmation-review time has since been closed (see
`validation-framework.md`) — this document is now treated as settled.

No code or type changes have been made as a result of this document —
Computational Dimensions remains, by explicit instruction, a conceptual
companion to the Meta-Architecture, not an engineering change request.

## What Computational Dimensions v1.0 proposed

Three dimensions — Identity, Time, Context — cross-cutting all three
Meta-Architecture categories (Entities, Relationships, Transformations).
Answers "how do things exist and evolve," distinct from the
Meta-Architecture's "what exists."

## Chief Engineer review findings and Chief Architect rulings

| Finding | Ruling |
|---|---|
| Body text claims dimensions are universal (3×3: all three dimensions apply to all three categories); closing summary table implied a 1:1 mapping (Entities↔Identity, Relationships↔Context, Transformations↔Time) instead — an internal contradiction. | **Accepted.** Table removed in v1.1. Universality principle is authoritative. |
| "Entities possess histories" is ambiguous between a derived view over the Transformation log and a stored field — the latter would duplicate the Transformation log and conflict with Monograph 4's provenance invariant. | **Accepted.** v1.1 wording: "The history of an Entity is derived from the sequence of Transformations in which it participates." |
| Context's own examples (Publication, Organization, Project) were already canonical Entities — blurring Context into a use of Relationships rather than a genuine third dimension. | **Accepted, with revision.** v1.1 redefines Context as "the interpretive frame within which Entities, Relationships, and Transformations acquire meaning" — explicitly not an Entity, not a Relationship. Examples shift to disciplinary perspective, language, historical period, theoretical framework, methodological perspective. |
| Confidence (from `Relationship.confidence`, added via Monograph 4) wasn't addressed — is confidence intrinsic to a Relationship, or dependent on Context? | **Not resolved architecturally.** Recorded as an open research question for a future monograph. No implementation implication now. |

## What remains true regardless of v1.0 → v1.1

- Computational Dimensions does not introduce a fourth Meta-Architecture
  category, does not alter the Engineering Baseline, and does not touch
  the still-open Idea-vs-Relationship primacy question.
- `types/entity.ts`, `types/relationship.ts`, `types/transformation.ts`
  are unchanged and not expected to change as a direct result of this
  document — Identity is already satisfied by `id` on all three; Time
  and Context remain conceptual pending any future persistence-layer
  design work, not something to retrofit into current types.

## Next step

Awaiting Chief Architect's freeze designation. Once confirmed, this
document moves from "under review" to Architecturally Frozen (Version
1.x) status, and future revisions occur only via implementation
experience, experimental evidence, peer review, or formal research
findings — not further speculative refinement (per Engineering
Principle: architecture evolves through evidence at this stage of the
project).

See `../engineering-notes/computational-dimensions.md` for the forward-
looking technical considerations this raises, not yet implemented.
