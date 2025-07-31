import { type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import Section from "~/components/Section";

export default function Team({
  blok,
}: {
  blok: SbBlokData & {
    teamMembers: SbBlokData[];
  };
}) {
  return (
    <Section blok={blok}>
      {blok.teamMembers.map((member) => (
        <StoryblokServerComponent blok={member} key={member._uid} />
      ))}
    </Section>
  );
}
