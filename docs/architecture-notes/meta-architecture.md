# ICCRI Meta-Architecture Specification v1.0 — architecture notes

**Status of the source document:** Approved (Engineering Baseline).
This is a different kind of document from the research drafts covered
in `ontology.md` — it's explicitly the sanctioned target for
implementation, not a research artifact. That status change is why
real types now exist (see `../engineering-notes/meta-architecture.md`
for the implementation mapping) rather than staying deferred the way
the ontology research was.

## What's stable

- **Three-category meta-architecture**: Entities → Relationships →
  Transformations, as three distinct architectural concerns that must
  never be conflated (spec §3, §5.1).
- **Canonical Entity, Relationship, and Transformation kinds** — see
  engineering notes for the full lists and their type mapping.
- **Publications are not the primary object** (Rules 4–5) — a
  Publication entity is distinct from a Knowledge Object, and
  multiple publications may reference the same knowledge object.

## What's still explicitly open (by design, not oversight)

Per spec §9 and §7, these remain research questions, not engineering
decisions:

- Internal hierarchy of Entities.
- Whether Idea or Relationship is the more fundamental computational
  unit (traced through v1/v2 of the research ontology in
  `ontology.md`, and revisited by the four-monograph corpus review).
- The computational role of Understanding.
- Other emergent phenomena (Expertise, Consensus, Collective
  Intelligence) — explicitly named in the spec as not-yet-canonical.
- Formal computational semantics of Transformations.

## Why this document exists as a separate layer from `ontology.md`

`ontology.md` records how the Entities/Relationships/Transformations
shape was arrived at through research, including the parts that
contradicted each other across drafts. This document records what an
*approved, engineering-facing* specification says, which is narrower
and more stable by design — research keeps investigating the open
questions above; this document doesn't move until a future approved
revision changes it.

See `../engineering-notes/meta-architecture.md` for what any of this
means for the actual codebase.
