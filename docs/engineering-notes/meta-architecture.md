# ICCRI Meta-Architecture Specification v1.0 — engineering notes

Implementation implications and technical mapping. See
`../architecture-notes/meta-architecture.md` for rationale and status.

## Type mapping

- **Canonical Entity kinds** → `types/entity.ts`: Idea, Concept,
  Question, Knowledge Object (subtypes: First Principle, Framework,
  Theory, Method, Model, Reference Architecture), Publication
  (subtypes: Monograph, White Paper, Research Paper, Technical
  Report), Person (roles: Founder, Researcher, Contributor, Reviewer,
  Editor), Organization.
- **Canonical Relationship kinds** → `types/relationship.ts`:
  supports, extends, contradicts, questions, explains, implements,
  belongsTo, derivedFrom, cites, references, inspiredBy, relatedTo.
- **Canonical Transformation kinds** → `types/transformation.ts`:
  Capture, Refinement, Synthesis, Decomposition, Generalization,
  Specialization, Validation, Publication, Revision — provenance
  fields (`actor`, `occurredAt`, `context`) present but optional;
  nothing in the codebase currently requires them.

## Rules honored by the current types

- **Rule 1** (no relationship-as-identity): `types/entity.ts` has no
  `relatedIds` or similar field on any Entity — this replaces the
  earlier `Idea.relatedIds: string[]` that existed only because the
  shape wasn't settled yet.
- **Rules 2/3** (Relationships and Transformations stay distinct):
  kept as two separate types with different shapes — `Relationship`
  is a plain typed edge (`fromId`/`toId`); `Transformation` carries
  `inputIds`/`outputIds` (plural — synthesis can consume multiple
  entities) plus optional provenance fields no `Relationship` has.

## Known gap: presentation types vs. meta-architecture types

`types/publication.ts`, `types/monograph.ts`, `types/news.ts`, and
`types/author.ts` are actively used by real, shipped templates
(`PublicationTemplate`, `MonographTemplate`, `NewsArticleTemplate`)
and predate this specification. They are not reconciled with
`PublicationEntity`/`PersonEntity` in `types/entity.ts`. Reconciling
them now would touch working pages for a purely architectural concern
with no user-facing benefit yet — deferred deliberately, not an
oversight. Revisit when either (a) a persistence layer is designed, at
which point one canonical shape is needed anyway, or (b) a real page
needs data from both simultaneously.

## Migration guidance, if/when a persistence layer is introduced

Per the corpus architectural review: adopting Monograph 4's invariants
(no direct Entity mutation, mandatory provenance) means Entity changes
happen only via Transformation records — an append-only / event-sourced
store with derived "current state" projections, not a conventional
mutable table. `Entity` would need base-level `type`/`state` fields
(currently only `Idea.status` exists, ad hoc, on one subtype).
`Relationship` would need the optional `confidence` field Monograph 4
introduced. None of this is scheduled — recorded here so the shape is
known when persistence work actually starts.
