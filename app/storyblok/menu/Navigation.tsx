import { StoryblokServerComponent } from "@storyblok/react/ssr";
import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { css, cx } from "@linaria/core";
import { RemoveScroll } from "react-remove-scroll";
import { useCalDialog } from "~/components/DialogProvider";
interface NavigationBlok extends SbBlokData {
  logo: SbBlokData[];
  menu: SbBlokData[];
}

export default function Navigation({ blok }: { blok: NavigationBlok }) {
  return (
    <nav
      {...storyblokEditable(blok)}
      className={cx(navigationStyles, RemoveScroll.classNames.zeroRight)}
    >
      <div>
        <StoryblokServerComponent blok={blok.logo[0]} />
        <ul>
          {blok.menu.map((link: any) => (
            <li key={link._uid}>
              <StoryblokServerComponent blok={link} />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

const navigationStyles = css`
  position: fixed;
  top: 0.5rem;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0 0.5rem;
  & > div {
    position: relative;
    max-width: var(--smaller-max-width);
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    padding-left: 2rem;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      border-radius: 77px;
      background-color: rgb(0 0 0 / 0.5);
      backdrop-filter: blur(6px);
    }
  }

  ul {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
`;
