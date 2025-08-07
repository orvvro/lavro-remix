import { useState, useEffect, type ComponentType } from "react";

type LottieProps = {
  src: string;
  autoplay?: boolean;
};
// 2. Create state to hold the Lottie component itself, once it's loaded.

export default function CustomLottiePlayer() {
  const [LottiePlayer, setLottiePlayer] =
    useState<ComponentType<LottieProps> | null>(null);

  // 3. This effect runs ONLY on the client.
  useEffect(() => {
    // Use a dynamic import to load the library only in the browser.
    import("@lottielab/lottie-player/react")
      .then((module) => {
        // The 'default' export is the Lottie component.
        setLottiePlayer(() => module.default);
      })
      .catch((err) => {
        console.error("Failed to load Lottie Player:", err);
      });
  }, []);
  return (
    <>
      {LottiePlayer && (
        <LottiePlayer
          src="https://cdn.lottielab.com/l/Ap8M5gW9JppKTK.json"
          autoplay
        />
      )}
    </>
  );
}
