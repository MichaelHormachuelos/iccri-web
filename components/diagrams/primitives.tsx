import type { ReactNode } from "react";

/**
 * Shared visual primitives for the ICCRI diagram system. Every
 * diagram component (ConceptMap, ProcessFlow, ArchitectureDiagram,
 * Timeline, ParadigmShift) is built from these rather than each
 * hand-drawing its own nodes/edges — this is what makes the visual
 * language consistent instead of one-off illustration per page.
 *
 * Palette is intentionally restricted to ink/accent/border tokens —
 * diagrams should look like research notation, not marketing
 * infographics. No gradients, no drop shadows, no decorative color.
 */

interface DiagramFrameProps {
  children: ReactNode;
  viewBox: string;
  title: string;
  desc: string;
  className?: string;
}

/** Root <svg> wrapper — enforces the accessible title/desc pattern and shared stroke scale. */
export function DiagramFrame({ children, viewBox, title, desc, className = "" }: DiagramFrameProps) {
  return (
    <svg
      role="img"
      viewBox={viewBox}
      className={`w-full ${className}`}
      style={{ overflow: "visible" }}
    >
      <title>{title}</title>
      <desc>{desc}</desc>
      {children}
    </svg>
  );
}

interface DiagramNodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sublabel?: string;
  emphasis?: boolean;
}

/** A single labeled node — the base unit of every diagram type. */
export function DiagramNode({ x, y, width, height, label, sublabel, emphasis = false }: DiagramNodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        fill={emphasis ? "var(--color-accent-tint)" : "var(--color-paper-raised)"}
        stroke={emphasis ? "var(--color-accent)" : "var(--color-border-strong)"}
        strokeWidth={0.75}
      />
      <text
        x={x + width / 2}
        y={sublabel ? y + height / 2 - 6 : y + height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight={500}
        fill="var(--color-ink)"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 12}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={11}
          fill="var(--color-ink-secondary)"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

interface DiagramConnectorProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  dashed?: boolean;
}

/** A connector line between two points, with an optional label at its midpoint. */
export function DiagramConnector({ x1, y1, x2, y2, label, dashed = false }: DiagramConnectorProps) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--color-border-strong)"
        strokeWidth={0.75}
        strokeDasharray={dashed ? "3 3" : undefined}
        markerEnd="url(#diagram-arrow)"
      />
      {label && (
        <text
          x={mx}
          y={my - 6}
          textAnchor="middle"
          fontSize={10}
          fill="var(--color-ink-muted)"
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** Shared arrowhead marker — include once per <svg> via <DiagramDefs />. */
export function DiagramDefs() {
  return (
    <defs>
      <marker
        id="diagram-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path
          d="M1 1L9 5L1 9"
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>
  );
}

interface DiagramContainerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

/** A dashed labeled boundary — for structural/architecture containment. */
export function DiagramContainer({ x, y, width, height, label }: DiagramContainerProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={14}
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth={0.75}
        strokeDasharray="2 4"
      />
      <text x={x + 16} y={y + 20} fontSize={11} fontWeight={500} fill="var(--color-ink-secondary)">
        {label}
      </text>
    </g>
  );
}
