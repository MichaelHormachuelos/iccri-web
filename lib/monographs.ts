import type { Monograph, MonographChapter } from "@/types/monograph";
import { getPublicationDetails } from "@/lib/domain/queries";

export interface MonographChapterContent extends MonographChapter {
  paragraphs: string[];
  list?: string[];
}

export interface MonographWithContent extends Monograph {
  abstract: string;
  /** Rendered as a CalloutBox above the abstract when present — for framing a monograph's presentation, not its argument. */
  editorNote?: string;
  /** Empty for a continuous (non-chaptered) work — see Monograph 1. */
  chapters: MonographChapterContent[];
  /** Set only for a continuous work; rendered in place of a chapter list. */
  continuousText?: string[];
}

/**
 * Title, authors, publication date, and summary all come from the
 * Domain layer now (Phase 2A, Stage 3's getPublicationDetails) —
 * this file no longer hand-types any of them. Stage 2's separate
 * `titleFor`/`author` helpers are gone; one merged lookup replaces
 * both. Memoized (Stage 10) since each monograph's four fields all
 * call this with the same slug — one real lookup per monograph
 * instead of four identical ones, same result either way.
 */
const detailsCache = new Map<string, ReturnType<typeof getPublicationDetails>>();
function detailsFor(slug: string) {
  if (!detailsCache.has(slug)) {
    detailsCache.set(slug, getPublicationDetails(`publication:${slug}`));
  }
  const details = detailsCache.get(slug);
  if (!details) throw new Error(`Domain publication details for 'publication:${slug}' are missing`);
  return details;
}

