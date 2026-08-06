# RC-3 — Knowledge Publication Release

**Status:** Complete.

## Objectives

Replace placeholder content with ICCRI's real research corpus — not as
a document migration, but as a knowledge publication: communicating
ICCRI's ideas in the form best suited to a reader, distinguishing the
settled knowledge concepts from the scholarly arguments that established
them, and doing all of it without triggering the Domain-layer work
ADR-0003 deliberately deferred.

## Scope

RC-3 ran as three planning documents (Engineering Plan, Editorial
Strategy, Knowledge Publication Architecture — each reviewed and
approved before implementation started) followed by six implementation
steps:

1. Expand the Research landing page from two concepts to five.
2. Build public pages for Meta-Architecture, Computational Dimensions,
   and the Validation Framework — previously internal-only documents.
3. Add semantic relationship sections to all five knowledge pages.
4. Build the Monographs section using the hybrid publication model.
5. Populate the Publications index with real content, clearly
   distinguished from what's still placeholder.
6. Convert News from placeholders to real institutional milestones.

Steps 1–3 were implemented as one batch rather than three, since
expanding the Research landing page to link at pages that didn't exist
yet would have been a new 404 for however long it sat alone —
consistent with the project's standing "no partially broken state
between batches" discipline.

## Major Architectural Decisions

- **RC-3 stays entirely static.** Real content, hand-authored into
  page data, with zero Ontology or Domain-layer wiring — the direct
  consequence of recognizing, during planning, that RC-3 was exactly
  the condition ADR-0003 named as the trigger for that deferred work.
  Staying static was a deliberate choice to avoid crossing that
  threshold by accident.
- **Monographs and News are built as data-driven dynamic routes**
  (`lib/monographs.ts` + `[slug]/[chapter]`, `lib/news.ts` + `[slug]`)
  rather than one hand-written file per chapter or article. With 30
  real chapters across three monographs, hand-writing 34 separate
  route files would have been unmaintainable; `generateStaticParams`
  keeps the output fully static while the source stays a single data
  module per content type.
- **A real Next.js 15 breaking change was caught and fixed before
  reaching production**: dynamic route `params` must be awaited as a
  `Promise`, not accessed synchronously. Both dynamic route
  implementations were corrected to the documented-correct pattern
  before verification, not discovered after.

## Editorial Decisions

- **Hybrid monograph publication strategy** — a web-native abstract
  atop the full text, chaptered where the source genuinely supports
  chapters (Monographs 2–4) and presented continuously where it
  doesn't (Monograph 1) — decided only after directly inspecting each
  monograph's actual structure, not assumed from Monograph 1's example.
- **Genesis Monograph treatment** — Monograph 1's original first-person,
  exploratory voice was preserved unaltered rather than rewritten to
  match Monographs 2–4's more formal prose. An Editor's Note (rendered
  via the previously-unused `CalloutBox` component) frames the
  stylistic difference for readers instead of erasing it.
- **Knowledge-first publication model** — knowledge pages (First
  Principles, Research Method, Meta-Architecture, Computational
  Dimensions, Validation Framework) explain and distill; monographs
  argue and provide evidence. Neither duplicates the other; each links
  outward to the other rather than repeating its content.
- **Semantic relationship policy** — every conceptual connection is
  authored with an explicit verb (`motivates`, `extends`, `supports`,
  `evaluates`, `documents`, and others) rather than generic "Related"
  or "See Also" language, with each verb placed only where it's
  genuinely the active, true direction. The resulting graph is
  intentionally asymmetric in places — a reverse link was never forced
  just to make a page look symmetric.
- **Research as the home of the five foundational concepts** — Meta-
  Architecture, Computational Dimensions, and the Validation Framework
  joined First Principles and Research Method as peers on the existing
  Research landing page, rather than creating a new top-level nav
  category. This kept faith with the earlier finding (from the
  Editorial Strategy) that ICCRI's navigation shouldn't be restructured
  — it just needed to actually contain what Research was always meant
  to hold.

## Files Created

- `components/editorial/KnowledgeRelations.tsx`
- `app/research/meta-architecture/page.tsx`
- `app/research/computational-dimensions/page.tsx`
- `app/research/validation-framework/page.tsx`
- `lib/monographs.ts`
- `app/publications/monographs/[slug]/page.tsx`
- `app/publications/monographs/[slug]/[chapter]/page.tsx`
- `lib/news.ts`
- `app/news/[slug]/page.tsx`

## Files Modified

- `config/navigation.ts` — Research's dropdown expanded to five entries
- `app/research/page.tsx` — landing grid expanded from 2 to 5 entries
- `app/research/first-principles/page.tsx` — semantic relationship section added
- `app/research/method/page.tsx` — semantic relationship section added
- `app/page.tsx` — homepage Research card copy updated
- `components/editorial/index.ts` — barrel export for `KnowledgeRelations`
- `app/publications/monographs/page.tsx` — real listing replacing placeholders
- `app/publications/page.tsx` — Featured Publications became Monographs (Published), Working Papers/Technical Reports (In development), Future Publications (Planned)
- `app/publications/monographs/[slug]/page.tsx` — Editor's Note rendering added
- `app/news/page.tsx` — real milestone listing replacing placeholders

