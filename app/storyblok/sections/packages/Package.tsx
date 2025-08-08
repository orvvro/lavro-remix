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
    &::after {
      width: 0.75em;
      display: inline-block;
      content: url("data:image/svg+xml,%3Csvg viewBox='-5.5 0 26 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.404 11.36 3.637 1.6a2.11 2.11 0 0 0-3.008 0 2.117 2.117 0 0 0 0 3L9.885 13 .629 21.4a2.117 2.117 0 0 0 0 3c.83.84 2.177.84 3.008 0l10.767-9.76c.45-.45.648-1.05.611-1.64a2.115 2.115 0 0 0-.611-1.64' fill='%231463f5' fill-rule='evenodd'/%3E%3C/svg%3E%0A");
    }
  }
`;

const cardStyles = css`
  flex: 0 1 32rem;
  border-radius: 20px;
  padding: 4rem;
  background-color: var(--color-transparent-black);
`;
