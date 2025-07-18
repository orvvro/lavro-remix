import { type SbBlokData } from "@storyblok/react";
import { css, cx } from "@linaria/core";

type BgDottedBlok = SbBlokData & {
  follow_mouse?: boolean;
  xl?: boolean;
  style?: string;
};

const BgCircle = ({ blok }: { blok: BgDottedBlok }) => {
  return (
    <div className={wrapper}>
      <div className={cx(mask, blok.style && "square")}>
        <div />
      </div>
    </div>
  );
};

export default BgCircle;

const mask = css`
  height: 100%;
  mask-image: radial-gradient(ellipse at center, black, transparent 60%);

  & > div {
    height: 100%;
    --tile-size: 49px;
    --bg-size: 50px;
    background-image: linear-gradient(
        transparent var(--tile-size),
        #fff var(--tile-size)
      ),
      linear-gradient(
        0.25turn,
        transparent var(--tile-size),
        #fff var(--tile-size)
      );
    background-size: var(--bg-size) var(--bg-size);
  }

  &.square {
    height: 100%;
    mask-composite: intersect;
    --padding: 32px;
    --mask: 48px;
    --opacity: 0.45;
    mask-image: linear-gradient(
        to right,
        transparent var(--padding),
        black,
        var(--mask),
        black,
        calc(100% - var(--mask)),
        transparent calc(100% - var(--padding))
      ),
      linear-gradient(
        to bottom,
        transparent var(--padding),
        black,
        var(--mask),
        black,
        calc(100% - var(--mask)),
        transparent calc(100% - var(--padding))
      );
  }
`;

const wrapper = css`
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
