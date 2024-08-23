import { useCallback, useState, useEffect, useMemo } from "react";

type ColorScheme = "dark" | "light";

const getInitialColorScheme = (): ColorScheme => {
	if (typeof window === "undefined") return "light";

	try {
		const persistedColorScheme = localStorage.getItem(
			"colorScheme",
		) as ColorScheme | null;
		if (
			persistedColorScheme === "dark" ||
			persistedColorScheme === "light"
		) {
			return persistedColorScheme;
		}
	} catch {}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const saveColorScheme = (colorScheme: ColorScheme) => {
	try {
		localStorage.setItem("colorScheme", colorScheme);
		document.body.classList.toggle("dark", colorScheme === "dark");
	} catch {}
};

export function useColorScheme() {
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		getInitialColorScheme(),
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () =>
			setColorScheme(mediaQuery.matches ? "dark" : "light");

		mediaQuery.addEventListener("change", handleChange);

		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		saveColorScheme(colorScheme);
	}, [colorScheme]);

	const toggleColorScheme = useCallback(
		() => setColorScheme((prev) => (prev === "light" ? "dark" : "light")),
		[],
	);

	return useMemo(
		() => ({ colorScheme, toggleColorScheme }),
		[colorScheme, toggleColorScheme],
	);
}
