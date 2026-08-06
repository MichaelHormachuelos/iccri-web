# ICCRI Website — Early Sprint Log (Sprint 0 – 3.5)

**Archived.** This was the project README through Sprint 3.5, before
RC-1 through Platform Refresh v2.0 existed. Preserved here as
historical record rather than deleted — some of it (the Sprint 3.5
design-debt table, the Meta-Architecture summary) documents real
decisions not fully repeated elsewhere. For the current architecture,
see the top-level `README.md`. For every release from RC-1 onward,
see `docs/releases/` — those reports are more detailed and more
current than anything below.

---

# ICCRI Website (v2)

Official website of the Idea-Centric Computing Research Initiative.

## Release history

Every completed release milestone (RC-2A, RC-2B, RC-3, ...) has a
release report under `docs/releases/` — objective, scope, files
touched, verification performed, and technical debt carried forward.
Start there for a chronological view of how the platform evolved.
See the `docs/releases/` directory for the full chronological list.

## Stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Sprint 0 — Foundations

- App Router project structure (`app/`, `components/`, `lib/`, `content/`)
- Strict TypeScript config
- Tailwind v4 wired through PostCSS
- ESLint flat config, `no-explicit-any` enforced per project standards
- Layout primitives: `Container`, `Section`, `Grid`
- `config/` (site, navigation, metadata, theme) and `types/` (reserved,
  empty) added per architecture review

## Sprint 1 — Design system (current state)

Brand direction: **Editorial Ink** — warm paper, near-black ink, single
indigo accent; Source Serif 4 (editorial/headings) + Inter (UI/body).

- Design tokens defined in `app/globals.css` via Tailwind v4's `@theme`
  (colors, font families, radii) — mirrored in `config/theme.ts` for
  non-CSS consumers (Framer Motion, canvas/SVG)
- Fonts loaded via `next/font/google` in `app/layout.tsx` (self-hosted
  at build time, no runtime Google Fonts request) — **this means
  `npm run build` needs network access to fetch the font files once**
- `components/ui/Button.tsx` (primary/secondary/ghost), `components/ui/Card.tsx`
- `components/nav/Nav.tsx` — desktop inline nav + mobile disclosure panel,
  data-driven from `config/navigation.ts`
- `components/layout/Footer.tsx` — data-driven from the same nav config,
  plus a Governance link per Operating Policies' website governance
  requirements
- `app/design-system/page.tsx` — internal-only live preview of every
  token and primitive above, at `/design-system`

Not yet done (deferred to later sprints): dark mode, `Link` primitive
with external-link icon treatment, favicon/OG image.

## Sprint 2 — Navigation, footer, home page (current state)

Applied four architectural recommendations from the Sprint 1 review
before starting:

1. **Library promoted to top-level nav** — was nested under
   Publications, now a peer of it in `config/navigation.ts`.
2. **`components/search/` reserved** (empty, `.gitkeep`) for future
   search functionality.
3. **Component namespaces standardized** — `components/nav/` renamed
   to `components/navigation/` to match the convention going forward
   (`navigation/`, `forms/`, `publication/`, `research/` as those
   domains get built).
4. **Future `/docs` section** — noted here rather than scaffolded as
   an empty route, to avoid dead code before there's real developer
   documentation to put in it. Revisit when Sprint 5+ engineering
   docs exist.

Also this sprint:

- `components/navigation/NavDropdown.tsx` — desktop hover/focus
  dropdown for Research and Publications sub-items; mobile disclosure
  now renders children indented inline
- Real Home page: hero, mission-statement pull-quote (sourced from the
  Founding Constitution), and a three-entry-point section (Research,
  Publications, Community) built from `Card` + `Grid`

The Home page copy is a first draft grounded in the founding
documents, not final institutional copy — please review before
treating it as publishable.

## Sprint 3 — Page template system (current state)

`components/templates/` — five reusable templates so page consistency
is structural, not a convention to remember:

- `StandardPageTemplate` — header (eyebrow/title/lede) + prose body.
  Default choice for content pages (About, Contribute, Contact,
  governance, First Principles, Research Method).
