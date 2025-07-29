import { getStoryblokApi, type ISbStoriesParams } from "@storyblok/react";
import { data } from "react-router";
import { getStoryFromCache } from "~/lib/storyblokCache";
import { timeoutPromise } from "./timeoutPromise";
import { defaultLanguage, supportedLanguages } from "~/lib/i18n";

export default async function getStory(slug: string, ctx: any) {
  const env = ctx.cloudflare.env;
  let body;
  console.log(`getStory for slug: "${slug}"`);
  slug = slug.replace(/\/$/, "");

  const invalidPrefixRegex = new RegExp(`^${defaultLanguage}(/.*)?$`);
  if (invalidPrefixRegex.test(slug) && slug !== `${defaultLanguage}/config`) {
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

  const cachedBody = await getStoryFromCache(fullSlug, env);

  if (cachedBody) {
    // 2. If a value exists, THEN parse it.
    console.log(`KV Cache hit for "${fullSlug}".`);
    body = JSON.parse(cachedBody);
  } else {
    // 3. If the cache is empty, fetch from the API.
    console.log(`KV Cache miss for "${fullSlug}". Fetching from API...`);
    try {
      const sbParams: ISbStoriesParams = {
        version: import.meta.env.PROD ? "published" : "draft",
      };

      const storyblokapi = getStoryblokApi();
      const response = await storyblokapi.get(
        `cdn/stories/${fullSlug}`,
        sbParams
      );

      console.log(`Story "${fullSlug}" fetched successfully from API.`);
      body = response.data;

      if (response && import.meta.env.PROD) {
        ctx.cloudflare.ctx.waitUntil(
          env.STORYBLOK_CACHE.put(fullSlug, JSON.stringify(body), {
            // Use fullSlug here
            expirationTtl: 2592000,
          })
        );
      }
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
