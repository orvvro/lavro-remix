export const supportedLanguages = ["en", "nl"];
export const defaultLanguage = "en";
/**
 * Generates a translated path for language switching.
 *
 * @param pathname - The current URL pathname (e.g., "/about" or "/nl/about").
 * @param targetLocale - The language code to switch to (e.g., "nl").
 * @returns The new path for the target language (e.g., "/nl/about" or "/about").
 */
export function getTranslatedPath(
  pathname: string,
  targetLocale: string
): string {
  const pathParts = pathname.split("/").filter(Boolean);

  let currentSlugParts: string[] = [];

  // Determine the current slug by stripping the language code, if it exists.
  if (pathParts.length > 0 && supportedLanguages.includes(pathParts[0])) {
    // Path has a language code (e.g., /nl/about -> pathParts = ['nl', 'about'])
    currentSlugParts = pathParts.slice(1);
  } else {
    // Path does not have a language code, so it's the default language
    // (e.g., /about -> pathParts = ['about'])
    currentSlugParts = pathParts;
  }

  const slug = currentSlugParts.join("/");

  // Construct the new path
  if (targetLocale === defaultLanguage) {
    // If switching to the default language, don't add a prefix.
    return slug ? `/${slug}` : "/";
  }

  // For any other language, add the prefix.
  return slug ? `/${targetLocale}/${slug}` : `/${targetLocale}`;
}