- `ResearchLandingTemplate` — header + entry-card grid, for sections
  that fan out into sub-pages (Research today).
- `PublicationTemplate` — publication header (type badge, title,
  authors, date, summary) + prose body. Reads `types/publication.ts`.
- `MonographTemplate` — extends the publication header pattern with a
  chapter table of contents sidebar. Reads `types/monograph.ts`.
- `NewsArticleTemplate` — simpler header (date + title, no
  author/type badge) + prose body. Reads `types/news.ts`.

`types/` now holds `author.ts`, `publication.ts`, `monograph.ts`,
`news.ts` — added as each template needed its shape, rather than all
eight originally-listed types up front, to avoid unused speculative
types sitting in the codebase. `research.ts`, `resource.ts`,
`category.ts`, `tag.ts` will follow when Projects/Library pages
consume them.

Pages built this sprint, all composed from templates rather than
hand-built layout: `/about` (StandardPageTemplate), `/research`
(ResearchLandingTemplate), `/research/first-principles` and
`/research/method` (StandardPageTemplate). A `.prose-page` utility
class was added to `globals.css` for template body typography (no
typography plugin installed).

Page copy on these routes is drafted from the founding documents in
ICCRI's own voice, condensed for the web — treat as a first draft for
your review, same as the Home page.

## Getting started

This project's dependencies were **not installed or built in the
authoring environment** (no network access there — see note below).
Before anything else, run:

```bash
npm install
npm run dev
```

Then verify before treating any sprint as complete:

```bash
npm run typecheck
npm run lint
npm run build
```

## Note on verification

`next build` itself still can't run in this sandbox — no network access
to install `next`, `@types/react`, or `@types/node`. But as of
Implementation Phase I, a real (not just eyeballed) type-check was run:
the globally-available TypeScript compiler, against the actual project
`tsconfig.json` settings (`strict`, `noUncheckedIndexedAccess`, etc.),
with minimal ambient shims standing in for `next`/`react` modules that
couldn't be installed. That's a genuine partial verification, not a
substitute for a real build — the shims are loose enough that anything
depending on exact Next.js or React type behavior (e.g. JSX's special
handling of the `key` prop) can produce false positives, which were
manually confirmed and excluded rather than "fixed."

It did catch three real bugs, since they were independent of the shim
gaps — all fixed:
- An invalid `Grid` `colsMd` value (`5`, not in the `1|2|3|4|6|12`
  union) in `app/design-system/page.tsx`.
- Two `noUncheckedIndexedAccess` violations (`ArchitectureDiagram.tsx`,
  `ProcessFlow.tsx`) where array/split results were used without
  accounting for possibly-`undefined` elements — the project's own
  strict settings would have failed a real build on these.

Please still run the three verify commands above once you `npm install`
in an environment with registry access — this partial check reduces
risk, it doesn't eliminate the need for a real build.

**RC-1A (Local Build Verification) status: complete.** Verified in a
real environment (Windows, Node v24.19.0, npm 11.17.0) — `npm install`,
`lint`, `typecheck`, and `build` all passed cleanly, including a real
fix along the way (a `Button.tsx` interface-merging conflict between
required and inherited-optional `children`, resolved by excluding
`children` from the extended native HTML attributes type). Two
non-blocking ESLint warnings remain (`ConceptMap.tsx`, `Button.tsx`) —
not build-blocking, left for a future pass unless prioritized sooner.

**RC-1B (Deployment Verification) status: not started.** Split out from
the original RC-1 scope to distinguish "builds locally" from "runs in
production." Covers: GitHub synchronization, production deployment, CI/CD
verification, runtime verification, and production smoke testing.
Scheduled for whenever the deployment environment is prepared — none of
it has run yet.

