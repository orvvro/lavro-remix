import { defaultLanguage } from "./i18n";

export default function handleUrl(url: string) {
  if (url.endsWith("home")) {
    url = url.slice(0, -4);
  }

  if (url.startsWith(`${defaultLanguage}/`)) {
    url = url.slice(`${defaultLanguage}`.length);
  }

  if (!url.startsWith("/")) {
    url = `/${url}`;
  }
  return url;
}
