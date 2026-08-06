import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PullQuote, CalloutBox, GlossaryTerm } from "@/components/editorial";
import { ConceptMap } from "@/components/diagrams/ConceptMap";
import { IdeaLifecycle } from "@/components/diagrams/IdeaLifecycle";
import { ContributorCard } from "@/components/people/ContributorCard";

const colors = [
  { name: "paper", var: "--color-paper" },
  { name: "paper-raised", var: "--color-paper-raised" },
  { name: "ink", var: "--color-ink" },
  { name: "ink-secondary", var: "--color-ink-secondary" },
  { name: "ink-muted", var: "--color-ink-muted" },
  { name: "accent", var: "--color-accent" },
  { name: "accent-hover", var: "--color-accent-hover" },
  { name: "accent-tint", var: "--color-accent-tint" },
  { name: "border", var: "--color-border" },
  { name: "border-strong", var: "--color-border-strong" },
];

/**
 * Internal-only design system preview. Not linked from primary nav —
 * exists so tokens and primitives can be reviewed live in one place
 * before being threaded into real pages. Sprint 6 QA should confirm
 * whether this route ships to production or is excluded from the
 * build.
 */
export default function DesignSystemPage() {
  return (
    <Section as="main" spacing="md">
      <Container className="flex flex-col gap-16">
        <div>
          <h1 className="text-2xl font-semibold text-ink">ICCRI design system</h1>
          <p className="mt-2 text-sm text-ink-secondary">
            Editorial Ink — colors, type, and reusable primitives. Internal
            reference only.
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">Color</h2>
          <Grid cols={2} colsMd={4} gap="md">
            {colors.map((c) => (
              <div key={c.name}>
                <div
                  className="h-16 rounded-md border border-border"
                  style={{ backgroundColor: `var(${c.var})` }}
                />
                <p className="mt-2 text-xs text-ink-secondary">{c.name}</p>
              </div>
            ))}
          </Grid>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">Typography</h2>
          <div className="flex flex-col gap-4">
            <h1 className="font-serif text-5xl font-semibold text-ink">Heading 1</h1>
            <h2 className="font-serif text-3xl font-semibold text-ink">Heading 2</h2>
            <h3 className="font-serif text-2xl font-semibold text-ink">Heading 3</h3>
            <h4 className="font-serif text-xl font-semibold text-ink">Heading 4</h4>
            <p className="max-w-xl text-base text-ink">
              Body text in Inter, used for prose, UI labels, and navigation.
              Line length is constrained for readability.
            </p>
            <p className="text-sm text-ink-secondary">Secondary / supporting text.</p>
            <p className="text-xs text-ink-muted">Muted / metadata text.</p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary action</Button>
            <Button variant="secondary">Secondary action</Button>
            <Button variant="ghost">Ghost action</Button>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">Card</h2>
          <Grid cols={1} colsMd={2} gap="md">
            <Card>
              <h3 className="font-serif text-lg font-semibold text-ink">Card title</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Base surface for publications, projects, and research cards in
                later sprints.
              </p>
            </Card>
            <Card>
              <h3 className="font-serif text-lg font-semibold text-ink">Card title</h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Cards compose with Grid for listing pages.
              </p>
            </Card>
          </Grid>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">Diagrams</h2>
          <p className="mb-4 text-sm text-ink-secondary">
            ConceptMap — the shared form behind concept maps, knowledge
            graphs, and idea-relationship diagrams.
          </p>
          <Card>
            <ConceptMap
              viewBox="0 0 500 160"
              title="Example concept map"
              desc="Idea connected to two related concepts."
              nodes={[
                { id: "a", x: 20, y: 60, label: "Idea", emphasis: true },
                { id: "b", x: 200, y: 20, label: "Related concept" },
                { id: "c", x: 200, y: 100, label: "Prior work" },
              ]}
              edges={[
                { from: "a", to: "b", label: "extends" },
                { from: "a", to: "c", label: "builds on" },
              ]}
            />
          </Card>

          <p className="mb-4 mt-8 text-sm text-ink-secondary">
            IdeaLifecycle — driven by the same status values as the Idea
            domain type.
          </p>
          <Card>
            <IdeaLifecycle currentStatus="developing" />
          </Card>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">Editorial</h2>
          <div className="flex flex-col gap-8">
            <PullQuote attribution="Example attribution">
              A pull quote for long-form and homepage use.
            </PullQuote>
            <CalloutBox tone="definition" label="Definition">
              <p>Idea-Centric Computing: a paradigm centering the idea rather than the file.</p>
            </CalloutBox>
            <p className="text-sm text-ink">
              Inline glossary example:{" "}
              <GlossaryTerm definition="A reference architecture demonstrates a concept in practice.">
                reference architecture
              </GlossaryTerm>
              .
            </p>
            <ContributorCard
              author={{ name: "Example Researcher", role: "Research Fellow" }}
              note="Human-presence pattern — monogram, not a photo."
            />
          </div>
        </section>
      </Container>
    </Section>
  );
}
