# Platform Refresh — Version 2.0

**Status:** Complete.

## Objective

Update the ICCRI website to reflect the current state of the
institute — real branding, real leadership, and content that presents
ICCRI as an active research organization rather than only an
engineering architecture.

## Scope

Institutional branding, a Domain-Layer-driven Leadership section,
homepage and About refreshes, repository alignment review.

## Files created

- `public/images/iccri-logo.png`, `founder.png`, `co-founder.png`,
  `iccri-banner.png` (real provided assets)
- `app/icon.png` (favicon, Next.js file convention)
- `app/opengraph-image.png` (social preview image, Next.js file convention)
- `lib/domain/leadershipMetadata.ts`
- `components/people/LeadershipCard.tsx`

## Files modified

- `lib/domain/entities.ts` — added `person:marivic-m-hormachuelos`
- `lib/domain/queries.ts` — added `getLeadership()`; fixed a real type
  bug caught during verification (see findings)
- `components/navigation/Nav.tsx`, `components/layout/Footer.tsx` —
  logo integrated alongside the existing text wordmark
- `app/about/page.tsx` — real Leadership section, accurate corpus-size
  note
- `app/page.tsx` — Leadership preview (replacing the single-founder
  monogram note), corrected two inaccuracies found during the refresh

## Verification

Real `tsc` pass: one genuine bug found and fixed (below); after the
fix, every remaining diagnostic matched an already-confirmed shim
artifact category from prior milestones — zero new issues. Domain
integrity audit: 16 entities (15 + the new Marivic record), 18
relationships (unchanged), zero orphans. Route count: 28, unchanged.

## Architectural observations

**A real bug, caught by the compiler, not assumed away.** The first
draft of `getLeadership()` spread `leadershipMetadata`'s `order` field
directly into the returned profile object, which doesn't belong on
`LeadershipProfile`. That broke the null-filtering type guard, which
cascaded into strict-mode "possibly undefined" errors in the sort
step. Fixed by sorting the metadata entries directly, before merging,
and explicitly excluding `order` from the merged shape via
destructuring.

**Two real, pre-existing inaccuracies were caught and fixed in the
course of this refresh, not introduced by it.** The homepage still
said "Five foundational concepts" on the Research card — Phase 2B
added a sixth (Idea Graph) and the copy was never updated. The
Publications card said "working papers," but what ICCRI has actually
published is a white paper — a different `PublicationType` value
entirely. Both fixed.

**A deliberate departure from an earlier design principle, named
rather than papered over.** Sprint 3.5 established `ContributorCard`'s
monogram-only pattern specifically to avoid corporate-style
photography, in the absence of real photographs. Real photographs now
exist, provided specifically for a Leadership section — using them is
the more honest choice once they're available, not a contradiction of
the earlier reasoning, which was itself conditional on not having
them. `ContributorCard` is left in place, unchanged, for any future
context where a photo isn't available or appropriate.

**One asset deliberately not used.** `iccri_campaign_visual.png` ("The
Future of Computing... Something Big Is Coming, Stay Tuned") is a
time-bound announcement graphic, not evergreen site content — using it
anywhere permanent on the live site would look stale almost
immediately after publication. Not copied into the repository.

**Repository alignment found nothing obsolete to remove.** Checked
directly (no TODO/FIXME/deprecated markers, no orphaned component
imports) rather than assumed clean — consistent with every prior audit
in this project.

## Remaining technical debt

- `LeadershipCard`'s `compact` mode drops the personal note
  `ContributorCard` used to carry on the homepage (a specific founder
  quote). The "Full profiles →" link mitigates this, but it's a real,
  disclosed simplification, not a strict improvement.
- `iccri-banner.png` is used only as the Open Graph image — not placed
  anywhere in on-page content, since its more graphic, gradient-heavy
  style sits in real tension with the site's established restrained
  visual language. Worth a deliberate decision later on whether/how to
  use it on-page, rather than leaving it unaddressed indefinitely.
- Same standing debt as before: Working Papers/Future Publications
  sections remain empty; the presentation-type/`PublicationDetails`
  unification remains open.

## Recommendations for Version 2.1

- If ICCRI grows its leadership or research team, `getLeadership()`
  and `leadershipMetadata.ts` are already built to scale — adding a
  person means one new `PersonEntity` and one new metadata entry, no
  template changes.
- Consider a deliberate decision on `iccri-banner.png`'s on-page use,
  rather than leaving it as an open item.
- Given the codebase has now been audited clean in three consecutive
  milestones (Phase 2A Stage 10, Phase 2F, this refresh), further
  "repository alignment" reviews are probably not worth scheduling as
  standalone work until a specific reason to suspect drift exists.
