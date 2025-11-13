import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { dashboard, login, register } from '@/routes';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { CalendarDays, Sparkles, ShoppingBag, Users, BookOpen, Home, Globe2, PartyPopper } from 'lucide-react';
import React from 'react';

interface WelcomeNavigationProps {
    canRegister?: boolean;
}

const features = [
    {
        title: 'Budaya Indonesia',
        href: '/budaya',
        description: 'Jelajahi kekayaan budaya dari Sabang sampai Merauke',
        icon: Sparkles,
    },
    {
        title: 'Event & Festival',
        href: '#event',
        description: 'Ikuti berbagai acara budaya dan festival tradisional',
        icon: CalendarDays,
    },
    {
        title: 'Toko Lokal',
        href: '#toko',
        description: 'Belanja produk khas Indonesia: batik, kerajinan, dan lainnya',
        icon: ShoppingBag,
    },
];

const about = [
    {
        title: 'Tentang Kami',
        href: '/about',
        description: 'Kenali lebih dekat visi dan misi BudayaKu',
        icon: Users,
    },
    {
        title: 'Cara Kerja',
        href: '#cara-kerja',
        description: 'Pelajari cara menggunakan platform BudayaKu',
        icon: BookOpen,
    },
];

export function WelcomeNavigation({ canRegister = true }: WelcomeNavigationProps) {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            // Check if scrolled past 80vh (approximately past the hero video)
            setIsScrolled(window.scrollY > window.innerHeight * 0.8);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

                {/* Desktop Navigation Menu - Center */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList className="gap-2">
                        {/* Home Link */}
                        <NavigationMenuItem>
                            <Link href="/">
                                <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                    isScrolled
                                        ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                        : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                                }`}>
                                    <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                    Home
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
                                    Budaya
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {/* Event Link */}
                        <NavigationMenuItem>
                            <Link href="/events/list">
                                <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                    isScrolled
                                        ? 'text-amber-900 hover:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40'
                                        : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md'
                                }`}>
                                    <PartyPopper className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                                    Event
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {/* Features Menu */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className={`bg-transparent text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                isScrolled
                                    ? 'text-amber-900 hover:bg-amber-100/60 data-[active]:bg-amber-100/60 data-[state=open]:bg-amber-100/60 dark:text-amber-100 dark:hover:bg-amber-900/40 dark:data-[active]:bg-amber-900/40 dark:data-[state=open]:bg-amber-900/40'
                                    : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/20 hover:backdrop-blur-md data-[active]:bg-white/20 data-[active]:backdrop-blur-md data-[state=open]:bg-white/20 data-[state=open]:backdrop-blur-md'
                            }`}>
                                Lainnya
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
                                    {features.map((feature) => (
                                        <ListItem
                                            key={feature.title}
                                            title={feature.title}
                                            href={feature.href}
                                            icon={feature.icon}
                                        >
                                            {feature.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
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
                                    Tentang
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Auth Buttons */}
                <nav className="flex items-center gap-3">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-amber-500 hover:to-orange-500 hover:shadow-xl"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className={`hidden rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 md:inline-block ${
                                    isScrolled
                                        ? 'border-amber-600 text-amber-900 hover:bg-amber-600 hover:text-white dark:border-amber-400 dark:text-amber-100 dark:hover:bg-amber-600'
                                        : 'border-white/70 bg-white/10 text-white backdrop-blur-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:border-white hover:bg-white hover:text-amber-900'
                                }`}
                            >
                                Masuk
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-amber-500 hover:to-orange-500 hover:shadow-xl"
                                >
                                    Daftar
                                </Link>
                            )}
                        </>
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

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="animate-in slide-in-from-top-4 border-t border-amber-200/50 bg-white/95 backdrop-blur-md dark:border-amber-800/50 dark:bg-amber-950/95 lg:hidden">
                    <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
                        {/* Main Navigation Links */}
                        <div className="space-y-2 border-b border-amber-200/50 pb-4 dark:border-amber-800/50">
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
                                        Home
                                    </p>
                                    <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                        Kembali ke halaman utama
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
                                        Budaya Indonesia
                                    </p>
                                    <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                        Jelajahi kekayaan budaya nusantara
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
                                        Event & Festival
                                    </p>
                                    <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                        Ikuti acara budaya terkini
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
                                        Tentang Kami
                                    </p>
                                    <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                        Kenali visi dan misi BudayaKu
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Features Section */}
                        <div className="space-y-2 pt-2">
                            <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-amber-900/60 dark:text-amber-100/60">
                                Fitur Lainnya
                            </h3>
                            {features.map((feature) => (
                                <a
                                    key={feature.title}
                                    href={feature.href}
                                    className="flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-amber-100/50 hover:scale-[1.02] active:scale-[0.98] dark:hover:bg-amber-900/30"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                                        <feature.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-amber-900 dark:text-amber-100">
                                            {feature.title}
                                        </p>
                                        <p className="text-xs text-amber-800/80 dark:text-amber-200/80">
                                            {feature.description}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'> & {
        title: string;
        icon?: React.ComponentType<{ className?: string }>;
    }
>(({ className, title, children, icon: Icon, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    href={href}
                    className={cn(
                        'group block select-none space-y-2 rounded-xl border-2 border-transparent p-4 leading-none no-underline outline-none transition-all hover:scale-[1.02] hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-md focus:border-amber-200 focus:bg-amber-50/50 active:scale-[0.98] dark:hover:border-amber-800 dark:hover:bg-amber-900/20 dark:focus:border-amber-800 dark:focus:bg-amber-900/20',
                        className,
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110">
                                <Icon className="h-5 w-5" />
                            </div>
                        )}
                        <div className="text-base font-semibold leading-none text-amber-900 dark:text-amber-100">{title}</div>
                    </div>
                    <p className="line-clamp-2 pl-[52px] text-sm leading-snug text-amber-800/80 dark:text-amber-200/70">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';
