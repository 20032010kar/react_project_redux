import { createContext, useContext, useState, type ReactNode } from "react";
import useLocalStorage from "../hooks/use-local-storage.js";

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType|undefined>(undefined);



export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useLocalStorage<Theme>('app_theme','light');

    const switchTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }
    return(
        <ThemeContext.Provider value={{theme, switchTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("Please provide ThemeProvider for using useTheme");
    }
    return context;
}