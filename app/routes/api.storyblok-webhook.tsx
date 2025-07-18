import type { ActionFunctionArgs } from "react-router";
import { handleWebhook } from "~/lib/storyblokCache";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  // Pass the Cloudflare environment context to the handler
  const result = await handleWebhook(request, context.cloudflare.env);
  return Response.json(result);
};
