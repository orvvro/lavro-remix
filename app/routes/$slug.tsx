import { useLoaderData } from "react-router";
import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
  type ISbStoriesParams,
} from "@storyblok/react";
import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const { "*": splat } = params;
  const slug = splat || "home";

  console.log(context.cloudflare.env);

  let sbParams: ISbStoriesParams = {
    version:
      context.cloudflare.env.ENVIRONMENT === "production"
        ? "published"
        : "draft",
  };

  let { data } = await getStoryblokApi()
    .get(`cdn/stories/${slug}`, sbParams)
    .catch(() => ({ data: null }));

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return Response.json({ data }, { status: 404 });
};

export default function Page() {
  let { data } = useLoaderData();

  data = useStoryblokState(data.story);
  // docs: https://www.storyblok.com/docs/packages/storyblok-react

  return <StoryblokComponent blok={data.content} />;
}
