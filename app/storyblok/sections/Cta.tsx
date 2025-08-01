import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import Section from "~/components/Section";
export default function Cta({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    heading?: string;
    description?: string;
    buttons?: SbBlokData[];
  };
}) {
  return (
    <Section blok={blok}>
      <h1>{blok.heading}</h1>
      <p>{blok.description}</p>
      <div>
        {blok.buttons?.map((button) => (
          <StoryblokServerComponent blok={button} key={button._uid} />
        ))}
      </div>
    </Section>
  );
}
