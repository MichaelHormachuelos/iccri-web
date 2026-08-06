import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { NewsArticle } from "@/types/news";

interface NewsArticleTemplateProps {
  article: NewsArticle;
  children: ReactNode;
}

/**
 * Detail template for a single news item. Deliberately simpler than
 * PublicationTemplate — no author/type badge, since institutional
 * news isn't authored scholarship in the Publication Manual sense.
 */
export function NewsArticleTemplate({ article, children }: NewsArticleTemplateProps) {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <Link href="/news" className="text-sm text-ink-secondary hover:text-ink">
          ← Back to news
        </Link>

        <header className="mt-6 max-w-2xl border-b border-border pb-8">
          <p className="text-sm text-ink-muted">{article.publishedAt}</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-ink md:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base text-ink-secondary">{article.summary}</p>
        </header>

        <div className="prose-page mt-10 max-w-2xl text-ink">{children}</div>
      </Container>
    </Section>
  );
}
