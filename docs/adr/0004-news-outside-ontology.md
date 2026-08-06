# ADR-0004: News as institutional communication model outside the ontology

**Status:** Accepted (Phase 1B approval).

## Context

Phase 1A found `NewsArticle` has no corresponding Meta-Architecture
entity or `PublicationSubtype`. Phase 1B evaluated three options:
(a) add News to the ontology, (b) treat it as an institutional
communication model outside the research ontology, (c) model it as a
derived view over the future Transformation log.

Option (a) was rejected: the Meta-Architecture's Rules 4/5 specifically
define Publications as communicating Knowledge Objects; institutional
announcements often don't communicate one, and folding News in would
dilute that deliberate distinction.

## Decision

News is treated as an institutional communication model existing
outside the research ontology — structurally parallel to it, the same
way layout primitives (`Container`, `Section`, `Grid`) aren't
ontological either.

The Transformation-derived alternative (option c — News as an
automatically generated feed of significant Transformations) is
recorded as a genuine future research direction, not discarded. It
requires a real Transformation log, which doesn't exist until Phase 2,
and is not implementable now.

## Consequences

- `types/news.ts` and `NewsArticleTemplate` remain outside the
  Ontology/Domain/Presentation model defined in ADR-0001 — they don't
  need to fit it.
- No further reconciliation work is needed for News as part of the
  domain-alignment effort.
- Revisit option (c) once Phase 2/3 (persistence, knowledge services)
  exist — this is the more thematically significant direction and
  shouldn't be lost by this ADR's near-term scope.
