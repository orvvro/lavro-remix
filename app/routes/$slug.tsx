import { useLoaderData } from "react-router";
import { type LoaderFunctionArgs, data } from "react-router";
import {
  StoryblokServerComponent,
  useStoryblokState,
} from "@storyblok/react/ssr";
import { findAndFetchSvgs } from "~/lib/getRawSvg";
import getStory from "~/lib/getStory";
import timeSomething from "~/lib/timingFunction";
import { verifyPreview } from "~/lib/verifyPreview";
import { accessToken } from "~/root";
import isValidPath from "~/lib/pathValidator";

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  if (import.meta.env.MODE === "preview") {
    console.log("Running in preview mode");
    const verified: boolean = await verifyPreview(request, accessToken);
    console.log("Preview verification result:", verified);
    if (!verified) {
      throw data("Unauthorized", { status: 401 });
    }
  }
  const startTime = Date.now();
  const { "*": splat } = params;
  const slug = splat || "";

  if (context.isProduction && !(await isValidPath(slug, context))) {
    // If the path is not in our valid list, throw a 404 immediately.
    throw data(`Record "${slug}" Not Found`, { status: 404 });
  }

  const body = await getStory(slug, context);
  timeSomething(startTime, `loader for slug "${slug}"`);
  if (!body || !body.story) {
    throw data(`Record "${slug}" Not Found`, { status: 404 });
  }
  await findAndFetchSvgs(body.story.content.body);

  return Response.json({ body });
}

export default function Page() {
  let { body } = useLoaderData();

  body = useStoryblokState(body.story);
  // docs: https://www.storyblok.com/docs/packages/storyblok-react

  return <StoryblokServerComponent blok={body.content} />;
}
