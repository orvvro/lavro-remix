import { type SbBlokData } from "@storyblok/react";
import { css } from "@linaria/core";
import Section from "~/components/Section";
import { breakPoints } from "~/assets/globals";
import { useEffect, useRef } from "react";
import {
  expandingContainer,
  type ExpandingContainerBlok,
} from "./ExpandingContainer";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import * as motion from "motion/react-client";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { whileInViewAnimationProps } from "~/assets/animations";

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
  const isMobile = useMediaQuery(`(max-width: ${breakPoints.laptop}rem)`);

  // ... (imports and component definition)

  useEffect(() => {
    const sectionEl = section.current;
    if (!sectionEl) return;

    // Find all the pair wrappers
    const pairs = Array.from(
      sectionEl.getElementsByClassName(pairStyles)
    ) as HTMLElement[];

    // Define the event handler function so we can reference it for removal
    const handlePointerEnter = (
      container: HTMLElement,
      allContainers: HTMLElement[]
    ) => {
      allContainers.forEach((c) => c.style.setProperty("flex-grow", "0"));
      container.style.setProperty("flex-grow", "1");
    };

    // --- Start of Fix ---

    // 1. Create an array to hold all the listeners we add, so we can remove them later.
    const addedListeners: {
      container: HTMLElement;
      handler: () => void;
    }[] = [];

    if (!isMobile) {
      pairs.forEach((pair) => {
        const containers = Array.from(
          pair.getElementsByClassName(expandingContainer)
        ) as HTMLElement[];

        containers.forEach((container) => {
          // Create a specific handler for this container
          const handler = () => handlePointerEnter(container, containers);
          container.addEventListener("pointerenter", handler);
          // Store the container and its handler for cleanup
          addedListeners.push({ container, handler });
        });
      });
    }

    // 2. Return a cleanup function from the effect.
    // This will run when `isMobile` changes or when the component unmounts.
    return () => {
      addedListeners.forEach(({ container, handler }) => {
        container.removeEventListener("pointerenter", handler);
      });
    };
    // --- End of Fix ---
  }, [isMobile]); // The dependency array is correct.

  // ... (rest of the component)

  const containerGroups = [];
  for (let i = 0; i < blok.expanding_containers.length; i += 2) {
    containerGroups.push(blok.expanding_containers.slice(i, i + 2));
  }

  return (
    <Section className={sectionStyles} ref={section} blok={blok}>
      <div className={expandingContainers}>
        {containerGroups.map((group, index) => (
          <motion.div
            {...whileInViewAnimationProps}
            key={index}
            className={pairStyles}
          >
            {group.map((containerBlok) => (
              <StoryblokServerComponent
                blok={containerBlok}
                key={containerBlok._uid}
              />
            ))}
          </motion.div>
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
