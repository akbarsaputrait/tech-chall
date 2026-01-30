/**
 * Formats a kebab-case or slug string to Title Case
 * Handles both hyphens and spaces as separators
 * @example toTitleCase("smart speakers") => "Smart Speakers"
 */
export function toTitleCase(text: string): string {
  return text
    .split(/[-\s]+/)
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Formats a date string to a human readable date
 * @example formatDate("2026-01-30") => "January 30, 2026"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
