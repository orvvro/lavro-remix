import { type SbBlokData } from "@storyblok/react";
import { css, cx } from "@linaria/core";
import { useEffect, useRef } from "react";

type BgDottedBlok = SbBlokData & {
  follow_mouse?: boolean;
  xl?: boolean;
  style?: string;
};

const BgDotted = ({ blok }: { blok: BgDottedBlok }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blok.follow_mouse || !bgRef.current) return;

    const bgElement = bgRef.current;

    const handleMouseMove = (e: PointerEvent) => {
      const rect = bgElement.getBoundingClientRect();
      bgElement.style.setProperty("--x", `${e.clientX - 450 - rect.left}px`);
      bgElement.style.setProperty("--y", `${e.clientY - 450 - rect.top}px`);
    };

    const handlePointerLeave = () => {
      window.removeEventListener("pointermove", handleMouseMove);
    };

    const handlePointerEnter = () => {
      window.addEventListener("pointermove", handleMouseMove, {
        passive: true,
      });
    };

    window.addEventListener("pointermove", handleMouseMove, {
      passive: true,
    });

    bgElement.addEventListener("pointerleave", handlePointerLeave);
    bgElement.addEventListener("pointerenter", handlePointerEnter);

    // Cleanup function
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      bgElement.removeEventListener("pointerleave", handlePointerLeave);
      bgElement.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, [blok.follow_mouse]);

  return (
    <div className={cx(bg, blok.xl && xl, blok.style as string)}>
      <div ref={bgRef} className={cx(blok.follow_mouse && mouse)} />
    </div>
  );
};

export default BgDotted;

const bg = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: white;
  contain: strict;
  pointer-events: none;
  mask-image: linear-gradient(rgb(0 0 0 / 0.5), rgb(0 0 0 / 0.5));

  &.fade-out {
    mask-image: linear-gradient(rgb(0 0 0 / 0.5) 50%, transparent 100%);
  }

  &.fade-in {
    mask-image: linear-gradient(transparent, rgb(0 0 0 / 0.5) 50%);
  }

  &.fade-in-out {
    mask-image: linear-gradient(transparent, rgb(0 0 0 / 0.5), transparent);
  }

  & > div {
    height: 100%;
    background-image: radial-gradient(#777 7%, #000 10%),
      radial-gradient(circle, #fff 20%, transparent 50%);
    background-position: 0% 0%, var(--x, 50%) var(--y, 25%);
    background-size: 32px 32px, 900px 900px;
    background-repeat: repeat, no-repeat;
    background-blend-mode: hard-light;
    opacity: 0.95;
  }
`;

const xl = css`
  height: 200%;
`;

const mouse = css`
  transform: translate3d(0, 0, 0);
`;
