"use client";

import { useServerInsertedHTML } from "next/navigation";
import { getThemeInitScript } from "@/lib/preferences-utils";

/**
 * Injects the blocking theme script into the SSR HTML stream outside the React
 * tree so React 19 does not warn about script tags during client rendering.
 */
export function ThemeInitScript() {
  useServerInsertedHTML(() => (
    <script
      dangerouslySetInnerHTML={{ __html: getThemeInitScript() }}
      suppressHydrationWarning
    />
  ));

  return null;
}
