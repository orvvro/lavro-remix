import { useState } from "react";
import { storyblokEditable, type SbBlokData } from "@storyblok/react";
import { Link, useLocation, useRouteLoaderData } from "react-router";
import { getTranslatedPath, supportedLanguages } from "~/lib/i18n";
import { css, cx } from "@linaria/core";

export default function LangSwitch({ blok }: { blok: SbBlokData }) {
  // State to manage the dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Get the current location to translate the path
  const location = useLocation();

  // Get the current locale from the root loader data
  const { locale: currentLocale } = useRouteLoaderData("root") as {
    locale: string;
  };

  return (
    <div
      className={cx(langSwitchStyles, isOpen && openStyles)}
      {...storyblokEditable(blok)}
    >
      <button
        type="button"
        title="Switch language"
        aria-label="Switch language"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLocale}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 13 13"
        >
          <path
            fill="currentColor"
            d="M7.53 2.22a.75.75 0 0 1 0 1.06L4.81 6l2.72 2.72a.75.75 0 0 1-1.06 1.06L3.22 6.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0"
          ></path>{" "}
        </svg>
      </button>

      {isOpen && (
        <>
          {supportedLanguages.map((lang) =>
            // Only show links for other languages
            lang !== currentLocale ? (
              <Link
                key={lang}
                to={getTranslatedPath(location.pathname, lang)}
                hrefLang={lang}
                rel="alternate"
                // Close the dropdown on navigation
                onClick={() => setIsOpen(false)}
              >
                {lang.toUpperCase()}
              </Link>
            ) : null
          )}
        </>
      )}
    </div>
  );
}

const langSwitchStyles = css`
  background-color: #464646;
  overflow: hidden;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  button,
  a {
    text-transform: uppercase;
    padding: 0.5rem 0.75rem;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: gray;
    }
  }

  button {
    font-weight: normal;
    display: flex;
    gap: 0.3rem;
    align-items: center;
  }
`;

const openStyles = css`
  svg {
    transform: rotate(180deg);
  }
`;
