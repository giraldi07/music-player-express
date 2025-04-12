import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define theme type
export type Theme = 'light' | 'dark';

// Define context type
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Get initial theme function
function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  return 'light';
}

// Theme provider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Context value
  const contextValue = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};