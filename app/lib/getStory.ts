import { data } from "react-router";
import { getStoryFromCache } from "~/lib/storyblokCache";
import { defaultLanguage, supportedLanguages } from "~/lib/i18n";
import { accessToken } from "~/root";
import { transformSlugToStoryblokPath } from "~/lib/transformSlug";

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

  // Use the single source of truth to get the full slug
  const fullSlug = transformSlugToStoryblokPath(slug);

  const version = ctx.isProduction ? "published" : "draft";
  const url = `https://api.storyblok.com/v2/cdn/stories/${fullSlug}?token=${accessToken}&version=${version}`;
  if (ctx.isProduction) {
    cachedBody = await getStoryFromCache(fullSlug, env);
  }

  if (cachedBody) {
    // 2. If a value exists, THEN parse it.
    console.log(`KV Cache hit for "${fullSlug}".`);
    body = JSON.parse(cachedBody);
  } else {
    if (ctx.isProduction) {
      console.log(`KV Cache miss for "${fullSlug}". Fetching from API...`);
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // If the fetch fails, throw an error to stop the process
        throw new Error(`Storyblok API responded with ${response.status}`);
      }

      const bodyText = await response.text();

      console.log(`Story "${fullSlug}" fetched successfully from API.`);

      if (response && ctx.isProduction) {
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
