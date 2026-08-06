import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsArticleTemplate } from "@/components/templates";
import { newsArticles, getNewsArticle } from "@/lib/news";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  return (
    <NewsArticleTemplate article={article}>
      {article.body.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {article.link && (
        <p className="mt-8">
          <Link href={article.link.href} className="text-accent hover:text-accent-hover">
            {article.link.label} →
          </Link>
        </p>
      )}
    </NewsArticleTemplate>
  );
}
