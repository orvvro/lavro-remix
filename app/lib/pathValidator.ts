import { useStoryblokApi } from "@storyblok/react";
import getPathsAndLinks from "./getLinksAndPaths";

const CACHE_KEY = "valid_storyblok_paths_i18n";

// This will hold the paths in memory for the lifetime of the worker instance (fastest access)
let inMemoryPathSet: Set<string> | null = null;

/**
 * Fetches the list of links from Storyblok, generates all localized paths, and caches them.
 */
async function fetchAndCachePaths(ctx: any): Promise<Set<string>> {
  console.log(
    "Path validator: Fetching and caching valid i18n paths from Storyblok..."
  );
  const storyblokApi = useStoryblokApi();
  // We get the `paths` array which already has the localized URLs
  const { paths } = await getPathsAndLinks(storyblokApi, "published");

  const pathSet = new Set<string>();

  // Convert the `paths` array into a clean Set of URL pathnames
  for (const p of paths) {
    const slug = p.params.slug;
    if (slug === undefined) {
      // The default language homepage slug is undefined, which corresponds to the root path
      pathSet.add("/");
    } else {
      // For all other pages, construct the path. Remove trailing slash if it exists.
      const path = `/${slug.endsWith("/") ? slug.slice(0, -1) : slug}`;
      pathSet.add(path || "/"); // Add '/' as a fallback for empty paths
    }
  }

  // Also cache in Cloudflare KV for subsequent requests/worker instances
  if (ctx?.cloudflare?.env?.STORYBLOK_CACHE) {
    const cacheValue = JSON.stringify(Array.from(pathSet));
    // Use waitUntil to not block the response while we write to the cache
    ctx.cloudflare.ctx.waitUntil(
      ctx.cloudflare.env.STORYBLOK_CACHE.put(CACHE_KEY, cacheValue, {
        expirationTtl: 3600, // Cache for 1 hour
      })
    );
  }

  return pathSet;
}

/**
 * Gets the Set of valid paths, using a multi-layer cache for performance.
 */
export async function getValidPaths(ctx: any): Promise<Set<string>> {
  // 1. Check in-memory cache first (zero latency)
  if (inMemoryPathSet) {
    return inMemoryPathSet;
  }

  // 2. Check Cloudflare KV cache (low latency)
  if (ctx?.cloudflare?.env?.STORYBLOK_CACHE) {
    const kvValue = await ctx.cloudflare.env.STORYBLOK_CACHE.get(CACHE_KEY);
    if (kvValue) {
      console.log("Path validator cache hit: KV");
      inMemoryPathSet = new Set(JSON.parse(kvValue));
      return inMemoryPathSet;
    }
  }

  // 3. If no cache, fetch from Storyblok API and populate caches
  inMemoryPathSet = await fetchAndCachePaths(ctx);
  return inMemoryPathSet;
}
