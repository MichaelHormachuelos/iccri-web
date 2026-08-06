# Phase 2C — Research Corpus Expansion

**Status:** Complete.

## Objective
Expand the knowledge graph by expanding the research corpus itself —
White Papers, Technical Reports, Library, additional KnowledgeObjects
only where supported by published research.

## What was added
- **1 White Paper**: "Ontology of Idea-Centric Computing" — the real
  document, across its two revisions, that first raised the
  Idea-vs-Relationship primacy question the Meta-Architecture
  Specification still leaves open. Published with an Editor's Note
  (same treatment as Monograph 1) preserving its original exploratory
  voice rather than rewriting it.
- **3 Technical Reports**: the Meta-Architecture Specification,
  Computational Dimensions v1.1, and the Validation Framework v1.0 —
  each `documents` its corresponding KnowledgeObject.
- **Library's Concepts section** populated with real term definitions
  (Idea, Entity, Relationship, Transformation, Knowledge Object, the
  Idea Graph).
- A new relationship: the Ontology white paper **explains** the
  Meta-Architecture — not "documents," since the white paper doesn't
  define the Meta-Architecture, it's where the still-open question it
  leaves unresolved was first argued.

**Real gap found and fixed:** `types/publication.ts`'s `PublicationType`
never actually included `"white-paper"`, despite the site's own
`/publications/white-papers` route existing since RC-2A and the
canonical `PublicationSubtype` already having the value. `publicationHref`
was generalized to route by subtype, since monographs, white papers,
and technical reports now live at different paths — this is also what
finally gave `getPublicationsBySubtype` genuine, differentiated UI
value across three separate index pages.

**Declined:** adding "Understanding" as a KnowledgeObject. It's
extensively discussed in the corpus, but the Meta-Architecture Spec
itself still lists its computational role as an open research
question — adding it as a settled peer to Meta-Architecture/Validation
Framework would overstate its actual status.

## Verification
Real `tsc` clean. Domain integrity audit clean: 15 entities, 18
relationships. 28 routes, all URLs preserved.
