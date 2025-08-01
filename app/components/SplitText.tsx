import { css } from "@linaria/core";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

export default function SplitText({
  children,
}: {
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      const targetElement = containerRef.current.querySelector("h1");
      if (!targetElement) return;

      // 1. Get the original text with markdown and identify bold words.
      const originalText = targetElement.textContent || "";
      const boldWords = (originalText.match(/\*\*(.*?)\*\*/g) || []).map(
        (word) => word.slice(2, -2)
      );

      // 2. Create a clean version of the text for splitText to process.
      const cleanText = originalText.replace(/\*\*/g, "");
      targetElement.textContent = cleanText;

      // Hide the container until the fonts are loaded and text is processed
      containerRef.current!.style.visibility = "visible";

      // 3. Run splitText on the clean text.
      const { words } = splitText(targetElement);

      // 4. Apply bold styling to the marked words.
      words.forEach((wordSpan) => {
        if (boldWords.includes(wordSpan.textContent || "")) {
          wordSpan.classList.add("hi");
        }
      });

      // 5. Animate the words in the h1.
      animate(
        words,
        { opacity: [0, 1], y: [20, 0] },
        {
          type: "spring",
          duration: 1.3,
          delay: stagger(0.05),
        }
      );
    });
  }, []);

  return (
    <div className={splitTextStyles} ref={containerRef}>
      {children}
    </div>
  );
}

const splitTextStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 420px;
  text-align: left;
  visibility: hidden;

  .split-word {
    will-change: transform, opacity;
  }
`;
