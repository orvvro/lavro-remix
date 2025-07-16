import {
  storyblokEditable,
  StoryblokComponent,
  type SbBlokData,
} from "@storyblok/react";

const Page = ({ blok }: { blok: SbBlokData }) => (
  <main {...storyblokEditable(blok)} key={blok._uid}>
    {Array.isArray(blok?.body) &&
      blok.body.map((nestedBlok: SbBlokData) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
  </main>
);

export default Page;