**RC-2A (Zero 404 Navigation) status: complete.** Every route reachable
from the main nav, its dropdowns, and the footer now resolves to a real
page: `/publications`, `/publications/monographs`,
`/publications/white-papers`, `/library`, `/projects`, `/community`,
`/news`, `/contribute`, `/contact`, and `/governance` (the last one
found via audit, not the original request — a hardcoded footer link
with no page since Sprint 1). Verified two ways: a direct cross-check
of every `href` in `config/navigation.ts` and `Footer.tsx` against
every route directory in `app/`, and the same real-`tsc`-against-shims
method used since RC-1 — zero new type errors beyond the
already-confirmed shim artifacts.

## Project structure

```
app/                    App Router routes, layouts, global styles
components/layout/      Container, Section, Grid, Footer
components/navigation/  Nav, NavDropdown
components/ui/          Surface, Card, Button — general UI primitives
components/templates/   Page-level templates (Standard, Research Landing,
                         Publication, Monograph, News Article)
components/diagrams/    The ICCRI visual language (see Sprint 3.5 below)
components/editorial/   Long-form reading system (see Sprint 3.5 below)
components/people/      Human-presence pattern
components/search/      Reserved, empty — future search
config/                 site, navigation, metadata, theme — centralized config
types/                  Shared domain models
lib/                    Shared utilities
content/                Future home for structured content (publications, etc.)
```

## Sprint 3.5 — Institutional identity (current state)

Not a feature sprint — a response to the Sprint 3 design review's core
finding: the site was an elegant editorial experience, not yet a
recognizable research institution. Ten findings addressed:

**1. Homepage narrative rewritten.** Previously opened with the mission
statement (the resolution). Now opens with the problem stated in the
Constitution's own preamble — ideas scattered across files and
documents, disconnected, eventually forgotten — before introducing
ICCRI as the response to that problem.

**2. ICCRI visual language.** New `components/diagrams/` system, built
on shared primitives (`DiagramFrame`, `DiagramNode`, `DiagramConnector`,
`DiagramContainer`) rather than one-off SVGs per page:
- `ConceptMap` — concept maps, knowledge graphs, and idea-relationship
  diagrams are all the same visual form (labeled nodes + edges), so
  one parameterized component serves all three.
- `ProcessFlow` — research framework, research process, and system
  flow diagrams; now used on `/research/method` for the seven stages.
- `ArchitectureDiagram` — containment/structural diagrams; now used
  on `/about` for the ICCRI/Creator OS/Publications relationship.
- `Timeline` — institutional milestones; now used on `/about`.
- `ParadigmShiftDiagram` — the homepage's signature visualization,
  the one diagram meant to become recognizably ICCRI's.

**3. Editorial design system.** New `components/editorial/`:
`PullQuote`, `CalloutBox`, `Figure` (numbered, with caption),
`GlossaryTerm`, `Citation` + `ReferenceList`. A new `.editorial-body`
CSS class (serif body text, 1.8 line-height, drop cap on the first
paragraph) is now used by `PublicationTemplate` and `MonographTemplate`
instead of the sans-serif `.prose-page` — addressing the design
review's finding that all-sans body text undercut the "editorial ink"
identity for 50-300 page monographs.

**4. Institutional identity.** `site.foundedYear` added; a `Timeline`
with the founding milestone now appears on `/about`. Kept intentionally
minimal — one real milestone rather than invented history.

**5. Signature visualization.** `ParadigmShiftDiagram` on the homepage,
directly under the opening narrative — files/applications/documents
disconnected on the left, the idea as connective center on the right.

**6. Human presence.** New `components/people/ContributorCard` —
a typeset monogram in place of a photo, not a corporate headshot.
Used in a "From the founder" section on the homepage, attributed to
Michael G. Hormachuelos as stated in the Monograph 1 byline.

**7. Accessibility fixes.**
- `--color-ink-muted` was already `#6b675e` in `globals.css` (passes
  WCAG AA, ~5.3:1 on paper) but `config/theme.ts` had drifted to the
  old failing value `#8c887f` — synced. Worth flagging: this means
  the Sprint 3 review's contrast finding was evaluating a token value
  that wasn't actually live on the site, only in the un-synced mirror.
- Skip-to-content link added in the root layout.
- `NavDropdown` now tracks real open state and sets `aria-expanded`
  accurately, instead of relying on implicit CSS visibility.
