import { css, cx } from "@linaria/core";
import { Dialog } from "@ark-ui/react/dialog";
import { RemoveScroll } from "react-remove-scroll";
import { useCalDialog } from "~/components/DialogProvider";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useRouteLoaderData } from "react-router";

export default function CalDialog() {
  const { locale } = useRouteLoaderData("root");
  const { toggleDialog, isOpen } = useCalDialog();

  useEffect(() => {
    void (async function () {
      const cal = await getCalApi({ namespace: "consulting-call" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <RemoveScroll enabled={isOpen} className={animation}>
      <Dialog.Root
        open={isOpen}
        onOpenChange={toggleDialog}
        preventScroll={false}
      >
        <Dialog.Backdrop className={backdrop} />
        <Dialog.Positioner
          className={cx(dialogStyles, RemoveScroll.classNames.fullWidth)}
        >
          <Dialog.Content>
            <Cal
              namespace="consulting-call"
              calLink="lavro/consulting-call"
              config={{ layout: "month_view", theme: "dark" }}
              style={{ width: "100%", height: "100%" }}
              lang={locale}
            />
            <Dialog.CloseTrigger className={closeDialog}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 320.591 320.591"
                fill="url(#cross-dialog)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="cross-dialog">
                    <stop className="stop1"></stop>
                    <stop className="stop2" offset="1"></stop>
                  </linearGradient>
                </defs>
                <g>
                  <g>
                    <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"></path>
                    <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"></path>
                  </g>
                </g>
              </svg>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </RemoveScroll>
  );
}

const dialogStyles = css`
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  margin: 0 auto;
  z-index: 90;
  & > div {
    width: min(63rem, 100%);
    position: relative;
    max-height: 100vh;
    border-radius: 0.375rem;
    overflow: auto;
    margin: 0 auto;
    padding: var(--default-padding);
  }
`;

const closeDialog = css`
  position: absolute;
  top: var(--default-padding);
  left: calc(100vw - var(--default-padding));
  transform: translateX(-100%);

  z-index: 92;
  padding: 1rem;

  .stop1,
  .stop2 {
    stop-color: white;
    transition: stop-color 0.3s;
  }

  &:hover .stop1 {
    stop-color: var(--color-primary);
  }

  &:hover .stop2 {
    stop-color: var(--color-secondary);
  }

  @media screen and (min-width: 827px) {
    padding: 0;
    position: fixed;
    top: -0.5rem;
  }
`;

const backdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 80;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
`;

const animation = css`
  [data-state="closed"] {
    animation: fadeOut 0.15s ease-out forwards;
  }

  [data-state="open"] {
    animation: fadeIn 0.15s ease-in forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
`;
