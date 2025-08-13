import { css } from "@linaria/core";
import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import {
  StoryblokServerComponent,
  StoryblokServerRichText,
} from "@storyblok/react/ssr";
import * as motion from "motion/react-client";
import type { Variants } from "motion";
import { useRef } from "react";
import { useScroll, useTransform, useSpring } from "motion/react";
// Parent container variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.9,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -5 },
  // Add the transition to the "show" state of the children
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 1.2,
    },
  },
};

export default function TextImageBlock({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    small_heading: string;
    heading: string;
    paragraph: any;
    cta?: SbBlokData[];
  };
}) {
  const blockRef = useRef(null);

  // 2. Get scrollYProgress, tracking the element as it enters and leaves the viewport
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });

  // 3. Transform the 0-1 scroll progress into a y-position from -35% to 35%
  const y = useTransform(scrollYProgress, [0, 1], ["-35%", "35%"]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      {...storyblokEditable(blok)}
      className={textImageStyles}
      ref={blockRef}
      style={{ y }}
    >
      <motion.small variants={itemVariants}>{blok.small_heading}</motion.small>
      <motion.h2 variants={itemVariants}>{blok.heading}</motion.h2>
      <motion.div variants={itemVariants} className={richText}>
        <StoryblokServerRichText doc={blok.paragraph} />
      </motion.div>
      {blok.cta?.map((cta) => (
        <motion.div variants={itemVariants} key={cta._uid}>
          <StoryblokServerComponent blok={cta} />
        </motion.div>
      ))}
    </motion.div>
  );
}

const textImageStyles = css`
  small {
    font-weight: 600;
    color: transparent;
    background: linear-gradient(
      90deg,
      var(--color-primary),
      var(--color-secondary)
    );
    background-clip: text;
  }
  display: flex;
  flex-direction: column;
  align-items: start;
  & > * {
    margin-bottom: 1em;
  }
  max-width: 32rem;
`;

const richText = css`
  ul {
    padding-left: 1em;
    margin: 1em 0;
    list-style: disc;
    li * {
      display: inline;
    }
  }
`;
