/**
 * Fetches all links from the Storyblok Links API, handling pagination concurrently.
 * @param {string} accessToken - Your Storyblok API access token.
 * @returns {Promise<ISbLink[]>} A promise that resolves to an array of all link objects.
 */

// Define ISbLink type if not imported from elsewhere
export interface ISbLink {
  id: string;
  slug: string;
  name: string;
  parent_id: string | null;
  is_folder: boolean;
  published: boolean;
  [key: string]: any;
}

export default async function getStoryblokLinks(
  accessToken: string
): Promise<ISbLink[]> {
  const perPage = 100; // Max items per page
  const allLinks: ISbLink[] = [];
  let page = 1;

  try {
    // First, get page 1 to find out the total number of pages
    const initialUrl = `https://api.storyblok.com/v2/cdn/links?token=${accessToken}&version=published&per_page=${perPage}&page=${page}`;
    const initialResponse = await fetch(initialUrl);

    if (!initialResponse.ok) {
      throw new Error(
        `Storyblok Links API responded with ${initialResponse.status}`
      );
    }

    const totalItems = parseInt(
      initialResponse.headers.get("total") || "0",
      10
    );
    const totalPages = Math.ceil(totalItems / perPage);

    const initialData = (await initialResponse.json()) as {
      links?: Record<string, ISbLink>;
    };
    // Use Object.values() to get an array of the link objects
    if (initialData.links) {
      allLinks.push(...Object.values(initialData.links));
    }
    // If there are more pages, fetch them all concurrently
    if (totalPages > 1) {
      const pagePromises: Promise<Response>[] = [];
      for (page = 2; page <= totalPages; page++) {
        const url = `https://api.storyblok.com/v2/cdn/links?token=${accessToken}&version=published&per_page=${perPage}&page=${page}`;
        pagePromises.push(fetch(url));
      }

      const responses = await Promise.all(pagePromises);
      for (const response of responses) {
        if (response.ok) {
          const pageData = (await response.json()) as {
            links?: Record<string, ISbLink>;
          };
          // Also use Object.values() here for the subsequent pages
          if (pageData.links) {
            allLinks.push(...Object.values(pageData.links));
          }
        }
      }
    }
    return allLinks;
  } catch (error) {
    console.error("Error fetching links from Storyblok:", error);
    return []; // Return empty on failure
  }
}
