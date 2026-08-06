/**
 * Transformations per the ICCRI Meta-Architecture Specification v1.0
 * — see docs/architecture-notes/meta-architecture.md.
 *
 * "A Transformation represents an event that changes one or more
 * entities or creates new entities... Every Transformation should be
 * conceptually capable of recording: Inputs, Outputs, Actor, Time,
 * Context. Whether these fields are implemented immediately is an
 * engineering decision." All five fields below are therefore present
 * on the type (so nothing needs restructuring later) but `actor`,
 * `occurredAt`, and `context` are optional — capturing them isn't
 * required by anything that exists in the codebase yet.
 *
 * Types only. Not wired into any page, template, or data source.
 */

export type TransformationKind =
  | "capture"
  | "refinement"
  | "synthesis"
  | "decomposition"
  | "generalization"
  | "specialization"
  | "validation"
  | "publication"
  | "revision";

export interface Transformation {
  id: string;
  kind: TransformationKind;
  /** Entity ids consumed by this transformation. Empty for "capture", which creates from nothing. */
  inputIds: string[];
  /** Entity ids produced or modified by this transformation. */
  outputIds: string[];
  actor?: string;
  occurredAt?: string;
  context?: string;
}
