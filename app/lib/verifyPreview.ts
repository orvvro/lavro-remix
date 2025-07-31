// https://preview.lavro-marketing.com/?_storyblok=608505740&_storyblok_c=page&_storyblok_version=&_storyblok_lang=default&_storyblok_release=0&_storyblok_rl=1753971353814&_storyblok_tk[space_id]=320663&_storyblok_tk[timestamp]=1753971353&_storyblok_tk[token]=306308e0165c11797025adaea9f749867757340a

// Note: Replace 'YOUR_PREVIEW_TOKEN' with your actual preview token value.
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
