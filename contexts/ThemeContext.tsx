import React, { useContext, createContext, useState } from "react";

import light from "../styles/light";
import dark from "../styles/dark";

const ThemeContext = createContext(null);

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(light);

  const switchTheme = () => {
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
