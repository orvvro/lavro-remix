import { cache } from "react";
import getStoryblokLinks from "./getLinksAndPaths";
import { transformSlugToStoryblokPath } from "~/lib/transformSlug";
import { accessToken } from "~/root";

const CACHE_KEY = "valid_storyblok_paths";

// Level 1 Cache: In-memory for the lifetime of the worker instance (fastest)
let inMemoryPathSet: Set<string> | null = null;

/**
 * Fetches all links from Storyblok, generates all localized paths, and caches them.
 */
async function fetchAndCachePaths(ctx: any): Promise<Set<string>> {
  console.log(
    "Path validator: Cache miss. Fetching all paths from Storyblok..."
  );

  const links = await getStoryblokLinks(accessToken);

  const pathSet = new Set<string>();

  links
    .filter(
      (link) =>
        !link.is_folder && !link.slug.endsWith("config") && link.slug !== "home" // Also filter out the raw 'home' slug
    )
    .forEach((link) => {
      const storyblokPath = transformSlugToStoryblokPath(link.slug);
      pathSet.add(storyblokPath);
    });

  if (pathSet.size === 0) {
    console.error(
      "Path validator: Fetched links resulted in an empty path set. Caching will be skipped to prevent a site-wide outage. This may indicate a temporary API issue."
    );
    // Return the empty set for this single request, but don't save it.
    // The next request will trigger a new fetch attempt.
    return pathSet;
  }

  const pathCache = ctx?.cloudflare?.env?.PATH_VALIDATOR_CACHE;

  inMemoryPathSet = pathSet;
  if (pathCache) {
    const cacheValue = JSON.stringify(Array.from(pathSet));
    ctx.cloudflare.ctx.waitUntil(
      pathCache.put(CACHE_KEY, cacheValue, {
        expirationTtl: 3600, // Cache for 1 hour
      })
    );
  }

  console.log(`Path validator: Cached ${pathSet.size} valid paths.`);
  return pathSet;
}

/**
 * Checks if a given URL pathname is a valid, published Storyblok path.
 * Uses a multi-level cache for maximum performance.
 * @param pathname The URL pathname to validate (e.g., "/about-us").
 * @param ctx The server context containing Cloudflare bindings.
 * @returns {Promise<boolean>} True if the path is valid, false otherwise.
 */
export default async function isValidPath(
  pathname: string,
  ctx: any
): Promise<boolean> {
  const storyblokPath = transformSlugToStoryblokPath(pathname);
  console.log(`Validating raw path: "${pathname}" -> "${storyblokPath}"`);

  // Level 1 & 2: Check caches
  // ... (This part of the function is correct)
  if (inMemoryPathSet && Array.from(inMemoryPathSet).length > 0) {
    console.log("Path validator: Checking in-memory cache...");
    return inMemoryPathSet.has(storyblokPath);
  }

  const pathCache = ctx?.cloudflare?.env?.PATH_VALIDATOR_CACHE;
  if (pathCache) {
    // 1. You correctly get the JSON string from the cache.
    const cachedPaths = await pathCache.get(CACHE_KEY);

    if (cachedPaths) {
      // A simple check for null is sufficient
      console.log("Path validator: Found cached string in KV.");

      // 2. You correctly parse the string back into a JavaScript array.
      const pathArray = JSON.parse(cachedPaths);
      if (pathArray.length !== 0) {
        // 3. You correctly create the Set from the array and save it to memory.
        inMemoryPathSet = new Set(pathArray);

        // 4. You correctly check against the newly created Set.
        return inMemoryPathSet.has(storyblokPath);
      }
    }
  }
  // Level 3: Fetch from Storyblok API (source of truth)
  console.log("Path validator: No cache found. Fetching from API...");
  const pathSet = await fetchAndCachePaths(ctx);

  if (pathSet.size === 0) {
    console.warn(
      "Path validator returned an empty set. Allowing request to proceed to getStory as a fallback."
    );
    return true;
  }

  return pathSet.has(storyblokPath);
}
