# ICCRI Website (v2.1)

Official website of the Idea-Centric Computing Research Initiative —
[iccri.org](https://iccri.org).

## Stack

- Next.js 15 (App Router), TypeScript (strict), Tailwind CSS v4
- No external database, CMS, or backend service — content lives in
  typed data modules in the repository itself (see Architecture below)

## Getting started

```bash
npm install
npm run dev
```

Before treating any change as complete:

```bash
npm run typecheck
npm run lint
npm run build
```

## Architecture

The platform is organized into layers, each built on the one below it:

```
Presentation Layer     RC-1 – RC-3: pages, templates, design system
Domain Layer            Phase 2A – 2C: KnowledgeObject, PublicationEntity,
                         PersonEntity, and the relationships between them —
                         the real knowledge graph behind /research and
                         /publications
Institutional Layer     Phase 2D – 2E: proposed domain objects and workflow
                         definitions for future institutional operations
                         (submissions, certification, payments, grants) —
                         types only, intentionally not wired to any page
Infrastructure Layer    Not yet built — persistence, real service
                         integrations, authentication. Deferred until
                         ICCRI actually needs them (ADR-0003).
```

**Domain Layer** (`lib/domain/`): `entities.ts` and `relationships.ts`
hold the actual knowledge graph — every `KnowledgeObject` (First
Principles, Research Method, Meta-Architecture, Computational
Dimensions, Validation Framework, the Idea Graph), every
`PublicationEntity` (4 monographs, 1 white paper, 3 technical
reports), and the `PersonEntity` records for ICCRI's founders.
`queries.ts` is the only way pages read this data — no page hardcodes
a fact the Domain Layer already owns (the project's Single Source of
Truth principle, binding since Phase 2A). Every relationship in the
graph is grounded in a specific citation from the published research —
see the inline comments in `relationships.ts` and
`docs/releases/Phase-2B.md`/`Phase-2C.md` for the citations themselves.

**Institutional Layer** (`types/institutional/`): a separate,
unadjudicated domain model for institutional processes ICCRI doesn't
operate yet (research submissions, certification, payments, grants,
analytics) — pure TypeScript types and declarative workflow
definitions, zero runtime, zero persistence, zero external service
integration. See `types/institutional/README.md` for its status.

**Canonical vs. proposed types:** `types/entity.ts`,
`types/relationship.ts`, and `types/transformation.ts` are the
Approved Engineering Baseline (the ICCRI Meta-Architecture
Specification, implemented directly). `types/institutional/` is
explicitly *not* part of that baseline — extending the canonical
`EntityKind`/`RelationshipKind` unions is a reviewed architectural
decision (Engineering Principle 7), not routine work, so the
Institutional Layer was built as a parallel model instead.

## Project structure

```
app/                        App Router routes
components/layout/          Container, Section, Grid, Footer
components/navigation/      Nav, NavDropdown
components/ui/               Surface, Card, Button
components/templates/       Page-level templates
components/diagrams/        SVG diagram system
components/editorial/       Long-form reading system, KnowledgeRelations,
                             ReferencedBy
components/people/          ContributorCard, LeadershipCard
config/                     site, navigation, metadata, theme
types/                      Canonical domain types + types/institutional/
lib/domain/                 The Domain Layer (see above)
lib/monographs.ts           Monograph content, sourced from lib/domain/
lib/news.ts                 News content
public/images/              Real ICCRI brand assets (logo, leadership
                             photographs, banner)
docs/adr/                   Architecture Decision Records
docs/architecture-notes/    Rationale and history behind approved architecture
docs/engineering-notes/     Implementation-mapping notes
docs/releases/              One report per completed milestone — the
                             authoritative chronological record
docs/history/                Archived early-project documentation
```

`components/search/` and `content/` remain reserved and empty —
search was never built (no product need yet), and the structured-
content layer real content ended up living in `lib/domain/` and
`lib/monographs.ts`/`lib/news.ts` instead of a separate `content/`
directory. Both are kept in git via `.gitkeep` in case either is
picked up later.

## Release history

Every completed milestone from RC-1 onward has a release report under
`docs/releases/` — objectives, files touched, verification performed,
architectural findings, and technical debt carried forward. That's
the authoritative chronological record of how the platform reached
its current state; this README describes where it landed, not how it
got here. Earlier, pre-RC-1 sprint notes are archived in
`docs/history/early-sprint-log.md`.

## Verification

Every release in `docs/releases/` was verified with a real
`tsc` compilation against the project's actual `tsconfig.json`
(`strict`, `noUncheckedIndexedAccess`, etc.) — genuine type errors
were found and fixed this way multiple times across the project's
history (see individual release reports). RC-1 (the first real
`npm install`/`build`/`lint`/`typecheck` pass in an environment with
registry access) predates the `docs/releases/` convention, which
started with RC-2A — RC-1's verification is recorded in
`docs/history/early-sprint-log.md` instead. Two non-blocking ESLint
warnings from that pass (`ConceptMap.tsx`, `Button.tsx`) remain open,
not build-blocking.
