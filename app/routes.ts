import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("*", "routes/$slug.tsx"),
] satisfies RouteConfig;
