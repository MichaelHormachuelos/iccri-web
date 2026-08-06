import type { Metadata } from "next";
import { site } from "./site";

/**
 * Base metadata shared by the root layout. Route-level pages extend
 * this via Next's metadata merging rather than redefining it.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.fullName}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
};
