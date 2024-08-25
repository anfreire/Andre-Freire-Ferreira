import { useColorScheme } from "@/hooks/useColorScheme";
import { memo } from "react";
import { ReactComponent as Sun } from "@/assets/sun.svg";
import { ReactComponent as Moon } from "@/assets/moon.svg";

const ThemeController = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <label className="absolute top-4 right-4 swap swap-rotate">
      <input
        type="checkbox"
        onChange={toggleColorScheme}
        className="theme-controller"
        value="light"
        checked={colorScheme === "light"}
      />
      <Sun className="w-10 h-10 fill-current swap-on" />
      <Moon className="w-10 h-10 fill-current swap-off" />
    </label>
  );
};

ThemeController.displayName = "ThemeController";

export default memo(ThemeController);
