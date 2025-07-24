import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wyw from "@wyw-in-js/vite";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import favicons from "@peterek/vite-plugin-favicons";

export default defineConfig({
  plugins: [
    favicons("app/assets/favicon.svg"),
    tsconfigPaths(),
    wyw({
      include: ["**/*.{ts,tsx}"],
      exclude: [/node_modules/, /\?__react-router-build-client-route$/],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
    reactRouter(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
  ],
});
