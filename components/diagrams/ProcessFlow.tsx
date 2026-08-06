import { DiagramFrame, DiagramDefs, DiagramNode, DiagramConnector } from "./primitives";

export interface ProcessStage {
  label: string;
  sublabel?: string;
}

interface ProcessFlowProps {
  stages: ProcessStage[];
  title: string;
  desc: string;
  activeIndex?: number;
}

/**
 * Sequential-stage diagram — covers research framework diagrams,
 * research process illustrations, and system flow diagrams. One
 * horizontal (desktop) / stacked (narrow) sequence of stages with
 * connectors, parameterized by a stage list. Used by the Research
 * Method page for the 7-stage method, and reusable anywhere a
 * process needs showing rather than just listing.
 */
export function ProcessFlow({ stages, title, desc, activeIndex }: ProcessFlowProps) {
  const nodeWidth = 130;
  const nodeHeight = 56;
  const gap = 40;
  const width = stages.length * nodeWidth + (stages.length - 1) * gap + 40;
  const height = 100;
  const y = 20;

  const nodes = stages.map((stage, i) => ({
    ...stage,
    x: 20 + i * (nodeWidth + gap),
  }));

  return (
    <DiagramFrame viewBox={`0 0 ${width} ${height}`} title={title} desc={desc}>
      <DiagramDefs />
      {nodes.slice(0, -1).map((node, i) => (
        <DiagramConnector
          key={`connector-${i}`}
          x1={node.x + nodeWidth}
          y1={y + nodeHeight / 2}
          x2={nodes[i + 1]?.x ?? node.x + nodeWidth}
          y2={y + nodeHeight / 2}
        />
      ))}
      {nodes.map((node, i) => (
        <DiagramNode
          key={node.label}
          x={node.x}
          y={y}
          width={nodeWidth}
          height={nodeHeight}
          label={`${i + 1}. ${node.label}`}
          sublabel={node.sublabel}
          emphasis={activeIndex === i}
        />
      ))}
    </DiagramFrame>
  );
}
