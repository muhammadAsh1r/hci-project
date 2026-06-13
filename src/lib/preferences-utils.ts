import type { UserPreferences } from "@/lib/types/settings";
import { DEFAULT_USER_PREFERENCES } from "@/lib/types/settings";

export const PREFERENCES_STORAGE_KEY = "freelanceai-user-preferences";

export function mergePreferences(
  stored: Partial<UserPreferences> | null
): UserPreferences {
  if (!stored) return DEFAULT_USER_PREFERENCES;
  return {
    ...DEFAULT_USER_PREFERENCES,
    ...stored,
    profile: { ...DEFAULT_USER_PREFERENCES.profile, ...stored.profile },
    notificationToggles: {
      ...DEFAULT_USER_PREFERENCES.notificationToggles,
      ...stored.notificationToggles,
    },
    privacy: { ...DEFAULT_USER_PREFERENCES.privacy, ...stored.privacy },
  };
}

export function applyPreferencesToDocument(prefs: UserPreferences) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  const isDark =
    prefs.theme === "dark" ||
    (prefs.theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  root.classList.toggle("dark", isDark);
  root.dataset.accent = prefs.accentColor;
  root.dataset.density = prefs.layoutDensity;

  root.classList.toggle("font-size-sm", prefs.fontSize === "sm" || prefs.increaseFontSize);
  root.classList.toggle("font-size-lg", prefs.fontSize === "lg" || prefs.increaseFontSize);
  root.classList.toggle("reduce-motion", prefs.reduceMotion);
  root.classList.toggle("high-contrast", prefs.highContrast);
  root.classList.toggle("keyboard-nav", prefs.keyboardNavigation);
  root.classList.toggle("sr-optimized", prefs.screenReaderOptimized);
  root.classList.toggle("enhanced-focus", prefs.enhancedFocus);
}

export function getThemeInitScript(): string {
  return `(function(){try{var k="${PREFERENCES_STORAGE_KEY}";var r=localStorage.getItem(k);var p=r?JSON.parse(r):null;var t=p&&p.theme||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");if(p&&p.accentColor)document.documentElement.dataset.accent=p.accentColor;if(p&&p.layoutDensity)document.documentElement.dataset.density=p.layoutDensity;if(p&&(p.fontSize==="sm"||p.increaseFontSize))document.documentElement.classList.add("font-size-sm");if(p&&(p.fontSize==="lg"||p.increaseFontSize))document.documentElement.classList.add("font-size-lg");if(p&&p.reduceMotion)document.documentElement.classList.add("reduce-motion");if(p&&p.highContrast)document.documentElement.classList.add("high-contrast");if(p&&p.keyboardNavigation)document.documentElement.classList.add("keyboard-nav");if(p&&p.screenReaderOptimized)document.documentElement.classList.add("sr-optimized");if(p&&p.enhancedFocus)document.documentElement.classList.add("enhanced-focus");}catch(e){}})();`;
}
