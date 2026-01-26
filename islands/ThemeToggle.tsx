import { useEffect, useState } from "preact/hooks";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
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
      {theme === "dark"
        ? (
          <img
            src="/assets/on-ring-light.svg"
            alt="On ring light"
            width="20"
            height="20"
          />
        )
        : (
          <img
            src="/assets/on-ring-dark.svg"
            alt="On ring dark"
            width="20"
            height="20"
          />
        )}
    </button>
  );
}
