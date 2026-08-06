"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/config/navigation";
import { site } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { NavDropdown } from "@/components/navigation/NavDropdown";

/**
 * Global site navigation. Desktop: inline links, with a hover/focus
 * dropdown for items that carry children. Mobile: a disclosure panel
 * (children shown inline, indented) rather than a full-screen
 * takeover, per the "calm, not flashy" design principle.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-paper/95 backdrop-blur-sm">
      <Container as="nav" aria-label="Primary" className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-serif text-lg font-semibold tracking-tight text-ink"
        >
          <Image src="/images/iccri-logo.png" alt="" width={28} height={28} className="rounded-full" />
          {site.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <NavDropdown item={item} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="text-sm text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-border md:hidden">
          <Container as="ul" className="flex flex-col gap-1 py-4">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="block py-2 text-sm text-ink-secondary hover:text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <ul className="flex flex-col gap-1 border-l border-border pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block py-1.5 text-sm text-ink-muted hover:text-ink"
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}
