import { type SbBlokData } from "@storyblok/react";

import { getStyles } from "./Button";
import { Link as RouterLink } from "react-router";
import handleUrl from "~/lib/handleUrl";

interface LinkBlok extends SbBlokData {
  text: string;
  link: {
    url: string;
    cached_url: string;
  };
  style?: string;
}

const Link = ({ blok }: { blok: LinkBlok }) => {
  return (
    <RouterLink
      to={blok.link.url || handleUrl(blok.link.cached_url)}
      className={getStyles(blok.style as string)}
    >
      {blok.text}
    </RouterLink>
  );
};
export default Link;
