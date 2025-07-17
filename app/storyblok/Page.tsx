import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";

const Page = ({ blok }: { blok: SbBlokData }) => (
  <main {...storyblokEditable(blok)} key={blok._uid}>
    {Array.isArray(blok?.body) &&
      blok.body.map((nestedBlok: SbBlokData) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
  </main>
);

export default Page;
