import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { StoryblokServerComponent } from "@storyblok/react/ssr";

export default function Footer({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    footer_menu: SbBlokData[];
  };
}) {
  return (
    <footer {...storyblokEditable(blok)}>
      <div>
        {blok.footer_menu.map((blok) => (
          <StoryblokServerComponent blok={blok} />
        ))}
      </div>
    </footer>
  );
}
