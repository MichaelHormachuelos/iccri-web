import { DiagramFrame, DiagramContainer, DiagramNode } from "./primitives";

export interface ArchitectureRegion {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ArchitectureDiagramProps {
  outerLabel: string;
  regions: ArchitectureRegion[];
  viewBox: string;
  title: string;
  desc: string;
}

/**
 * Containment diagram for reference architectures — things inside
 * things. One outer dashed boundary (the system), inner solid nodes
 * (its components). Kept to a single nesting level by design: the
 * subject matter (Creator OS, reference architectures) is meant to
 * read at a glance, not as a detailed engineering schematic.
 */
export function ArchitectureDiagram({
  outerLabel,
  regions,
  viewBox,
  title,
  desc,
}: ArchitectureDiagramProps) {
  const parts = viewBox.split(" ").map(Number);
  const w = parts[2] ?? 0;
  const h = parts[3] ?? 0;
  return (
    <DiagramFrame viewBox={viewBox} title={title} desc={desc}>
      <DiagramContainer x={10} y={10} width={w - 20} height={h - 20} label={outerLabel} />
      {regions.map((region) => (
        <DiagramNode
          key={region.label}
          x={region.x}
          y={region.y}
          width={region.width}
          height={region.height}
          label={region.label}
        />
      ))}
    </DiagramFrame>
  );
}
