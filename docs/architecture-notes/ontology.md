# Ontology of Idea-Centric Computing — architecture reference

**Status:** research history, superseded as an implementation target by
the ICCRI Meta-Architecture Specification v1.0 (Approved Engineering
Baseline) — see `meta-architecture.md` in this same folder for what's
actually implemented now. This file remains as the record of how the
Entities/Relationships/Transformations shape was arrived at, and of
which questions the approved spec deliberately left open rather than
resolved.

Source: "Ontology of Idea-Centric Computing," v1.0 (alpha) → v2.0
(First Principles Draft), the ICCRI Chief Architect's Note.

This file exists so future implementation work starts from an accurate
read of the ontology rather than re-deriving it — and so the one open
question at its center isn't accidentally answered by code before the
research answers it.

## What the document actually says

Two successive drafts, not one settled model:

**v1.0** proposes the Idea as the fundamental unit, with a supporting
cast of Insight, Concept, Question, and Knowledge Object (itself an
umbrella for First Principle, Framework, Theory, Method, Model,
Reference Architecture). Relationships between these are named
explicitly (`inspires`, `answers`, `combines into`, `supports`,
`informs`, `produces`, `documented by`, `cites`, etc.) but are treated
as edges connecting the primary objects.

**v2.0** revises this twice, live, within the same document:
- Introduces **Understanding** as a new, more fundamental layer between
  Insight and Knowledge Object — knowledge is redefined as something
  that merely *records* understanding, rather than being the goal.
- Then explicitly reopens the question the whole platform is named
  after: *"I now suspect that the truly irreducible object is not the
  Idea — it is the Relationship."* The document does not resolve this.
  It proposes making it **the central research question of Monograph
  1**, and says plainly: *"I would not declare that as doctrine yet."*

## Why this matters for implementation

If Relationship (not Idea) turns out to be the fundamental
computational object, that changes more than a data model — it
changes what the platform's primary key is. Building a committed
schema today that hardcodes "Idea is the root, Relationship is
metadata on it" would embed the v1 answer into the architecture before
ICCRI's own research process has settled the question the document
itself raises. That's the premature-implementation risk worth naming
explicitly rather than working around quietly.

## What's already in the codebase, and how it relates

`types/knowledge.ts` (added Sprint 3.5) currently models `Idea`,
`Concept`, `Framework`, `Theory`, `ReferenceArchitecture` as separate
interfaces, each with a bare `relatedIds: string[]` — connections
exist, but as an untyped list, not as objects with their own identity
(no `kind`, no direction, no independent evolution). This is
compatible with v1's picture but doesn't yet reflect v2's core claim
that relationships are first-class and equally computable to nodes.

Not yet represented anywhere in the codebase: `Insight` (as an event,
not an object — v2 is explicit about this distinction), `Understanding`,
`Method` as distinct from `Framework`, the eleven-stage Idea Lifecycle
(Capture → Clarify → Explore → Connect → Validate → Formalize →
Publish → Discuss → Refine → Reuse → Evolve — considerably richer than
the current three-state `seed / developing / published` on `Idea`),
or Layer 3's human objects (Creator / Researcher / Reviewer /
Contributor / Community, distinct from the existing `Author`).

## Recommended posture until Monograph 1 resolves the open question

Treat both hypotheses as live rather than picking one:

- Don't restructure `types/knowledge.ts` around either resolution yet.
- If/when a `Relationship` type is introduced, shape it so it doesn't
  presuppose which side (node or edge) is "primary" — give it its own
  identity (`id`, `kind`, `fromId`, `toId`) so it's promotable to a
  first-class object without a rewrite, whichever way the research
  lands.
- Keep the three-state `Idea.status` as-is rather than expanding it to
  the eleven-stage lifecycle until there's a page that actually needs
  the finer granularity — the richer lifecycle is real, but speculative
  UI for it isn't.

This note should be updated (not replaced) as Monograph 1's research
resolves the open question, or as later ontology drafts arrive.

## Addendum — transformations as a third category (conceptual, no implementation)

A further refinement to keep in view alongside the open Idea-vs-
Relationship question: **transformations** (refinement, synthesis,
decomposition, contradiction, validation, generalization) are not the
same kind of thing as the relationships in Layer 5 of the ontology
document, even though both connect entities.

A relationship (`supports`, `extends`, `cites`) describes a static
edge between two things that already exist. A transformation is an
*operation* — it has provenance (which entities went in), a result
(what came out, which may be a new entity), and typically an actor
and a point in time. Synthesis, for instance, takes two or more
existing Ideas and produces a new one; that's structurally closer to
an event than to an edge. This lines up with how the ontology
document itself treats Insight — "an event, not an object" — so
transformations may belong in the same conceptual family as Insight
rather than alongside Relationship.

**No type is being added for this.** The only thing worth carrying
forward: if/when a `Relationship` type is eventually introduced (see
above — still blocked on Monograph 1), it should not be assumed to
also cover transformations. The two may end up as siblings — a graph
layer (nodes + relationships) and a provenance/event layer
(transformations, with inputs/outputs/actor/timestamp) — rather than
one flat edge type trying to represent both a static "supports" link
and an active "synthesized from" operation. Keeping that distinction
in mind now avoids a schema later that quietly conflates "these two
things are connected" with "this operation produced that entity."

## Frozen conceptual model (as of this note)

*Terminology note: the first category is called **Entities**, not
Objects — deliberately, to avoid confusion with object-oriented
programming and to keep clear that these are ontological entities,
not software objects. This is a documentation-only naming choice;
"Knowledge Object" above is the source ontology document's own term
and is left as-is.*

Implementation planning is frozen around a three-category conceptual
model — this is the shape future work should assume, even though
nothing below is implemented yet:

1. **Entities** — the domain entities (Idea, Insight, Concept,
   Question, Understanding, Knowledge Object and its subtypes, human
   objects, publication objects).
2. **Relationships** — static, named edges between existing Entities
   (`supports`, `extends`, `contradicts`, `cites`, ...).
3. **Transformations** — operations with provenance (inputs, a
   result, an actor, a timestamp) that can produce new Entities
   (`refinement`, `synthesis`, `decomposition`, `validation`,
   `generalization`, ...).

**What's frozen:** this three-category split itself, as the shape the
architecture should stay flexible enough to accommodate.

**What's explicitly still open, pending Monograph 1:** the internal
hierarchy within each category — most importantly, whether Entity
(Idea) or Relationship is the more fundamental of the two computationally,
and the full membership/definition of each category. Nothing here
should be read as resolving that question; it resolves only the
top-level shape, not the internals.
