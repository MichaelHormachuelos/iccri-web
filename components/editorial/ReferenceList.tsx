export interface Reference {
  text: string;
}

interface ReferenceListProps {
  references: Reference[];
}

/**
 * Numbered reference list, paired with inline <Citation> markers.
 * Each entry's id (ref-N) is what Citation's default href points to.
 */
export function ReferenceList({ references }: ReferenceListProps) {
  return (
    <ol className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-sm text-ink-secondary">
      {references.map((ref, i) => (
        <li key={i} id={`ref-${i + 1}`}>
          [{i + 1}] {ref.text}
        </li>
      ))}
    </ol>
  );
}
