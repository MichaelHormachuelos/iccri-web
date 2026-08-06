import { StandardPageTemplate } from "@/components/templates";
import { Figure, KnowledgeRelations, ReferencedBy } from "@/components/editorial";
import { ProcessFlow } from "@/components/diagrams/ProcessFlow";
import { getKnowledgeObject, getKnowledgeRelationsFor, getReferencingRelationships } from "@/lib/domain/queries";

const stages = [
  { name: "Discovery", objective: "Identify a meaningful unanswered question." },
  { name: "Conceptualization", objective: "Define emerging concepts precisely." },
  { name: "Architecture", objective: "Organize concepts into coherent structures." },
  { name: "Specification", objective: "Transform architectures into precise descriptions." },
  { name: "Prototype", objective: "Evaluate feasibility through implementation." },
  { name: "Validation", objective: "Determine whether evidence supports the proposed ideas." },
  { name: "Publication", objective: "Preserve and disseminate knowledge responsibly." },
];

export default function ResearchMethodPage() {
  const entity = getKnowledgeObject("method");
  if (!entity) {
    throw new Error("Domain entity 'method' is missing");
  }

  return (
    <StandardPageTemplate eyebrow="Research" title={entity.title} lede={entity.summary}>
      <section>
        <h2>A complement, not a replacement</h2>
        <p>
          The ICCRI Research Method does not replace established
          methodologies — experimental research, design science, qualitative
          and quantitative methods each contribute distinct forms of
          evidence. Instead, it addresses the stage that precedes them: the
          point at which a research question is still too unsettled for
          variables to be measured or hypotheses tested.
        </p>
      </section>

      <section>
        <h2>Seven stages</h2>
        <Figure number={1} caption="Each stage produces the scholarly outputs that become the next stage's inputs.">
          <ProcessFlow
            stages={stages.map((s) => ({ label: s.name }))}
            title="The seven stages of the ICCRI Research Method"
            desc="Discovery, Conceptualization, Architecture, Specification, Prototype, Validation, and Publication, shown as a left-to-right sequence."
          />
        </Figure>
        <ol>
          {stages.map((stage, i) => (
            <li key={stage.name}>
              <strong>
                Stage {i + 1} — {stage.name}.
              </strong>{" "}
              {stage.objective}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>Once concepts mature</h2>
        <p>
          Once a research question becomes sufficiently mature, researchers
          are encouraged to employ appropriate qualitative, quantitative,
          experimental, computational, design science, or mixed-method
          approaches to validate the resulting hypotheses.
        </p>
      </section>

      <KnowledgeRelations relations={getKnowledgeRelationsFor("method")} />
      <ReferencedBy references={getReferencingRelationships("method")} />
    </StandardPageTemplate>
  );
}
