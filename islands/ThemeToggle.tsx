import { useEffect, useState } from "preact/hooks";
import { type Theme, THEMES } from "../utils/theme.model.ts";

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(THEMES.light);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? THEMES.dark : THEMES.light);
  }, []);

  const toggle = () => {
    const newTheme = theme === THEMES.light ? THEMES.dark : THEMES.light;
    setTheme(newTheme);

    if (newTheme === THEMES.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.cookie =
      `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <button
      onClick={toggle}
      class="relative p-2 rounded-full hover:bg-surface-elevated transition-colors duration-200"
      aria-label="Changer de thème"
      type="button"
    >
      {theme === THEMES.dark &&
        (
          <img
            src="/assets/one-ring-light.svg"
            alt="One ring light"
            width="20"
            height="20"
          />
        )}
      {theme === THEMES.light &&
        (
          <img
            src="/assets/one-ring-dark.svg"
            alt="One ring dark"
            width="20"
            height="20"
          />
        )}
      {theme === THEMES.mordor &&
        (
          <img
            src="/assets/one-ring-fire.svg"
            alt="One ring fire"
            width="20"
            height="20"
          />
        )}
    </button>
  );
}

export default ThemeToggle;
