import { getStoryblokApi, type ISbStoriesParams } from "@storyblok/react";

import { getStoryFromCache } from "~/lib/storyblokCache";

export default async function getStory(slug: string, ctx: any) {
  const env = ctx.cloudflare.env;
  let data;

  if (env.ENVIRONMENT === "production") {
    data = await getStoryFromCache(slug, env);
  }

  if (!data) {
    try {
      const sbParams: ISbStoriesParams = {
        version: env.ENVIRONMENT === "production" ? "published" : "draft",
      };
      const response = await getStoryblokApi().get(
        `cdn/stories/${slug}`,
        sbParams
      );
      data = response.data;

      if (data) {
        // Use `waitUntil` to not block the response to the user.
        ctx.cloudflare.ctx.waitUntil(
          env.STORYBLOK_CACHE.put(slug, JSON.stringify(data), {
            expirationTtl: 2592000,
          })
        );
      }
    } catch (apiError) {
      console.error(
        `Failed to fetch story "${slug}" from Storyblok.`,
        apiError
      );
      throw new Response("Not Found", { status: 404 });
    }
  } else {
    console.log(`KV Cache hit for "${slug}".`);
  }

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return data;
}
