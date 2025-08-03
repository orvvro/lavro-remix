"use client";

import { Cursor, useCursorState } from "motion-plus/react";
import * as motion from "motion/react-client";

export default function CursorDefaultSettings() {
  const { zone } = useCursorState();

  const imageProps = {
    style: image,
    whileHover: { scale: 1.1 },
    transition: { duration: 0.5 },
  };

  return (
    <div style={container}>
      <Cursor style={cursor}>
        {zone === "message" ? <p style={caption}>View gallery</p> : null}
      </Cursor>
      <div style={imageContainer}>
        <motion.img
          data-cursor-zone="message"
          src="https://framerusercontent.com/images/6LNQxKuuZ0Kj0y9jFvUXc9G7n4.jpg?scale-down-to=400"
          {...imageProps}
        />
      </div>
      <div style={imageContainer}>
        <motion.img
          data-cursor-zone="message"
          src="https://framerusercontent.com/images/e8FdlVoDd0elyIx6ADELuqyOA.jpg?scale-down-to=400"
          {...imageProps}
        />
      </div>
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

const imageContainer: React.CSSProperties = {
  width: 200,
  height: 250,
  overflow: "hidden",
};

const image: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const cursor: React.CSSProperties = {
  backgroundColor: "#ff0088",
};

const caption: React.CSSProperties = {
  color: "#f5f5f5",
  fontSize: 18,
  padding: 15,
  margin: 0,
};

const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 50,
};
