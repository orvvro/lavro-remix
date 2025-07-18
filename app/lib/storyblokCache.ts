import { getStoryblokApi, type ISbStoriesParams } from "@storyblok/react";

// Define a type for the Cloudflare environment for clarity
type CloudflareEnv = {
  STORYBLOK_CACHE: KVNamespace;
  // ... other env vars
};

/**
 * Fetches a story from Storyblok and updates the KV cache.
 */
async function fetchAndCacheStory(slug: string, env: CloudflareEnv) {
  console.log(`Fetching and caching "${slug}" in Cloudflare KV...`);
  try {
    const sbParams: ISbStoriesParams = { version: "published" };
    const { data } = await getStoryblokApi().get(
      `cdn/stories/${slug}`,
      sbParams
    );
    if (data) {
      // Store the data in KV. It will be automatically stringified.
      // Set an expiration time (e.g., 30 days) to keep the cache from growing indefinitely.
      await env.STORYBLOK_CACHE.put(slug, JSON.stringify(data), {
        expirationTtl: 2592000, // 30 days in seconds
      });
    }
  } catch (error) {
    console.error(`Failed to fetch and cache story "${slug}"`, error);
  }
}

/**
 * The action for our webhook to update the cache.
 */

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
    // Re-fetch and update the cache for the specific story that was published.
    await fetchAndCacheStory(body.full_slug, env);
    return {
      success: true,
      message: `KV Cache updated for ${body.full_slug}. ${body.text}`,
    };
  }
  // You could also handle 'unpublished' events by deleting the key
  if (body.action === "unpublished") {
    await env.STORYBLOK_CACHE.delete(body.full_slug);
    return {
      success: true,
      message: `KV Cache deleted for ${body.full_slug}. ${body.text}`,
    };
  }
  return { success: false, message: "No action taken." };
}

/**
 * Gets a story from the KV cache. This is what our loader will use.
 */
export async function getStoryFromCache(
  slug: string,
  env: CloudflareEnv
): Promise<any | null> {
  // The 'json' type automatically parses the JSON string from KV.
  return await env.STORYBLOK_CACHE.get(slug, "json");
}