export const monographs: MonographWithContent[] = [
  {
    slug: "ontological-foundations",
    title: detailsFor("ontological-foundations").title,
    seriesTitle: "Monograph 1",
    type: "monograph",
    authors: detailsFor("ontological-foundations").authors,
    publishedAt: detailsFor("ontological-foundations").publishedAt,
    summary: detailsFor("ontological-foundations").summary,
    editorNote:
      "Editor's Note: Monograph 1 documents the formative exploration of Idea-Centric Computing. Its first-person, exploratory voice is intentionally preserved as part of the historical research record, rather than rewritten to match the more formalized style of the monographs that follow. Monographs 2 through 4 represent later, more structured stages of the same research program.",
    abstract:
      "This monograph traces the search for Idea-Centric Computing's primitive object — the thing the whole paradigm is meant to compute upon. It works through the candidates in turn, arriving at a central hypothesis: that ideas are the fundamental human objects, and relationships are the fundamental computational objects.",
    chapters: [],
    continuousText: [
      "Every major computing paradigm begins by choosing a primitive object. File-centric computing chose the file. Application-centric computing chose the application. Data-centric computing chose the dataset. Web-centric computing chose the document. AI-centric computing chose the token. Each paradigm, in its own way, answers the same implicit question: what is the thing we compute upon?",
      "This monograph asks whether none of these are primary — whether files, documents, applications, data, and tokens are all secondary representations of something else. Working through the candidates in turn: information is descriptive, not generative, and has meaning only when interpreted. Knowledge is already stabilized, downstream of something prior. Understanding comes closer, but it exists inside cognitive agents; computers can support it, but not directly compute it.",
      "The idea is more promising. Ideas generate everything else. But an isolated idea does almost nothing. Consider \"the Earth moves\" — alone, that observation is nearly inert. Connected to gravity, to observation, to Kepler, to planetary motion, to heliocentrism, it becomes meaningful. The meaning emerged from the relationships, not from the idea in isolation.",
      "This leads to the monograph's central hypothesis: ideas are the fundamental human objects, and relationships are the fundamental computational objects. Humans create ideas; computers operate on the relationships among them. Traditional software stores notes. Idea-Centric Computing stores ideas plus their relationships — and those relationships become computable.",
      "This reframes what a knowledge graph should be. Where conventional knowledge graphs typically model entity, attribute, and relationship, ICCRI proposes idea, relationship, meaning, and understanding as the chain that matters. What a computer built this way actually manipulates is not files, tokens, or applications, but relationships among ideas.",
      "The monograph introduces this as the Idea Graph — a living, evolving network of ideas and their semantic relationships, in which both ideas and relationships are first-class computational objects. Unlike a document, it has no fixed beginning or end: it grows, splits, merges, refines, questions itself, and learns.",
      "Where traditional systems offer operations like open, save, copy, and delete, an idea-centric system needs a different vocabulary entirely — capture, connect, compare, contrast, extend, challenge, merge, split, refine, trace, validate, synthesize, publish, recontextualize. These are cognitive operations, not file operations, and they suggest a different lifecycle altogether: not create, edit, save, archive, but observe, question, generate an idea, connect, refine, synthesize, understand, externalize, share, challenge, evolve.",
      "The monograph closes on what it treats as its central thesis: traditional computing manages artifacts of thought, while Idea-Centric Computing supports the evolution of thought itself. Files, documents, notes, databases, and publications are not the center of the paradigm — they are artifacts. The true subject of computation is the ongoing evolution of ideas through relationships that lead to deeper understanding.",
    ],
  },
  {
    slug: "limitations-of-contemporary-computing",
    title: detailsFor("limitations-of-contemporary-computing").title,
    seriesTitle: "Monograph 2",
    type: "monograph",
    authors: detailsFor("limitations-of-contemporary-computing").authors,
    publishedAt: detailsFor("limitations-of-contemporary-computing").publishedAt,
    summary: detailsFor("limitations-of-contemporary-computing").summary,
    abstract:
      "For more than seven decades, computing has undergone remarkable evolution — from file systems and operating systems to the Web, cloud computing, and artificial intelligence. Yet despite these advances, contemporary computing remains oriented primarily toward the management of artifacts rather than the evolution of ideas themselves. This monograph argues that the limitation is not a failure of engineering but a consequence of the primitive objects each paradigm chose. It concludes that a complementary paradigm is needed — one that treats ideas, their relationships, and their evolution as first-class concerns.",
    chapters: [
      {
        number: 1,
        slug: "every-paradigm-solves-a-different-problem",
        title: "Every Computing Paradigm Solves a Different Problem",
        paragraphs: [
          "A common mistake in discussions of new paradigms is to assume that previous paradigms were failures. History demonstrates the opposite: every major computing paradigm emerged because it solved a problem earlier paradigms could not solve efficiently. File systems solved persistent storage. Operating systems solved resource management. Databases solved structured information management. The Web solved global information sharing. Artificial intelligence solved probabilistic reasoning over vast datasets.",
          "The question worth asking is therefore not whether contemporary computing is successful — it clearly is. The question is what kinds of problems it was never designed to solve. Idea-Centric Computing is not proposed because previous paradigms failed; it is proposed because every paradigm necessarily reflects the assumptions embedded in its primitive computational objects.",
        ],
      },
      {
        number: 2,
        slug: "the-success-of-contemporary-computing",
        title: "The Success of Contemporary Computing",
        paragraphs: [
          "Before identifying limitations, it is worth acknowledging achievements. Modern computing has enabled global communication, scientific simulation, digital publishing, search, distributed collaboration, cloud computing, artificial intelligence, and knowledge repositories at a scale human civilization has never had access to before.",
          "Any new paradigm must therefore be understood as an extension of these achievements, not a replacement for them.",
        ],
      },
      {
        number: 3,
        slug: "the-hidden-assumption",
        title: "The Hidden Assumption",
        paragraphs: [
          "Every paradigm asks a foundational question, though rarely explicitly. File-centric computing asks how persistent information should be stored. Application-centric computing asks how software capabilities should be organized. Data-centric computing asks how structured information should be queried. Web-centric computing asks how documents should be connected. AI-centric computing asks how systems can predict or generate sequences.",
          "These are all legitimate questions. None of them asks how ideas should evolve. The omission is subtle but profound: the lifecycle of ideas remains distributed across files, documents, emails, notebooks, conversations, and publications. Computing supports these artifacts exceptionally well. It does not explicitly model the intellectual process that gives rise to them.",
        ],
      },
      {
        number: 4,
        slug: "the-artifact-problem",
        title: "The Artifact Problem",
        paragraphs: [
          "Every mature idea leaves artifacts — notes, documents, presentations, articles, books, code, patents. Traditional systems treat these artifacts as the primary units of organization. But artifacts are consequences of thinking, not thinking itself.",
          "As a result, contemporary systems answer questions like where a file is, which application created it, or which version is current — far more readily than questions like where an idea originated, which ideas influenced it, what competing ideas exist, or how it has evolved over time. These are not document-management questions. They are questions about the evolution of ideas.",
        ],
      },
      {
        number: 5,
        slug: "the-fragmentation-of-ideas",
        title: "The Fragmentation of Ideas",
        paragraphs: [
          "Ideas rarely remain within a single artifact. A research idea may begin in a notebook, continue through conversations, appear in presentation slides, become software, mature into a journal article, and later influence a book. Current systems faithfully preserve the artifacts; they rarely preserve the complete intellectual journey connecting them.",
          "Researchers are left to reconstruct that history manually, relying on memory, version control, citations, or personal archives — a reconstruction that is often incomplete. The computational system remembers files more faithfully than it remembers ideas.",
        ],
      },
      {
        number: 6,
        slug: "why-this-matters",
        title: "Why This Matters",
        paragraphs: [
          "The inability to explicitly model the evolution of ideas has consequences beyond convenience. It affects scientific collaboration, organizational learning, innovation management, education, policy development, and artificial intelligence. In each case, systems excel at storing outputs while providing comparatively limited support for tracing how those outputs emerged.",
          "If understanding depends on the relationships among evolving ideas, then the absence of explicit support for idea evolution is a significant architectural limitation, not a minor usability issue.",
        ],
      },
      {
        number: 7,
        slug: "toward-a-complementary-paradigm",
        title: "Toward a Complementary Paradigm",
        paragraphs: [
          "The argument this monograph develops is intentionally modest. It does not claim that current paradigms are obsolete, or that documents, data, applications, or AI are unimportant. It proposes instead that they leave one dimension underrepresented: the explicit representation of ideas and their evolution.",
          "The remainder of the ICCRI research program explores whether a complementary paradigm — Idea-Centric Computing — can address that gap by treating entities, relationships, and transformations as foundational architectural concerns.",
          "This monograph deliberately avoids claiming that current computing is wrong. Instead, it argues something more defensible: current computing is extraordinarily successful at the problems it was designed to solve, and the real question is whether the evolution of ideas constitutes a distinct class of problem deserving its own computational paradigm. That framing matters — it positions Idea-Centric Computing as an extension of existing computing, not a competitor to it.",
        ],
      },
    ],
  },
  {
    slug: "meta-architecture",
    title: detailsFor("meta-architecture").title,
    seriesTitle: "Monograph 3",
    type: "monograph",
    authors: detailsFor("meta-architecture").authors,
    publishedAt: detailsFor("meta-architecture").publishedAt,
    summary: detailsFor("meta-architecture").summary,
    abstract:
      "The preceding monographs established that contemporary computing paradigms succeed within the scope of the problems they were designed to solve, while providing comparatively limited explicit support for the evolution of ideas themselves. This monograph addresses the next question directly: if idea evolution is a legitimate computational concern, what conceptual architecture should support it? Rather than proposing another programming language, operating system, database, or application framework, it introduces a meta-architecture organized around three categories — Entities, Relationships, and Transformations — intended as a stable conceptual foundation for future software systems, knowledge platforms, and AI systems.",
    chapters: [
      {
        number: 1,
        slug: "architecture-before-technology",
        title: "Architecture Before Technology",
        paragraphs: [
          "History repeatedly demonstrates that durable computing paradigms begin with architecture rather than implementation. The stored-program computer preceded programming languages. The relational model preceded SQL implementations. The World Wide Web emerged from a conceptual architecture of documents and hyperlinks before browsers became ubiquitous.",
          "Idea-Centric Computing follows the same order. It does not begin with software; it begins with a conceptual architecture. Technology implements architecture — it does not replace it.",
        ],
      },
      {
        number: 2,
        slug: "design-objectives",
        title: "Design Objectives",
        paragraphs: ["The proposed architecture seeks to satisfy five objectives, independent of any specific implementation technology:"],
        list: [
          "Preserve ideas independently of their representations.",
          "Make intellectual relationships explicit rather than implicit.",
          "Record the evolution of knowledge, not only its final artifacts.",
          "Support both human and artificial intelligence in reasoning about ideas.",
          "Remain compatible with existing computational infrastructures.",
        ],
      },
      {
        number: 3,
        slug: "the-meta-architecture",
        title: "The Meta-Architecture",
        paragraphs: [
          "The proposed conceptual architecture consists of three fundamental, conceptually distinct categories: Entities, Relationships, and Transformations. Each answers a different question. Together, they describe the minimum architecture necessary to model the evolution of ideas.",
        ],
      },
      {
        number: 4,
        slug: "entities",
        title: "Entities",
        paragraphs: [
          "Entities answer the question: what exists? An entity possesses identity, may evolve over time, may participate in relationships, and may undergo transformations. Examples include ideas, concepts, questions, knowledge objects, publications, people, and organizations. Entities represent the persistent intellectual components of the system.",
        ],
      },
      {
        number: 5,
        slug: "relationships",
        title: "Relationships",
        paragraphs: [
          "Relationships answer the question: how are entities connected? A relationship is not merely metadata — it carries semantic meaning. Examples include supports, contradicts, explains, extends, derives from, implements, cites, and references. Unlike a hyperlink, a relationship possesses meaning beyond navigation; it expresses intellectual structure.",
        ],
      },
      {
        number: 6,
        slug: "transformations",
        title: "Transformations",
        paragraphs: [
          "Transformations answer the question: how do entities change? Unlike relationships, transformations are events — they consume existing entities, produce new ones, or modify existing ones. Examples include capture, refinement, synthesis, decomposition, generalization, specialization, validation, publication, and revision.",
          "Each transformation carries provenance, which may record its inputs, outputs, actor, time, and context. This lets the platform preserve the history of intellectual evolution, not merely its current state.",
        ],
      },
      {
        number: 7,
        slug: "why-three-categories",
        title: "Why Three Categories?",
        paragraphs: [
          "An architecture should contain no unnecessary concepts. Entities describe existence, relationships describe structure, and transformations describe change — every computational activity proposed within Idea-Centric Computing can be interpreted as operating within one or more of these categories.",
          "This minimality is intentional. A simpler architecture risks omitting essential distinctions; a more complex one introduces unnecessary conceptual burden.",
        ],
      },
      {
        number: 8,
        slug: "emergence",
        title: "Emergence",
        paragraphs: [
          "Certain phenomena — understanding, expertise, consensus, collective intelligence — arise through interactions among entities, relationships, and transformations. These are not currently treated as architectural primitives; instead, they are understood as emergent properties of the evolving intellectual system. This distinction preserves conceptual clarity while leaving room for future research.",
        ],
      },
      {
        number: 9,
        slug: "architectural-consequences",
        title: "Architectural Consequences",
        paragraphs: [
          "Adopting this meta-architecture changes the role of software. Applications become tools for interacting with the intellectual ecosystem rather than isolated containers of information. Publications become externalizations of validated knowledge rather than the primary organizational units. Artificial intelligence becomes a collaborator in the evolution of ideas rather than solely a generator of text.",
          "The architecture shifts emphasis from information management toward intellectual evolution.",
        ],
      },
      {
        number: 10,
        slug: "relationship-to-existing-paradigms",
        title: "Relationship to Existing Paradigms",
        paragraphs: [
          "The proposed architecture does not invalidate existing paradigms. Operating systems, databases, the Web, and artificial intelligence all remain essential. Idea-Centric Computing operates above these paradigms, providing a conceptual architecture for organizing intellectual activity across them. It is complementary, not competitive.",
        ],
      },
      {
        number: 11,
        slug: "toward-an-idea-evolution-platform",
        title: "Toward an Idea Evolution Platform",
        paragraphs: [
          "The architecture naturally suggests a new class of computational systems — ones that support idea capture, semantic relationships, provenance-aware transformations, knowledge evolution, and collaborative reasoning, rather than managing files, applications, or documents. Such systems would let users explore not merely what is known, but how understanding develops over time.",
          "The monograph's central claim is intentionally restrained: it does not claim Entities, Relationships, and Transformations are the only possible conceptual architecture, only that they form a coherent, minimal, and extensible one, capable of representing the evolution of ideas while remaining compatible with existing computational paradigms. Whether this architecture proves superior remains an empirical question for future research and implementation.",
        ],
      },
    ],
  },
  {
    slug: "formal-computational-model",
    title: detailsFor("formal-computational-model").title,
    seriesTitle: "Monograph 4",
    type: "monograph",
    authors: detailsFor("formal-computational-model").authors,
    publishedAt: detailsFor("formal-computational-model").publishedAt,
    summary: detailsFor("formal-computational-model").summary,
    abstract:
      "The preceding monographs established the motivation for Idea-Centric Computing and proposed a conceptual meta-architecture based on Entities, Relationships, and Transformations. This monograph formalizes that architecture by defining computational primitives, system state, valid operations, invariants, evolution rules, and correctness criteria. The objective is not to prescribe implementation technologies, but to provide a computational model that can be implemented consistently across different platforms while remaining faithful to the principles of Idea-Centric Computing.",
    chapters: [
      {
        number: 1,
        slug: "why-formalization-matters",
        title: "Why Formalization Matters",
        paragraphs: [
          "A conceptual architecture explains; a formal model specifies. Without formalization, two engineers build two different systems. With formalization, multiple independent implementations remain compatible. Formalization enables reproducibility.",
        ],
      },
      {
        number: 2,
        slug: "computational-universe",
        title: "Computational Universe",
        paragraphs: [
          "Define the universe of discourse: let E represent the set of all Entities, R the set of all Relationships, and T the set of all Transformations. The computational state of an ICCRI system at any moment is defined as the triple (E, R, T) — the minimal state the architecture requires.",
        ],
      },
      {
        number: 3,
        slug: "computational-primitives",
        title: "Computational Primitives",
        paragraphs: [
          "An Entity carries identity, type, state, and provenance; its identity is immutable. A Relationship carries a source, a destination, a semantic type, an optional confidence value, and provenance; a relationship never replaces an entity. A Transformation carries inputs, outputs, an actor, a timestamp, and an operation type; every transformation preserves provenance.",
        ],
      },
      {
        number: 4,
        slug: "state-transitions",
        title: "State Transitions",
        paragraphs: [
          "Every system change occurs through a Transformation. A system may never modify an Entity directly — instead, an old state passes through a transformation to produce a new state. This creates an auditable history by construction.",
        ],
      },
      {
        number: 5,
        slug: "canonical-operations",
        title: "Canonical Operations",
        paragraphs: [
          "Every ICCRI implementation shall support a standard vocabulary of transformations, each with defined preconditions and postconditions: Capture (observation in, idea out), Connect (entities in, relationship out), Refine (entity in, updated entity out), Synthesize (multiple entities in, new entity out), Generalize (multiple concepts in, framework out), Validate (candidate knowledge object in, validated knowledge object out), and Publish (knowledge object in, publication out).",
        ],
      },
      {
        number: 6,
        slug: "provenance",
        title: "Provenance",
        paragraphs: [
          "Every transformation generates provenance — at minimum, an actor, a timestamp, its inputs and outputs, and a transformation type. Nothing may enter the knowledge ecosystem without provenance; this is one of ICCRI's strongest guarantees.",
        ],
      },
      {
        number: 7,
        slug: "invariants",
        title: "Invariants",
        paragraphs: ["Regardless of implementation, every conforming ICCRI system must preserve six invariants:"],
        list: [
          "Every Entity has a unique identity.",
          "Relationships always connect existing Entities.",
          "Transformations preserve history.",
          "Knowledge Objects cannot exist without provenance.",
          "Publications reference Knowledge Objects; they never replace them.",
          "No Entity may lose its historical lineage.",
        ],
      },
      {
        number: 8,
        slug: "correctness",
        title: "Correctness",
        paragraphs: [
          "Correctness is no longer purely software correctness. An ICCRI implementation is architecturally correct if it preserves identity, preserves provenance, preserves relationships, records transformations, and maintains traceability.",
        ],
      },
      {
        number: 9,
        slug: "computational-queries",
        title: "Computational Queries",
        paragraphs: [
          "Where traditional systems ask a query language to select records, ICCRI systems additionally support semantic operations: Trace(), Explain(), Compare(), Evolve(), Influence(), Origin(), Lineage(), and Impact(). These are not merely database queries — they operate over the meaning and history of the knowledge graph itself.",
        ],
      },
      {
        number: 10,
        slug: "the-idea-evolution-graph",
        title: "The Idea Evolution Graph",
        paragraphs: [
          "Every conforming implementation may be represented as nodes, connected by semantic relationships, layered with transformation history, producing the current knowledge state. The graph itself evolves — it is not a static structure computed once.",
        ],
      },
      {
        number: 11,
        slug: "ai-implications",
        title: "AI Implications",
        paragraphs: [
          "This chapter is intentionally conservative. Rather than proposing a new AI architecture, it defines how AI interacts with the computational model already specified. AI becomes an actor capable of proposing ideas, suggesting relationships, recommending transformations, generating hypotheses, and identifying inconsistencies — with human validation remaining part of the formal model unless explicitly delegated.",
        ],
      },
      {
        number: 12,
        slug: "reference-conformance",
        title: "Reference Conformance",
        paragraphs: [
          "Any implementation claiming to follow Idea-Centric Computing should demonstrate Entity Conformance, Relationship Conformance, Transformation Conformance, Provenance Preservation, Knowledge Traceability, and Publication Independence. Together, these form ICCRI's equivalent of a conformance test suite.",
          "Formalization is not the final stage of the research program — it is the bridge between theory and engineering. As implementations mature, the model may evolve through evidence, experimentation, and peer review, but its role remains constant: to provide a common language through which independent systems can represent, evolve, and exchange ideas in a consistent and traceable manner.",
        ],
      },
    ],
  },
];

export function getMonograph(slug: string): MonographWithContent | undefined {
  return monographs.find((m) => m.slug === slug);
}
