import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { themes } from '../themes';

interface ThemeContextProps {
    theme: typeof themes.light;
    setThemeByName: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: themes.light,
    setThemeByName: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    const setThemeByName = (themeName: string) => {
        const selectedTheme = themes[themeName];
        if (selectedTheme) {
            setTheme(selectedTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setThemeByName }}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
