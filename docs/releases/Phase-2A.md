# Phase 2A — Domain Foundation

**Status:** Complete (10 stages).

## Objective
Build the minimum viable Domain Layer envisioned by the Phase 2
Domain Architecture Planning document — real, queryable Entity and
Relationship records replacing hardcoded page content, without
introducing persistence.

## Stages
1. **Domain Foundation** — `lib/domain/entities.ts`, `relationships.ts`,
   `queries.ts`, `routes.ts` built; the five knowledge pages migrated
   to source title/summary/relationships from it. `types/relationship.ts`
   extended with `motivates`/`documents`/`evaluates`, grounded in real
   RC-3 usage. Two real pre-existing bugs found and fixed via direct
   inspection (Research Method's actual title, and a `KnowledgeRelations`
   section imported but never rendered).
2. **PublicationEntity Migration** — 4 monograph `PublicationEntity`
   records and 1 `PersonEntity` added; the two relationships deferred
   at Stage 1 (Monograph 4's Invariant 2 requires relationships to
   connect *existing* entities) activated now that monographs exist
   as real entities.
3–5. **Canonical Type Reconciliation, Query Expansion, Demonstrating
   Domain Value** — `publicationMetadata.ts` built as a separate store
   for fields the canonical `PublicationEntity` doesn't have
   (authors, date, summary), deliberately not extending the Approved
   Engineering Baseline type itself. Query surface expanded
   (`getPublicationsByAuthor`, `getPublicationsBySubtype`,
   `getKnowledgeObjectsBySubtype`). A real "Referenced by" reverse-
   relationship section added to the Meta-Architecture page — the
   first capability RC-3's static architecture genuinely couldn't
   produce.
6–10. **Reverse navigation extended to all knowledge pages,
   contributor-fact consolidation audit (found already clean), one
   genuine query wired to real UI value, a full Domain integrity
   audit (clean), and light consolidation** (memoized a redundant
   lookup).

## Verification
Real `tsc` verification clean throughout. Domain integrity audit
(entity/relationship ID uniqueness, orphan relationships, metadata-key
matching) clean at every stage. All URLs preserved throughout.

## Architectural findings
- Two real, pre-existing bugs caught by direct inspection, not
  assumption (Sprint 3 methodology, Engineering Principle 8).
- The canonical `PublicationEntity`/`PersonEntity` types are
  deliberately thin — Approved Engineering Baseline. Richer data
  lives in separate, non-overlapping stores merged at query time,
  never by extending the canonical types.
