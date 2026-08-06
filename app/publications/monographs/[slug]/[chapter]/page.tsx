import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MonographTemplate } from "@/components/templates";
import { getMonograph, monographs } from "@/lib/monographs";

export function generateStaticParams() {
  return monographs.flatMap((m) =>
    m.chapters.map((c) => ({ slug: m.slug, chapter: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}): Promise<Metadata> {
  const { slug, chapter: chapterSlug } = await params;
  const monograph = getMonograph(slug);
  const chapter = monograph?.chapters.find((c) => c.slug === chapterSlug);
  if (!monograph || !chapter) return {};
  return {
    title: `${chapter.title} — ${monograph.title}`,
    description: monograph.summary,
  };
}

export default async function MonographChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const { slug, chapter: chapterSlug } = await params;
  const monograph = getMonograph(slug);
  const chapter = monograph?.chapters.find((c) => c.slug === chapterSlug);
  if (!monograph || !chapter) notFound();

  return (
    <MonographTemplate monograph={monograph} activeChapterSlug={chapter.slug}>
      <h1 className="font-serif text-3xl font-semibold text-ink">
        {chapter.number}. {chapter.title}
      </h1>
      {chapter.paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {chapter.list && (
        <ul>
          {chapter.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </MonographTemplate>
  );
}
