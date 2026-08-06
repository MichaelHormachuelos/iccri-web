/**
 * Phase 2A, Stage 3 — publication metadata not representable on the
 * canonical `PublicationEntity` type (id, kind, subtype, title only).
 *
 * Deliberately NOT added to types/entity.ts's PublicationEntity
 * itself: that's the canonical Meta-Architecture shape, Approved
 * Engineering Baseline (ADR-0002) — extending it is a canonical
 * domain-model change under Engineering Principle 7 ("migration is
 * architecture"), not something to fold into a reconciliation task.
 * This store holds exactly the fields the canonical type doesn't,
 * keyed by the same entity id, merged with it at query time by
 * getPublicationDetails() in queries.ts. No field here duplicates
 * anything on the canonical entity — `title` stays solely on
 * PublicationEntity in entities.ts.
 */
export interface PublicationMetadata {
  authorIds: string[];
  publishedAt: string;
  summary: string;
}

export const publicationMetadata: Record<string, PublicationMetadata> = {
  "publication:ontological-foundations": {
    authorIds: ["person:michael-g-hormachuelos"],
    publishedAt: "2026",
    summary:
      "An early exploration of what the primitive object of Idea-Centric Computing should be, examining and setting aside information, knowledge, and understanding before arriving at the idea itself.",
  },
  "publication:limitations-of-contemporary-computing": {
    authorIds: ["person:michael-g-hormachuelos"],
    publishedAt: "2026",
    summary:
      "Why existing computational models struggle to support the evolution of ideas — not because they failed, but because every paradigm reflects the primitive object it was built around.",
  },
  "publication:meta-architecture": {
    authorIds: ["person:michael-g-hormachuelos"],
    publishedAt: "2026",
    summary:
      "A conceptual architecture for supporting the evolution of ideas, organized around three irreducible categories: Entities, Relationships, and Transformations.",
  },
  "publication:formal-computational-model": {
    authorIds: ["person:michael-g-hormachuelos"],
    publishedAt: "2026",
    summary:
      "Formal semantics, computational operations, and the evolution of ideas — defining the primitives, invariants, and conformance criteria an implementation must satisfy.",
  },

  "publication:ontology-of-idea-centric-computing": {
    authorIds: ["person:michael-g-hormachuelos"],
    publishedAt: "2026",
    summary:
      "The research document, across two revisions, that first asked whether the idea or the relationship is the more fundamental computational object — the question the Meta-Architecture Specification deliberately leaves open.",
  },
  "publication:meta-architecture-specification": {
    authorIds: ["person:michael-g-hormachuelos"],
    publishedAt: "2026",
    summary:
      "The technical specification defining Entities, Relationships, and Transformations as ICCRI's canonical Meta-Architecture, with Approved Engineering Baseline status.",
  },
  "publication:computational-dimensions-specification": {
    authorIds: ["person:michael-g-hormachuelos"],
    publishedAt: "2026",
    summary:
      "The technical specification defining Identity, Time, and Context as the dimensions within which every Entity, Relationship, and Transformation exists and evolves.",
  },
  "publication:validation-framework-specification": {
    authorIds: ["person:michael-g-hormachuelos"],
    publishedAt: "2026",
    summary:
      "The technical specification governing how an ICCRI claim moves from observation to accepted principle, and what evidence is required at each stage.",
  },
};
