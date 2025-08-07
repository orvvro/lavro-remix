import { type SbBlokData } from "@storyblok/react";
import Section from "~/components/Section";
import { formatText } from "~/lib/formatText";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { css } from "@linaria/core";
import { breakPoints } from "~/assets/globals";

export default function ModalCards({
  blok,
}: {
  blok: SbBlokData & {
    heading: string;
    sub_heading: string;
    cards: SbBlokData[];
  };
}) {
  return (
    <Section blok={blok}>
      <div className={modalCards}>
        {blok.cards.map((blok) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))}
      </div>
    </Section>
  );
}

const modalCards = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  margin-top: 3rem;

  @media (max-width: ${breakPoints.tablet}rem) {
    grid-template-columns: 1fr;
  }
`;
