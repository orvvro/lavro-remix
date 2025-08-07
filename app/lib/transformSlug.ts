import { defaultLanguage, supportedLanguages } from "./i18n";

/**
 * Transforms a URL-friendly slug into the full slug format that the Storyblok API expects.
 * This function is the single source of truth for path resolution.
 * e.g., "" -> "en/home", "about" -> "en/about", "nl" -> "nl/home"
 * @param slug The incoming URL path segment, e.g., from `params`.
 * @returns The full slug for the Storyblok API.
 */
export function transformSlugToStoryblokPath(slug: string): string {
  // Remove trailing slash for consistency
  slug = slug.replace(/\/$/, "");

  // Case 1: The slug is an empty string, meaning it's the default homepage.
  if (slug === "") {
    return `${defaultLanguage}/home`;
  }

  // Case 2: The slug is just a language code (e.g., "nl"), meaning it's a translated homepage.
  if (supportedLanguages.includes(slug) && !slug.includes("/")) {
    return `${slug}/home`;
  }

  // Case 3: The slug does not contain a language prefix, so it belongs to the default language.
  if (!supportedLanguages.some((lang) => slug.startsWith(`${lang}/`))) {
    return `${defaultLanguage}/${slug}`;
  }

  // Case 4: The slug is already correctly formatted with a language prefix (e.g., "nl/about").
  return slug;
}
