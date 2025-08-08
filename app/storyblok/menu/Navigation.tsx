import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { css, cx } from "@linaria/core";
import { RemoveScroll } from "react-remove-scroll";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  type Variants,
} from "motion/react";
import { useState } from "react";
import NavBarMenu from "~/components/NavBarMenu";

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
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    backdropFilter: "blur(5px)",
    transition: {
      type: "spring",
      bounce: 0.2,
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
    console.log(scrollDirection);
  });
  return (
    <nav
      {...storyblokEditable(blok)}
      className={cx(navigationStyles, RemoveScroll.classNames.zeroRight)}
    >
      <motion.div
        initial="hidden"
        variants={variants}
        animate={scrollDirection}
      >
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
    background-color: var(--color-transparent-black);
    border-radius: 77px;
  }
`;
