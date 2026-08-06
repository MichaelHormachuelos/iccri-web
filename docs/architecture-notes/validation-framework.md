# ICCRI Validation Framework v1.0 — architecture notes

**Status:** Certified by Chief Architect — **Compatible with
Observations**. No architectural documents reopened. The four
observations from the compatibility review were accepted as future
architectural considerations rather than present deficiencies:
Reference Platform status intentionally adopted; observability/
measurement to be preserved without premature instrumentation; RAE
Cycle ↔ Validation Framework relationship to be clarified in a future
editorial revision; scientific-claims-as-entities remains an open
research question, deferred.

## What it establishes

A five-level validation hierarchy (Observation → Hypothesis →
Architecture → Prototype → Evidence) and five categories of evidence
(Conceptual, Computational, Empirical, Comparative, Community). Claims
only become accepted ICCRI principle after satisfying five standards:
logical consistency, architectural viability, implementability,
empirical support, independent reproducibility.

## The one finding worth surfacing prominently

**Section 11 names this codebase — "Claude's implementation" — as the
Phase II "Reference Platform"** for the validation roadmap, meaning it's
explicitly slated to become the experimental substrate Phase III
("Laboratory Studies") runs on. That's a real status elevation beyond
"publishing/institutional site" worth being deliberate about, not
something to let arrive implicitly.

## Implementation implications (identified, not scheduled)

- If the reference-platform designation is accepted, future persistence/
  services work (already scoped in the Phase 1A/1B/2/3 roadmap) should
  keep observability/metrics instrumentation in mind as a future
  consumer — not built now, but a seam worth not designing away.
- The Claim Validation Matrix and Falsification Protocol imply a future
  "Claim" or "Hypothesis"-shaped Entity might eventually make sense —
  flagged as a research-program-level question, not proposed as a type
  addition to `types/entity.ts`.
- Telemetry/analytics (what's measured, how, privacy considerations)
  isn't decided anywhere in the project yet and isn't decided by this
  document either — newly implied, not newly resolved.

## Minor gap, not a contradiction

The Validation Framework's five-level claim pipeline and the RAE
Cycle's document-governance cycle operate at different granularities
and aren't explicitly mapped onto each other — e.g., it's not stated
whether reaching "Level 3 — Architectural Proposal" here still requires
passing through the RAE Cycle's Engineering Review and Adjudication.
Presumably yes; worth making explicit in a future revision rather than
left as an assumption.

No `engineering-notes/` companion yet — nothing has been implemented or
concretely scheduled as a direct result of this document; the items
above are surfaced findings, not committed plans.
