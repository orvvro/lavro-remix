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
  padding: 0 0.8rem;
  margin: 0 -0.8rem;
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
  padding: 0 0.8rem;
  margin: 0 -0.8rem;
  color: transparent;
  transition: color 0.3s;
  background-image: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-secondary)
  );
  background-clip: text;
  &::after {
    position: relative;
    top: 1px;
    left: 5px;
    width: 0.75em;
    display: inline-block;
    content: url("data:image/svg+xml,%3Csvg viewBox='-5.5 0 26 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.404 11.36 3.637 1.6a2.11 2.11 0 0 0-3.008 0 2.117 2.117 0 0 0 0 3L9.885 13 .629 21.4a2.117 2.117 0 0 0 0 3c.83.84 2.177.84 3.008 0l10.767-9.76c.45-.45.648-1.05.611-1.64a2.115 2.115 0 0 0-.611-1.64' fill='%231463f5' fill-rule='evenodd'/%3E%3C/svg%3E%0A");
    transition: transform 0.3s ease-in-out;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`;

export const getStyles = (style: string) => {
  switch (style) {
    case "button--gradient":
      return cx(gradientButton, gradientBorder);
    case "button--default":
      return cx(defaultButton, gradientBorder);
    case "link--highlight":
      return highlightLink;
    default:
      return defaultLink;
  }
};
