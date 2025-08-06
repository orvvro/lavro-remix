import { storyblokEditable, type SbBlokData } from "@storyblok/react";

export default function SectionHeading({
  blok,
}: {
  blok: SbBlokData & {
    // Add any custom fields from your Storyblok component here.
    heading?: string;
    sub_heading?: string;
  };
}) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.heading && <h1>{blok.heading}</h1>}
      {blok.sub_heading && <p>{blok.sub_heading}</p>}
    </div>
  );
}
