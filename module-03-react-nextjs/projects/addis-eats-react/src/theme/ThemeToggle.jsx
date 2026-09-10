import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={
        theme === "light"
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <span className="theme-toggle-icon">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
      <span className="theme-toggle-label">
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </button>
  );
}

export default ThemeToggle;
