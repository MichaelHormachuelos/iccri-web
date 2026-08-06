import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";
import { Container } from "@/components/layout/Container";

/**
 * Site footer. Operating Policies define the website as the
 * canonical home for governance documents, so a governance link is
 * present from Sprint 1 even though the page itself ships later.
 */
export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-serif text-base font-semibold text-ink">{site.name}</p>
          <p className="mt-2 text-sm text-ink-secondary">{site.fullName}</p>
          <p className="mt-4 text-xs text-ink-muted">
            © {new Date().getFullYear()} {site.fullName}.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-secondary hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/governance" className="text-sm text-ink-secondary hover:text-ink">
            Governance
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
