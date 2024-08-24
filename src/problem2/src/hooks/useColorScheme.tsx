import { useCallback, useState, useEffect } from "react";
import { getColorScheme, setColorScheme, ColorScheme } from "@/lib/theme";

export function useColorScheme() {
  const [colorScheme, setColorSchemeState] =
    useState<ColorScheme>(getColorScheme());

  const toggleColorScheme = useCallback(() => {
    setColorSchemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme]);

  return { colorScheme, toggleColorScheme };
}
