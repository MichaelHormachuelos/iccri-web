/**
 * A person credited on a publication, project, or article. Kept
 * minimal until Community/researcher-profile pages (later sprint)
 * need more — affiliation, bio, links.
 */
export interface Author {
  name: string;
  role?: string;
}
