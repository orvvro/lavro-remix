import { css } from "@linaria/core";
import { Cursor, useCursorState } from "motion-plus/react";
import { useCalDialog } from "~/components/DialogProvider";

const variants = {
  default: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 200,
  },
  pointer: {
    opacity: 0.1,
  },
};

export default function CustomCursor() {
  const { isOpen } = useCalDialog();
  const { zone } = useCursorState();
  return (
    <>
      {!isOpen && (
        <Cursor variants={variants} magnetic={{ snap: 0.6 }}>
          {zone === "card" ? (
            <p className={textStyles}>Click to see more</p>
          ) : null}
        </Cursor>
      )}
    </>
  );
}

const textStyles = css`
  color: var(--color-black);
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem 0.3rem;
`;
