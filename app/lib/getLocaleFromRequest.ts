import { supportedLanguages, defaultLanguage } from "./i18n";

/**
 * Determines the locale from the request URL.
 * @param request The request object.
 * @returns The detected locale (e.g., 'en', 'de').
 */
export default function getLocaleFromRequest(request: Request): string {
  const { pathname } = new URL(request.url);
  const pathParts = pathname.split("/").filter(Boolean);

  if (pathParts.length > 0 && supportedLanguages.includes(pathParts[0])) {
    // Return the locale if it's the first part of the path
    return pathParts[0];
  }

  // Fallback to the default language
  return defaultLanguage;
}
