import { css } from "@linaria/core";
import { type SbBlokData } from "@storyblok/react";
import { StoryblokServerRichText } from "@storyblok/react/ssr";

export default function RichText({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    text: any;
  };
}) {
  return <StoryblokServerRichText doc={blok.text} />;
}
