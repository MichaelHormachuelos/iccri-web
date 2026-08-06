export interface FootnoteEntry {
  text: string;
}

interface FootnoteMarkerProps {
  index: number;
}

/** Inline marker linking down to its entry — distinct from Citation, which links to a References section rather than a page-bottom footnote. */
export function FootnoteMarker({ index }: FootnoteMarkerProps) {
  return (
    <sup>
      <a href={`#footnote-${index}`} id={`footnote-ref-${index}`} className="text-accent no-underline hover:underline">
        {index}
      </a>
    </sup>
  );
}

interface FootnotesProps {
  notes: FootnoteEntry[];
}

/**
 * Page-bottom footnote block. Use this for asides/clarifications
 * that belong at the foot of the page they occur on; use
 * Citation + ReferenceList instead for scholarly sourcing that
 * belongs in a References section at the end of the work.
 */
export function Footnotes({ notes }: FootnotesProps) {
  if (notes.length === 0) return null;
  return (
    <div className="mt-12 border-t border-border pt-4">
      <ol className="flex flex-col gap-2 text-sm text-ink-secondary">
        {notes.map((note, i) => (
          <li key={i} id={`footnote-${i + 1}`}>
            <a href={`#footnote-ref-${i + 1}`} className="text-accent no-underline hover:underline">
              ↑
            </a>{" "}
            {note.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
