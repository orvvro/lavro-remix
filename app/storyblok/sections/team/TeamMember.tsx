import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { css } from "@linaria/core";
import { Image } from "cloudflare-image";

export default function TeamMember({
  blok,
}: {
  blok: SbBlokData & {
    name: string;
    position: string;
    image: {
      filename: string;
      alt: string;
    };
  };
}) {
  return (
    <div {...storyblokEditable(blok)}>
      <h3>{blok.name}</h3>
      <p>{blok.position}</p>
      {blok.image && <Image src={blok.image.filename} alt={blok.image.alt} />}
    </div>
  );
}
