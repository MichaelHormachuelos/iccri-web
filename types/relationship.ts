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
 * Phase 2A: now wired into lib/domain/. `motivates`, `documents`, and
 * `evaluates` were added to the original twelve because RC-3 shipped
 * real, public content using exactly those three verbs (see
 * docs/releases/RC-3.md) — grounded in actual usage, not speculation.
 * `communicates`, `explains` (already present), `derivedFrom`
 * (already present), and `implements` (already present) were also
 * available in RC-3's editorial vocabulary but never actually used in
 * shipped content, so nothing was added for them beyond what the
 * original twelve already covered.
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
  | "relatedTo"
  | "motivates"
  | "documents"
  | "evaluates";

export interface Relationship {
  id: string;
  kind: RelationshipKind;
  /** Entity id this relationship originates from. */
  fromId: string;
  /** Entity id this relationship points to. */
  toId: string;
}
