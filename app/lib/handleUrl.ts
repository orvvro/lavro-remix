export default function handleUrl(url: string) {
  if (url.endsWith("home")) {
    url = url.slice(0, -4);
  }

  if (!url.startsWith("/")) {
    url = `/${url}`;
  }
  return url;
}
