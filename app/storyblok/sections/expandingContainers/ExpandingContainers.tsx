import { type SbBlokData } from "@storyblok/react";
import { css } from "@linaria/core";
import Section from "~/components/Section";
import { breakPoints } from "~/assets/globals";
import { useEffect, useRef } from "react";
import { expandingContainer } from "./ExpandingContainer";
import { StoryblokServerComponent } from "@storyblok/react/ssr";

const ExpandingContainers = ({ blok }: { blok: SbBlokData }) => {
  const section = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const all = Array.from(
      section.current?.getElementsByClassName(
        expandingContainer
      ) as HTMLCollectionOf<HTMLElement>
    );

    all.forEach((container) => {
      if (!window.matchMedia(`(max-width: ${breakPoints.laptop}rem)`).matches) {
        container.addEventListener("pointerenter", () => {
          all.forEach((container) => {
            container.style.setProperty("flex-grow", "0");
          });
          container.style.setProperty("flex-grow", "1");
        });
      }
    });
  }, []);

  return (
    <Section ref={section} blok={blok} className={expandingContainers}>
      {Array.isArray(blok.expanding_containers) &&
        blok.expanding_containers.map((blok) => {
          return <StoryblokServerComponent blok={blok} key={blok._uid} />;
        })}
    </Section>
  );
};

export default ExpandingContainers;

const expandingContainers = css`
  max-width: var(--smaller-max-width);
  display: flex;
  gap: 16px;

  @media screen and (max-width: ${breakPoints.laptop}rem) {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: min(440px, 100%);
    justify-content: center;
  }
`;
