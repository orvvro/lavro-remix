import { css, cx } from "@linaria/core";
import Section from "~/components/Section";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { type SbBlokData } from "@storyblok/react";
import SplitText from "~/components/SplitText";

interface HeroBlok extends SbBlokData {
  headline: string;
  sub_headline: string;
  options?: SbBlokData[];
  style?: string;
}

const Hero = ({ blok }: { blok: HeroBlok }) => (
  <Section blok={blok}>
    <div className={cx(hero, blok.style)}>
      <SplitText as="h1">{blok.headline}</SplitText>
      <p>{blok.sub_headline}</p>
      <div>
        {blok.options?.map((blok: SbBlokData) => (
          <StoryblokServerComponent blok={blok} key={blok._uid} />
        ))}
      </div>
    </div>
  </Section>
);

export default Hero;

const hero = css`
  padding-top: 9rem;
  position: relative;

  h1 {
    font-size: var(--step-5);
    max-width: 13em;
  }

  p {
    margin-top: 1rem;
    font-size: var(--step-2);
    line-height: 1.5;
  }

  & > div {
    display: flex;
    margin-top: 2rem;
    align-items: center;
    gap: 1rem;
  }

  &.center {
    text-align: center;
    margin: 0 auto;

    & > div {
      justify-content: center;
    }
  }
`;
