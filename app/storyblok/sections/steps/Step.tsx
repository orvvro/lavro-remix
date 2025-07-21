import {
  storyblokEditable,
  StoryblokRichText,
  type StoryblokRichTextNode,
  type SbBlokData,
} from "@storyblok/react";
import { css } from "@linaria/core";
import type { ReactElement } from "react";

export interface StepBlok extends SbBlokData {
  text: StoryblokRichTextNode<ReactElement>;
}

export default function Step({
  blok,
  index,
}: {
  blok: StepBlok;
  index: number;
}) {
  return (
    <div className={step} {...storyblokEditable(blok)} key={blok._uid}>
      <span>{index + 1}</span>
      <StoryblokRichText doc={blok.text} />
    </div>
  );
}

const step = css`
  display: flex;
  align-items: center;
  gap: 2rem;

  & > div {
    max-width: 20rem;
  }

  span {
    min-width: 3.5rem;
    font-size: 4rem;
    font-weight: bold;
    text-align: right;
  }

  span::after {
    content: ".";
  }
`;
