import languages from "./languages";

export default async function getPathsAndLinks(
  storyblokApi: any,
  version: "published" | "draft"
) {
  const links = await storyblokApi.getAll("cdn/links", {
    version,
  });
  let paths: Array<{
    props: {
      language: string;
      slug: string | undefined;
      langSwitch: Record<string, string>;
    };
    params: { slug: string | undefined };
  }> = [];
  links
    .filter((link: any) => !link.is_folder && link.slug !== "config")
    .forEach((link: { slug: string }) => {
      languages.forEach((language: string) => {
        //This slug will be used for fetching data from storyblok
        let slug = link.slug === "home" ? undefined : link.slug;
        //This will be used for generating all the urls for astro
        let full_url = language === "en" ? slug : `${language}/${slug ?? ""}`;
        //This will let us change the url for diffrent versions
        let langSwitch = {};
        languages.forEach((lang: string) => {
          langSwitch = {
            ...langSwitch,
            [lang]: lang === "en" ? slug ?? "" : `${lang}/${slug ?? ""}`,
          };
        });
        paths.push({
          props: { language, slug, langSwitch },
          params: {
            slug: full_url,
          },
        });
      });
    });
  return { paths, links };
}
