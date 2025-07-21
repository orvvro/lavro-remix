import { getStoryblokApi, type ISbStoriesParams } from "@storyblok/react";
import { data } from "react-router";
import { getStoryFromCache } from "~/lib/storyblokCache";
import { timeoutPromise } from "./timeoutPromise";

export default async function getStory(slug: string, ctx: any) {
  const env = ctx.cloudflare.env;
  slug = slug === ctx.locale ? "" : `/${slug}`;
  const full_slug = `${ctx.locale}${slug}`;
  let body;

  if (env.ENVIRONMENT === "production") {
    body = await getStoryFromCache(slug, env);
  }

  if (!body) {
    try {
      const sbParams: ISbStoriesParams = {
        version: env.ENVIRONMENT === "production" ? "published" : "draft",
      };
      const storyblokapi = getStoryblokApi();
      console.log(`Fetching story "${full_slug}" from Storyblok API...`);
      const response = await timeoutPromise(
        storyblokapi.get(`cdn/stories/${full_slug}`, sbParams),
        5000
      );

      console.log(`Story "${full_slug}" fetched successfully.`);

      if (response) {
        body = response.data;

        // Use `waitUntil` to not block the response to the user.
        ctx.cloudflare.ctx.waitUntil(
          env.STORYBLOK_CACHE.put(slug, JSON.stringify(body), {
            expirationTtl: 2592000,
          })
        );
      }
    } catch (apiError: any) {
      console.error(
        `Failed to fetch story "${full_slug}" from Storyblok.`,
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
