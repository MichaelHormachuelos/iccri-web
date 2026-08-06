import type { Metadata } from "next";
import { PublicationTemplate } from "@/components/templates";
import { KnowledgeRelations, ReferencedBy, CalloutBox } from "@/components/editorial";
import {
  getPublicationDetails,
  getKnowledgeRelationsFor,
  getReferencingRelationships,
} from "@/lib/domain/queries";

const id = "publication:ontology-of-idea-centric-computing";

export const metadata: Metadata = {
  title: "Ontology of Idea-Centric Computing",
  description:
    "The research document, across two revisions, that first asked whether the idea or the relationship is the more fundamental computational object.",
};

export default function OntologyWhitePaperPage() {
  const details = getPublicationDetails(id);
  if (!details) {
    throw new Error(`Domain publication details for '${id}' are missing`);
  }

  return (
    <PublicationTemplate
      publication={{
        slug: "ontology-of-idea-centric-computing",
        title: details.title,
        type: "white-paper",
        authors: details.authors,
        publishedAt: details.publishedAt,
        summary: details.summary,
      }}
    >
      <CalloutBox label="Editor's Note">
        <p>
          Like Monograph 1, this document is preserved in the exploratory,
          working-notes voice in which it was originally written, rather
          than rewritten into a more formal register. It is not a settled
          position &mdash; its own text says so directly &mdash; and is
          published here as a record of how a central open question in
          ICCRI&rsquo;s architecture actually arose.
        </p>
      </CalloutBox>

      <p>
        This document went through two versions in the course of a single
        research session. The first proposed the Idea as the fundamental
        unit of intellectual computation, with Insight, Concept, Question,
        and Knowledge Object as a supporting structure around it.
      </p>

      <section>
        <h2>Version 1.0: the initial proposal</h2>
        <p>
          The first draft argues that computing should model the idea
          itself rather than the artifacts that temporarily contain it
          &mdash; files, documents, notes. It defines Ideas, Insights,
          Concepts, Questions, and Knowledge Objects as a layered
          structure, with human roles (Creator, Researcher, Reviewer,
          Contributor, Community) and publication objects (Monograph,
          Research Paper, White Paper, Technical Report, Reference
          Document) built on top.
        </p>
      </section>

      <section>
        <h2>Version 2.0: introducing Understanding</h2>
        <p>
          The revision proposes a missing object: not Knowledge, not
          Information, but Understanding &mdash; defined as the coherent
          internal organization of ideas that enables explanation,
          prediction, reasoning, and action. It reframes the earlier
          structure so that Ideas, Concepts, and Insights all feed
          Understanding, and Knowledge Objects become external
          representations of it rather than the goal in themselves.
        </p>
      </section>

      <section>
        <h2>The open question</h2>
        <p>
          The most significant move in the revision is a direct challenge
          to the document&rsquo;s own starting assumption: whether the Idea is
          really the most fundamental object, or whether Relationship is
          &mdash; since an idea with no relationships is nearly meaningless,
          while a concept, an insight, and understanding itself can all be
          described as forms of organized relationship. The document does
          not resolve this. It proposes the question become the central
          research question of a future monograph, explicitly declining to
          declare it doctrine.
        </p>
        <p>
          That question is the same one the Meta-Architecture
          Specification later inherits and leaves deliberately open.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor(id)} />
      <ReferencedBy references={getReferencingRelationships(id)} />
    </PublicationTemplate>
  );
}
