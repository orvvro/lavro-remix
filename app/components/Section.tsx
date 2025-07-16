import { defaultSpacing } from "~/assets/globals";
import { css, cx } from "@linaria/core";
import {
  type SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";

export default function Section({
  blok,
  children,
  className,
}: {
  blok: SbBlokData;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={section} {...storyblokEditable(blok)} key={blok._uid}>
      {Array.isArray(blok.background) &&
        blok.background.map((blok: SbBlokData) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
      <div className={cx(defaultSpacing, className)}>{children}</div>
    </section>
  );
}

const section = css`
  position: relative;
`;
