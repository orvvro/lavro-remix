import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
} from "react-router";
import {
  storyblokInit,
  apiPlugin,
  type SbBlokData,
  type ISbStoryData,
} from "@storyblok/react";

import type { Route } from "./+types/root";
import getStoryblokComponents from "./lib/getStoryblokComponents";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import {
  StoryblokServerComponent,
  useStoryblokState,
} from "@storyblok/react/ssr";
import { CalDialogProvider } from "./components/DialogProvider";
import { getGlobalConfig } from "~/lib/configCache";

storyblokInit({
  accessToken: "xIPKdLuDyHrVplJXGlkvBgtt",
  use: [apiPlugin],
  components: getStoryblokComponents(),
});

interface Config extends ISbStoryData {
  header: SbBlokData[];
  footer: SbBlokData[];
  dialog: SbBlokData[];
  cookieBanner: SbBlokData[];
}

export async function loader({ context, request }: LoaderFunctionArgs) {
  const config = await getGlobalConfig(context);
  return Response.json({ config });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { config } = useLoaderData();
  const content = useStoryblokState(config.story.content) as Config | null;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <CalDialogProvider>
          <StoryblokServerComponent blok={content?.header[0]} />
          {children}
          <StoryblokServerComponent blok={content?.dialog[0]} />
        </CalDialogProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
