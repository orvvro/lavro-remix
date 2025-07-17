import { StoryblokComponent, type SbBlokData } from "@storyblok/react";
import { css } from "@linaria/core";
import Section from "~/components/Section";
import { formatText } from "~/lib/formatText";
import { StoryblokServerComponent } from "@storyblok/react/ssr";

const Hero = ({ blok }: { blok: SbBlokData }) => (
  <Section blok={blok}>
    <div className={hero}>
      <h1>{formatText(blok.headline)}</h1>
      <p>{blok.sub_headline as string}</p>
      <div>
        {Array.isArray(blok.options) &&
          blok.options.map((blok: SbBlokData) => (
            <StoryblokServerComponent blok={blok} key={blok._uid} />
          ))}
      </div>
    </div>
  </Section>
);

export default Hero;

const hero = css`
  padding-top: 10rem;
  padding-bottom: 8rem;
  text-align: center;
  max-width: 42rem;
  margin: 0 auto;
  position: relative;

  p {
    margin-top: 1rem;
  }

  & > div {
    display: flex;
    margin-top: 2rem;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;
