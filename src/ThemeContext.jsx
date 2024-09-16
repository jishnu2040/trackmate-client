import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark'; // Simplified return
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskId, setTaskId] = useState(null); // State for storing taskId

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Toggle function for dark mode
  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  // Functions to handle modal opening and taskId passing
  const openModal = (id) => {
    setTaskId(id);  // Store the taskId
    setIsModalOpen(true);  // Open modal
  };

  const closeModal = () => {
    setTaskId(null);  // Clear taskId when modal is closed
    setIsModalOpen(false);  // Close modal
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, isModalOpen, openModal, closeModal, taskId }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
