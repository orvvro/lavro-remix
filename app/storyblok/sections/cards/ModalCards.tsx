import { type SbBlokData } from "@storyblok/react";
import Section from "~/components/Section";
import * as motion from "motion/react-client";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { css, cx } from "@linaria/core";
import { breakPoints } from "~/assets/globals";
import { whileInViewAnimationProps } from "~/assets/animations";

export default function ModalCards({
  blok,
}: {
  blok: SbBlokData & {
    heading: string;
    sub_heading: string;
    cards: SbBlokData[];
    style: string;
  };
}) {
  return (
    <Section blok={blok}>
      <motion.div
        {...whileInViewAnimationProps}
        className={cx(modalCards, blok.style)}
      >
        {blok.cards.map((blok) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))}
      </motion.div>
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

  &.single {
    grid-template-columns: 1fr;
  }
`;
