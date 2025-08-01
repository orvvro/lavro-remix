import { css } from "@linaria/core";
import { type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import Section from "~/components/Section";
import { formatText } from "~/lib/formatText";
import { centeredHeading } from "~/assets/globals";

export default function Team({
  blok,
}: {
  blok: SbBlokData & {
    heading: string;
    teamMembers: SbBlokData[];
  };
}) {
  return (
    <Section blok={blok}>
      <div className={centeredHeading}>
        {blok.heading && <h1>{formatText(blok.heading)}</h1>}
      </div>
      <div className={teamStyles}>
        {blok.teamMembers.map((member) => (
          <StoryblokServerComponent blok={member} key={member._uid} />
        ))}
      </div>
    </Section>
  );
}

const teamStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2em;
`;
