# Phase 2B — Knowledge Graph Expansion

**Status:** Complete.

## Objective
Transform the Domain Layer from a data repository into an actual
knowledge graph — expand relationships and, where genuinely
justified, entities, grounded strictly in the published corpus.

## What was added
Five new relationships, each with a specific textual citation
(see comments in `lib/domain/relationships.ts`):
- Monograph 3 **extends** Monograph 2 — M3's abstract explicitly
  cites M2's two propositions.
- Monograph 4 **extends** Monograph 3 — M4's abstract explicitly
  cites M3's Entities/Relationships/Transformations meta-architecture.
- Monograph 1 **documents** the new "Idea Graph" KnowledgeObject —
  M1 defines it directly ("ICCRI's first genuinely original
  computational construct").
- Monograph 4 **extends** the Idea Graph — M4 Chapter 10, "The Idea
  Evolution Graph," develops the same construct further.
- The Idea Graph **derivedFrom** Meta-Architecture — M4's Chapter 10
  structure (Nodes / Semantic Relationships / Transformation History)
  is explicitly built from Meta-Architecture's own vocabulary.

One new KnowledgeObject: **the Idea Graph** (subtype `model`),
published at `/research/idea-graph`.

**Deliberately not added:** a Monograph 1 → Monograph 3 relationship.
M3's abstract cites M2's propositions specifically, not M1's — no
explicit citation exists, so none was asserted, even though the
Entities/Relationships/Transformations structure clearly descends
conceptually from M1's Idea/Relationship hypothesis.

The Research landing page's entry list was made **computed** from
the Domain Layer (`getAllKnowledgeObjects`) instead of a hand-curated
array — resolving an SSOT gap flagged since Phase 2A Stage 1. This
changed the teaser copy on five existing cards to match each page's
own summary (a disclosed, deliberate change, not silent).

## Verification
Real `tsc` clean. Domain integrity audit clean: 11 entities, 14
relationships, zero orphans. All URLs preserved.
