import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { formatText } from "~/lib/formatText";
import { css, cx } from "@linaria/core";
export default function SectionHeading({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    heading?: string;
    sub_heading?: string;
    style: string;
  };
}) {
  return (
    <div
      {...storyblokEditable(blok)}
      className={cx(headingContainer, blok.style)}
    >
      {blok.heading && <h1>{formatText(blok.heading)}</h1>}
      {blok.sub_heading && <p>{blok.sub_heading}</p>}
    </div>
  );
}

const headingContainer = css`
  h1 {
    margin-bottom: 1em;
  }

  h1:not(:last-child) {
    margin-bottom: 0.5em;
  }

  p {
    font-size: 1.3em;
    margin-bottom: 2em;
  }

  &.center {
    text-align: center;
  }
`;
