import { useEffect, useState } from 'react';
function enableTheme(localTheme) {
    if (localTheme === 'dark') {
        document.documentElement.classList.add('dark');
        return true;
    }
    else if (localTheme === 'light') {
        document.documentElement.classList.remove('dark');
        return false;
    }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }
    else {
        document.documentElement.classList.remove('dark');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
export function useTheme() {
    const [_theme, setLocalTheme] = useState((localStorage.theme || 'system'));
    const handleTheme = (theme) => {
        enableTheme(theme);
        localStorage.setItem('theme', theme);
        setLocalTheme(theme);
    };
    return { theme: _theme, setTheme: handleTheme };
}
export function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(enableTheme((localStorage.theme || 'system')));
    useEffect(() => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark');
        const handleChange = (e) => {
            console.log('theme changed', window.matchMedia('(prefers-color-scheme: dark)').matches);
            const isDark = enableTheme((localStorage.theme || 'system'));
            setIsDarkMode(isDark);
        };
        mediaQueryList.addEventListener('change', handleChange);
        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, []);
    return isDarkMode;
}
//# sourceMappingURL=index.js.map