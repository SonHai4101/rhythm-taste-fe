import { useEffect, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="p-2 text-black dark:text-white bg-background-card rounded-xl border border-gray-300"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <IoMoon /> : <BsFillSunFill />}
    </button>
  );
}
