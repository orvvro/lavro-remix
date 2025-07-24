import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { css } from "@linaria/core";

export default function CookieBanner({
  blok,
}: {
  blok: SbBlokData & {
    title: string;
    description: SbBlokData[];
    purposes?: SbBlokData[];
    buttons: SbBlokData[];
  };
}) {
  return (
    <div {...storyblokEditable(blok)} className={cookieBannerStyles}>
      <span>{blok.title}</span>
      <div className={descriptionStyles}>
        {blok.description?.map((blok) => {
          return <StoryblokServerComponent blok={blok} />;
        })}
      </div>
      <div>
        {blok.purposes?.map((blok) => {
          return <StoryblokServerComponent blok={blok} />;
        })}
      </div>
      <div className={buttonsStyles}>
        {blok.buttons.map((blok) => {
          return <StoryblokServerComponent blok={blok} />;
        })}
      </div>
    </div>
  );
}

const cookieBannerStyles = css`
  span {
    font-size: x-large;
  }

  transition: opacity 0.2s;
  position: fixed;
  background-color: var(--color-black);
  border: 1px solid gray;
  padding: 1.5rem;
  position: fixed;
  bottom: 0;
  z-index: 80;
  margin: 16px;
  border-radius: 20px;
`;
const descriptionStyles = css`
  margin-top: 1rem;
  max-width: 40ch;
`;
const buttonsStyles = css`
  margin-top: 1rem;
  margin-right: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
