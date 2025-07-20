import { css } from "@linaria/core";
import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { breakPoints } from "~/assets/globals";
import { StoryblokServerComponent } from "@storyblok/react/ssr";

interface UspBlok extends SbBlokData {
  background: SbBlokData[];
  heading: string;
  text: string;
  icon: { filename: string; raw?: string };
}

export default function UspContainer({ blok }: { blok: UspBlok }) {
  return (
    <div className={uspContainer} {...storyblokEditable(blok)}>
      {blok.background.map((blok: SbBlokData) => (
        <StoryblokServerComponent blok={blok} key={blok._uid} />
      ))}
      {blok.icon.raw && (
        <div dangerouslySetInnerHTML={{ __html: blok.icon.raw }} />
      )}
      <h2>{blok.heading}</h2>
      <p>{blok.text}</p>
    </div>
  );
}

export const uspContainer = css`
  position: relative;
  transform: translate3d(0, 0, 0);
  background: linear-gradient(var(--color-black), var(--color-black))
      padding-box,
    radial-gradient(
        circle 500px at var(--x, -999px) var(--y, -999px),
        var(--color-secondary) 0%,
        var(--color-primary) 30%,
        hsl(186 100% 82%) 45%,
        #555 60%
      )
      border-box;
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 28px 32px;
  contain: content;
  isolation: isolate;

  @media screen and (max-width: ${breakPoints.mobile}rem) {
    position: sticky;
  }

  & svg {
    margin-top: 2.5rem;
    height: 2.25rem;
    width: auto;
  }

  h2 {
    margin-top: 20px;
    margin-bottom: 8px;
    font-size: 20px;
  }

  p {
    opacity: 0.8;
  }

  & .stop1,
  & .stop2 {
    stop-color: white;
    transition: stop-color ease-in-out 0.2s;
  }

  &:hover .stop1,
  &:active .stop1 {
    stop-color: var(--color-primary);
  }

  &:hover .stop2,
  &:active .stop2 {
    stop-color: var(--color-secondary);
  }
`;
