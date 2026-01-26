import { useSignal, useSignalEffect } from "@preact/signals";
import { useEffect } from "preact/hooks";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  // Optional: check system preference
  // if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";

  return "light";
}

export default function ThemeToggle() {
  const theme = useSignal<Theme>("light");

  useEffect(() => {
    theme.value = getInitialTheme();
  }, []);

  useSignalEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    if (theme.value === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, theme.value);
  });

  const toggle = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  return (
    <button
      onClick={toggle}
      class="relative p-2 rounded-full hover:bg-surface-elevated transition-colors duration-200"
      aria-label="Changer de thème"
    >
      {theme.value === "dark"
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
