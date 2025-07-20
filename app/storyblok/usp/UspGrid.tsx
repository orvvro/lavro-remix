import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { type SbBlokData } from "@storyblok/react";
import Section from "~/components/Section";
import { useRef, useEffect } from "react";
import { uspContainer } from "./Usp";
import { breakPoints } from "~/assets/globals";
import { css } from "@linaria/core";
import { formatText } from "~/lib/formatText";
import { centeredHeading } from "~/assets/globals";

interface UspGridBlok extends SbBlokData {
  heading?: string;
  usps: SbBlokData[];
}

export default function UspGrid({ blok }: { blok: UspGridBlok }) {
  const section = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containers = Array.from(
      section.current?.getElementsByClassName(
        uspContainer
      ) as HTMLCollectionOf<HTMLElement>
    );

    if (!window.matchMedia(`(max-width: ${breakPoints.mobile}rem)`).matches) {
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
    } else {
      containers.forEach((el, index) => {
        el.style.setProperty("top", `${index * 7 + 22}px`);
      });
    }
  }, []);

  return (
    <Section ref={section} blok={blok}>
      <div className={centeredHeading}>
        {blok.heading && <h1>{formatText(blok.heading)}</h1>}
      </div>
      <div className={uspGrid}>
        {blok.usps.map((blok) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))}
      </div>
    </Section>
  );
}

const uspGrid = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 32px;
  isolation: isolate;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