Home, About were not modified. Research was modified, by design and
with explicit acknowledgment that RC-2A's "don't touch Research"
constraint didn't carry forward to this release.

## Verification Summary

- **Build verification** — no `npm run build` was run inside this
  sandbox (still no registry access); every batch was checked with a
  real `tsc` compilation against the project's actual strict
  `tsconfig.json` settings, using minimal ambient shims for
  `next`/`react` modules that couldn't be installed here. Every batch
  came back clean, with diagnostics limited to previously-confirmed
  shim artifacts (React's `key` prop, elided by real `@types/react`
  but not by this minimal shim).
- **Navigation verification** — every `config/navigation.ts` entry,
  including the expanded Research dropdown, cross-referenced directly
  against actual route directories after each batch.
- **Route verification** — same method, extended to the two dynamic
  route trees; confirmed no static route regressed across all six
  implementation steps.
- **Static generation verification** — slug uniqueness checked
  directly for both `lib/monographs.ts` (34 total slugs, zero
  duplicates) and `lib/news.ts` (zero duplicates) — a collision in
  either would silently break `generateStaticParams`.
- **Editorial verification** — Monograph 2–4 chapter structure and
  content checked against the actual source documents before any
  chapter-navigation UI was built, per the explicit instruction not to
  assume Monograph 1's structure applied to the others. News dates
  limited to what's actually established (the founding year) rather
  than invented specificity.

## Remaining Technical Debt

**RC-4**
- White Papers, Technical Reports, and Future Publications remain
  genuinely placeholder — no content exists yet to migrate.
- Library's unresolved information-architecture question (Library vs.
  Publications ambiguity, flagged since the Sprint 3 design review) is
  still open and still blocking any real Library content.
- An "RC-3 complete" News milestone should be added once this release
  report is itself approved — deliberately not added preemptively.
- The two non-blocking ESLint warnings from RC-1 remain unaddressed.
- RC-1B (deployment verification: CI/CD, runtime/smoke testing as a
  whole) remains open.

**Phase 2**
- The Domain layer ADR-0003 deferred is now closer to being needed —
  RC-3's static content was deliberately authored with real
  relationship-kind vocabulary so it could migrate cheaply, but the
  actual mapping/adapter layer is still not built.
- Some relationship verbs used editorially in RC-3 (`motivates`,
  `communicates`, `documents`, `evaluates`) aren't yet in
  `types/relationship.ts`'s canonical `RelationshipKind` union —
  reconciling that is Phase 2 work, not RC-4.
- `types/publication.ts`/`types/author.ts` vs. the Meta-Architecture's
  `PublicationEntity`/`PersonEntity` reconciliation, flagged since
  Phase 1A, remains untouched — RC-3 added real content on top of the
  existing presentation types rather than resolving that gap.

## Lessons Learned

- **Direct inspection changed the actual plan, not just confirmed it.**
  The assumption going in was that Monograph 1 set the template
  chapter structure the others would follow. Checking the real
  documents found the opposite — Monograph 1 is the one exception, not
  the model. Two separate real bugs (the Next.js 15 params change, an
  invalid `Grid` prop value in an earlier release) were also only
  caught because verification meant compiling and cross-referencing,
  not re-reading a summary of what should be true.
- **Editorial decisions about someone's actual authored voice aren't
  engineering decisions.** The Monograph 1 voice question was flagged
  and left for an explicit answer rather than resolved unilaterally,
  even though "clean up the prose" would have been the easy default.
  That's the same discipline as the architectural reviews earlier in
  this project — surface the judgment call, don't quietly make it.
- **Small primitives built ahead of need paid for themselves.**
  `CalloutBox` (Sprint 3.5) sat unused until the Editor's Note needed
  exactly what it already did. `NewsArticleTemplate` (Sprint 3.5) sat
  unused until Step 6. Neither had to be built differently to fit —
  evidence that some presentational primitives are worth building
  ahead of their first real consumer, distinct from domain/ontology
  types, which this project has been much more conservative about
  building speculatively.
- **Honesty about incompleteness held up under real content pressure.**
  It would have been easy to invent a specific founding date, add a
  premature "RC-3 complete" news item, or force a link where none
  existed, in service of a more "finished-looking" release. None of
  that happened, and the release is more credible for it, not less.

## Release Summary

RC-3 gave ICCRI's actual research corpus a public home. Five
foundational concepts — First Principles, Research Method, and, for
the first time, Meta-Architecture, Computational Dimensions, and the
Validation Framework — are now real, explained pages rather than
internal engineering documents. All four monographs are published in
full, each handled according to what it actually is rather than a
single forced template. The Publications index and News section
reflect the platform's real, current maturity rather than aspirational
placeholders. And the whole release was built without touching the
Domain layer ADR-0003 deferred — real content now exists in a shape
that will make that future migration cheaper, not harder, when Phase 2
actually begins.
