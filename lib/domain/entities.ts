import type { AnyEntity } from "@/types/entity";

/**
 * Phase 2A/2B — the Domain Layer's Entity collection.
 *
 * Per the Phase 2 Single Source of Truth principle: title and summary
 * for the knowledge pages, and title for the four monographs, live
 * here now, not in the page/data files that render them. Presentation
 * components and content modules query this layer; they don't own
 * the facts themselves.
 *
 * ID scheme: knowledge objects use their route segment directly
 * (e.g. "method" -> /research/method). Publications and people are
 * namespaced ("publication:...", "person:...") since a monograph's
 * slug can otherwise collide with a knowledge object's id — Monograph
 * 3's slug is literally "meta-architecture", same as the knowledge
 * page. Namespacing avoids that collision rather than relying on
 * knowing it won't happen.
 *
 * Phase 2A, Stage 1: the first five KnowledgeObject entities.
 * Phase 2A, Stage 2: four PublicationEntity records (the monographs)
 * and one PersonEntity (their author), plus the two relationships
 * that involve them, deferred at Stage 1 per Monograph 4's
 * Invariant 2 (relationships must connect existing entities) until
 * these existed.
 * Phase 2B: added "idea-graph" — the one new KnowledgeObject this
 * milestone introduces, grounded specifically in Monograph 1's
 * "Idea Graph" definition and Monograph 4 Chapter 10's development of
 * it into "The Idea Evolution Graph" (see relationships.ts for the
 * exact textual citations backing this and every other new edge).
 * Phase 2C: added four new PublicationEntity records (a White Paper,
 * three Technical Reports).
 * Platform Refresh v2.0: added "person:marivic-m-hormachuelos" — same
 * canonical role as the existing founder record ("founder"); the
 * "Founder"/"Co-Founder" title distinction is presentation-layer,
 * not part of the canonical PersonRole union — see
 * lib/domain/leadershipMetadata.ts.
 */
export const entities: Record<string, AnyEntity> = {
  "first-principles": {
    id: "first-principles",
    kind: "knowledge-object",
    subtype: "first-principle",
    title: "First Principles",
    summary:
      "Research begins not by asking how to improve an existing tool, but by asking whether we are solving the right problem.",
  },
  method: {
    id: "method",
    kind: "knowledge-object",
    subtype: "method",
    title: "The ICCRI Research Method",
    summary:
      "A first-principles framework for the systematic discovery, conceptualization, architectural design, and validation of emerging ideas.",
  },
  "meta-architecture": {
    id: "meta-architecture",
    kind: "knowledge-object",
    subtype: "reference-architecture",
    title: "Meta-Architecture",
    summary:
      "The structure ICCRI uses to describe everything within Idea-Centric Computing — three categories that must never be conflated with one another.",
  },
  "computational-dimensions": {
    id: "computational-dimensions",
    kind: "knowledge-object",
    subtype: "framework",
    title: "Computational Dimensions",
    summary:
      "Where the Meta-Architecture describes what exists, Computational Dimensions describes how those things exist and evolve.",
  },
  "validation-framework": {
    id: "validation-framework",
    kind: "knowledge-object",
    subtype: "framework",
    title: "Validation Framework",
    summary:
      "Architecture explains what ICCRI proposes. The Validation Framework governs how a proposal earns the right to be believed.",
  },
  "idea-graph": {
    id: "idea-graph",
    kind: "knowledge-object",
    subtype: "model",
    title: "The Idea Graph",
    summary:
      "A living, evolving network of ideas and their semantic relationships, in which both ideas and relationships are first-class computational objects.",
  },

  "publication:ontological-foundations": {
    id: "publication:ontological-foundations",
    kind: "publication",
    subtype: "monograph",
    title: "The Ontological Foundations of Idea-Centric Computing",
  },
  "publication:limitations-of-contemporary-computing": {
    id: "publication:limitations-of-contemporary-computing",
    kind: "publication",
    subtype: "monograph",
    title: "The Limitations of Contemporary Computing Paradigms",
  },
  "publication:meta-architecture": {
    id: "publication:meta-architecture",
    kind: "publication",
    subtype: "monograph",
    title: "The Meta-Architecture of Idea-Centric Computing",
  },
  "publication:formal-computational-model": {
    id: "publication:formal-computational-model",
    kind: "publication",
    subtype: "monograph",
    title: "A Formal Computational Model for Idea-Centric Computing",
  },

  "publication:ontology-of-idea-centric-computing": {
    id: "publication:ontology-of-idea-centric-computing",
    kind: "publication",
    subtype: "white-paper",
    title: "Ontology of Idea-Centric Computing",
  },
  "publication:meta-architecture-specification": {
    id: "publication:meta-architecture-specification",
    kind: "publication",
    subtype: "technical-report",
    title: "ICCRI Meta-Architecture Specification v1.0",
  },
  "publication:computational-dimensions-specification": {
    id: "publication:computational-dimensions-specification",
    kind: "publication",
    subtype: "technical-report",
    title: "ICCRI Computational Dimensions v1.1",
  },
  "publication:validation-framework-specification": {
    id: "publication:validation-framework-specification",
    kind: "publication",
    subtype: "technical-report",
    title: "ICCRI Validation Framework v1.0",
  },

  "person:michael-g-hormachuelos": {
    id: "person:michael-g-hormachuelos",
    kind: "person",
    name: "Michael G. Hormachuelos",
    roles: ["founder"],
  },
  "person:marivic-m-hormachuelos": {
    id: "person:marivic-m-hormachuelos",
    kind: "person",
    name: "Marivic M. Hormachuelos",
    roles: ["founder"],
  },
};
