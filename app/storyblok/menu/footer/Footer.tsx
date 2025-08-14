import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { css, cx } from "@linaria/core";
import { defaultSpacing } from "~/assets/globals";
export default function Footer({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    footer_menu: SbBlokData[];
  };
}) {
  return (
    <footer {...storyblokEditable(blok)} className={footerStyles}>
      <div className={cx(defaultSpacing, container)}>
        {blok.footer_menu.map((blok) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))}
      </div>
    </footer>
  );
}

const footerStyles = css`
  margin: 0;
  margin-top: 10rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const container = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  column-gap: 5rem;
  row-gap: 4rem;
  align-items: start;
`;
