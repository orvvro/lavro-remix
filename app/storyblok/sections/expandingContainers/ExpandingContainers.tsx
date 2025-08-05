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
    // Find all the pair wrappers using the class we added
    const pairs = Array.from(
      section.current?.getElementsByClassName(
        pairStyles
      ) as HTMLCollectionOf<HTMLElement>
    );

    pairs.forEach((pair) => {
      if (!window.matchMedia(`(max-width: ${breakPoints.laptop}rem)`).matches) {
        // Get all the individual expanding containers within this pair
        const containers = Array.from(
          pair.getElementsByClassName(expandingContainer)
        ) as HTMLElement[];

        // Add the hover listener to each container
        containers.forEach((container) => {
          container.addEventListener("pointerenter", () => {
            // On hover, set all siblings to shrink
            containers.forEach((c) => {
              c.style.setProperty("flex-grow", "0");
            });
            // And set the hovered one to expand
            container.style.setProperty("flex-grow", "1");
          });
        });
      }
    });
  }, []);

  const containerGroups = [];
  for (let i = 0; i < blok.expanding_containers.length; i += 2) {
    containerGroups.push(blok.expanding_containers.slice(i, i + 2));
  }

  return (
    <Section className={sectionStyles} ref={section} blok={blok}>
      <div>
        {blok.heading && <h1>{formatText(blok.heading)}</h1>}
        {blok.sub_heading && <p>{blok.sub_heading}</p>}
      </div>
      <div className={expandingContainers}>
        {/* Now map over the groups of containers */}
        {containerGroups.map((group, index) => (
          // This is the new div wrapping each pair
          <div key={index} className={pairStyles}>
            {group.map((containerBlok) => (
              <StoryblokServerComponent
                blok={containerBlok}
                key={containerBlok._uid}
              />
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ExpandingContainers;

const sectionStyles = css``;

const expandingContainers = css``;

const pairStyles = css`
  display: flex;
  gap: 1em;
  margin-top: 1em;
  @media screen and (max-width: ${breakPoints.laptop}rem) {
    & > div {
      flex: 1;
    }
  }

  @media screen and (max-width: ${breakPoints.mobile}rem) {
    flex-direction: column;
  }

  &:nth-child(odd) {
    & > div:last-child {
      flex-grow: 1;
    }
  }

  &:nth-child(even) {
    & > div:first-child {
      flex-grow: 1;
    }
  }
`;
