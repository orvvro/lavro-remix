import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { css, cx } from "@linaria/core";
import { gradientBorder } from "~/assets/globals";
import { useCalDialog } from "~/components/DialogProvider";

const Button = ({ blok }: { blok: SbBlokData }) => {
  let buttonAction;
  switch (blok.buttonAction) {
    case "acceptCookies":
      break;
    default:
      const { toggleDialog } = useCalDialog();
      buttonAction = toggleDialog;
      break;
  }
  return (
    <button
      onClick={buttonAction}
      className={getStyles(blok.style as string)}
      {...storyblokEditable(blok)}
    >
      {blok.buttonText as string}
    </button>
  );
};
export default Button;

const gradientButton = css`
  padding: 0.5rem 1rem;
  border-radius: 77px;
  border: 1px solid transparent;

  display: block;
  text-align: center;
  position: relative;
  isolation: isolate;
  transition-timing-function: ease-out;

  &:hover {
    &:after {
      opacity: 1;
    }
  }

  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    background-image: linear-gradient(
      var(--color-primary),
      var(--color-secondary)
    );
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 77px;
  }
`;
const defaultButton = css`
  padding: 0.5rem 1rem;
  border-radius: 77px;
  border: 1px solid transparent;

  &:before {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  &::after {
    content: "";
    z-index: -2;
    pointer-events: none;
    border-radius: inherit;
    padding: 1px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(gray, gray);
    -webkit-mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    -webkit-mask-clip: padding-box, content-box;
    mask: linear-gradient(#000 0 0) exclude,
      linear-gradient(#000 0 0) content-box;
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }
`;
const defaultLink = css`
  color: inherit;
  transition: color 0.3s;
  background-image: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-secondary)
  );
  background-clip: text;

  &:hover {
    color: transparent;
  }
`;

const highlightLink = css`
  color: inherit;
  color: transparent;
  transition: color 0.3s;
  background-image: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-secondary)
  );
  background-clip: text;
`;

export const getStyles = (style: string) => {
  switch (style) {
    case "button--gradient":
      return cx(gradientButton, gradientBorder);
    case "button--default":
      return cx(defaultButton, gradientBorder);
    case "highlight--link":
      return highlightLink;
    default:
      return defaultLink;
  }
};
