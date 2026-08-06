import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { getPublicationEntity } from "@/lib/domain/queries";
import { publicationHref } from "@/lib/domain/routes";

export const metadata: Metadata = {
  title: "Library",
  description:
    "A curated collection of concepts, terminology, architectural notes, reference materials, and foundational resources supporting Idea-Centric Computing research.",
};

export default function LibraryPage() {
  return (
    <Section as="main" spacing="lg">
      <Container>
        <header className="max-w-2xl">
          <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
            ICCRI Library
          </h1>
          <p className="mt-4 text-lg text-ink-secondary">
            A curated collection of concepts, terminology, architectural
            notes, reference materials, and foundational resources
            supporting Idea-Centric Computing research.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">Concepts</h2>
          <Grid cols={1} colsMd={2} gap="lg" className="mt-6">
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">Idea</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                The smallest meaningful unit of intellectual novelty &mdash; a
                new possibility, observation, question, interpretation, or
                solution capable of increasing understanding.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">Entity</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Anything that exists within Idea-Centric Computing and
                carries a persistent identity &mdash; an idea, a concept, a
                publication, a person.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">Relationship</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                A named, persistent, semantically meaningful connection
                between two entities &mdash; distinct from a hyperlink,
                which carries no meaning beyond navigation.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">Transformation</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                An event that changes an entity or produces a new one,
                always carrying provenance &mdash; its inputs, outputs,
                actor, and time.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">Knowledge Object</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                A validated intellectual artifact &mdash; a First
                Principle, Framework, Theory, Method, Model, or Reference
                Architecture &mdash; possessing sufficient coherence and
                evidence to become part of the shared knowledge ecosystem.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">The Idea Graph</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                A living, evolving network of ideas and their semantic
                relationships, in which both ideas and relationships are
                first-class computational objects.
              </p>
            </Card>
          </Grid>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">Ontology</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-secondary">
            The complete canonical vocabulary from the Meta-Architecture
            Specification &mdash; every Entity, Relationship, and
            Transformation kind currently approved.
          </p>
          <div className="mt-6 flex flex-col gap-6">
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">Entities</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Idea, Concept, Question, Knowledge Object (subtypes: First
                Principle, Framework, Theory, Method, Model, Reference
                Architecture), Publication (subtypes: Monograph, White
                Paper, Research Paper, Technical Report), Person (roles:
                Founder, Researcher, Contributor, Reviewer, Editor), and
                Organization.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">Relationships</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                supports, extends, contradicts, questions, explains,
                implements, belongsTo, derivedFrom, cites, references,
                inspiredBy, relatedTo &mdash; and, added once real published
                content required them: motivates, documents, evaluates.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">Transformations</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Capture, Refinement, Synthesis, Decomposition,
                Generalization, Specialization, Validation, Publication,
                Revision.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Architecture Notes
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-secondary">
            Why ICCRI&rsquo;s architecture is shaped the way it is, not just
            what it currently says.
          </p>
          <div className="mt-6 flex flex-col gap-6">
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">
                Why three categories?
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                An architecture should contain no unnecessary concepts.
                Entities describe existence, Relationships describe
                structure, Transformations describe change &mdash; every
                computational activity Idea-Centric Computing proposes can
                be interpreted within one or more of these three. A
                simpler architecture risks omitting essential distinctions;
                a more complex one adds unnecessary conceptual burden.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">
                Why Context was redefined
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                An earlier draft of Computational Dimensions illustrated
                Context with examples like Publication and Organization
                &mdash; entities that already exist elsewhere in the
                architecture. That blurred Context into a use of
                Relationships rather than a genuine third dimension. The
                frozen version 1.1 redefines Context as an interpretive
                frame &mdash; disciplinary perspective, language, historical
                period &mdash; specifically to keep that distinction clear.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-base font-semibold text-ink">
                The open question
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                The architecture treats Idea and Relationship as if their
                relative primacy were settled. It isn&rsquo;t. The Ontology
                white paper raises, and does not resolve, whether the idea
                or the relationship is the more fundamental computational
                object &mdash; the Meta-Architecture Specification
                deliberately leaves this open for future research rather
                than declaring it doctrine.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Reading List
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-secondary">
            A recommended order through ICCRI&rsquo;s published corpus &mdash;
            each work builds on the one before it.
          </p>
          <ol className="mt-6 flex flex-col gap-4">
            {[
              {
                id: "publication:ontological-foundations",
                note: "Where the search for Idea-Centric Computing's primitive object begins.",
              },
              {
                id: "publication:limitations-of-contemporary-computing",
                note: "Why existing paradigms leave idea evolution underrepresented, not wrong.",
              },
              {
                id: "publication:ontology-of-idea-centric-computing",
                note: "The white paper that first raised the still-open Idea-vs-Relationship question.",
              },
              {
                id: "publication:meta-architecture",
                note: "The conceptual architecture — Entities, Relationships, Transformations.",
              },
              {
                id: "publication:meta-architecture-specification",
                note: "The same architecture, formalized as the approved engineering baseline.",
              },
              {
                id: "publication:formal-computational-model",
                note: "Formal semantics, invariants, and conformance criteria for implementation.",
              },
              {
                id: "publication:computational-dimensions-specification",
                note: "Identity, Time, and Context — the dimensions everything above exists within.",
              },
              {
                id: "publication:validation-framework-specification",
                note: "How every claim above earns, or hasn't yet earned, the right to be believed.",
              },
            ].map(({ id, note }, i) => {
              const entity = getPublicationEntity(id);
              if (!entity) return null;
              return (
                <li key={id}>
                  <Card className="flex flex-col">
                    <span className="text-xs font-medium uppercase tracking-wide text-accent">
                      {i + 1}
                    </span>
                    <h3 className="mt-1 font-serif text-base font-semibold text-ink">
                      <Link href={publicationHref(entity)} className="hover:text-accent">
                        {entity.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-ink-secondary">{note}</p>
                  </Card>
                </li>
              );
            })}
          </ol>
        </section>
      </Container>
    </Section>
  );
}