- Alt-text strategy: not yet applicable — the site has zero images
  today (diagrams are inline SVG with `role="img"` + `<title>`/`<desc>`,
  which is their accessible name; there's no `<img>` anywhere yet).
  Decide the policy explicitly before Sprint 4 introduces publication
  cover art, don't default into one.
- `prefers-reduced-motion` support: unchanged, already global.

**8. Component consistency.** New `components/ui/Surface.tsx` — the
one raised-surface treatment (border + radius + background). `Card`
now composes `Surface` instead of duplicating its styles; `NavDropdown`'s
popover does the same. The homepage pull-quote now uses the shared
`PullQuote` component instead of hand-authored blockquote markup.

**9. Domain objects.** New `types/knowledge.ts` — `Idea`, `Concept`,
`FirstPrinciple`, `ResearchQuestion`, `ResearchTheme`, `Framework`,
`Theory`, `ReferenceArchitecture`, and a `KnowledgeObject` discriminated
union. Types only, intentionally not wired into any page, template, or
data source yet — they exist so future Research/knowledge-graph work
has an agreed shape rather than inventing one mid-sprint.

**10. Future readiness.** No new systems implemented (per instruction).
The diagram and editorial components are plain React/SVG with no data
dependency, so a future Markdown/CMS layer can feed them props without
a rewrite; `KnowledgeObject`'s discriminated-union shape is what a
future search index or knowledge-graph view would consume.

### Before / after

| | Before (Sprint 3) | After (Sprint 3.5) |
|---|---|---|
| Homepage opening | Mission statement first | Problem first, resolution second |
| Core concept | Described in text only | Shown in the signature diagram |
| Research Method page | Numbered list only | List + `ProcessFlow` diagram |
| About page | Text only | Text + `Timeline` + `ArchitectureDiagram` |
| Monograph/Publication body | Sans-serif `.prose-page` | Serif `.editorial-body` |
| Pull-quote | One-off markup on Home | Shared `PullQuote` component |
| Raised surfaces | Duplicated in `Card` and `NavDropdown` | Both compose `Surface` |
| People | None | `ContributorCard` pattern, used once |
| `NavDropdown` a11y | Implicit visibility only | Real `aria-expanded` state |

### Remaining design debt

**Critical**
- Seven nav/footer destinations (Publications, Library, Projects,
  Community, News, Contribute, Contact, Governance) are still
  unbuilt — unchanged from Sprint 3, out of scope for this sprint by
  instruction, but still the top pre-launch blocker.

**Moderate**
- `ParadigmShiftDiagram` and the diagram system generally have not
  been visually tested in a real browser (no `next build` run in this
  sandbox) — coordinate math was hand-checked, not rendered.
- Library vs. Publications naming ambiguity, identified in the Sprint
  3 review, is still unresolved — out of scope for an identity sprint,
  belongs with the Sprint 4 IA work.
- `.editorial-body`'s drop-cap only fires on the first `<p>` — fine for
  Publication/Monograph templates today, but will need revisiting once
  Figures or CalloutBoxes can legitimately open a chapter.

**Minor**
- No favicon or Open Graph image — still open from Sprint 3.
- Dark mode — still an undecided, deferred item.
- `Citation`/`ReferenceList` are built but not yet used anywhere real
  (no publication page exists yet to cite from) — first real usage
  will be Sprint 4's Monograph 1 Chapter 1 page.

### Recommendations before Sprint 4

1. Verify the diagram system in an actual browser before it multiplies
   across Publications/Library pages — coordinate-math SVG is the
   highest-risk hand-authored code in the project.
2. Resolve the Library/Publications naming question as part of Sprint
   4's IA work, before Library gets built on an ambiguous premise.
3. Decide the alt-text policy explicitly once Sprint 4 introduces the
   first real cover art or figure image, rather than defaulting.
4. Consider whether `ConceptMap` should become the visual for a future
   Idea/Concept browser once `types/knowledge.ts` gets a real data
   source — the type and the diagram were designed to fit each other.

## Sprint 3.5 (v0.2) — Delta round

A second brief arrived covering essentially the same ten findings as
the first Sprint 3.5 pass above — same success criteria, same
structure. Rather than redo completed work, only the genuinely new
requests from this version were implemented:

- **`ParadigmShiftDiagram` revised to three stages** (document-centric
  → application-centric → idea-centric) instead of the earlier
  two-stage version. Homepage caption updated to match.
- **`IdeaLifecycle` diagram added** — new in this version's diagram
  list. Deliberately built to read its states (`seed` / `developing`
  / `published`) from the same union already defined on `Idea` in
  `types/knowledge.ts`, so the diagram and the domain type describe
  one shape, not two.
- **`Footnotes` / `FootnoteMarker` added**, distinct from the existing
  `Citation` + `ReferenceList` pair — footnotes anchor to the bottom
  of the page they occur on; citations anchor to a References section
  at the end of a work. Both exist now because scholarly long-form
  writing genuinely uses both patterns for different purposes.

**On "the site should embody Idea-Centric Computing, not just describe
it"** — this is a real design direction worth naming rather than
quietly building toward: `ConceptMap` (nodes + typed edges),
`KnowledgeObject` (a discriminated union any entity can join), and
`IdeaLifecycle` (states an idea moves through) are deliberately
shaped so that once real content exists, pages could be *linked* the
way ideas relate to each other — not just organized in a nav tree.
That's a genuine future direction, not something to build speculatively
now without content to link. Flagging it here as the throughline
connecting `types/knowledge.ts`, `ConceptMap`, and `IdeaLifecycle`,
should a future sprint want to make it literal (e.g., a "related
ideas" section on publication pages, sourced from `relatedIds`).

## Meta-architecture — Entities, Relationships, Transformations (current state)

The ICCRI Meta-Architecture Specification v1.0 arrived as an
**Approved (Engineering Baseline)** document — a different status
from the research drafts referenced above, and explicitly meant to be
implemented against. Full detail in
`docs/architecture-notes/meta-architecture.md` (rationale) and
`docs/engineering-notes/meta-architecture.md` (implementation mapping);
see `docs/README.md` for the three-artifact documentation convention
these follow. Summary:

- `types/entity.ts` — `Entity` base + canonical kinds (`Idea`,
  `Concept`, `Question`, `KnowledgeObject`, `PublicationEntity`,
  `PersonEntity`, `OrganizationEntity`), matching the spec's canonical
  entity list exactly.
- `types/relationship.ts` — `Relationship` with the spec's twelve
  canonical kinds (`supports`, `extends`, `contradicts`, ...) and its
  own `id`/`fromId`/`toId` — no longer a bare array on `Idea`.
- `types/transformation.ts` — `Transformation` with the spec's nine
  canonical kinds (`capture`, `refinement`, `synthesis`, ...) and
  optional provenance fields (`actor`, `occurredAt`, `context`).
- `types/knowledge.ts` is now a barrel re-exporting the three files
  above, kept at that path for continuity with earlier sprints.

Still types only — nothing above is wired into a page, template, or
data source. What changed from Sprint 3.5 is *why* these exist now:
previously withheld because the top-level shape was an open research
question; now built because an approved spec settled that question
for engineering purposes, while explicitly leaving the deeper
questions (Idea vs. Relationship primacy, Understanding) to research.

**Known gap, not yet resolved:** `types/publication.ts` and
`types/author.ts` (used by real, shipped templates) predate this spec
and aren't reconciled with `PublicationEntity`/`PersonEntity` yet —
recorded in `meta-architecture.md` rather than silently left
inconsistent.

## Computational Dimensions — RAE Cycle in progress

A companion architectural document, "ICCRI Computational Dimensions"
(Identity, Time, Context), is going through the ICCRI Research →
Architecture → Engineering Review → Adjudication cycle. Status,
review findings, and Chief Architect rulings so far are tracked in
`docs/architecture-notes/computational-dimensions.md`, with forward-
looking technical considerations in
`docs/engineering-notes/computational-dimensions.md`. No code or type
changes have resulted from it — still conceptual, pending a v1.1
revision and a follow-up review.
