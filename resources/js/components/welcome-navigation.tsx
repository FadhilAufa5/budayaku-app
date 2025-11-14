import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { dashboard } from '@/routes';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ShoppingBag, Users, Home, Globe2, PartyPopper, Search, Languages } from 'lucide-react';
import React from 'react';
import { useTranslation } from '@/translations';

interface WelcomeNavigationProps {
    canRegister?: boolean;
}

export function WelcomeNavigation({ canRegister = true }: WelcomeNavigationProps) {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [language, setLanguage] = React.useState<'id' | 'en'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('language') as 'id' | 'en') || 'id';
        }
        return 'id';
    });
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        const handleScroll = () => {
            // Show background after scrolling just 50px
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLanguage = language === 'id' ? 'en' : 'id';
        localStorage.setItem('language', newLanguage);
        window.location.reload();
    };

    const translations = {
        id: {
            home: 'Home',
            culture: 'Budaya',
            event: 'Event',
            shop: 'Toko Lokal',
            about: 'Tentang',
            search: 'Cari...',
            dashboard: 'Dashboard'
        },
        en: {
            home: 'Home',
            culture: 'Culture',
            event: 'Event',
            shop: 'Local Shop',
            about: 'About',
            search: 'Search...',
            dashboard: 'Dashboard'
        }
    };

    const t = translations[language];

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
            isScrolled 
                ? 'border-b border-amber-200/50 bg-white/95 py-3 shadow-lg backdrop-blur-md dark:border-amber-800/50 dark:bg-amber-950/95' 
                : 'bg-transparent py-6'
        }`}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3 transition-all duration-500 hover:scale-105">
                    <img 
                        src="/logo.png" 
                        alt="Budaya Go Logo" 
                        className={`w-auto transition-all duration-500 ${
                            isScrolled 
                                ? 'h-10 brightness-100 lg:h-11' 
                                : 'h-14 brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] lg:h-16'
                        }`}
                    />
                </Link>

                {/* Right Side: Menu + Actions */}
              <div className="flex items-center gap-6 lg:gap-10">
                    {/* Desktop Navigation Menu */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList className="gap-1">
                        {/* Home Link */}
                        <NavigationMenuItem>
                            <Link href="/">
                                <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                    isScrolled
                                        ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                        : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                                }`}>
                                    <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                    {t.home}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {/* Budaya Link */}
                        <NavigationMenuItem>
                            <Link href="/budaya">
                                <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                    isScrolled
                                        ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                        : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                                }`}>
                                    <Globe2 className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                    {t.culture}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {/* Event Link */}
                        <NavigationMenuItem>
                            <Link href="/events">
                                <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                    isScrolled
                                        ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                        : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                                }`}>
                                    <PartyPopper className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                    {t.event}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {/* Toko Lokal Link */}
                        <NavigationMenuItem>
                            <Link href="#toko">
                                <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                    isScrolled
                                        ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                        : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                                }`}>
                                    <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                    {t.shop}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {/* About Link */}
                        <NavigationMenuItem>
                            <Link href="/about">
                                <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                    isScrolled
                                        ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                        : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                                }`}>
                                    <Users className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                    {t.about}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Actions (Search, Language, Dashboard) */}
                    <nav className="flex items-center gap-2">
                    {/* Search Button */}
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className={`group inline-flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 ${
                            isScrolled
                                ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                        }`}
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className={`group inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                            isScrolled
                                ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                        }`}
                        aria-label="Change language"
                    >
                        <Languages className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        <span className="hidden sm:inline uppercase">{language}</span>
                    </button>

                    {/* Dashboard Button (if logged in) */}
                    {auth.user && (
                        <Link
                            href={dashboard()}
                            className="hidden rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-amber-500 hover:to-orange-500 hover:shadow-xl lg:inline-block"
                        >
                            {t.dashboard}
                        </Link>
                    )}
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`inline-flex items-center justify-center rounded-lg p-2.5 transition-all duration-300 lg:hidden ${
                            isScrolled
                                ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                        }`}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                    </nav>
                </div>
            </div>

            {/* Search Overlay */}
            {searchOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="container mx-auto px-6 pt-24">
                        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-amber-950">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                                    {language === 'id' ? 'Pencarian' : 'Search'}
                                </h3>
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="rounded-lg p-2 text-amber-900 transition-colors hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-amber-900"
                                    aria-label="Close search"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-600" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t.search}
                                    className="w-full rounded-lg border-2 border-amber-200 bg-white py-3 pl-12 pr-4 text-amber-900 placeholder:text-amber-400 focus:border-amber-500 focus:outline-none dark:border-amber-800 dark:bg-amber-900/50 dark:text-amber-100 dark:placeholder:text-amber-600"
                                    autoFocus
                                />
                            </div>
                            {searchQuery && (
                                <div className="mt-4">
                                    <p className="text-sm text-amber-700 dark:text-amber-300">
                                        {language === 'id' 
                                            ? `Mencari: "${searchQuery}"... (Fitur pencarian akan segera hadir)` 
                                            : `Searching: "${searchQuery}"... (Search feature coming soon)`}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="animate-in slide-in-from-top-4 border-t border-amber-200/50 bg-white/95 backdrop-blur-md dark:border-amber-800/50 dark:bg-amber-950/95 lg:hidden">
                    <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
                        {/* Search Bar */}
                        <div className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-600" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t.search}
                                    className="w-full rounded-lg border-2 border-amber-200 bg-white py-3 pl-12 pr-4 text-amber-900 placeholder:text-amber-400 focus:border-amber-500 focus:outline-none dark:border-amber-800 dark:bg-amber-900/50 dark:text-amber-100 dark:placeholder:text-amber-600"
                                />
                            </div>
                        </div>

                        {/* Language Toggle Mobile */}
                        <div className="mb-4 flex items-center justify-between rounded-lg bg-amber-50/50 p-3 dark:bg-amber-900/20">
                            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                                <Languages className="h-5 w-5" />
                                <span className="font-semibold">{language === 'id' ? 'Bahasa' : 'Language'}</span>
                            </div>
                            <button
                                onClick={toggleLanguage}
                                className="rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-amber-500 hover:to-orange-500"
                            >
                                {language === 'id' ? 'EN' : 'ID'}
                            </button>
                        </div>

                        {/* Dashboard Button Mobile (if logged in) */}
                        {auth.user && (
                            <Link
                                href={dashboard()}
                                className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 p-3 text-white shadow-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="font-semibold">{t.dashboard}</span>
                            </Link>
                        )}

                        {/* Main Navigation Links */}
                        <div className="space-y-2 border-t border-amber-200/50 pt-4 dark:border-amber-800/50">
                            <Link
                                href="/"
                                className="flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-amber-100/50 hover:scale-[1.02] active:scale-[0.98] dark:hover:bg-amber-900/30"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-md text-white">
                                    <Home className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-amber-900 dark:text-amber-100">
                                        {t.home}
                                    </p>
                                    <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                        {language === 'id' ? 'Kembali ke halaman utama' : 'Back to homepage'}
                                    </p>
                                </div>
                            </Link>

                            <Link
                                href="/budaya"
                                className="flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-amber-100/50 hover:scale-[1.02] active:scale-[0.98] dark:hover:bg-amber-900/30"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md text-white">
                                    <Globe2 className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-amber-900 dark:text-amber-100">
                                        {language === 'id' ? 'Budaya Indonesia' : 'Indonesian Culture'}
                                    </p>
                                    <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                        {language === 'id' ? 'Jelajahi kekayaan budaya nusantara' : 'Explore archipelago cultural richness'}
                                    </p>
                                </div>
                            </Link>

                            <Link
                                href="/events/list"
                                className="flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-amber-100/50 hover:scale-[1.02] active:scale-[0.98] dark:hover:bg-amber-900/30"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 shadow-md text-white">
                                    <PartyPopper className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-amber-900 dark:text-amber-100">
                                        {language === 'id' ? 'Event & Festival' : 'Events & Festivals'}
                                    </p>
                                    <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                        {language === 'id' ? 'Ikuti acara budaya terkini' : 'Follow latest cultural events'}
                                    </p>
                                </div>
                            </Link>

                            <Link
                                href="#toko"
                                className="flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-amber-100/50 hover:scale-[1.02] active:scale-[0.98] dark:hover:bg-amber-900/30"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 shadow-md text-white">
                                    <ShoppingBag className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-amber-900 dark:text-amber-100">
                                        {t.shop}
                                    </p>
                                    <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                        {language === 'id' ? 'Belanja produk khas Indonesia' : 'Shop authentic Indonesian products'}
                                    </p>
                                </div>
                            </Link>

                            <Link
                                href="/about"
                                className="flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-amber-100/50 hover:scale-[1.02] active:scale-[0.98] dark:hover:bg-amber-900/30"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-md text-white">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-amber-900 dark:text-amber-100">
                                        {language === 'id' ? 'Tentang Kami' : 'About Us'}
                                    </p>
                                    <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                        {language === 'id' ? 'Kenali visi dan misi BudayaKu' : 'Learn our vision and mission'}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
