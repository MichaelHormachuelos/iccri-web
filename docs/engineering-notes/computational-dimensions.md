# ICCRI Computational Dimensions — engineering notes

No implementation exists yet, and none is scheduled — this document
records the *shape* of future technical considerations so they're not
re-derived from scratch once a persistence layer is actually designed.
See `../architecture-notes/computational-dimensions.md` for the
rationale and adjudication trail these come from.

## If/when Time becomes concrete

Only `Transformation` currently carries any temporal field
(`occurredAt`, optional). If Time is genuinely universal, `Entity` and
`Relationship` will eventually need their own temporal fields too — or
a documented reason why not. Per the v1.1 ruling, an Entity's history
must be a *derived view* over the Transformation log (query: all
Transformations where this entity id appears in `outputIds`), never a
stored field — a stored version would duplicate the Transformation log
and violate Monograph 4's provenance invariant.

## If/when Context becomes concrete

Per the v1.1 redefinition, Context is an interpretive frame, not an
Entity reference — so it should NOT be implemented as a
`contextIds: string[]` pointing at Organization/Publication/Project
entities (that was the pre-v1.1 risk, now explicitly ruled out). A
concrete implementation more likely looks like a lightweight
enumerated or free-text field on Relationships and Transformations
(e.g., `interpretiveFrame?: string`) rather than a foreign key —
worth confirming against the actual v1.1 text once it arrives, since
this note is inference from the ruling, not the ruling itself.

## Open question with a real engineering fork

Whether `Relationship.confidence` is intrinsic to the Relationship or
dependent on Context is explicitly unresolved (pending future
research). The two resolutions imply different shapes:
- Intrinsic → `confidence` stays a plain field on `Relationship`, as
  it exists today.
- Context-dependent → `confidence` would need to move to wherever
  Context ends up being represented, keyed by (relationship, context)
  pairs rather than a single scalar per relationship.

Not resolving this now is correct — building either shape prematurely
would need to be undone depending on which way the research lands.
