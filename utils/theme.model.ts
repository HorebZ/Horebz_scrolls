export type Theme = "light" | "dark" | "mordor";

export const THEMES: Record<string, Theme> = {
  light: "light",
  dark: "dark",
  mordor: "mordor",
};

export function themeClass(theme: Theme): string {
  return THEMES[theme] || "";
}
