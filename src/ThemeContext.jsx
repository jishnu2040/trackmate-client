import React, { createContext, useState, useEffect } from 'react';


const ThemeContext = createContext();


export function ThemeProvider({ children }) {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');

    return storedTheme ? storedTheme === 'dark' : '';
  });

  
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Toggle function for dark mode
  const toggleTheme = () => setIsDarkMode(prevMode => !prevMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
