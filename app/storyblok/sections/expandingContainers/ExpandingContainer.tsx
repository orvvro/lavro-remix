import { type SbBlokData, storyblokEditable } from "@storyblok/react";
import { css } from "@linaria/core";
import { breakPoints } from "~/assets/globals";
import * as motion from "motion/react-client";
import { Image } from "cloudflare-image";
import { defaultChildVariants } from "~/assets/animations";

export interface ExpandingContainerBlok extends SbBlokData {
  heading: string;
  description: string;
  image: {
    filename: string;
    alt: string;
  };
}

const ExpandingContainer = ({ blok }: { blok: ExpandingContainerBlok }) => (
  <motion.div
    variants={defaultChildVariants}
    className={expandingContainer}
    {...storyblokEditable(blok)}
  >
    <div className={text}>
      <h2>{blok.heading}</h2>
      <p>{blok.description}</p>
    </div>
    <div className={image}>
      <Image src={blok.image.filename} alt={blok.image.alt} draggable={false} />
    </div>
  </motion.div>
);

export default ExpandingContainer;

export const expandingContainer = css`
  display: flex;
  border-radius: 20px;
  transition: flex 0.3s;
  background-color: var(--color-transparent-black);
  contain: content;
  overflow: hidden;
  flex-grow: 0;
  flex: 0 0 25rem;

  @media screen and (max-width: ${breakPoints.laptop}rem) {
    flex-direction: column;
  }
`;

const text = css`
  flex: 0 0 25rem;
  padding: 1.5em;
  min-height: 17.5rem;

  h2 {
    padding-bottom: 4px;
    font-size: var(--step-1);
  }

  p {
    opacity: 0.8;
  }

  @media screen and (max-width: ${breakPoints.laptop}rem) {
    min-height: unset;
    flex: auto;
  }
`;

const image = css`
  position: relative;
  flex: auto;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-right: 1.5rem;
    max-height: 70%;
  }

  @media screen and (max-width: ${breakPoints.laptop}rem) {
    flex-grow: initial;
    img {
      position: initial;
      transform: none;
      padding: var(--default-padding);
      padding-top: 0;
      margin: 0 auto;
      max-height: 10em;
    }
  }
`;
