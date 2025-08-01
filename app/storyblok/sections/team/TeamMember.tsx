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
    <div {...storyblokEditable(blok)} className={teamMemberStyles}>
      <Image src={blok.image.filename} alt={blok.image.alt} />
      <h3>{blok.name}</h3>
      <p>{blok.position}</p>
    </div>
  );
}

const teamMemberStyles = css`
  img {
    border-radius: 10px;
    margin-bottom: 0.5em;
  }
`;
