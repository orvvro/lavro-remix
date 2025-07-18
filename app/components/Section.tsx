import { defaultSpacing } from "~/assets/globals";
import { css, cx } from "@linaria/core";
import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";

export default function Section({
  blok,
  children,
  className,
  ref,
}: {
  blok: SbBlokData;
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <section className={section} {...storyblokEditable(blok)} key={blok._uid}>
      {Array.isArray(blok.background) &&
        blok.background.map((blok: SbBlokData) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))}
      <div ref={ref} className={cx(defaultSpacing, className)}>
        {children}
      </div>
    </section>
  );
}

const section = css`
  position: relative;
  padding: var(--default-section-spacing) 0;
`;
