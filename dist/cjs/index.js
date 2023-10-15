"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDarkMode = exports.useTheme = void 0;
const react_1 = require("react");
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
function useTheme() {
    const [_theme, setLocalTheme] = (0, react_1.useState)((localStorage.theme || 'system'));
    const handleTheme = (theme) => {
        enableTheme(theme);
        localStorage.setItem('theme', theme);
        setLocalTheme(theme);
    };
    return { theme: _theme, setTheme: handleTheme };
}
exports.useTheme = useTheme;
function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = (0, react_1.useState)(enableTheme((localStorage.theme || 'system')));
    (0, react_1.useEffect)(() => {
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
exports.useDarkMode = useDarkMode;
//# sourceMappingURL=index.js.map