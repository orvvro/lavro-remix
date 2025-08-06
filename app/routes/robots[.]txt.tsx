export const loader = ({
  context,
}: import("react-router").LoaderFunctionArgs) => {
  let robotText = "";

  if (context.isProduction) {
    robotText = `
User-agent: *
Allow: /
`.trim();
  } else {
    robotText = `
User-agent: *
Disallow: /
    `.trim();
  }
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
