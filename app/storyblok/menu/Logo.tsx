import { css } from "@linaria/core";
import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { Link } from "react-router";
import handleUrl from "~/lib/handleUrl";
import { Image } from "cloudflare-image";

interface LogoBlok extends SbBlokData {
  image: {
    filename: string;
    alt: string;
  };
  link: {
    cached_url: string;
  };
}

export default function Logo({ blok }: { blok: LogoBlok }) {
  return (
    <Link
      to={handleUrl(blok.link.cached_url)}
      {...storyblokEditable(blok)}
      className={logoStyles}
    >
      <Image src={blok.image.filename} alt={blok.image.alt} height={32} />
    </Link>
  );
}

const logoStyles = css`
  padding: 0.5rem;
  margin: -0.5rem;
`;
