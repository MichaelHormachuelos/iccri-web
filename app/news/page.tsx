import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { newsArticles } from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements and milestones from ICCRI.",
};

export default function NewsPage() {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
            News
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">
            Announcements and milestones from ICCRI.
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-4">
          {newsArticles.map((article) => (
            <Card key={article.slug} as="article">
              <p className="text-sm text-ink-muted">{article.publishedAt}</p>
              <h2 className="mt-1 font-serif text-lg font-semibold text-ink">
                <Link href={`/news/${article.slug}`} className="hover:text-accent">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-ink-secondary">{article.summary}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
