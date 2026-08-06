/**
 * Primary and footer navigation structures. Centralized so the
 * Nav and Footer components render from data rather than hardcoded
 * links, and so adding a section is a one-file change.
 */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "First Principles", href: "/research/first-principles" },
      { label: "Research Method", href: "/research/method" },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    children: [
      { label: "Monographs", href: "/publications/monographs" },
      { label: "White Papers", href: "/publications/white-papers" },
    ],
  },
  { label: "Library", href: "/library" },
  { label: "Projects", href: "/projects" },
  { label: "Community", href: "/community" },
  { label: "News", href: "/news" },
];

export const footerNav: NavItem[] = [
  ...primaryNav,
  { label: "Contribute", href: "/contribute" },
  { label: "Contact", href: "/contact" },
];
