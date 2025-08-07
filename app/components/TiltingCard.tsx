import * as motion from "motion/react-client";
import { useMotionValue, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { css, cx } from "@linaria/core";
export default function TiltingCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 2. Create motion values to track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3. Create smoothed (spring) versions of the motion values
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  // 4. Transform mouse position into rotation values
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    // Calculate mouse position from -0.5 to 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    // 5. Convert div to motion.div and add event handlers/styles
    <motion.div
      ref={cardRef}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        boxShadow: "12px 12px 10px rgb(0 0 0 / 0.2)",
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Important for 3D effect
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cx(className, cardStyles)}
    >
      {children}
    </motion.div>
  );
}

const cardStyles = css`
  perspective: 500px; /* Perspective for 3D effect */
  & > * {
    transform: translateZ(50px);
  }
`;
