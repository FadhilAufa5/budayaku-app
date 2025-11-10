import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarDays, MapPin, ShoppingBag, Sparkles } from 'lucide-react';
import { WelcomeNavigation } from '@/components/welcome-navigation';
import { dashboard } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
                {/* Batik Pattern Background */}
                <div className="absolute inset-0 opacity-10 dark:opacity-5">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="batik-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="75" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="25" cy="75" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="75" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <path d="M 0,50 Q 25,25 50,50 T 100,50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <path d="M 50,0 Q 25,25 50,50 T 50,100" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#batik-pattern)" className="text-amber-800 dark:text-amber-200"/>
                    </svg>
                </div>

                {/* Navigation */}
                <WelcomeNavigation canRegister={canRegister} />

                {/* Hero Section */}
                <main className="relative z-10 px-6 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        {/* Hero Content */}
                        <div className="flex flex-col items-center py-12 text-center lg:py-20">
                            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-amber-800 shadow-lg backdrop-blur-sm dark:bg-amber-900/30 dark:text-amber-200">
                                <Sparkles className="h-4 w-4" />
                                <span>Jelajahi Kekayaan Budaya Indonesia</span>
                            </div>
                            
                            <h1 className="mb-6 bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-6xl lg:text-7xl dark:from-amber-300 dark:via-orange-300 dark:to-red-300">
                                Warisan Budaya<br />Nusantara
                            </h1>
                            
                            <p className="mb-10 max-w-2xl text-lg text-amber-900/80 dark:text-amber-100/80 md:text-xl">
                                Temukan keindahan batik, eksplorasi event budaya, dan belanja produk
                                khas Indonesia. Satu platform untuk merayakan keberagaman budaya kita.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-amber-500/50"
                                    >
                                        Mulai Jelajahi
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={register()}
                                            className="rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-amber-500/50"
                                        >
                                            Mulai Sekarang
                                        </Link>
                                        <Link
                                            href={login()}
                                            className="rounded-xl border-2 border-amber-700 bg-white/50 px-8 py-4 text-lg font-semibold text-amber-900 backdrop-blur-sm transition-all hover:bg-white dark:border-amber-400 dark:bg-amber-900/20 dark:text-amber-100 dark:hover:bg-amber-900/40"
                                        >
                                            Masuk
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Features Section */}
                        <div id="budaya" className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:py-16">
                            {/* Feature 1 - Budaya */}
                            <div className="group relative overflow-hidden rounded-2xl bg-white/60 p-8 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-amber-900/20">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/30 blur-2xl"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                                        <Sparkles className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-amber-900 dark:text-amber-100">
                                        Eksplorasi Budaya
                                    </h3>
                                    <p className="mb-4 text-amber-800/80 dark:text-amber-200/80">
                                        Jelajahi kekayaan budaya Indonesia dari Sabang sampai Merauke. Temukan batik, tarian, dan tradisi unik.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                                        <span>Pelajari lebih lanjut</span>
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 2 - Event */}
                            <div id="event" className="group relative overflow-hidden rounded-2xl bg-white/60 p-8 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-amber-900/20">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-orange-400/30 to-red-500/30 blur-2xl"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
                                        <CalendarDays className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-amber-900 dark:text-amber-100">
                                        Event Budaya
                                    </h3>
                                    <p className="mb-4 text-amber-800/80 dark:text-amber-200/80">
                                        Ikuti berbagai acara budaya, festival, dan workshop tradisional di seluruh Indonesia.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-300">
                                        <span>Lihat event</span>
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 3 - Toko */}
                            <div id="toko" className="group relative overflow-hidden rounded-2xl bg-white/60 p-8 shadow-xl backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl dark:bg-amber-900/20 md:col-span-2 lg:col-span-1">
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-red-400/30 to-amber-500/30 blur-2xl"></div>
                                <div className="relative">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-amber-600 text-white shadow-lg">
                                        <ShoppingBag className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-amber-900 dark:text-amber-100">
                                        Toko Produk Lokal
                                    </h3>
                                    <p className="mb-4 text-amber-800/80 dark:text-amber-200/80">
                                        Belanja produk khas Indonesia: batik, kerajinan tangan, makanan tradisional, dan souvenir.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-300">
                                        <span>Mulai belanja</span>
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats/Quote Section */}
                        <div className="py-12 lg:py-16">
                            <div className="rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-center shadow-2xl lg:p-12">
                                <blockquote className="mx-auto max-w-3xl">
                                    <p className="mb-4 text-2xl font-medium italic text-white md:text-3xl">
                                        "Bhinneka Tunggal Ika"
                                    </p>
                                    <p className="text-lg text-amber-50 md:text-xl">
                                        Berbeda-beda tetapi tetap satu. Mari lestarikan keberagaman budaya Indonesia
                                        untuk generasi mendatang.
                                    </p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 border-t border-amber-200 bg-white/50 px-6 py-8 backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950/50 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                            <MapPin className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Indonesia - Dari Sabang sampai Merauke
                            </span>
                        </div>
                        <div className="text-center text-sm text-amber-800/80 dark:text-amber-200/80">
                            © 2025 BudayaKu. Lestarikan Budaya Nusantara.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
