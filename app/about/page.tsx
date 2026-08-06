import { StandardPageTemplate } from "@/components/templates";
import { Figure } from "@/components/editorial";
import { Timeline } from "@/components/diagrams/Timeline";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { LeadershipCard } from "@/components/people/LeadershipCard";
import { site } from "@/config/site";
import { getLeadership } from "@/lib/domain/queries";

export default function AboutPage() {
  const leadership = getLeadership();

  return (
    <StandardPageTemplate
      eyebrow="About"
      title="About ICCRI"
      lede="ICCRI is an independent research initiative dedicated to exploring, developing, documenting, and advancing Idea-Centric Computing."
    >
      <section>
        <h2>What is Idea-Centric Computing?</h2>
        <p>
          Idea-Centric Computing is a proposed paradigm that investigates the
          idea — not the file, the application, or the data structure — as
          the fundamental organizing unit of human-centered creative
          computing. ICCRI exists to pursue this question through rigorous
          research, interdisciplinary collaboration, responsible innovation,
          and open scholarly dialogue.
        </p>
      </section>

      <section>
        <h2>Mission</h2>
        <p>
          ICCRI advances the theory, architecture, and practice of
          Idea-Centric Computing through rigorous research, open scholarship,
          interdisciplinary collaboration, responsible technological
          innovation, and practical validation — deepening understanding of
          how future computing systems can better support human creativity,
          lifelong learning, knowledge development, and collaboration with
          intelligent technologies.
        </p>
      </section>

      <section>
        <h2>Vision</h2>
        <p>
          ICCRI envisions a future in which computing systems become lifelong
          partners in human creation: where worthwhile ideas are preserved
          rather than forgotten, knowledge compounds across generations,
          artificial intelligence augments rather than replaces human
          judgment, creators retain meaningful ownership of their
          intellectual work, and technology reduces the distance between
          imagination and meaningful contribution.
        </p>
      </section>

      <section>
        <h2>Guiding principles</h2>
        <ul>
          <li>Human dignity before technology.</li>
          <li>Research before assumption. Evidence before advocacy.</li>
          <li>Openness before exclusivity. Transparency before opacity.</li>
          <li>Architecture before implementation.</li>
          <li>Collaboration before competition.</li>
          <li>Long-term stewardship before short-term advantage.</li>
        </ul>
      </section>

      <section>
        <h2>Leadership</h2>
        <div className="flex flex-col gap-10">
          {leadership.map((profile) => (
            <LeadershipCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>

      <section>
        <h2>Institutional record</h2>
        <Figure caption={`ICCRI's founding milestone. Updated as the initiative's public record grows.`}>
          <Timeline
            milestones={[{ year: String(site.foundedYear), label: "ICCRI founded" }]}
            title="ICCRI institutional timeline"
            desc={`A single milestone marking ${site.foundedYear}, the founding year of ICCRI.`}
          />
        </Figure>
        <p>
          ICCRI&rsquo;s public research corpus today includes four published
          monographs, one white paper, and three technical reports,
          connected through a growing knowledge graph of cited,
          textually-grounded relationships between them.
        </p>
      </section>

      <section>
        <h2>Creator OS</h2>
        <p>
          Creator OS is the flagship reference architecture currently being
          developed as one possible implementation of Idea-Centric Computing.
          Research advances knowledge; Creator OS demonstrates the concepts
          in practice — the two serve complementary but distinct purposes.
        </p>
        <Figure number={2} caption="Research and reference-architecture work sit inside ICCRI; commercial technologies may evolve independently while acknowledging their intellectual foundations.">
          <ArchitectureDiagram
            outerLabel="ICCRI"
            regions={[
              { label: "Research", x: 40, y: 60, width: 140, height: 56 },
              { label: "Creator OS", x: 220, y: 60, width: 140, height: 56 },
              { label: "Publications", x: 400, y: 60, width: 140, height: 56 },
            ]}
            viewBox="0 0 620 160"
            title="ICCRI, Creator OS, and Publications"
            desc="Creator OS and Publications both sit inside ICCRI, alongside Research, as complementary but distinct activities."
          />
        </Figure>
      </section>
    </StandardPageTemplate>
  );
}
