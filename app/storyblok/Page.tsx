import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";

export default function Page({
  blok,
}: {
  blok: SbBlokData & {
    body: SbBlokData[];
    title: string;
    description: string;
  };
}) {
  return (
    <main {...storyblokEditable(blok)} key={blok._uid}>
      <meta name="description" content={blok.description} />
      <title>{blok.title}</title>
      {blok.body.map((nestedBlok: SbBlokData) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
