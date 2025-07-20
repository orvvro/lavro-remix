import getStory from "./getStory";

// In-memory cache for the global config
let configPromise: Promise<any> | null = null;

/**
 * Gets the global config story, fetching it only once and caching it in memory.
 */
export function getGlobalConfig(ctx: any) {
  if (!configPromise) {
    console.log("Fetching and caching global config in memory...");
    configPromise = getStory("config", ctx);
  }
  return configPromise;
}
