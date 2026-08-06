# RC-2A — Zero Internal Navigation 404s

**Status:** Complete.

## Objective

Eliminate every internal 404 reachable from the public site's
navigation — main nav, dropdown submenus, and footer — so a visitor
following any link the site itself presents always lands on a real
page, even where that page's content is still placeholder.

## Scope

RC-2A ran in two passes. The first built five top-level sections
(Publications, Library, Projects, Community, News) as placeholder-card
pages matching the existing design language. Reviewing that pass
surfaced two remaining gaps: the Publications dropdown's two children
(`/publications/monographs`, `/publications/white-papers`) and the
footer's `Contribute`/`Contact` links, none of which were in the
original explicit scope. The second pass closed those, plus one
further gap found only through direct audit — a `/governance` link
hardcoded in `Footer.tsx` since Sprint 1 with no page ever built
behind it.

No architectural work occurred in this release. Per ADR-0001/0003, all
new pages are Presentation-layer only, with no Ontology or Domain-layer
dependency — consistent with content not yet existing to back them.

## Files Created

- `app/publications/page.tsx`
- `app/publications/monographs/page.tsx`
- `app/publications/white-papers/page.tsx`
- `app/library/page.tsx`
- `app/projects/page.tsx`
- `app/community/page.tsx`
- `app/news/page.tsx`
- `app/contact/page.tsx`
- `app/contribute/page.tsx`
- `app/governance/page.tsx`
- `components/ui/PlaceholderCard.tsx`

## Files Modified

- `app/community/page.tsx` — CTA updated from a temporary `mailto:`
  link to the real `/contact` page once it existed.

Home, About, Research, `config/navigation.ts`, and `package.json` were
not modified at any point in RC-2A.

## Verification

- **Main navigation verified** — every top-level `config/navigation.ts`
  entry (`About`, `Research`, `Publications`, `Library`, `Projects`,
  `Community`, `News`) resolves to a real route.
- **Dropdown navigation verified** — Research's and Publications'
  children (`/research/first-principles`, `/research/method`,
  `/publications/monographs`, `/publications/white-papers`) all
  resolve.
- **Footer navigation verified** — the full footer nav (main nav +
  `Contribute` + `Contact`) plus the separately hardcoded `Governance`
  link all resolve.
- **Zero internal navigation 404s** — confirmed by cross-referencing
  every `href` in `config/navigation.ts` and `Footer.tsx` directly
  against every route directory under `app/`, not by manual click-
  through.
- **Existing architecture preserved** — no new Ontology or Domain
  types introduced; all new pages are Presentation-layer only, per
  ADR-0001.
- **Existing routes untouched** — Home, About, Research, and their
  three existing sub-routes were not modified in either pass.
- **Verification method used** — direct route/link cross-reference
  (see above), plus a real TypeScript compiler pass (`tsc`, not just
  syntax inspection) run against the project's actual `tsconfig.json`
  settings using minimal ambient shims for the `next`/`react` modules
  this sandbox can't install. Every diagnostic produced was manually
  confirmed as a known shim artifact (React's `key` prop, which real
  `@types/react` specially exempts from prop-type checking but this
  minimal shim doesn't replicate) rather than a real bug — zero real
  issues found in either pass. This is a genuine partial check, not a
  substitute for the real `npm run build` your local environment
  already confirmed passes.

## Remaining Technical Debt

**RC-2B**
- Deployment-side verification for the newly added routes specifically
  (they exist locally/in this build, but haven't individually been
  smoke-tested in the live Vercel deployment).

**RC-3**
- All placeholder content across Publications, Library, Projects,
  Community, and News gets replaced with real ICCRI research corpus
  content — this is RC-3's stated purpose.
- Library's information architecture question (Library vs. Publications
  ambiguity, flagged since the Sprint 3 design review and restated in
  the Phase I Platform Readiness Report) should be resolved before — or
  as part of — giving Library real content, not after.

**RC-4 or later**
- The two non-blocking ESLint warnings from RC-1 (`ConceptMap.tsx`,
  `Button.tsx`) — never addressed, never blocking, still open.
- RC-1B (deployment verification: CI/CD, runtime/smoke testing as a
  whole, not the RC-2B item above which is narrower) remains open from
  before RC-2A.

## Lessons Learned

- **"Zero 404s" needed an audit, not just the explicit list.** The
  original request named four missing pages; the actual gap was six,
  including one (`/governance`) that had been sitting in the footer
  since Sprint 1 without anyone noticing. A direct cross-reference of
  every configured link against every actual route caught this in
  minutes — worth doing as standard practice at the start of any
  "make sure X is complete" milestone, not just at the end.
- **Placeholder content still has an honesty bar.** The temporary
  `mailto:` address in the first pass was flagged as invented rather
  than shipped quietly, and the Contact page replacing it says
  explicitly that no address exists yet rather than inventing one that
  looks real. Placeholder pages can be complete without any individual
  placeholder pretending to be a fact.
- **A small shared component paid for itself immediately.**
  `PlaceholderCard` was written once and used across nine of the ten
  new pages — cheaper than five-plus near-duplicate card
  implementations, and it's the reason a design change to "Coming
  Soon" styling would now only need to happen in one place.
