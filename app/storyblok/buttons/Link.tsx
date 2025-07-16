import { StoryblokComponent, type SbBlokData } from "@storyblok/react";
import { css, cx } from "@linaria/core";
import { getStyles } from "./Button";
import { Link as RouterLink } from "react-router";
import handleUrl from "~/lib/handleUrl";

const Link = ({ blok }: { blok: SbBlokData }) => {
  return (
    <RouterLink
      to={(blok.link as any).url || handleUrl((blok.link as any).cached_url)}
      className={getStyles(blok.style as string)}
    >
      {blok.text as string}
    </RouterLink>
  );
};
export default Link;
