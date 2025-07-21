import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wyw from "@wyw-in-js/vite";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    reactRouter(),
    tsconfigPaths(),
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ],
  ssr: {
    noExternal: [
      "@react-router/dev",
      "@react-router/dev/routes",
      "@react-router/dev/vite",
      "@wyw-in-js/core",
      "@wyw-in-js/react",
      "@wyw-in-js/vite",
      "@storyblok/react/ssr",
    ],
  },
});
