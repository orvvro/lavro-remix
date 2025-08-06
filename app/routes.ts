import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("api/storyblok-webhook", "routes/api.storyblok-webhook.tsx"),
  route("*", "routes/$slug.tsx"),
] satisfies RouteConfig;
