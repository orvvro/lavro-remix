import { data } from "react-router";
import { getStoryFromCache } from "~/lib/storyblokCache";
import { defaultLanguage, supportedLanguages } from "~/lib/i18n";
import { accessToken } from "~/root";

export default async function getStory(slug: string, ctx: any) {
  const env = ctx.cloudflare.env;
  let body, cachedBody;
  console.log(`getStory for slug: "${slug}"`);
  slug = slug.replace(/\/$/, "");

  const invalidPrefixRegex = new RegExp(`^${defaultLanguage}(/.*)?$`);
  if (
    invalidPrefixRegex.test(slug) &&
    slug !== `${defaultLanguage}/config` &&
    !ctx.isPreview
  ) {
    throw data("Not Found", { status: 404 });
  }

  let fullSlug: string;

  // Case 1: The slug is an empty string, meaning it's the default homepage.
  if (slug === "") {
    fullSlug = `${defaultLanguage}/home`;
  }
  // Case 2: The slug is just a language code (e.g., "nl"), meaning it's a translated homepage.
  else if (supportedLanguages.includes(slug) && !slug.includes("/")) {
    fullSlug = `${slug}/home`;
  }
  // Case 3: The slug does not contain a language prefix, so it belongs to the default language.
  else if (!supportedLanguages.includes(slug.split("/")[0])) {
    fullSlug = `${defaultLanguage}/${slug}`;
  }
  // Case 4: The slug is already correctly formatted with a language prefix (e.g., "nl/about").
  else {
    fullSlug = slug;
  }

  const version = ctx.isProduction ? "published" : "draft";
  const url = `https://api.storyblok.com/v2/cdn/stories/${fullSlug}?version=${version}&token=${accessToken}&cv=${Date.now()}`;
  if (ctx.isProduction) {
    cachedBody = await getStoryFromCache(fullSlug, env);
  }
  if (cachedBody) {
    // 2. If a value exists, THEN parse it.
    console.log(`KV Cache hit for "${fullSlug}".`);
    body = JSON.parse(cachedBody);
  } else {
    // 3. If the cache is empty, fetch from the API.
    console.log(`KV Cache miss for "${fullSlug}". Fetching from API...`);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // If the fetch fails, throw an error to stop the process
        throw new Error(`Storyblok API responded with ${response.status}`);
      }

      const bodyText = await response.text();

      console.log(`Story "${fullSlug}" fetched successfully from API.`);

      if (response && import.meta.env.PROD) {
        ctx.cloudflare.ctx.waitUntil(
          env.STORYBLOK_CACHE.put(fullSlug, bodyText, {
            // Use fullSlug here
            expirationTtl: 2592000,
          })
        );
      }

      body = JSON.parse(bodyText);
    } catch (apiError: any) {
      console.error(
        `Failed to fetch story "${fullSlug}" from Storyblok.`,
        apiError
      );
      throw data(apiError.message || "Not found", {
        status: apiError.status || 404,
      });
    }
  }

  if (!body) {
    throw data("Not Found", { status: 404 });
  }

  return body;
}
