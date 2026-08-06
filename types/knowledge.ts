/**
 * Barrel export for the ICCRI Meta-Architecture types. Kept at this
 * path for continuity with earlier sprints; the actual definitions
 * now live in types/entity.ts, types/relationship.ts, and
 * types/transformation.ts — split by architectural category per the
 * ICCRI Meta-Architecture Specification v1.0 (Approved Engineering
 * Baseline), rather than living together in one file as they did
 * when this was speculative, pre-specification content.
 *
 * See docs/architecture-notes/meta-architecture.md for the spec
 * summary and docs/architecture-notes/ontology.md for the research
 * history that preceded it.
 */
export * from "./entity";
export * from "./relationship";
export * from "./transformation";
