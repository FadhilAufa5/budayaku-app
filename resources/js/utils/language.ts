export type Language = 'id' | 'en';

export const getLanguage = (): Language => {
    if (typeof window !== 'undefined') {
        return (localStorage.getItem('language') as Language) || 'id';
    }
    return 'id';
};

export const setLanguage = (lang: Language): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
    }
};

export const toggleLanguage = (): void => {
    const current = getLanguage();
    const newLang = current === 'id' ? 'en' : 'id';
    setLanguage(newLang);
    window.location.reload();
};

export const useLanguage = () => {
    return getLanguage();
};
