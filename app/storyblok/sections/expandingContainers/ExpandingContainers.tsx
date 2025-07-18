import { type SbBlokData } from "@storyblok/react";
import { css } from "@linaria/core";
import Section from "~/components/Section";
import { breakPoints, centeredHeading } from "~/assets/globals";
import { useEffect, useRef } from "react";
import {
  expandingContainer,
  type ExpandingContainerBlok,
} from "./ExpandingContainer";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { formatText } from "~/lib/formatText";

interface ExpandingContainersBlok extends SbBlokData {
  heading?: string;
  sub_heading?: string;
  expanding_containers: ExpandingContainerBlok[];
  image: {
    filename: string;
    alt: string;
  };
}

const ExpandingContainers = ({ blok }: { blok: ExpandingContainersBlok }) => {
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
    <Section className={sectionStyles} ref={section} blok={blok}>
      <div className={centeredHeading}>
        {blok.heading && <h1>{formatText(blok.heading)}</h1>}
        {blok.sub_heading && <p>{blok.sub_heading}</p>}
      </div>
      <div className={expandingContainers}>
        {blok.expanding_containers.map((blok) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))}
      </div>
    </Section>
  );
};

export default ExpandingContainers;

const sectionStyles = css`
  max-width: var(--smaller-max-width);
`;

const expandingContainers = css`
  display: flex;
  gap: 16px;

  @media screen and (max-width: ${breakPoints.laptop}rem) {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: min(440px, 100%);
    justify-content: center;
  }
`;
