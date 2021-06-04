import React, { useContext, createContext, useState } from "react";

import light from "../styles/light";
import dark from "../styles/dark";

const ThemeContext = createContext(null);

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem("chattyTheme");

    if (localTheme) return JSON.parse(localTheme);

    return light;
  });

  const switchTheme = () => {
    localStorage.setItem(
      "chattyTheme",
      theme.title === "light" ? JSON.stringify(dark) : JSON.stringify(light)
    );

    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

export { ThemeContextProvider, useTheme };
