import { cx, css } from "@linaria/core";
import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { motion, type Variants } from "motion/react";
import { useMagneticPull } from "motion-plus/react";
import { useState, useRef } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { gradientBorder } from "~/assets/globals";

export default function Card({
  blok,
}: {
  blok: SbBlokData & {
    heading: string;
    summary?: string;
    text: SbBlokData[];
  };
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Variants for the modal overlay
  const overlayVariants: Variants = {
    closed: {
      opacity: 0,
      transitionEnd: {
        // Hide with display:none when not visible for performance
        display: "none",
      },
    },
    open: {
      opacity: 1,
      display: "flex", // Use flex to center the content
    },
  };

  // Variants for the modal content itself
  const modalVariants: Variants = {
    closed: { scale: 0.95, opacity: 0 },
    open: { scale: 1, opacity: 1 },
  };

  return (
    <>
      {/* This is the small, clickable card */}
      <motion.div
        {...storyblokEditable(blok)}
        className={cx(cardStyles, gradientBorder)}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        data-cursor-zone="card"
      >
        <h2>{blok.heading}</h2>
        {blok.summary && <p>{blok.summary}</p>}
      </motion.div>

      {/* The Modal - always rendered, visibility controlled by state */}
      <motion.div
        className={cx(overlayStyles, RemoveScroll.classNames.zeroRight)}
        variants={overlayVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen(false)}
        transition={{ duration: 0.2 }}
      >
        {/* RemoveScroll is only enabled when the modal is open */}
        <RemoveScroll enabled={isOpen}>
          <motion.div
            className={modalContentStyles}
            variants={modalVariants}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
          >
            <h2>{blok.heading}</h2>
            {blok.text.map((textBlock) => (
              <StoryblokServerComponent blok={textBlock} key={textBlock._uid} />
            ))}
          </motion.div>
        </RemoveScroll>
      </motion.div>
    </>
  );
}

const cardStyles = css`
  padding: 2rem;
  border-radius: 20px;
  cursor: pointer;
  background-color: var(--color-transparent-black);

  &::before {
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }

  &:hover::before {
    opacity: 1;
  }

  h2 {
    margin-bottom: 0.3em;
  }
`;

const overlayStyles = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(7px);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const modalContentStyles = css`
  background-color: #111;
  padding: 2rem;
  border: 1px solid #444;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;

  p,
  h2 {
    margin-bottom: 1em;
  }
`;
