import { DiagramFrame } from "./primitives";

export interface TimelineMilestone {
  year: string;
  label: string;
}

interface TimelineProps {
  milestones: TimelineMilestone[];
  title: string;
  desc: string;
}

/**
 * Horizontal timeline for institutional milestones. Deliberately
 * spare — a line, tick marks, year, label — to read as an archival
 * record rather than a promotional graphic.
 */
export function Timeline({ milestones, title, desc }: TimelineProps) {
  const step = 160;
  const width = milestones.length * step + 40;
  const height = 90;
  const lineY = 30;

  return (
    <DiagramFrame viewBox={`0 0 ${width} ${height}`} title={title} desc={desc}>
      <line
        x1={20}
        y1={lineY}
        x2={width - 20}
        y2={lineY}
        stroke="var(--color-border-strong)"
        strokeWidth={0.75}
      />
      {milestones.map((m, i) => {
        const x = 20 + i * step;
        return (
          <g key={m.year}>
            <circle cx={x} cy={lineY} r={4} fill="var(--color-accent)" />
            <text x={x} y={lineY - 14} fontSize={12} fontWeight={500} fill="var(--color-ink)">
              {m.year}
            </text>
            <text x={x} y={lineY + 24} fontSize={11} fill="var(--color-ink-secondary)">
              {m.label}
            </text>
          </g>
        );
      })}
    </DiagramFrame>
  );
}
