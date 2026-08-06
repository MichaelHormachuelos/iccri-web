/**
 * Conditionally joins class name fragments, filtering out falsy
 * values. Kept dependency-free (no clsx/tailwind-merge) until a
 * real need for class-conflict resolution shows up.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
