import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import {
  StoryblokServerComponent,
  useStoryblokState,
} from "@storyblok/react/ssr";
import { findAndFetchSvgs } from "~/lib/getRawSvg";
import getStory from "~/lib/getStory";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const data = await getStory(params["*"] || "home", context);

  await findAndFetchSvgs(data.story.content.body);

  return Response.json({ data });
}

export default function Page() {
  let { data } = useLoaderData();

  data = useStoryblokState(data.story);
  // docs: https://www.storyblok.com/docs/packages/storyblok-react

  return <StoryblokServerComponent blok={data.content} />;
}
