import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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
import getLocaleFromRequest from "~/lib/getLocaleFromRequest";
import { errorStyles } from "~/assets/globals";
import getStory from "~/lib/getStory";

const isProduction: boolean =
  import.meta.env.PROD && import.meta.env.MODE === "production";
const isPreview: boolean = import.meta.env.MODE === "preview";
export const accessToken = "xIPKdLuDyHrVplJXGlkvBgtt";

storyblokInit({
  accessToken,
  use: [apiPlugin],
  components: getStoryblokComponents(),
  bridge: !isProduction,
  apiOptions: {
    cache: {
      clear: "auto",
      type: "none",
    },
  },
});

interface Config extends ISbStoryData {
  header: SbBlokData[];
  footer: SbBlokData[];
  dialog: SbBlokData[];
  cookieBanner: SbBlokData[];
}

export async function loader({ context, request }: LoaderFunctionArgs) {
  const locale = getLocaleFromRequest(request);
  context.locale = locale;
  context.isProduction = isProduction;
  context.isPreview = isPreview;

  const config = await getStory(`${locale}/config`, context);

  return Response.json({ config, locale });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData();
  const content = useStoryblokState(
    loaderData.config.story.content
  ) as Config | null;
  return (
    <html lang={loaderData.locale || "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://app.cal.com" />
        <Meta />
        <Links />
      </head>
      <body>
        <CalDialogProvider>
          <StoryblokServerComponent blok={content?.header[0]} />

          {children}
          <StoryblokServerComponent blok={content?.footer[0]} />
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
  let message: number | string = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status || message;
    details = error.data || error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  console.log("Error boundary hit!\n", error);

  return (
    <main className={errorStyles}>
      <div>
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre>
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
