import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { css, cx } from "@linaria/core";
import { RemoveScroll } from "react-remove-scroll";
import { useScroll, useMotionValueEvent, type Variants } from "motion/react";
import { useState } from "react";
import NavBarMenu from "~/components/NavBarMenu";
import * as motion from "motion/react-client";

interface NavigationBlok extends SbBlokData {
  logo: SbBlokData[];
  menu: MenuItemBlok[];
}

export interface MenuItemBlok extends SbBlokData {
  link: {
    cached_url: string;
  };
}

const variants: Variants = {
  hidden: {
    clipPath: "circle(0%)",
    transition: {
      duration: 0.5,
    },
  },

  visible: {
    clipPath: "circle(100%)",
    transition: {
      duration: 0.5,
    },
  },
};

export default function Navigation({ blok }: { blok: NavigationBlok }) {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("visible");

  useMotionValueEvent(scrollY, "change", (current) => {
    const prev = scrollY.getPrevious() || 0;
    const diff = current - prev;
    setScrollDirection(diff > 0 && prev > 0 ? "hidden" : "visible");
  });
  return (
    <nav
      {...storyblokEditable(blok)}
      className={cx(navigationStyles, RemoveScroll.classNames.zeroRight)}
      inert={scrollDirection === "hidden"}
    >
      <motion.div initial={false} animate={scrollDirection} variants={variants}>
        <StoryblokServerComponent blok={blok.logo[0]} />
        <NavBarMenu items={blok.menu} />
      </motion.div>
    </nav>
  );
}

const navigationStyles = css`
  position: fixed;
  top: 0.5rem;
  left: 0;
  right: 0;
  z-index: 50;
  margin: 0 auto;
  max-width: var(--default-max-width);
  padding: 0 var(--default-padding);
  & > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    padding-left: 2rem;
    border-radius: 77px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--color-transparent-black);
      border-radius: inherit;
      backdrop-filter: blur(6px);
      z-index: -1;
    }
  }
`;
