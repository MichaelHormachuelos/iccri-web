import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicationTemplate } from "@/components/templates";
import { KnowledgeRelations, CalloutBox } from "@/components/editorial";
import { monographs, getMonograph } from "@/lib/monographs";
import { getKnowledgeRelationsFor, getPublicationsByAuthor } from "@/lib/domain/queries";
import { publicationHref } from "@/lib/domain/routes";

export function generateStaticParams() {
  return monographs.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const monograph = getMonograph(slug);
  if (!monograph) return {};
  return { title: monograph.title, description: monograph.summary };
}

export default async function MonographOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const monograph = getMonograph(slug);
  if (!monograph) notFound();

  const isContinuous = monograph.chapters.length === 0;

  return (
    <PublicationTemplate publication={monograph}>
      {monograph.editorNote && (
        <CalloutBox label="Editor's Note">
          <p>{monograph.editorNote.replace("Editor's Note: ", "")}</p>
        </CalloutBox>
      )}
      <p className="text-lg leading-relaxed">{monograph.abstract}</p>

      {isContinuous ? (
        <>
          {monograph.continuousText?.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </>
      ) : (
        <section className="mt-8">
          <h2>Chapters</h2>
          <ol className="mt-4 flex flex-col gap-2">
            {monograph.chapters.map((chapter) => (
              <li key={chapter.slug}>
                <Link
                  href={`/publications/monographs/${monograph.slug}/${chapter.slug}`}
                  className="text-accent hover:text-accent-hover"
                >
                  {chapter.number}. {chapter.title}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <KnowledgeRelations
        relations={getKnowledgeRelationsFor(`publication:${monograph.slug}`)}
      />

      {(() => {
        const others = getPublicationsByAuthor("person:michael-g-hormachuelos").filter(
          (p) => p.id !== `publication:${monograph.slug}`,
        );
        if (others.length === 0) return null;
        return (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-serif text-lg font-semibold text-ink">
              More from this author
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {others.map((p) => (
                <li key={p.id} className="text-sm">
                  <Link href={publicationHref(p)} className="text-accent hover:text-accent-hover">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })()}
    </PublicationTemplate>
  );
}
