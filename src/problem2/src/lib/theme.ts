export type ColorScheme = "light" | "dark";

export function getColorScheme(): ColorScheme {
  if (typeof window === "undefined") return "light";
  const storedTheme = localStorage.getItem("color-scheme");
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function setColorScheme(theme: ColorScheme) {
  if (typeof window === "undefined") return;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("color-scheme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}
