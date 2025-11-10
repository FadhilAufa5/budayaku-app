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
import { CalendarDays, Sparkles, ShoppingBag, Users, BookOpen } from 'lucide-react';
import React from 'react';

interface WelcomeNavigationProps {
    canRegister?: boolean;
}

const features = [
    {
        title: 'Budaya Indonesia',
        href: '#budaya',
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
        href: '#tentang',
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

    return (
        <header className="relative z-10 w-full border-b border-amber-200/50 bg-white/80 backdrop-blur-md dark:border-amber-800/50 dark:bg-amber-950/80">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg">
                        <Sparkles className="h-6 w-6" />
                    </div> */}
                    <span className="text-xl font-bold text-amber-900 dark:text-amber-100 lg:text-2xl">
                        Budaya Go
                    </span>
                </div>

                {/* Desktop Navigation Menu - Center */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList className="gap-2">
                        {/* Features Menu */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent text-base font-medium text-amber-900 hover:bg-amber-100/50 data-[active]:bg-amber-100/50 data-[state=open]:bg-amber-100/50 dark:text-amber-100 dark:hover:bg-amber-900/30 dark:data-[active]:bg-amber-900/30 dark:data-[state=open]:bg-amber-900/30">
                                Fitur
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
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

                        {/* About Menu */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent text-base font-medium text-amber-900 hover:bg-amber-100/50 data-[active]:bg-amber-100/50 data-[state=open]:bg-amber-100/50 dark:text-amber-100 dark:hover:bg-amber-900/30 dark:data-[active]:bg-amber-900/30 dark:data-[state=open]:bg-amber-900/30">
                                Tentang
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[450px] gap-3 p-4">
                                    {about.map((item) => (
                                        <ListItem
                                            key={item.title}
                                            title={item.title}
                                            href={item.href}
                                            icon={item.icon}
                                        >
                                            {item.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Auth Buttons */}
                <nav className="flex items-center gap-3">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl lg:px-6 lg:py-2.5"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="hidden rounded-lg border-2 border-amber-600 px-4 py-2 text-sm font-medium text-amber-900 transition-all hover:bg-amber-600 hover:text-white dark:border-amber-400 dark:text-amber-100 dark:hover:bg-amber-600 md:inline-block lg:px-6 lg:py-2.5"
                            >
                                Masuk
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl lg:px-6 lg:py-2.5"
                                >
                                    Daftar
                                </Link>
                            )}
                        </>
                    )}
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="inline-flex items-center justify-center rounded-lg p-2 text-amber-900 hover:bg-amber-100/50 dark:text-amber-100 dark:hover:bg-amber-900/30 lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-amber-200/50 bg-white dark:border-amber-800/50 dark:bg-amber-950 lg:hidden">
                    <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
                        {/* Features Section */}
                        <div className="space-y-2">
                            <h3 className="px-3 text-sm font-semibold text-amber-900/60 dark:text-amber-100/60">
                                Fitur
                            </h3>
                            {features.map((feature) => (
                                <a
                                    key={feature.title}
                                    href={feature.href}
                                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-amber-100/50 dark:hover:bg-amber-900/30"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-amber-900 dark:text-amber-100">
                                            {feature.title}
                                        </p>
                                        <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                            {feature.description}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* About Section */}
                        <div className="space-y-2 pt-4">
                            <h3 className="px-3 text-sm font-semibold text-amber-900/60 dark:text-amber-100/60">
                                Tentang
                            </h3>
                            {about.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.href}
                                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-amber-100/50 dark:hover:bg-amber-900/30"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-amber-900 dark:text-amber-100">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
                                            {item.description}
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
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-amber-100/50 hover:text-amber-900 focus:bg-amber-100/50 focus:text-amber-900 dark:hover:bg-amber-900/30 dark:hover:text-amber-100 dark:focus:bg-amber-900/30 dark:focus:text-amber-100',
                        className,
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-2">
                        {Icon && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                                <Icon className="h-4 w-4" />
                            </div>
                        )}
                        <div className="text-sm font-medium leading-none">{title}</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';
