import { DiagramFrame, DiagramDefs, DiagramNode, DiagramConnector } from "./primitives";

/**
 * The homepage's signature visualization. Shows the progression the
 * Constitution argues for, as three stages rather than a simple
 * before/after: document-centric computing gave way to application-
 * centric computing, and both still organize work around a container
 * (the file, the app) rather than the idea itself. Idea-Centric
 * Computing proposes the idea as the connective center instead.
 */
export function ParadigmShiftDiagram() {
  const rightCenterX = 470;
  const rightCenterY = 100;

  return (
    <DiagramFrame
      viewBox="0 0 660 220"
      title="From document-centric, to application-centric, to idea-centric computing"
      desc="Three stages: document-centric computing organized around files, application-centric computing organized around apps, and idea-centric computing organizing around the idea itself, connected to related concepts, research, and drafts."
    >
      <DiagramDefs />

      {/* Stage 1: document-centric */}
      <text x={10} y={0} fontSize={11} fontWeight={500} fill="var(--color-ink-muted)">
        DOCUMENT-CENTRIC
      </text>
      <DiagramNode x={10} y={70} width={110} height={44} label="File" />

      <DiagramConnector x1={128} y1={92} x2={168} y2={92} />

      {/* Stage 2: application-centric */}
      <text x={175} y={0} fontSize={11} fontWeight={500} fill="var(--color-ink-muted)">
        APPLICATION-CENTRIC
      </text>
      <DiagramNode x={175} y={70} width={110} height={44} label="Application" />

      <DiagramConnector x1={293} y1={92} x2={340} y2={92} label="reorganize around" />

      {/* Stage 3: idea-centric */}
      <text x={350} y={0} fontSize={11} fontWeight={500} fill="var(--color-ink-muted)">
        IDEA-CENTRIC
      </text>
      <DiagramConnector x1={rightCenterX} y1={rightCenterY} x2={380} y2={40} dashed />
      <DiagramConnector x1={rightCenterX} y1={rightCenterY} x2={380} y2={160} dashed />
      <DiagramConnector x1={rightCenterX} y1={rightCenterY} x2={600} y2={40} dashed />
      <DiagramConnector x1={rightCenterX} y1={rightCenterY} x2={600} y2={160} dashed />

      <DiagramNode x={350} y={16} width={100} height={44} label="Research" sublabel="notes" />
      <DiagramNode x={350} y={136} width={100} height={44} label="Draft" sublabel="output" />
      <DiagramNode x={580} y={16} width={100} height={44} label="Related" sublabel="idea" />
      <DiagramNode x={580} y={136} width={100} height={44} label="Reference" sublabel="source" />
      <DiagramNode x={425} y={78} width={90} height={44} label="Idea" emphasis />
    </DiagramFrame>
  );
}
