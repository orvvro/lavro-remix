import { useLoaderData } from "react-router";
import { type LoaderFunctionArgs, data } from "react-router";
import {
  StoryblokServerComponent,
  useStoryblokState,
} from "@storyblok/react/ssr";
import { findAndFetchSvgs } from "~/lib/getRawSvg";
import getStory from "~/lib/getStory";
import timeSomething from "~/lib/timingFunction";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const startTime = Date.now();
  const { slug: splat } = params;
  const slug = splat || "home";
  console.log(params);
  console.log(`slug: ${slug}`);
  if (splat === "home" || splat === "json/version" || splat === "json/list") {
    throw data("Record Not Found", { status: 404 });
  }

  const body = await getStory(slug, context);
  timeSomething(startTime, `loader for slug "${slug}"`);
  await findAndFetchSvgs(body.story.content.body);

  return Response.json({ body });
}

export default function Page() {
  let { body } = useLoaderData();

  body = useStoryblokState(body.story);
  // docs: https://www.storyblok.com/docs/packages/storyblok-react

  return <StoryblokServerComponent blok={body.content} />;
}
