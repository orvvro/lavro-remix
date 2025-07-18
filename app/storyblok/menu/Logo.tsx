import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { Link } from "react-router";

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
    <Link to={blok.link.cached_url} {...storyblokEditable(blok)}>
      <img src={blok.image.filename} alt={blok.image.alt} height={32} />
    </Link>
  );
}
