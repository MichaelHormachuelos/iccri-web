import type { Relationship } from "@/types/relationship";

/**
 * Phase 2A/2B — the Domain Layer's Relationship collection.
 *
 * Phase 2A, Stage 1 migrated seven relationships between the five
 * knowledge pages. Stage 2 added the two that were deliberately
 * deferred — Monograph 4's Invariant 2 ("relationships always connect
 * existing entities") meant they couldn't exist validly until the
 * monographs themselves became Domain entities, which they now are.
 * Phase 2B adds five more, each grounded in a specific quoted
 * citation from the published corpus (see each entry's comment) —
 * connecting Monographs 1-2 into the graph and introducing the one
 * new entity this milestone justified, "idea-graph".
 */
export const relationships: Relationship[] = [
  {
    id: "rel-first-principles-motivates-method",
    kind: "motivates",
    fromId: "first-principles",
    toId: "method",
  },
  {
    id: "rel-method-supports-meta-architecture",
    kind: "supports",
    fromId: "method",
    toId: "meta-architecture",
  },
  {
    id: "rel-meta-architecture-extends-first-principles",
    kind: "extends",
    fromId: "meta-architecture",
    toId: "first-principles",
  },
  {
    id: "rel-computational-dimensions-supports-meta-architecture",
    kind: "supports",
    fromId: "computational-dimensions",
    toId: "meta-architecture",
  },
  {
    id: "rel-validation-framework-evaluates-meta-architecture",
    kind: "evaluates",
    fromId: "validation-framework",
    toId: "meta-architecture",
  },
  {
    id: "rel-validation-framework-evaluates-computational-dimensions",
    kind: "evaluates",
    fromId: "validation-framework",
    toId: "computational-dimensions",
  },
  {
    id: "rel-validation-framework-evaluates-method",
    kind: "evaluates",
    fromId: "validation-framework",
    toId: "method",
  },
  {
    id: "rel-publication-meta-architecture-documents-meta-architecture",
    kind: "documents",
    fromId: "publication:meta-architecture",
    toId: "meta-architecture",
  },
  {
    id: "rel-publication-formal-computational-model-extends-meta-architecture",
    kind: "extends",
    fromId: "publication:formal-computational-model",
    toId: "meta-architecture",
  },

  // --- Phase 2B: Knowledge Graph Expansion ---
  // Every relationship below is grounded in a specific, quoted passage
  // from the published corpus — not thematic inference. See the
  // comment on each for the exact citation.

  /**
   * Monograph 3's own abstract: "Previous monographs established two
   * propositions. First, contemporary computing paradigms have been
   * remarkably successful... Second, these paradigms provide
   * comparatively limited explicit support for the evolution of ideas
   * themselves." Both propositions are Monograph 2's specific
   * argument (its Ch. 1-2 and Ch. 3-6 respectively) — not Monograph
   * 1's. Monograph 1 is not cited here for exactly that reason.
   */
  {
    id: "rel-publication-meta-architecture-extends-publication-limitations",
    kind: "extends",
    fromId: "publication:meta-architecture",
    toId: "publication:limitations-of-contemporary-computing",
  },
  /**
   * Monograph 4's own abstract: "The preceding monographs established
   * the motivation for Idea-Centric Computing and proposed a
   * conceptual meta-architecture based upon Entities, Relationships,
   * and Transformations. This monograph seeks to formalize that
   * architecture..." — a direct, specific citation of Monograph 3's
   * subject matter.
   */
  {
    id: "rel-publication-formal-computational-model-extends-publication-meta-architecture",
    kind: "extends",
    fromId: "publication:formal-computational-model",
    toId: "publication:meta-architecture",
  },
  /**
   * Monograph 1 defines the Idea Graph directly: "An Idea Graph is a
   * living, evolving network of ideas and their semantic
   * relationships, in which both ideas and relationships are
   * first-class computational objects" — introduced there as "ICCRI's
   * first genuinely original computational construct."
   */
  {
    id: "rel-publication-ontological-foundations-documents-idea-graph",
    kind: "documents",
    fromId: "publication:ontological-foundations",
    toId: "idea-graph",
  },
  /**
   * Monograph 4, Chapter 10, titled "The Idea Evolution Graph,"
   * develops Monograph 1's Idea Graph into a specific structure:
   * "Nodes -> Semantic Relationships -> Transformation History ->
   * Current Knowledge State." Same construct, explicitly named and
   * extended, not a new one.
   */
  {
    id: "rel-publication-formal-computational-model-extends-idea-graph",
    kind: "extends",
    fromId: "publication:formal-computational-model",
    toId: "idea-graph",
  },
  /**
   * That same Chapter 10 structure — Nodes, Semantic Relationships,
   * Transformation History — is built directly from the Meta-
   * Architecture's own vocabulary (Entities, Relationships,
   * Transformations). The Idea Evolution Graph's structure is derived
   * from the Meta-Architecture, not an independent invention.
   */
  {
    id: "rel-idea-graph-derivedFrom-meta-architecture",
    kind: "derivedFrom",
    fromId: "idea-graph",
    toId: "meta-architecture",
  },

  // --- Phase 2C: Research Corpus Expansion ---

  /**
   * The Meta-Architecture Specification is the technical document
   * itself, distinct from Monograph 3 (which also documents the same
   * knowledge object, per Rule 5: "multiple Publications may
   * communicate the same Knowledge Object"). Direct: this document
   * IS the spec that gives meta-architecture its Approved Engineering
   * Baseline status.
   */
  {
    id: "rel-publication-meta-architecture-specification-documents-meta-architecture",
    kind: "documents",
    fromId: "publication:meta-architecture-specification",
    toId: "meta-architecture",
  },
  {
    id: "rel-publication-computational-dimensions-specification-documents-computational-dimensions",
    kind: "documents",
    fromId: "publication:computational-dimensions-specification",
    toId: "computational-dimensions",
  },
  {
    id: "rel-publication-validation-framework-specification-documents-validation-framework",
    kind: "documents",
    fromId: "publication:validation-framework-specification",
    toId: "validation-framework",
  },
  /**
   * The Ontology white paper is the document where the still-open
   * question on the Meta-Architecture page — whether Idea or
   * Relationship is the more fundamental computational unit — was
   * first raised and argued through two revisions. It explains why
   * that question remains open; it doesn't resolve or define the
   * Meta-Architecture itself, so "documents" would overstate its
   * relationship. "explains" is the accurate verb here.
   */
  {
    id: "rel-publication-ontology-explains-meta-architecture",
    kind: "explains",
    fromId: "publication:ontology-of-idea-centric-computing",
    toId: "meta-architecture",
  },
];
