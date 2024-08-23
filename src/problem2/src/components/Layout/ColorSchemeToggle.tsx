import { useColorScheme } from "@/hooks/useColorScheme";

const ColorSchemeToggle = (): JSX.Element => {
	const { colorScheme, toggleColorScheme } = useColorScheme();

	const isDark = colorScheme === "dark";

	return (
		<div
			className="absolute flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full cursor-pointer top-5 right-5 dark:bg-gray-900"
			onClick={() => toggleColorScheme()}
		>
			{isDark ? (
				<div className="w-6 h-6 text-yellow-400" />
			) : (
				<div className="w-6 h-6 text-gray-800" />
			)}
		</div>
	);
};

ColorSchemeToggle.displayName = "ColorSchemeToggle";

export default ColorSchemeToggle;
