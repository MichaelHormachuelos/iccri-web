interface CitationProps {
  index: number;
  href?: string;
}

/**
 * Inline superscript citation marker, linking down to its entry in
 * a ReferenceList (id="ref-N") when used within the same page.
 */
export function Citation({ index, href }: CitationProps) {
  return (
    <sup>
      <a href={href ?? `#ref-${index}`} className="text-accent no-underline hover:underline">
        [{index}]
      </a>
    </sup>
  );
}
