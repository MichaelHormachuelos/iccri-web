/**
 * Entities per the ICCRI Meta-Architecture Specification v1.0
 * (Approved Engineering Baseline) — see
 * docs/architecture-notes/meta-architecture.md.
 *
 * "An Entity is an identifiable conceptual object that exists
 * independently within the Idea-Centric ecosystem." Entities possess
 * identity, may evolve, and may participate in Relationships or
 * undergo Transformations — but per Rule 1 of the spec, an Entity
 * must never encode relationships as part of its own primary
 * identity. That's why there's no `relatedIds` (or similar) field
 * anywhere below — connections live in types/relationship.ts only.
 *
 * Types only. Not wired into any page, template, or data source.
 */

export type EntityKind =
  | "idea"
  | "concept"
  | "question"
  | "knowledge-object"
  | "publication"
  | "person"
  | "organization";

export interface Entity {
  id: string;
  kind: EntityKind;
}

/** Captures intellectual novelty. */
export interface Idea extends Entity {
  kind: "idea";
  title: string;
  summary: string;
  status: "seed" | "developing" | "published";
}

/** Organizes meaning — a stable abstraction formed from related ideas. */
export interface Concept extends Entity {
  kind: "concept";
  term: string;
  definition: string;
}

/** Drives research — an inquiry that motivates exploration. */
export interface Question extends Entity {
  kind: "question";
  question: string;
  status: "open" | "under-investigation" | "answered";
}

export type KnowledgeObjectSubtype =
  | "first-principle"
  | "framework"
  | "theory"
  | "method"
  | "model"
  | "reference-architecture";

/** A validated externalization of understanding. */
export interface KnowledgeObject extends Entity {
  kind: "knowledge-object";
  subtype: KnowledgeObjectSubtype;
  title: string;
  summary: string;
}

export type PublicationSubtype =
  | "monograph"
  | "white-paper"
  | "research-paper"
  | "technical-report";

/**
 * A communication artifact. Per Rule 4/5 of the spec: a Publication
 * is not itself the source of knowledge, is not the platform's
 * primary architectural object, and remains independent of the
 * Knowledge Objects it communicates — multiple Publications may
 * communicate the same Knowledge Object.
 */
export interface PublicationEntity extends Entity {
  kind: "publication";
  subtype: PublicationSubtype;
  title: string;
}

export type PersonRole = "founder" | "researcher" | "contributor" | "reviewer" | "editor";

export interface PersonEntity extends Entity {
  kind: "person";
  name: string;
  roles: PersonRole[];
}

export interface OrganizationEntity extends Entity {
  kind: "organization";
  name: string;
}

export type AnyEntity =
  | Idea
  | Concept
  | Question
  | KnowledgeObject
  | PublicationEntity
  | PersonEntity
  | OrganizationEntity;
