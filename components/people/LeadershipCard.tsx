import Image from "next/image";
import type { LeadershipProfile } from "@/lib/domain/queries";

interface LeadershipCardProps {
  profile: LeadershipProfile;
  /** Compact omits the full bio — for previews (e.g. the homepage) that link to the full profile elsewhere. */
  compact?: boolean;
}

/**
 * Platform Refresh v2.0. A deliberate departure from
 * components/people/ContributorCard.tsx's Sprint 3.5 principle
 * ("avoid corporate portraits, favor authenticity and scholarship") —
 * that principle was a default in the absence of real photography;
 * ICCRI has since provided real photographs specifically for a
 * Leadership section, and using them is the more honest choice once
 * they exist. ContributorCard is left in place unchanged for any
 * future context where a photo isn't available or appropriate.
 */
export function LeadershipCard({ profile, compact = false }: LeadershipCardProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-lg border border-border">
        <Image
          src={profile.photoSrc}
          alt={profile.name}
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="font-serif text-lg font-semibold text-ink">{profile.name}</p>
        <p className="text-sm text-ink-secondary">{profile.displayTitle}</p>
        {!compact && (
          <p className="mt-3 max-w-xl text-sm text-ink-secondary">{profile.bio}</p>
        )}
      </div>
    </div>
  );
}
