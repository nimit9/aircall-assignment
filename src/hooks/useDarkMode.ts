import { useAppContext } from '@/context/context';
import { useEffect } from 'react';

export const useDarkMode = () => {
    const { toggleDarkMode, darkMode } = useAppContext();
    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        console.log('isDarkMode', isDarkMode);

        toggleDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);
};
