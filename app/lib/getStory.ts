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

  console.log(`Fetching story from KV for slug: "${fullSlug}"`);
  body = await getStoryFromCache(fullSlug, env);
  console.log(`Story for slug: "${fullSlug}" fetched successfully from KV.`);
  if (!body) {
    try {
      const sbParams: ISbStoriesParams = {
        version: import.meta.env.PROD ? "published" : "draft",
      };

      const storyblokapi = getStoryblokApi();
      console.log(`Fetching story "${fullSlug}" from Storyblok API...`);
      /*       const response = await timeoutPromise(
        storyblokapi.get(`cdn/stories/${fullSlug}`, sbParams),
        30000
      ); */
      const response = await storyblokapi.get(
        `cdn/stories/${fullSlug}`,
        sbParams
      );

      console.log(`Story "${fullSlug}" fetched successfully.`);
      body = response.data;

      if (response && import.meta.env.PROD) {
        // Use `waitUntil` to not block the response to the user.
        ctx.cloudflare.ctx.waitUntil(
          env.STORYBLOK_CACHE.put(slug, JSON.stringify(body), {
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
  } else {
    console.log(`KV Cache hit for "${slug}".`);
  }

  if (!body) {
    throw data("Not Found", { status: 404 });
  }

  return body;
}
