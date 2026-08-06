# ADR-0003: Defer mapping/adapter layer implementation to Phase 2

**Status:** Accepted (Phase 1B approval).

## Context

The proposed target chain (`PublicationEntity → Domain Publication →
Publication View Model → PublicationTemplate`, see ADR-0001) implies
explicit mapping functions between layers. Phase 1A found the two
current type systems (Ontology vs. presentation types) have zero shared
runtime data flow — there is no persistence layer yet, so there is
nothing real on the Ontology side to map *from*.

## Decision

Do not implement mapping/adapter code between the Ontology, Domain, and
Presentation layers now. Defer that work until Phase 2 (persistence
layer) gives the Domain layer genuine runtime responsibilities.

Exception under consideration, not yet approved: the Contributor model
(`Author` → `ContributorCard`) was identified in Phase 1B as a
candidate for early, narrow prototyping of the pattern, since it is
small, isolated, and already has a live production consumer — but this
was not one of the three decisions explicitly accepted in the Phase 1B
approval, so it remains a candidate, not a decision, pending explicit
confirmation.

## Consequences

- `types/publication.ts`, `types/monograph.ts`, `types/news.ts`,
  `types/author.ts` remain as-is — fused Domain+Presentation shapes —
  until Phase 2 begins.
- No mapper/adapter functions should be written speculatively against
  mock or placeholder data.
- This ADR should be revisited once persistence-layer design starts;
  it is not a permanent decision, only a sequencing one.
