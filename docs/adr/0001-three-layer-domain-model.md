# ADR-0001: Three-layer model — Ontology, Domain, Presentation

**Status:** Accepted, as a target reference architecture — explicitly
**not** a description of the current implementation. See "Current vs.
target state" below.

## Context

Phase 1A found the codebase currently has two layers in practice, not
three: `types/entity.ts`/`relationship.ts`/`transformation.ts` form a
correctly-scoped Ontology layer, but `types/publication.ts`,
`types/monograph.ts`, `types/news.ts`, and `types/author.ts` each
double as both the stable business shape and the exact props their
templates consume — Domain and Presentation are fused.

## Decision

Adopt three distinct architectural layers as the target reference
architecture:

1. **Ontology** — canonical Meta-Architecture concepts (`Entity`,
   `Relationship`, `Transformation`, `PublicationEntity`,
   `PersonEntity`, etc.). Already correctly scoped; no change.
2. **Domain Model** — application-level business objects, faithful to
   the ontology, that support ICCRI workflows.
3. **Presentation Layer** — view models, page models, component props;
   should depend on the Domain layer, not directly on the Ontology.

## Current vs. target state

**This ADR describes where the architecture is heading, not where it
is today.** The current implementation correctly consists of only two
layers — Ontology and Presentation — with no Domain layer, and that is
not a gap to close immediately. The Domain layer is expected to emerge
incrementally, as application workflows, persistence, and business
behavior actually mature (starting around Phase 2). It is not a
requirement that all three layers exist now, or that the current
Ontology-to-Presentation shortcut (e.g. `Author` used directly by
`ContributorCard`) be treated as non-conforming in the meantime.

## Consequences

- Future UI components should depend on stable presentation models
  rather than ontology objects directly, **once a Domain layer exists
  for them to depend on instead.**
- Existing presentation types (`Publication`, `Monograph`, `Author`,
  `NewsArticle`) will eventually need splitting into a Domain-layer
  version and a Presentation-layer view model — see ADR-0003 for the
  timing of that work.
- This is a target architecture, not a mandate to restructure existing
  code now — see ADR-0003.
