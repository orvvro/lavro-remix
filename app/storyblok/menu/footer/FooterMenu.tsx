import { css } from "@linaria/core";
import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
export default function FooterMenu({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    heading?: string;
    items: SbBlokData[];
  };
}) {
  return (
    <div {...storyblokEditable(blok)} className={footerMenuStyles}>
      {blok.heading && <span>{blok.heading}</span>}
      {blok.items.map((blok) => (
        <StoryblokServerComponent blok={blok} key={blok._uid} />
      ))}
    </div>
  );
}

const footerMenuStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  span {
    font-weight: 600;
  }
`;
