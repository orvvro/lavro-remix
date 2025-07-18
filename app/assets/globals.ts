import { css } from "@linaria/core";

export const breakPoints = {
  mobilexs: 25,
  mobile: 40,
  tablet: 48,
  laptop: 64,
  desktop: 80,
};

export const globals = css`
  :global() {
    :root {
      --color-black: #0d0d0d;
      --color-primary: #82d6e3;
      --color-secondary: #1463f5;
      --default-padding: clamp(0.5rem, -0.3333rem + 4.1667vw, 3rem);
      --default-max-width: 1440px;
      --smaller-max-width: 1024px;
      --default-section-spacing: 96px;
      --list-spacing: clamp(0.875rem, 0.3967rem + 2.3913vw, 2.25rem);
      overflow-x: hidden;
    }

    @font-face {
      font-family: "Poppins";
      font-weight: 400;
      src: local("Poppins"),
        url("./fonts/poppins-regular-webfont.woff2") format("woff2");
    }

    @font-face {
      font-family: "Poppins";
      font-weight: 600;
      src: local("Poppins"),
        url("./fonts/poppins-semibold-webfont.woff2") format("woff2");
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    * {
      margin: 0;
    }

    button {
      background-color: transparent;
      color: inherit;
      border: none;
      cursor: pointer;
    }

    ul,
    ol {
      list-style: none;
      padding: 0;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    body {
      line-height: calc(1em + 0.5rem);
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      overflow-x: clip;
    }

    img,
    picture,
    video,
    canvas {
      display: block;
      max-width: 100%;
      object-fit: contain;
    }

    svg {
      display: block;
    }

    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      overflow-wrap: break-word;
    }

    p {
      text-wrap: pretty;
      opacity: 0.85;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-wrap: balance;
    }

    body {
      font-family: "Poppins", sans-serif;
      color: white;
      background-color: var(--color-black);
      min-height: 100vh;
      hyphens: auto;

      & > main {
        flex: 1;
        position: relative;
      }
    }

    h1,
    h2 {
      font-size: 2.5rem;
      font-weight: 600;
      line-height: 1.2;

      strong {
        font-weight: inherit;
        color: transparent;
        background-image: linear-gradient(
          90deg,
          var(--color-primary),
          var(--color-secondary)
        );
        background-clip: text;
      }
    }

    h2 {
      font-size: 1.5rem;
    }

    article {
      margin-bottom: 4rem;

      & > * {
        margin: 0.5em 0;
      }

      p {
        margin-bottom: 1em;
      }
    }
  }
`;

export const section = css`
  position: relative;
`;

export const defaultPadding = css`
  padding: 0 var(--default-padding);
`;

export const defaultMaxWidth = css`
  max-width: var(--default-max-width);
`;

export const defaultSpacing = css`
  max-width: var(--default-max-width);
  margin: 0 auto;
  padding: 0 var(--default-padding);
`;

export const ctaButton = css`
  display: block;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  color: black;
  position: relative;
  z-index: 0;
  cursor: pointer;
  background-color: #ffc107;
  padding: 13px 22px;
  border: none;
  border-radius: 77px;
  transition-duration: 0.3s;
  transition-property: transform, color, box-shadow;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 7px #b5515140;
    &:before {
      opacity: 1;
    }
  }

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    /*     background-image: linear-gradient
 */
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 77px;
  }
`;

export const defaultButton = css`
  display: block;
  text-align: center;
  padding: 13px 22px;
  color: inherit;
  border-radius: 77px;
  border: 1px solid var(--color-black);
  font-weight: bold;
  transition: 0.2s ease-in-out;
  transition-property: background-color, color;
  cursor: pointer;

  &:not(:disabled):hover {
    background-color: var(--color-black);
    color: white;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const sectionIntroduction = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  small {
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    text-transform: uppercase;
  }

  p {
    margin-top: 0.5rem;
  }
`;

