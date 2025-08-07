import { type SbBlokData } from "@storyblok/react";
import Section from "~/components/Section";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { css } from "@linaria/core";
import { breakPoints } from "~/assets/globals";

export default function Packages({
  blok,
}: {
  blok: SbBlokData & {
    packages: SbBlokData[];
  };
}) {
  return (
    <Section blok={blok} className={packagesStyles}>
      {blok.packages.map((pkg) => (
        <StoryblokServerComponent blok={pkg} key={pkg._uid} />
      ))}
    </Section>
  );
}

const packagesStyles = css`
  display: flex;
  column-gap: var(--default-padding);
  row-gap: 3rem;

  @media screen and (max-width: ${breakPoints.tablet}rem) {
    flex-direction: column;
    & > div {
      max-width: 32rem;
      &:last-child {
        margin-left: auto;
      }
    }
  }
`;
