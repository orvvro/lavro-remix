import { css, cx } from "@linaria/core";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { useState, useId } from "react";
import { breakPoints } from "~/assets/globals";
import { type MenuItemBlok } from "~/storyblok/menu/Navigation";
import * as motion from "motion/react-client";
import type { Variants } from "motion";
import { useMediaQuery } from "~/hooks/useMediaQuery";

const menuVariants: Variants = {
  desktop: {
    clipPath: "none",
    transition: { type: "spring", duration: 0 },
  },
  open: {
    clipPath: "circle(150% at 80% 20%)",
    transition: {
      type: "spring",
      stiffness: 200,
      restDelta: 2,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  closed: {
    clipPath: "circle(0% at 80% 20%)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      delay: 0.1,
    },
  },
};

const itemVariants: Variants = {
  desktop: { opacity: 1, x: 0 },
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 24 },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.1 },
  },
};

export default function NavBarMenu({ items }: { items: MenuItemBlok[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${breakPoints.tablet}rem)`);
  const menuId = useId();

  return (
    <div>
      <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <motion.ul
        initial={false}
        animate={isMobile ? (isOpen ? "open" : "closed") : "desktop"}
        variants={menuVariants}
        className={menuStyles}
        {...(isMobile && !isOpen && { inert: true, ariaHidden: true })}
        id={menuId}
      >
        {items.map((link: MenuItemBlok) => (
          <motion.li
            variants={itemVariants}
            key={link._uid}
            onClick={() => setIsOpen(false)}
          >
            <StoryblokServerComponent blok={link} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

function HamburgerMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-label="open menu"
      onClick={() => setIsOpen(!isOpen)}
      className={cx(hamburgerStyles, isOpen && openHamburgerStyles)}
    >
      <svg viewBox="0 0 100 100">
        <line x1="5" y1="20" x2="95" y2="20" />
        <line x1="5" y1="50" x2="95" y2="50" />
        <line x1="5" y1="80" x2="95" y2="80" />
      </svg>
    </button>
  );
}

const hamburgerStyles = css`
  margin-right: 1rem;
  display: none;
  @media screen and (max-width: ${breakPoints.tablet}rem) {
    display: block;
  }

  padding: 0.3rem;
  svg {
    stroke: white;
    width: 2rem;
    height: 2rem;
    stroke-linecap: round;
    line {
      stroke-width: 10px;
      transition: transform 0.3s ease-in-out;
    }
    line:nth-child(1) {
      transform-origin: 50% 20%;
    }
    line:nth-child(2) {
      transform-origin: center;
    }

    line:nth-child(3) {
      transform-origin: 50% 80%;
    }
  }
`;
const openHamburgerStyles = css`
  line:nth-child(1) {
    transform: translateY(30%) rotate(45deg);
  }

  line:nth-child(2) {
    transform: rotate(45deg);
  }

  line:nth-child(3) {
    transform: translateY(-30%) rotate(-45deg);
  }
`;

const menuStyles = css`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  @media screen and (max-width: ${breakPoints.tablet}rem) {
    position: absolute;
    right: 0;
    top: calc(100% + 1rem);
    flex-direction: column;
    align-items: end;
    width: 15rem;
    padding: 2rem;
    background-color: var(--color-transparent-black);
    backdrop-filter: blur(6px);
    border-radius: 20px;
  }
`;
