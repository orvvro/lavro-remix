export async function verifyPreview(
  request: Request,
  accessToken: string
): Promise<boolean> {
  const url = new URL(request.url);
  const spaceId = url.searchParams.get("_storyblok_tk[space_id]");
  const token = url.searchParams.get("_storyblok_tk[token]");
  const timestamp = url.searchParams.get("_storyblok_tk[timestamp]");

  if (!spaceId || !token || !timestamp) {
    return false;
  }

  const validationString = `${spaceId}:${accessToken}:${timestamp}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(validationString);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const validationToken = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return (
    token === validationToken &&
    parseInt(timestamp, 10) > Math.floor(Date.now() / 1000) - 3600
  );
}
