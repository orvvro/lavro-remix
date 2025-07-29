import { getStoryblokApi, type ISbStoriesParams } from "@storyblok/react";

// Define a type for the Cloudflare environment for clarity
type CloudflareEnv = {
  STORYBLOK_CACHE: KVNamespace;
  // ... other env vars
};

async function fetchAndCacheStory(slug: string, env: CloudflareEnv) {
  console.log(`Fetching and caching "${slug}" in Cloudflare KV...`);
  try {
    const sbParams: ISbStoriesParams = { version: "published" };
    const { data } = await getStoryblokApi().get(
      `cdn/stories/${slug}`,
      sbParams
    );
    if (data) {
      await env.STORYBLOK_CACHE.put(slug, JSON.stringify(data), {
        expirationTtl: 2592000, // 30 days in seconds
      });
    }
  } catch (error) {
    console.error(`Failed to fetch and cache story "${slug}"`, error);
  }
}

type WebhookBody = {
  action: "published" | "unpublished";
  full_slug: string;
  text: string;
};

export async function handleWebhook(request: Request, env: CloudflareEnv) {
  const body: WebhookBody = await request.json();
  if (!body || !body.action || !body.full_slug) {
    return { success: false, message: "Invalid request body." };
  }
  if (body.action === "published") {
    console.log(`Updating KV cache for "${body.full_slug}"`);
    await fetchAndCacheStory(body.full_slug, env);
    return {
      success: true,
      message: `KV Cache updated for ${body.full_slug}. ${body.text}`,
    };
  }
  if (body.action === "unpublished") {
    console.log(`Deleting KV cache for "${body.full_slug}"`);
    await env.STORYBLOK_CACHE.delete(body.full_slug);
    return {
      success: true,
      message: `KV Cache deleted for ${body.full_slug}. ${body.text}`,
    };
  }
  return { success: false, message: "No action taken." };
}

export async function getStoryFromCache(
  slug: string,
  env: CloudflareEnv
): Promise<any | null> {
  return await env.STORYBLOK_CACHE.get(slug);
}
