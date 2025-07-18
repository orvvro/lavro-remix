import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import type { StepBlok } from "./Step";
import Section from "~/components/Section";
import { formatText } from "~/lib/formatText";
import { css } from "@linaria/core";
import { centeredHeading } from "~/assets/globals";

interface StepsBlok extends SbBlokData {
  heading?: string;
  sub_heading?: string;
  steps: StepBlok[];
}

export default function Steps({ blok }: { blok: StepsBlok }) {
  return (
    <Section blok={blok}>
      <div className={centeredHeading}>
        {blok.heading && <h1>{formatText(blok.heading)}</h1>}
        {blok.sub_heading && <p>{blok.sub_heading}</p>}
      </div>
      <div className={steps} {...storyblokEditable(blok)} key={blok._uid}>
        {blok.steps.map((step, index) => (
          <StoryblokServerComponent blok={step} key={step._uid} index={index} />
        ))}
      </div>
    </Section>
  );
}

const steps = css`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 96px;
  overflow: hidden;
`;
