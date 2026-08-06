import { DiagramFrame, DiagramDefs, DiagramNode, DiagramConnector } from "./primitives";
import type { Idea } from "@/types/entity";

const stages: { status: Idea["status"]; label: string }[] = [
  { status: "seed", label: "Seed" },
  { status: "developing", label: "Developing" },
  { status: "published", label: "Published" },
];

interface IdeaLifecycleProps {
  currentStatus?: Idea["status"];
}

/**
 * Shows an idea's progression through the states defined on the
 * Idea type in types/entity.ts (seed -> developing -> published)
 * — the diagram and the domain type are designed to describe the
 * same three states, so this is ready to drive from real data the
 * moment an Idea/Concept browser exists, without redesigning either.
 */
export function IdeaLifecycle({ currentStatus }: IdeaLifecycleProps) {
  const nodeWidth = 130;
  const gap = 50;

  return (
    <DiagramFrame
      viewBox="0 0 460 100"
      title="Idea lifecycle: seed, developing, published"
      desc="An idea moves from an early seed, through active development, to a published, citable form."
    >
      <DiagramDefs />
      <DiagramConnector x1={150} y1={42} x2={190} y2={42} />
      <DiagramConnector x1={330} y1={42} x2={370} y2={42} />
      {stages.map((stage, i) => (
        <DiagramNode
          key={stage.status}
          x={i * (nodeWidth + gap)}
          y={20}
          width={nodeWidth}
          height={44}
          label={stage.label}
          emphasis={currentStatus === stage.status}
        />
      ))}
    </DiagramFrame>
  );
}
