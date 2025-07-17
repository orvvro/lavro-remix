import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import { css } from "@linaria/core";
import { breakPoints } from "~/assets/globals";
import { Image } from "@unpic/react";

interface ExpandingContainerBlok extends SbBlokData {
  heading: string;
  description: string;
  image: {
    filename: string;
    alt: string;
  };
}

const ExpandingContainer = ({ blok }: { blok: ExpandingContainerBlok }) => (
  <div className={expandingContainer} {...storyblokEditable(blok)}>
    <div className={text}>
      <h2>{blok.heading}</h2>
      <p>{blok.description}</p>
    </div>
    <div className={image}>
      <Image
        src={blok.image.filename}
        alt={blok.image.alt}
        layout="fullWidth"
        background="auto"
      />
    </div>
  </div>
);

export default ExpandingContainer;

export const expandingContainer = css`
  display: flex;
  border: 2px solid gray;
  border-radius: 20px;
  transition: flex 0.3s;
  background-color: var(--color-black);
  contain: content;
  overflow: hidden;
  &:first-child {
    flex-grow: 1;
  }
  @media screen and (max-width: ${breakPoints.laptop}rem) {
    &:first-child {
      flex-grow: auto;
    }
  }
`;

const text = css`
  padding: 24px;
  padding-right: 16px;
  flex: 0 0 220px;
  min-height: 17.5rem;

  h2 {
    padding-bottom: 4px;
    font-size: 20px;
  }

  p {
    opacity: 0.8;
  }

  @media screen and (max-width: ${breakPoints.laptop}rem) {
    min-height: unset;
  }
`;

const image = css`
  position: relative;
  background-color: #333;
  flex-grow: 1;

  img {
    position: absolute;
    object-fit: cover;
    object-position: left;
    height: 100%;
  }
`;
