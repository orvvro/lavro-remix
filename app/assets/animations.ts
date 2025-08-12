import type { Variants } from "motion";

export const defaultChildVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 1.2,
      ease: [0.004, 0.2, 0, 1.013],
    },
  },
};

const defaultParentVariants: Variants = {
  hidden: {},
  show: {
    transition: { type: "spring", staggerChildren: 0.1 },
  },
};

export const whileInViewAnimationProps = {
  variants: defaultParentVariants,
  whileInView: "show",
  initial: "hidden",

  viewport: { once: import.meta.env.PROD, amount: 0.5 },
};
