/**
 * Mirrors the CSS custom properties defined in app/globals.css
 * (@theme block) for consumers that need raw values rather than
 * Tailwind classes — e.g. Framer Motion animate targets, canvas/SVG
 * chart colors. Keep in sync with globals.css by hand; there are
 * few enough tokens that a build-time generator isn't justified yet.
 */
export const theme = {
  color: {
    paper: "#faf9f5",
    paperRaised: "#ffffff",
    ink: "#1c1b19",
    inkSecondary: "#55524c",
    inkMuted: "#6b675e",
    accent: "#3b3aa0",
    accentHover: "#2e2d80",
    accentTint: "#ecebfa",
    border: "#e4e1d8",
    borderStrong: "#c9c4b8",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
} as const;
