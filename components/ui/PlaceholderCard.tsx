import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface PlaceholderCardProps {
  title: string;
  description?: string;
  label?: string;
  cta?: { label: string; href: string };
}

/**
 * Card for sections that don't have real content yet (Publications,
 * Library, Projects, Community, News). Composes the existing Card
 * primitive rather than duplicating its border/radius/padding across
 * five pages — see components/ui/Card.tsx.
 */
export function PlaceholderCard({
  title,
  description,
  label = "Coming Soon",
  cta,
}: PlaceholderCardProps) {
  return (
    <Card className="flex flex-col">
      <span className="text-xs font-medium uppercase tracking-wide text-accent">
        {label}
      </span>
      <h3 className="mt-2 font-serif text-lg font-semibold text-ink">{title}</h3>
      {description && (
        <p className="mt-2 flex-1 text-sm text-ink-secondary">{description}</p>
      )}
      {cta && (
        <Button href={cta.href} variant="ghost" className="mt-4 self-start px-0">
          {cta.label} →
        </Button>
      )}
    </Card>
  );
}
