import { useLoaderData } from "react-router";
import {
  getStoryblokApi,
  useStoryblokState,
  type ISbStoriesParams,
} from "@storyblok/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { StoryblokServerComponent } from "@storyblok/react/ssr";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("Action called with request:", request);
  return Response.json({ success: true }, { status: 200 });
};

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const { "*": splat } = params;
  const slug = splat || "home";
  const env = context.cloudflare.env.ENVIRONMENT;

  let sbParams: ISbStoriesParams = {
    version: env === "production" ? "published" : "draft",
  };

  const { data } = await getStoryblokApi()
    .get(`cdn/stories/${slug}`, sbParams)
    .catch(() => ({ data: null }));

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return Response.json({ data }, { status: 200 });
};

export default function Page() {
  let { data } = useLoaderData();

  data = useStoryblokState(data.story);
  // docs: https://www.storyblok.com/docs/packages/storyblok-react

  return <StoryblokServerComponent blok={data.content} />;
}
