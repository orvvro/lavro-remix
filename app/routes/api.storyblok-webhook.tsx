import type { ActionFunctionArgs } from "react-router";
import { handleWebhook } from "~/lib/storyblokCache";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  console.log("Received Storyblok webhook request");
  const result = await handleWebhook(request, context.cloudflare.env);
  return Response.json(result);
};
