import { useLoaderData } from "react-router";
import {
  getStoryblokApi,
  useStoryblokState,
  type ISbStoriesParams,
} from "@storyblok/react";
import type { LoaderFunctionArgs } from "react-router";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { getStoryFromCache } from "~/lib/storyblokCache";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const slug = params["*"] || "home";
  const env = context.cloudflare.env;

  // 1. Try to get the story from the Cloudflare KV cache.
  let data = await getStoryFromCache(slug, env);
  // 2. If it's a cache miss, fetch from Storyblok and populate the cache.
  if (!data) {
    console.log(`KV Cache miss for "${slug}". Fetching from Storyblok...`);
    try {
      const sbParams: ISbStoriesParams = {
        version: env.ENVIRONMENT === "production" ? "published" : "draft",
      };
      const response = await getStoryblokApi().get(
        `cdn/stories/${slug}`,
        sbParams
      );
      data = response.data;

      // 3. Write the new data to the KV cache for the next request.
      if (data) {
        // Use `waitUntil` to not block the response to the user.
        context.cloudflare.ctx.waitUntil(
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

  return Response.json({ data });
};

export default function Page() {
  let { data } = useLoaderData();

  data = useStoryblokState(data.story);
  // docs: https://www.storyblok.com/docs/packages/storyblok-react

  return <StoryblokServerComponent blok={data.content} />;
}
