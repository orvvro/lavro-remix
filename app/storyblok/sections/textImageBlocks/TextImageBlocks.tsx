import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import Section from "~/components/Section";
import { css } from "@linaria/core";

export default function TextImageBlocks({
  blok,
}: {
  blok: SbBlokData & {
    single_blocks: SbBlokData[]; // Assuming this is the structure
  };
}) {
  return (
    <Section
      blok={blok}
      className={textImageStyles}
      headingClassname={headingClass}
    >
      {blok.single_blocks.map((blok) => (
        <StoryblokServerComponent blok={blok} key={blok._uid} />
      ))}
    </Section>
  );
}

const textImageStyles = css`
  display: flex;
  flex-direction: column;
  gap: 50vh;
`;

const headingClass = css`
  max-width: 40rem;
  margin-bottom: 30vh;
`;
