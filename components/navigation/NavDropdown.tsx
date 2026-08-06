"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/navigation";
import { Surface } from "@/components/ui/Surface";
import { cn } from "@/lib/utils";

interface NavDropdownProps {
  item: NavItem;
}

/**
 * Desktop dropdown for a top-level nav item with children (Research,
 * Publications). Visually shows on hover/focus via CSS, but tracks
 * open state in JS too so aria-expanded is accurate for screen
 * reader users rather than relying on implicit DOM visibility.
 */
export function NavDropdown({ item }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "text-sm transition-colors duration-150",
          active ? "font-medium text-ink" : "text-ink-secondary hover:text-ink",
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          "text-sm transition-colors duration-150",
          active ? "font-medium text-ink" : "text-ink-secondary hover:text-ink",
        )}
      >
        {item.label}
      </Link>
      <Surface
        className={cn(
          "absolute left-0 top-full z-10 min-w-44 -translate-y-1 py-2 shadow-sm transition-all duration-150",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        )}
      >
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block px-4 py-2 text-sm text-ink-secondary hover:bg-paper hover:text-ink"
          >
            {child.label}
          </Link>
        ))}
      </Surface>
    </div>
  );
}
