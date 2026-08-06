# ADR-0002: Meta-Architecture v1.0 as stable engineering contract

**Status:** Accepted (Phase 1B approval).

## Context

Phase 1B evaluated whether the Meta-Architecture Specification is
mature enough to serve as a stable contract for implementation. It has
held up structurally across every adversarial review it's been through
(the four-monograph corpus review, two rounds of Computational
Dimensions review, the Validation Framework compatibility check)
without its three-category shape needing to change. Phase 1A separately
found it internally coherent (Conforms status throughout).

## Decision

The Meta-Architecture Specification v1.0 is accepted as a stable
engineering contract for implementation purposes.

This is explicitly **not** a claim of empirical validation. Per the
Validation Framework's own five-level hierarchy, the Meta-Architecture
currently sits at Level 3 ("Architectural Proposal"), which is defined
as providing "a stable basis for experimentation" without implying
validation. Its validation status remains separately governed by the
Validation Framework and advances only through Levels 4 (Prototype) and
5 (Evidence) as implementation and empirical work actually happen.

## Consequences

- Engineering may build against the Meta-Architecture's canonical
  Entity/Relationship/Transformation kinds without waiting for
  empirical validation.
- Claims about the architecture's maturity should continue to
  distinguish "stable enough to implement against" from "empirically
  validated" — the two remain governed by different processes (RAE
  Cycle adjudication vs. the Validation Framework's evidence
  hierarchy).
- The still-open research questions (Idea vs. Relationship primacy,
  Understanding's role) are unaffected by this ADR — engineering
  stability at this layer does not resolve them.
