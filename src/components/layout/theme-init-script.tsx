import { getThemeInitScript } from "@/lib/preferences-utils";

/**
 * Blocking theme script — must be a Server Component rendered as the first
 * child of <body>. Do not move into <head> or a Client Component.
 */
export function ThemeInitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: getThemeInitScript() }}
      suppressHydrationWarning
    />
  );
}
