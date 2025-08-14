import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { type SbBlokData } from "@storyblok/react";
import Section from "~/components/Section";
import { useRef, useEffect } from "react";
import { uspContainer } from "./Usp";
import { breakPoints } from "~/assets/globals";
import { css, cx } from "@linaria/core";
import * as motion from "motion/react-client";
import { whileInViewAnimationProps } from "~/assets/animations";

interface UspGridBlok extends SbBlokData {
  heading?: string;
  usps: SbBlokData[];
  style: string;
}

export default function UspGrid({ blok }: { blok: UspGridBlok }) {
  const section = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containers = Array.from(
      section.current?.getElementsByClassName(
        uspContainer
      ) as HTMLCollectionOf<HTMLElement>
    );

    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener(
        "pointermove",
        (e) => {
          containers.forEach((el) => {
            el.style.setProperty(
              "--x",
              `${e.clientX - el.getBoundingClientRect().left}px`
            );
            el.style.setProperty(
              "--y",
              `${e.clientY - el.getBoundingClientRect().top}px`
            );
          });
        },
        { passive: true }
      );
    }
  }, []);

  return (
    <Section ref={section} blok={blok}>
      <motion.div
        {...whileInViewAnimationProps}
        className={cx(uspGrid, blok.style)}
      >
        {blok.usps.map((blok) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))}
      </motion.div>
    </Section>
  );
}

const uspGrid = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 2em;
  isolation: isolate;

  @media (min-width: ${breakPoints.mobile}rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakPoints.desktop}rem) {
    &.six {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
