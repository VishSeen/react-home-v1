"use client";

import { enableVisualEditing, type HistoryAdapterNavigate } from "@sanity/visual-editing";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Enables Sanity Visual Editing overlays when the site is loaded
 * inside the Sanity Studio Presentation tool iframe.
 *
 * Outside of the Studio iframe, this component does nothing.
 */
export function SanityVisualEditing() {
  const pathname = usePathname();
  const navigateRef = useRef<HistoryAdapterNavigate | undefined>(undefined);

  useEffect(() => {
    const disable = enableVisualEditing({
      history: {
        subscribe: (navigate) => {
          navigateRef.current = navigate;
          return () => {
            navigateRef.current = undefined;
          };
        },
        update: (update) => {
          if (update.type === "push" || update.type === "replace") {
            window.history[
              update.type === "replace" ? "replaceState" : "pushState"
            ](null, "", update.url);
          } else if (update.type === "pop") {
            window.history.back();
          }
        },
      },
    });

    return () => {
      disable();
    };
  }, []);

  // Notify the Studio when the URL changes on the website side
  useEffect(() => {
    if (navigateRef.current) {
      navigateRef.current({
        type: "push",
        url: pathname,
      });
    }
  }, [pathname]);

  return null;
}
