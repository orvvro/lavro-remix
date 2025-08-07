import { defaultSpacing } from "~/assets/globals";
import { css, cx } from "@linaria/core";
import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";

export default function Section({
  blok,
  children,
  className,
  headingClassname,
  ref,
}: {
  blok: SbBlokData;
  children: React.ReactNode;
  className?: string;
  headingClassname?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <section className={section} {...storyblokEditable(blok)} key={blok._uid}>
      {Array.isArray(blok.background) &&
        blok.background.map((blok: SbBlokData) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))}
      <div ref={ref} className={defaultSpacing}>
        {Array.isArray(blok.heading) &&
          blok.heading.map((blok: SbBlokData) => (
            <StoryblokServerComponent
              blok={blok}
              key={blok._uid}
              headingClassname={headingClassname}
            />
          ))}
        <div className={className}>{children}</div>
      </div>
    </section>
  );
}

const section = css`
  position: relative;
  padding: var(--default-section-spacing) 0;
`;
