import { css, cx } from "@linaria/core";
import { type RefObject, useRef, Fragment } from "react";
import { useSplitTextAnimation } from "~/hooks/useSplitTextAnimation";

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "p"; // Allow rendering as different elements
}

export default function SplitText({
  children,
  as: Tag = "h1",
}: SplitTextProps) {
  const ref = useRef<null | HTMLHeadingElement | HTMLParagraphElement>(null);

  // This client-side hook will apply the animation after the component mounts.
  useSplitTextAnimation(ref as RefObject<HTMLElement>);

  // 1. PARSE: The same logic as before, but done on the server.
  const segments = children
    .split(/(\|.*?\|)/g)
    .filter(Boolean)
    .map((part) => {
      const isBold = part.startsWith("|") && part.endsWith("|");
      return {
        text: isBold ? part.slice(1, -1) : part,
        isBold,
      };
    });

  return (
    <div className={splitTextStyles}>
      <Tag ref={ref} aria-label={children}>
        {segments.map((segment, segmentIndex) => (
          // We use a React.Fragment because a segment can contain multiple words
          // and we don't want an extra wrapper around them.
          <Fragment key={segmentIndex}>
            {segment.text.split(" ").map((word, wordIndex, wordsArray) => (
              // 2. RENDER WORDS: Each word gets its own span for line breaking.
              <span
                key={wordIndex}
                className={cx(segment.isBold && highlightStyles, "w")}
              >
                {/* 3. RENDER CHARACTERS: Each character gets a span for animation. */}
                {word.split("").map((char, charIndex) => (
                  <span key={charIndex} className="c">
                    {char}
                  </span>
                ))}
                {/* Add a space after each word, but not the last one in a segment */}
                {wordIndex < wordsArray.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </Fragment>
        ))}
      </Tag>
    </div>
  );
}

const splitTextStyles = css`
  h1,
  h2,
  p {
    display: flex;
    flex-wrap: wrap;
    visibility: hidden; /* Hide until animation starts */
  }

  .w {
    display: inline-block;
  }

  .c {
    display: inline-block;
    will-change: transform, opacity, filter;
  }
`;

export const highlightStyles = css`
  .c {
    color: transparent;
    background-image: linear-gradient(
      var(--color-primary),
      var(--color-secondary)
    );
    background-clip: text;
  }
`;
