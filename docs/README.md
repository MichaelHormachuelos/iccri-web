# ICCRI architecture documentation

Per ICCRI's engineering methodology (formalized during the
Computational Dimensions review), every foundational architectural
document gets up to three companion artifacts here:

- **Specification** — the canonical document itself (the monographs,
  the Meta-Architecture Specification, Computational Dimensions).
  These live outside this repo; they're the source of truth this
  folder interprets, not something this folder redefines.
- **`architecture-notes/`** — rationale, historical decisions,
  unresolved questions, and adjudication history. Answers "why is it
  this way, and what's still open."
- **`adr/`** — Architectural Decision Records. One specific, adjudicated
  decision per file — narrower than an `architecture-notes/` entry,
  which covers a whole document's history. Only decisions that have
  actually been ruled on get an ADR; proposals stay in review
  deliverables until accepted or rejected.
- **`engineering-notes/`** — implementation implications, migration
  guidance, and technical considerations. Answers "what does this mean
  for the actual codebase, concretely, right now."

A document only gets an `engineering-notes/` file once something has
actually been implemented (or is concretely planned) as a result of
it — a spec with no code impact yet doesn't need an empty engineering
file. Check `architecture-notes/` first either way; it's the layer
that explains what's settled versus still being adjudicated.

## Foundation Phase — complete

The Chief Architect declared the Foundation Phase of ICCRI complete
following certification of the Validation Framework. The frozen/
certified architectural corpus, each with its own architecture-notes
file above:

- Meta-Architecture Specification (Approved Engineering Baseline)
- Computational Dimensions (v1.1, treated as finalized)
- RAE Cycle
- Validation Framework (Compatible with Observations)

Ontology research history (`ontology.md`) remains as record, superseded
by the above as implementation targets. Going forward, architecture
evolves only through implementation experience, empirical evidence,
peer review, or formal research findings — not further speculative
documents. Center of gravity shifts to Phase 1A (domain migration
strategy) and beyond.

## Adopted engineering principles

Principles formally adopted through the RAE Cycle, not yet tied to a
single document above:

- **Migration is architecture.** When an approved architecture must
  replace an existing implementation, the migration strategy is
  itself an architectural concern — it requires the same review a
  canonical domain model change would, not routine-stewardship
  treatment, whenever it affects canonical domain models. (First
  applied to the presentation-layer-types vs. Meta-Architecture-types
  reconciliation — see `architecture-notes/meta-architecture.md`'s
  "known gap" section; the migration strategy proposal for that work
  is a Phase 1A deliverable, not yet written.)
