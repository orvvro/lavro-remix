import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/($locale)._index.tsx"),
  route(":locale?/:slug", "routes/($locale).$slug.tsx"),
  route("api/storyblok-webhook", "routes/api.storyblok-webhook.tsx"),
] satisfies RouteConfig;
