import { css } from "@linaria/core";
import { type SbBlokData } from "@storyblok/react";
import { StoryblokServerRichText } from "@storyblok/react/ssr";
import Section from "~/components/Section";

export default function RichText({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    text: any;
  };
}) {
  return (
    <Section className={richTextStyles} blok={blok}>
      <StoryblokServerRichText doc={blok.text} />
    </Section>
  );
}

const richTextStyles = css`
  max-width: 65ch;
  margin: 0 auto;

  div {
    & > * {
      margin: 1em 0;
    }

    & > ul {
      list-style: disc;
    }

    ol {
      counter-reset: cupcake;
      strong {
        display: block;
        margin: 1em 0 0.6em;
      }
      li {
        counter-increment: cupcake;
        position: relative;
        &::before {
          content: counters(cupcake, ".") " ";
          position: absolute;
          right: calc(100% + 0.5em);
        }
      }
    }
  }
`;
