import type { NewsArticle } from "@/types/news";

export interface NewsArticleContent extends NewsArticle {
  body: string[];
  link?: { label: string; href: string };
}

/**
 * Real institutional milestones, not placeholders. Dates are the
 * year only (2026) — that's what's actually established (site's
 * founding year); no fabricated month or day is attached to any
 * entry. News stays outside the Entities/Relationships/Transformations
 * ontology per ADR-0004, so entries link out plainly rather than
 * through KnowledgeRelations' semantic-verb vocabulary.
 */
export const newsArticles: NewsArticleContent[] = [
  {
    slug: "iccri-founded",
    title: "ICCRI Founded",
    publishedAt: "2026",
    summary:
      "The Idea-Centric Computing Research Initiative begins its research program.",
    body: [
      "ICCRI was founded to investigate whether computing could be organized around the idea itself, rather than the files, applications, and documents that happen to hold it. The initiative's founding constitution set out its mission: to advance the theory, architecture, and practice of Idea-Centric Computing through rigorous research, open scholarship, and responsible innovation.",
    ],
    link: { label: "About ICCRI", href: "/about" },
  },
  {
    slug: "first-principles-established",
    title: "First Principles Established",
    publishedAt: "2026",
    summary:
      "ICCRI publishes the first-principles posture underlying its research method.",
    body: [
      "Rather than beginning with an improvement to existing tools, ICCRI's research starts by questioning fundamental assumptions — identifying the most basic concepts underlying a problem before accepting inherited categories. This first-principles posture now has a public page of its own, setting out why the research program is structured the way it is.",
    ],
    link: { label: "Read First Principles", href: "/research/first-principles" },
  },
  {
    slug: "research-method-established",
    title: "Research Method Established",
    publishedAt: "2026",
    summary:
      "ICCRI adopts a seven-stage research method for developing emerging ideas before they mature into established theory.",
    body: [
      "The ICCRI Research Method addresses the earliest stage of inquiry — before a research question is settled enough for conventional methods to apply. Its seven stages, from Discovery through Publication, now have a public page describing how the method complements established research methodologies rather than replacing them.",
    ],
    link: { label: "Read the Research Method", href: "/research/method" },
  },
  {
    slug: "meta-architecture-approved",
    title: "Meta-Architecture Approved",
    publishedAt: "2026",
    summary:
      "The Meta-Architecture Specification reaches Approved Engineering Baseline status.",
    body: [
      "Following review, the Meta-Architecture Specification — organizing Idea-Centric Computing around three categories, Entities, Relationships, and Transformations — was approved as a stable engineering baseline. Its maturity as an engineering target is distinct from empirical validation, which remains governed separately by the Validation Framework.",
    ],
    link: { label: "Read Meta-Architecture", href: "/research/meta-architecture" },
  },
  {
    slug: "rc-1-reproducible-baseline",
    title: "RC-1: Reproducible Engineering Baseline",
    publishedAt: "2026",
    summary:
      "The platform's first verified, reproducible build — installed, linted, type-checked, and built cleanly in a real environment.",
    body: [
      "RC-1 established that the codebase builds cleanly outside of planning and review: a real dependency install, a generated lockfile, and a passing lint, type-check, and production build in an actual development environment, closing out the engineering foundation ahead of any content work.",
    ],
  },
  {
    slug: "rc-2a-zero-404-navigation",
    title: "RC-2A: Zero 404 Navigation",
    publishedAt: "2026",
    summary:
      "Every route reachable from the site's navigation, dropdowns, and footer resolves to a real page.",
    body: [
      "RC-2A closed every internal dead link reachable from the public site — the main navigation, its dropdown submenus, and the footer — verified by direct cross-reference against the actual route structure rather than manual click-through.",
    ],
    link: { label: "See Publications", href: "/publications" },
  },
];

export function getNewsArticle(slug: string): NewsArticleContent | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
