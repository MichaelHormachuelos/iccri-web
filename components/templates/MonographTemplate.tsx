import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Monograph } from "@/types/monograph";

interface MonographTemplateProps {
  monograph: Monograph;
  activeChapterSlug?: string;
  children: ReactNode;
}

/**
 * Reader template for a monograph chapter. Extends the Publication
 * header pattern with a chapter table of contents, since a monograph
 * is read chapter-by-chapter rather than as one page (Publication
 * Manual: monographs run 50-300 pages). Sidebar collapses above the
 * content on narrow viewports rather than a separate mobile nav.
 */
export function MonographTemplate({
  monograph,
  activeChapterSlug,
  children,
}: MonographTemplateProps) {
  return (
    <Section as="main" spacing="lg">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
        <aside className="order-2 lg:order-1">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            Monograph
          </p>
          <h2 className="mt-1 font-serif text-lg font-semibold text-ink">
            {monograph.title}
          </h2>
          {monograph.seriesTitle && (
            <p className="mt-1 text-xs text-ink-muted">{monograph.seriesTitle}</p>
          )}
          <nav aria-label="Chapters" className="mt-6">
            <ol className="flex flex-col gap-1 border-l border-border pl-4">
              {monograph.chapters.map((chapter) => {
                const active = chapter.slug === activeChapterSlug;
                return (
                  <li key={chapter.slug}>
                    <Link
                      href={`/publications/monographs/${monograph.slug}/${chapter.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={
                        active
                          ? "block py-1 text-sm font-medium text-ink"
                          : "block py-1 text-sm text-ink-secondary hover:text-ink"
                      }
                    >
                      {chapter.number}. {chapter.title}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <article className="editorial-body order-1 text-ink lg:order-2">
          {children}
        </article>
      </Container>
    </Section>
  );
}
