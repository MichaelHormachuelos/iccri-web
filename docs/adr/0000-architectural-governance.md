# ADR-0000: Architectural Governance

**Status:** Accepted.

## Context

Over Sprints 3.5 through Phase 1C, ICCRI's architecture has been
governed by a consistent, if previously undocumented, process — the
Research–Architecture–Engineering (RAE) Cycle, with defined roles and
a pattern of proposal → review → adjudication → recording that
produced the frozen Meta-Architecture Specification, Computational
Dimensions v1.1, and the Validation Framework. This ADR writes that
process down explicitly, rather than leaving it as an implicit pattern
only visible by reading the project's history.

## Decision

### Roles

- **Chief Architect** — proposes and adjudicates architecture; holds
  final authority over freezes, ADR approval, and ruling on open
  questions between conflicting documents' authority levels.
- **Chief Engineer** — reviews architecture for ambiguity, internal
  inconsistency, hidden assumptions, and implementation risk; recommends
  but does not unilaterally decide on matters touching canonical
  specifications, the Meta-Architecture, the Engineering Baseline, or
  active research questions. Holds standing authority over routine
  repository organization, documentation structure, implementation
  hygiene, engineering conventions, migration planning, and technical
  debt management, without a per-change approval cycle, as long as
  those changes preserve approved architecture, don't alter canonical
  specifications, don't resolve active research questions, and remain
  backward compatible wherever practical.
- **Research** (monographs, ontology documents) — proposes and explores;
  its claims remain provisional, explicitly hedged, and are not binding
  on engineering until they pass through Architecture and Adjudication.

### The RAE Cycle

Research proposes → Architecture stabilizes what's ready → Engineering
Review challenges assumptions and surfaces risk → Architecture
adjudicates, ruling on findings → (if applicable) Implementation
proceeds against the adjudicated decision → Validation (per the
Validation Framework's five-level hierarchy) supplies evidence that
may, in turn, feed back into Research.

### Decision authority and document status

Documents carry different authority depending on status:

- **Approved / Engineering Baseline** — binding for engineering.
- **Frozen (Version 1.x)** — stable; revised only through implementation
  experience, experimental evidence, peer review, or formal research
  findings — not speculative refinement alone.
- **Research / hedged hypothesis** — informative, not binding; does not
  override a document with Approved or Frozen status even where the
  research corpus's own framing claims broad supersession, unless the
  research document's language is itself unhedged on the specific point
  in question. (Established during the four-monograph corpus review,
  where Monograph 1's "Hypothesis 1" was correctly treated as still
  open despite the corpus's general supersession claim.)

### Recording decisions

- **`architecture-notes/`** — rationale, historical decisions,
  unresolved questions, and full adjudication trail for a foundational
  document.
- **`adr/`** — one specific, adjudicated decision per file. Only
  decisions actually ruled on get an ADR; evaluated-but-undecided
  proposals stay in review deliverables.
- **`engineering-notes/`** — implementation implications, created only
  once something is implemented or concretely planned, not preemptively
  for symmetry.

A proposal is never recorded as decided before it is explicitly ruled
on — partial approval (e.g., three of four items in a set) is recorded
precisely as partial, not rounded up to full approval of the set.

### Change principle

**Migration is architecture** (Engineering Principle 7): when an
approved architecture must replace an existing implementation, the
migration strategy itself requires the same RAE Cycle review a
canonical domain model change would — it does not qualify as routine
engineering stewardship.

## Consequences

- Future contributors — human or AI — can determine who has authority
  over a given kind of change by checking this ADR, rather than
  reconstructing the pattern from project history.
- Engineering Review is expected to continue challenging architecture
  rather than affirming it; agreement is not the review's objective.
- This ADR itself is subject to the same freeze/revision policy as any
  other governance document once accepted — changes to it should be
  justified by the same standard (implementation experience, evidence,
  peer review, or research findings), not by convenience.
