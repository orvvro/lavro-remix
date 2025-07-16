import { type SbBlokData } from "@storyblok/react";
import { css, cx } from "@linaria/core";
import { useEffect, useRef } from "react";

type BgDottedBlok = SbBlokData & {
  follow_mouse?: boolean;
  xl?: boolean;
  style?: string;
};

const BgCircle = ({ blok }: { blok: BgDottedBlok }) => {
  return (
    <div className={cx(wrapper, blok.position && right)}>
      <div className={cx(ball, blok.styles && light)} />
    </div>
  );
};

export default BgCircle;

const wrapper = css`
  position: absolute;
  right: 50%;
  opacity: 0.5;
`;

const right = css`
  left: 50%;
`;

const ball = css`
  height: 600px;
  width: 600px;
  max-width: 100vw;
  filter: blur(200px);
  transform: translate3d(0, 0, 0);
  background-image: radial-gradient(
    circle,
    var(--color-primary),
    transparent 70%
  );
`;

const light = css`
  background-image: radial-gradient(
    circle,
    var(--color-secondary),
    transparent 70%
  );
`;
