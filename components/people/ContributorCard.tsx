import type { Author } from "@/types/author";

interface ContributorCardProps {
  author: Author;
  note?: string;
}

/**
 * Understated human-presence pattern. Deliberately not a corporate
 * headshot card — a typeset monogram in place of a photo, keeping
 * the emphasis on scholarship over personal branding, per the
 * Sprint 3.5 brief ("avoid corporate portraits, favor authenticity
 * and scholarship").
 */
export function ContributorCard({ author, note }: ContributorCardProps) {
  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <div className="flex gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border-strong font-serif text-lg font-semibold text-ink">
        {initials}
      </div>
      <div>
        <p className="font-serif text-base font-semibold text-ink">{author.name}</p>
        {author.role && <p className="text-sm text-ink-secondary">{author.role}</p>}
        {note && <p className="mt-2 max-w-md text-sm text-ink-secondary">{note}</p>}
      </div>
    </div>
  );
}
