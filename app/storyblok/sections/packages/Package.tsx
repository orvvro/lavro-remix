import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import {
  StoryblokServerComponent,
  StoryblokServerRichText,
} from "@storyblok/react/ssr";
import { css, cx } from "@linaria/core";
import TiltingCard from "~/components/TiltingCard";
import { gradientBorder } from "~/assets/globals";

export default function Package({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    heading: string;
    paragraph: any;
    cta?: SbBlokData[];
  };
}) {
  return (
    <TiltingCard className={cx(cardStyles, gradientBorder)}>
      <div {...storyblokEditable(blok)} className={packageStyles}>
        <h2>{blok.heading}</h2>
        <StoryblokServerRichText doc={blok.paragraph} />
        {blok.cta &&
          blok.cta.map((cta) => (
            <div key={cta._uid} className={ctaStyles}>
              <StoryblokServerComponent blok={cta} />
            </div>
          ))}
      </div>
    </TiltingCard>
  );
}

const packageStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  h2 {
    margin-bottom: 1rem;
  }

  h2 + div ul {
    margin-top: 1em;
    list-style: disc;
    list-style-position: inside;
    li * {
      display: inline;
    }
  }
`;

const ctaStyles = css`
  isolation: isolate;
  font-weight: 600;
  margin-top: auto;
  padding-top: 4rem;
  button,
  a {
    margin-top: auto;
    display: flex;
    gap: 0.2em;
    align-items: center;
  }
`;

const cardStyles = css`
  flex: 0 1 32rem;
  border-radius: 20px;
  padding: 4rem;
  background-color: var(--color-transparent-black);
`;
