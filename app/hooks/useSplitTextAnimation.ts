import { animate, stagger } from "motion";
import { useEffect, type RefObject } from "react";

export function useSplitTextAnimation(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // The server has already rendered the .split-char spans.
    // We just need to find them.
    const allChars = element.querySelectorAll<HTMLSpanElement>(".c");

    if (allChars.length === 0) return;

    // Make the container visible before animating
    element.style.visibility = "visible";

    // Animate the final, combined array of all characters.
    animate(
      allChars,
      { opacity: [0, 1], y: [8, 0], filter: ["blur(4px)", "blur(0)"] },
      {
        type: "spring",
        duration: 1.5,
        delay: stagger(0.01),
      }
    );
  }, [ref]); // Rerun if the ref changes
}