export const circleBackground = css`
  position: relative;
  &::before {
    --gradient-space: clamp(1.5625rem, 1.019rem + 2.7174vw, 3.125rem);
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100%;
    transform: translate(-50%, -50%);
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-image: linear-gradient(90deg, #8051b5, #5171b5);
    mask-image: repeating-radial-gradient(
      circle,
      #0000,
      #0000 var(--gradient-space),
      #000c var(--gradient-space),
      #000c calc(var(--gradient-space) + 1px)
    );
  }
`;

export const checkmarkList = css`
  li {
    display: flex;
    align-items: center;
    &::before {
      position: relative;
      top: 3.2px;
      margin-right: 0.75rem;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M5.32401 8.60418L8.30175 11.5796L12.7684 7.11646' stroke='%2321C061' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' /%3E%3Cpath d='M14.5382 1.37402H3.55404C2.44189 1.37402 1.54031 2.2749 1.54031 3.38619V14.3619C1.54031 15.4731 2.44189 16.374 3.55404 16.374H14.5382C15.6504 16.374 16.5519 15.4731 16.5519 14.3619V3.38619C16.5519 2.2749 15.6504 1.37402 14.5382 1.37402Z' stroke='%2321C061' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' /%3E%3C/svg%3E");
    }
  }
`;

export const icon = css`
  path {
    stroke-miterlimit: 10;
    stroke-linecap: round;
    &:not(:first-child) {
      stroke: var(--color-blue);
    }
  }
`;

export const summary = css`
  width: 100%;
  text-align: left;
  display: flex;
  gap: 3rem;
  justify-content: space-between;
  align-items: center;
  touch-action: manipulation;

  @media (hover: hover) {
    &[data-state="closed"]:hover span {
      transform: rotate(90deg);
      transition: transform 0.2s ease-in-out;
    }
  }

  span {
    width: 1em;
    height: 1em;
    position: relative;
    flex-shrink: 0;
    color: var(--color-blue);

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: currentColor;
      width: 100%;
      height: 1px;
      transition: 0.2s ease-in-out;
      transition-property: transform, width;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(90deg);
    }

    [data-state="open"] &::after {
      transform: translate(-50%, -50%) rotate(90deg);
      width: 0;
    }

    [data-state="open"] &::before {
      transform: translate(-50%, -50%) rotate(180deg);
    }
  }
`;

export const centeredHeading = css`
  text-align: center;
  h1 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 2rem;
  }
`;

export const details = css`
  overflow-y: hidden;

  &[data-state="open"] {
    animation: slideDown 300ms ease-out;
  }
  &[data-state="closed"] {
    animation: slideUp 300ms ease-out;
  }
  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

export const gradientBorder = css`
  position: relative;
  &::before {
    content: "";
    pointer-events: none;
    border-radius: inherit;
    padding: 1px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
      var(--color-primary),
      var(--color-secondary)
    );
    -webkit-mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    -webkit-mask-clip: padding-box, content-box;
    mask: linear-gradient(#000 0 0) exclude,
      linear-gradient(#000 0 0) content-box;
  }
`;

export const a11yHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* added line */
  border: 0;
`;

export const swiper = css`
  max-width: var(--default-max-width);
  margin: 0 auto;
  padding: 0 var(--default-padding);

  &:has(.swiper-wrapper ~ .swiper-pagination-lock) .swiper-wrapper {
    justify-content: center;
  }

  .swiper-pagination {
    display: flex;
    justify-content: center;
    gap: 3px;
    height: 32px;
    margin-top: 1rem;
  }

  .swiper-pagination-lock {
    display: none;
  }

  .swiper-pagination-bullet {
    width: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &::after {
      content: "";
      pointer-events: none;
      height: 3px;
      width: 100%;
      background-color: var(--color-tint-2);
      border-radius: 7px;
    }
  }

  .swiper-pagination-bullet-active {
    &::after {
      background-color: var(--color-blue);
    }
  }
`;
