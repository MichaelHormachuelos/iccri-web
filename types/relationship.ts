/**
 * Relationships per the ICCRI Meta-Architecture Specification v1.0 —
 * see docs/architecture-notes/meta-architecture.md.
 *
 * "A Relationship represents a persistent semantic connection between
 * two or more entities. Relationships describe. They do not
 * transform." They possess their own identity (Rule 2: a
 * Relationship must never represent a Transformation) — this is the
 * type `Idea.relatedIds` was a placeholder for before this spec
 * existed; it's superseded by this now.
 *
 * Types only. Not wired into any page, template, or data source.
 */

export type RelationshipKind =
  | "supports"
  | "extends"
  | "contradicts"
  | "questions"
  | "explains"
  | "implements"
  | "belongsTo"
  | "derivedFrom"
  | "cites"
  | "references"
  | "inspiredBy"
  | "relatedTo";

export interface Relationship {
  id: string;
  kind: RelationshipKind;
  /** Entity id this relationship originates from. */
  fromId: string;
  /** Entity id this relationship points to. */
  toId: string;
}
