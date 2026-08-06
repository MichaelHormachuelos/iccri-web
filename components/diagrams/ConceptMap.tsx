import { DiagramFrame, DiagramDefs, DiagramNode, DiagramConnector } from "./primitives";

export interface ConceptMapNode {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  sublabel?: string;
  emphasis?: boolean;
}

export interface ConceptMapEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

interface ConceptMapProps {
  nodes: ConceptMapNode[];
  edges: ConceptMapEdge[];
  viewBox: string;
  title: string;
  desc: string;
}

/**
 * General-purpose node-and-edge diagram. Covers concept maps,
 * knowledge graphs, and idea-relationship diagrams — these are all
 * structurally the same visual form (labeled nodes, labeled or
 * unlabeled relationships), so one parameterized component serves
 * all three rather than three near-duplicate implementations.
 */
export function ConceptMap({ nodes, edges, viewBox, title, desc }: ConceptMapProps) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <DiagramFrame viewBox={viewBox} title={title} desc={desc}>
      <DiagramDefs />
      {edges.map((edge, i) => {
        const from = byId[edge.from];
        const to = byId[edge.to];
        if (!from || !to) return null;
        const fw = from.width ?? 140;
        const fh = from.height ?? 44;
        const tw = to.width ?? 140;
        const th = to.height ?? 44;
        return (
          <DiagramConnector
            key={`${edge.from}-${edge.to}-${i}`}
            x1={from.x + fw / 2}
            y1={from.y + fh}
            x2={to.x + tw / 2}
            y2={to.y}
            label={edge.label}
            dashed={edge.dashed}
          />
        );
      })}
      {nodes.map((node) => (
        <DiagramNode
          key={node.id}
          x={node.x}
          y={node.y}
          width={node.width ?? 140}
          height={node.height ?? 44}
          label={node.label}
          sublabel={node.sublabel}
          emphasis={node.emphasis}
        />
      ))}
    </DiagramFrame>
  );
}
