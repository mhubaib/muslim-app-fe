import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeColors {
    primaryAction: string
    hoverState: string
    background: string
    mainSurface: string
    secondarySurface: string
    mainText: string
    mutedText: string
    successState: string
    errorState: string
    warningState: string
    infoState: string
}

interface ThemeContextType {
    theme: 'light' | 'dark' | 'system';
    isDark: boolean;
    colors: ThemeColors;
    changeTheme: (newTheme: ThemeContextType['theme']) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeContextType['theme']>('system');
    const [isDark, setIsDark] = useState<ThemeContextType['isDark']>(false);

    // Load saved theme preference
    useEffect(() => {
        loadThemePreference();
    }, []);

    // Update isDark based on theme setting
    useEffect(() => {
        if (theme === 'system') {
            setIsDark(systemColorScheme === 'dark');
        } else {
            setIsDark(theme === 'dark');
        }
    }, [theme, systemColorScheme]);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
                setTheme(savedTheme);
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
        }
    };

    const saveThemePreference = async (newTheme: ThemeContextType['theme']) => {
        try {
            await AsyncStorage.setItem('theme', newTheme);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    const changeTheme = (newTheme: ThemeContextType['theme']) => {
        setTheme(newTheme);
        saveThemePreference(newTheme);
    };

    const styles: { light: ThemeColors; dark: ThemeColors } = {
        light: {
            primaryAction: '#10b981',
            hoverState: '#059669',
            background: '#d1fae5',
            mainSurface: '#ffffff',
            secondarySurface: '#f3f4f6',
            mainText: '#1a1a1a',
            mutedText: '#666666',
            successState: '#10b981',
            warningState: '#f59e0b',
            errorState: '#ef4444',
            infoState: '#3b82f6'
        },
        dark: {
            primaryAction: '#10b981',
            hoverState: '#34d399',
            background: '#064e3b',
            mainSurface: '#0a0e27',
            secondarySurface: '#1a1f3a',
            mainText: '#ffffff',
            mutedText: '#d1d5db',
            successState: '#a7f3d0',
            warningState: '#fcd34d',
            errorState: '#fecaca',
            infoState: '#93c5fd'
        },
    };

    const currentColors = styles[isDark ? 'dark' : 'light'];

    const value: ThemeContextType = {
        theme,
        isDark,
        colors: currentColors,
        changeTheme,
        toggleTheme: () => changeTheme(isDark ? 'light' : 'dark'),
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};