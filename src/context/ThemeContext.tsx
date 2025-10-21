import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import useUserStore from '../userStore';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Create context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { user, updateUserTheme } = useUserStore();
  const userTheme = user?.settings?.find(s => s.key === 'theme')?.value as Theme || 'light';
  
  const [theme, setTheme] = useState<Theme>(() => userTheme);
  // const [theme, setTheme] = useLocalStorage<Theme>('theme', userTheme);
 
  useEffect(() => {
   updateTheme(userTheme);
  }, [userTheme]);

  const updateTheme  = (newTheme: Theme) => {
    setTheme(newTheme);
    updateUserTheme(newTheme);
  };

  const toggleTheme = () => {
    updateTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Apply data-theme attribute for CSS variable switching
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Value to be provided to consumers
  const value = {
    theme,
    toggleTheme, 
    setTheme: updateTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};